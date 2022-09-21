<template>
  <div class="app-container">
    <ContainerHeader :title="$route.meta.title" />
    <div class="filter-container">
      <el-form :inline="true">
        <el-form-item label="关键字搜索">
          <el-input v-model="listQuery.title" placeholder="用户名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
        </el-form-item>

        <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
          搜索
        </el-button>
        <!-- <el-button v-waves class="filter-item" type="primary" icon="el-icon-edit" @click="handleUser('add')">
          新增
        </el-button> -->
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
    <div style="height:100px"></div>
    <pagination v-show="total > 0" class="footer-pagination" align="right" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList" />
    <!-- </ContainerFooter> -->
  </div>
</template>

<script>
import { getList } from '@/api/operation'
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
  { label: '操作内通', key: 'operation', type: 'string', show: false, value: '' },
  { label: '更新时间', key: 'update_time', type: 'string', show: false, value: '', filter: 'parseTime' }
]
const initUserData = {
  id: '',
  loginName: '',
  password: '',
  permission: ''
}

export default {
  name: 'operationList',
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
    handleUser(type, row) {
      const initData = JSON.parse(JSON.stringify(initUserData))
      this.dialogFormVisible = true
      this.dialogType = type
      this.userData = type == 'edit' ? Object.assign(initData, row) : initData

      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
        const permissions = (this.userData.permission || '').split(',')
        this.$refs.tree.setCheckedKeys(permissions)
        window.$refs = this
      })
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
