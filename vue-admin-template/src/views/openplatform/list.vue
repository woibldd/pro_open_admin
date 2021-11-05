<template>
  <div class="app-container">
    <ContainerHeader :title="$route.meta.title" />
    <div class="filter-container">
      <el-form :inline="true">
        <el-form-item label="关键字搜索">
          <el-input v-model="listQuery.title" placeholder="账户名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
        </el-form-item>
        <!-- <el-form-item label="用户状态">
          <el-select v-model="listQuery.type" placeholder="审核状态" clearable class="filter-item" style="width: 130px">
            <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name + '(' + item.key + ')'" :value="item.key" />
          </el-select>
        </el-form-item> -->

        <!-- <el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
      </el-select> -->
        <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
          搜索
        </el-button>
      </el-form>
    </div>

    <el-table :key="tableKey" v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%;" @row-click="handleRowClick">
      <el-table-column v-for="col in TableColumus" :key="col.id" :label="col.label" :width="col.width || 'auto'" align="center">
        <template slot-scope="{ row }">
          <span>{{ row[col.key] }}</span>
        </template>
      </el-table-column>

    </el-table>

    <!-- <ContainerFooter> -->
    <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.pageSize" @pagination="getList" />
    <!-- </ContainerFooter> -->

    <el-dialog :title="dialogType === 'edit' ? '编辑用户' : '添加用户'" :visible.sync="dialogFormVisible">
      <el-form :model="userData" ref="dataForm" label-position="right" label-width="80px">
        <el-form-item label="用户名" prop="loginName" :rules="[{ required: dialogType == 'add', message: '请填写用户名' }]">
          <el-input :disabled="dialogType == 'edit'" v-model="userData.loginName" placeholder="请填写用户名" />
        </el-form-item>
        <el-form-item label="密码" prop="password" :rules="[{ required: dialogType == 'add', message: '请填写密码' }]">
          <el-input :disabled="dialogType == 'edit'" v-model="userData.password" type="password" placeholder="请填写修改密码" />
        </el-form-item>
        <!-- <el-form-item label="用户描述">
          <el-input v-model="userData.description" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea" placeholder="用户描述" />
        </el-form-item> -->
        <div
          v-if="
            !(userData.permission || '')
              .trim()
              .split(',')
              .includes('admin')
          "
        >
          <el-divider class="title">用户权限</el-divider>
          <!-- <el-checkbox v-model="checked">全选</el-checkbox> -->
          <el-tree ref="tree" :check-strictly="checkStrictly" :data="permissionTree" :props="defaultProps" show-checkbox node-key="permission" class="permission-tree" />
        </div>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="handleSave" :loading="submitLoading">
          保存
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList, update, add } from '@/api/openplatform'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import ContainerHeader from '@/components/ContainerHeader'
import ContainerFooter from '@/components/ContainerFooter'
import clip from '@/utils/clipboard'
import { generatePermission } from '@/router'
import { mapGetters } from 'vuex'
const calendarTypeOptions = [
  { key: 0, display_name: '审核中', tagtype: 'warn' },
  { key: 1, display_name: '审核通过', tagtype: 'success' },
  { key: 2, display_name: '审核失败', tagtype: 'danger' }
]
const TableColumus = [
  { label: 'id', key: 'id', type: 'string', show: false, value: '', width: '80px' },
  { label: '用户地址', key: 'eth_address', type: 'string', show: false, value: '' },
  { label: '钱包id', key: 'wallet_id', type: 'string', show: false, value: '', filter: 'parseTime' },
  { label: '钱包平台', key: 'wallet_platform', type: 'string', show: false, value: '', filter: 'parseTime' },
  { label: '主链', key: 'chain', type: 'string', show: false, value: '', filter: 'parseTime' },
  { label: '最后一次登录时间', key: 'last_login_time', type: 'string', show: false, value: '', filter: 'parseTime' }
]
const initUserData = {
  id: '',
  loginName: '',
  password: '',
  permission: ''
}

export default {
  name: 'userList',
  computed: {
    ...mapGetters(['permission_routes', 'permissionTree', 'permission'])
  },
  components: { Pagination, ContainerHeader, ContainerFooter },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    appovalFilter(key) {
      const { display_name } = calendarTypeOptions.find(v => v.key == key) || {
        display_name: ''
      }
      return display_name
    },
    appovalFilterColor(key) {
      const { tagtype } = calendarTypeOptions.find(v => v.key == key) || {
        tagtype: 'info'
      }
      return tagtype
    }
  },

  data() {
    return {
      TableColumus,
      submitLoading: false,
      tableKey: 0,
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        pageNum: 1,
        pageSize: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      calendarTypeOptions,
      sortOptions: [
        { label: 'ID Ascending', key: '+id' },
        { label: 'ID Descending', key: '-id' }
      ],

      dialogFormVisible: false,
      dialogType: 'edit',
      checkStrictly: false,
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      userData: JSON.parse(JSON.stringify(initUserData)),
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [
          {
            type: 'date',
            required: true,
            message: 'timestamp is required',
            trigger: 'change'
          }
        ],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },

  created() {
    this.getList()
  },
  methods: {
    getList(noLoading) {
      if (!noLoading) {
        this.listLoading = true
      }
      getList(this.listQuery).then(response => {
        this.list = response.data.list.map(v => {
          v.update_time = parseTime(v.update_time)
          return v
        })
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.pageNum = 1
      this.getList()
    },
    handleCopy(text, event) {
      clip(text, event)
    },
    handleRowClick({ id }) {
      //   this.$router.push(`/approval/token/detail/${id}`)
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    async handleSave() {
      this.$refs['dataForm'].validate(valid => {
        if (!valid) return
        this.submitLoading = true
        const { loginName, password, id } = this.userData
        const permission = this.$refs.tree.getCheckedKeys()
        const requetst = this.dialogType == 'edit' ? update({ id, loginName, password, permission: permission.join(',') }) : update({ loginName, password, permission: permission.join(',') })
        requetst
          .then(res => {
            this.getList()

            this.$notify({
              title: '提示',
              message: '提交成功',
              type: 'success',
              duration: 2000
            })
            this.submitLoading = false
            this.dialogFormVisible = false
          })
          .catch(err => {
            this.submitLoading = false
            this.getList()
          })
      })
    },

    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    }
  }
}
</script>
