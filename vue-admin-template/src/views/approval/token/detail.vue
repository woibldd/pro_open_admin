<template>
  <div class="app-container tokenDetails">
    <!-- <ContainerHeader :title="$route.meta.title" /> -->
    <div class="header">
      <div class="icon-info">
        <el-avatar class="icon" shape="circle" :size="50" fit="fit" :src="dataInfo.icon" alt="alt"></el-avatar>
        <h1 class="name">{{ dataInfo.name }}</h1>

        <el-tag class="symbol" size="small" type="info" style="margin-right:5px">{{ dataInfo.coin }}</el-tag>
        <el-tag class="chain" size="small" type="info" style="margin-right:5px">{{ dataInfo.chain }}</el-tag>
        <el-tag size="small" type="info" v-if="dataInfo.contract || dataInfo.contract.length == 2">代币</el-tag>

        <el-select v-model="dataInfo.lang" placeholder="语言展示" class="lang">
          <el-option v-for="item in languageTypeOptions" :key="item.key" :label="item.display_name + '(' + item.key + ')'" :value="item.key" />
        </el-select>
      </div>
      <div>
        <el-tag :type="dataInfo.status | appovalFilterColor">{{ dataInfo.status | appovalFilter }}</el-tag>
      </div>
    </div>
    <el-form class="body" :inline="true" label-position="right">
      <div class="info">
        <el-divider class="title">基本信息</el-divider>
        <!-- <h3 class="title">基本信息</h3> -->
        <el-row :gutter="10" class="content">
          <el-col  :xs="col.xs || 24" :sm="col.sm || 8" v-for="col in IconColumus" :key="col.key">
            <el-form-item :label="col.label || col.key" v-if="col.type == 'href'">
              <el-link :href="col.value" target="_blank">{{ col.value }}</el-link>
            </el-form-item>
            <el-form-item :label="col.label || col.key" v-else-if="col.type == 'image'">
              <el-avatar  shape="circle" :size="30" fit="fit" :src="col.value" alt="alt"></el-avatar>
            </el-form-item>
            <el-form-item :label="col.label || col.key" v-else-if="col.type == 'array'">
              <el-col :xs="col.xs || 24" :sm="col.sm || 8">
                <el-form-item :label="subCol.label || subCol.key" v-for="subCol in col.value || []" :key="subCol.key">
                  {{ col.value }}
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item :label="col.label || col.key" v-else>
              {{ col.value }}
            </el-form-item>
          </el-col>
        </el-row>

        <el-divider class="title">token介绍</el-divider>

        <el-row :gutter="10" class="content">
          <el-col   :xs="col.xs || 24" :sm="col.sm || 8" :span="col.span || 8" v-for="col in OtherColumus" :key="col.key">
            <el-form-item :label="col.label || col.key">
              {{ col.value }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider class="title">其他信息</el-divider>

        <el-row :gutter="10" class="content">
          <el-col :xs="col.xs || 24" :sm="col.sm || 8" v-for="col in Other1Columus" :key="col.key">
            <el-form-item :label="col.label || col.key">
              {{ col.value }}
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>

    <div class="footer">
      <el-button v-if="dataInfo.status == 0" type="danger" @click="refuse" :loading="submitLoading">
        拒绝审核
      </el-button>
      <el-button v-if="dataInfo.status == 0" type="primary" @click="submitApproval(1)" :loading="submitLoading">
        审核通过
      </el-button>
    </div>

    <el-dialog title="拒绝原因" :visible.sync="dialogFormVisible">
      <el-form :model="formData" ref="dataForm" label-position="right" label-width="80px">
        <el-form-item label="拒绝原因" prop="remark" :rules="[{ required: true, message: '请填写拒绝原因' }]" style="max-width:100%">
          <el-input style="max-width:100%" v-model="formData.remark" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea" placeholder="请填写拒绝原因" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="danger" @click="submitApproval(2)" :loading="submitLoading">
          审核不通过
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ContainerHeader from '@/components/ContainerHeader'
import { getDetails, verify } from '@/api/token'
import { parseTime } from '@/utils'

const languageTypeOptions = [{ key: 'en', display_name: '英文', tagtype: 'warn' }]

const IconColumus = [
  { label: '货币:', key: 'coin', type: 'string', show: false, value: '' },
  { label: '图标:', key: 'icon', type: 'image', show: false, value: '' },
  { label: '主链:', key: 'chain', type: 'string', show: false, value: '' },
  { label: '合约:', key: 'contract', type: 'string', show: false, value: '' },
  { label: '全名:', key: 'name', type: 'string', show: false, value: '' },
  

  // { label: '浏览器（账户）', key: 'coin', type: 'string', show: false, value: '' },
]

const OtherColumus = [
  { label: '精度:', key: 'decimals', type: 'string', show: false, value: '' },
  { label: '币价:', key: 'price', type: 'string', show: false, value: '' },
  { label: '币价来源:', key: 'price_from', type: 'string', show: false, value: '' },
  { label: '货币介绍:', key: 'abort', span: 24, type: 'string', show: false, value: '' }
]

const Other1Columus = [
  { label: '浏览器（TXID）:', key: 'browserTx', type: 'href', show: false, value: '' },
  { label: '货币介绍:', key: 'abort', type: 'string', show: false, value: '' },
  { label: '白皮书地址:', key: 'whitepaper', type: 'href', show: false, value: '' },
  { label: '工具栏:', key: 'coin', type: 'string', show: false, value: '' }
]

const calendarTypeOptions = [
  { key: 0, display_name: '审核中', tagtype: 'warn' },
  { key: 1, display_name: '审核通过', tagtype: 'success' },
  { key: 2, display_name: '审核拒绝', tagtype: 'danger' }
]
export default {
  name: 'approval_token_detail',
  components: { ContainerHeader },
  data() {
    return {
      languageTypeOptions,
      dataInfo: {
        lang: 'en'
      },
      formData: {
        remark: ''
      },
      submitLoading: false,
      dialogFormVisible: false,

      IconColumus,
      OtherColumus,
      Other1Columus
    }
  },
  computed: {},
  filters: {
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
  created() {
    this.init()
  },
  methods: {
    init() {
      getDetails({
        id: this.$route.params.id
      })
        .then(res => {
          if (!res.data || res.data.length == 0) return
          const data = res.data[0]
          this.dataInfo = data
          this.IconColumus = this.IconColumus.map(v => {
            if (data[v.key]) {
              v.show = true
              v.value = data[v.key]
            }
            return v
          })
          this.OtherColumus = this.OtherColumus.map(v => {
            if (data[v.key]) {
              v.show = true
              v.value = data[v.key]
            }
            return v
          })
        })
        .catch(err => console.error(err))
    },
    async submitApproval(type) {
      if (type == 1) {
        const r = await this.$confirm('确认通过后将在页面中显示改币种，确认审核通过？')
        if (r !== 'confirm') return
      } else {
        await this.$refs['dataForm'].validate()
      }
      this.submitLoading = true
      verify({ id: this.dataInfo.id, status: type, remark: this.formData.remark })
        .then(res => {
          this.init()
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
          this.init()
          this.submitLoading = false
        })
    },
    refuse() {
      this.$nextTick(() => {
        this.formData.remark = ''
        this.$refs['dataForm'].clearValidate()
      })
      this.dialogFormVisible = true
    }
  }
}
</script>
<style lang="scss" scoped>
.tokenDetails {
  padding: 40px;
  .el-form-item {
    margin-bottom: 0px;
  }
  .header {
    widows: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .icon-info {
      display: flex;
      align-items: center;
      .name {
        font-size: 40px;
        margin: 0 5px 0px 15px;
      }
    }
    .lang {
      margin-left: 30px;
    }
  }
  .body {
    .info {
      margin: 30px 0px;
      .title {
        .el-divider__text {
          font-size: 18px;
        }
      }
      .content {
        padding-left: 10px;
      }
    }
  }
  .footer {
    text-align: center;
  }
}
</style>
