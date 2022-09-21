<template>
  <div class="app-container">
    <ContainerHeader :title="$route.meta.title" />
    <div class="filter-container">
      <el-form :inline="true">
        <el-form-item label="关键字搜索">
          <el-input v-model="listQuery.search_key"  clearable   placeholder="nft 合约 主链" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
        </el-form-item>
        <el-form-item label="审核状态">
          <el-select v-model="listQuery.status" placeholder="审核状态"  clearable class="filter-item" style="width: 130px">
            <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name + '(' + item.key + ')'" :value="item.key" />
          </el-select>
        </el-form-item>

        <!-- <el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
      </el-select> -->
        <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
          搜索
        </el-button>

        <el-checkbox v-model="showReviewer" class="filter-item" style="margin-left:15px;" @change="tableKey = tableKey + 1">
          reviewer
        </el-checkbox>
      </el-form>
    </div>

    <el-table :key="tableKey" v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%;" @sort-change="sortChange" @row-click="handleRowClick">
      <el-table-column  label="ID"  fixed='left' prop="id" sortable="custom" align="center" width="80" :class-name="getSortClass('id')">
        <template slot-scope="{ row }">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="icon图标"  fixed='left' align="center">
        <template slot-scope="{ row }">
          <el-image style="width: 40px; height: 40px; border-radius:50%" :src="row.image_url_cdn" fit="contain"></el-image>
        </template>
      </el-table-column>
      <el-table-column label="NFT名称(主题)"  fixed='left'  align="center">
        <template slot-scope="{ row }">
          {{ row.title }}
        </template>
      </el-table-column>
      <el-table-column label="主链(chain)"  fixed='left' width="110px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.chain }}</span>
        </template>
      </el-table-column>

     
      
      <el-table-column label="合约地址(contract)" align="center" show-overflow-tooltip>
        <template slot-scope="{ row }">
          <span @click.stop="handleCopy(row.contract, $event)" class="pointer" title="copy">{{ row.contract || '--' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="提交用户(eth_address)" align="center" show-overflow-tooltip>
        <template slot-scope="{ row }">
          <span @click.stop="handleCopy(row.owner_eth_address, $event)" class="pointer" title="copy">{{ row.owner_eth_address || '--' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="审核状态" align="center">
        <template slot-scope="{ row }">
          <el-tag :type="row.status | appovalFilterColor">{{ row.status | appovalFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="是否发布" align="center">
        <template slot-scope="{ row }">
          <el-tag :type="row.is_online == 1 ? 'success' : 'danger'">{{ row.is_online == 1 ? '已发布' : '未发布' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="拒绝原因" align="center" min-width="200px" max-width="300px" show-overflow-tooltip>
        <template slot-scope="{ row }">
          {{ row.remark }}
        </template>
      </el-table-column>
       <el-table-column label="更新时间"  width="110px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.update_time  | parseTime}}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" fixed="right" align="center" class-name="small-padding fixed-width">
        <template slot-scope="{ row }">
          <el-button v-if="row.status == 0" type="primary" size="mini" @click.stop="handleApproval(row, 'approval')">
            审核通过
          </el-button>
          <el-button v-if="row.status == 0" size="mini" type="danger" @click.stop="handleApproval(row, 'refuse')">
            拒绝
          </el-button>
          <el-button size="mini" @click.stop="$router.push(`/approval/nft/detail/${row.id}`)">
            查看
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div style="height:100px"></div>
    <!-- <ContainerFooter> -->
    <pagination v-show="total > 0"  class="footer-pagination" align="right"  :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList(false)" />
    <!-- </ContainerFooter> -->
  
  

    <el-dialog :title="appovalFormData.type != 'approval' ? '拒绝审核' : '审核通过'" :visible.sync="dialogFormVisible">
      <el-form :model="appovalFormData" ref="dataForm" label-position="right" label-width="80px">
        <el-form-item label="icon图片">
          <el-image style="width: 40px; height: 40px;border-radius:50%" :src="appovalFormData.data.image_url_cdn" fit="contain"></el-image>
        </el-form-item>
        <el-form-item label="NFT名称">
          <span>{{ appovalFormData.data.title }} </span>
        </el-form-item>
        <el-form-item label="主链">
          <span>{{ appovalFormData.data.chain }}</span>
        </el-form-item>
        <el-form-item label="合约地址">
          <span>{{ appovalFormData.data.contract }}</span>
        </el-form-item>
        <!-- <el-form-item label="精度">
          <span>{{ appovalFormData.data.contract }}</span>
        </el-form-item> -->
        <!-- 多语言 -->
        <el-form-item label="NFT名称">
          <span>{{ appovalFormData.data.title }}</span>
        </el-form-item>
        <el-form-item label="NFT介绍">
          <span>{{ appovalFormData.data.introduction }}</span>
        </el-form-item>

        <el-form-item label="NFT数量">
          <span>{{ appovalFormData.data.items_number }}</span>
        </el-form-item>
        <!-- <el-form-item label="总市值">
          <span>{{ appovalFormData.data.contract }}</span>
        </el-form-item> -->
        <el-form-item v-if="appovalFormData.type != 'approval'" prop="remark" label="拒绝原因" :rules="[{ required: true, message: '请填写拒绝原因' }]" style="max-width:100%">
          <el-input style="max-width:100%" v-model="appovalFormData.remark" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea" placeholder="请填写拒绝原因" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button :type="appovalFormData.type == 'approval' ? 'primary' : 'danger'" @click="submitApproval" :loading="submitLoading">
          {{ appovalFormData.type == 'approval' ? '审核通过' : '拒绝审核' }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList, verify } from '@/api/nft'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import ContainerHeader from '@/components/ContainerHeader'
import ContainerFooter from '@/components/ContainerFooter'
import clip from '@/utils/clipboard'
const calendarTypeOptions = [
  { key: 0, display_name: '审核中', tagtype: 'warn' },
  { key: 1, display_name: '审核通过', tagtype: 'success' },
  { key: 2, display_name: '审核拒绝', tagtype: 'danger' }
]

export default {
  name: 'NFTList',
  components: { Pagination, ContainerHeader, ContainerFooter },
  directives: { waves },
  filters: {
    // parseTime(val=''){
    //   return parseTime(val).substr(-)
    // },
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
      submitLoading: false,
      tableKey: 0,
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        pageNum: 1,
        pageSize: 20,
        importance: undefined,
        search_key: undefined,
        status: undefined,
        sort: '+id'
      },
      calendarTypeOptions,
      sortOptions: [
        { label: 'ID Ascending', key: '+id' },
        { label: 'ID Descending', key: '-id' }
      ],
      showReviewer: false,

      dialogFormVisible: false,
      appovalFormData: {
        remark: '',
        type: 'approval',
        data: {}
      },

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
        this.list = response.data.list
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
      this.$router.push(`/approval/nft/detail/${id}`)
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
    handleApproval(row, type) {
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
      this.appovalFormData.type = type
      this.appovalFormData.data = row
      this.appovalFormData.remark = ''
    },
    async submitApproval() {
      this.$refs['dataForm'].validate(valid => {
        if (!valid) return
        const { data, type, remark } = this.appovalFormData
        this.submitLoading = true
        verify({ id: data.id, status: type == 'approval' ? 1 : 2, remark })
          .then(res => {
            this.handleFilter()
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
            this.getList(true)
          })
      })
    },

    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal) {
      return this.list.map(v =>
        filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        })
      )
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    }
  }
}
</script>
