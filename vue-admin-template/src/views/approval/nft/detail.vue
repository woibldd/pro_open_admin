<template>
  <div class="app-container tokenDetails">
    <!-- <ContainerHeader :title="$route.meta.title" /> -->
    <div class="header">
      <div class="icon-info">

        <el-avatar class="icon" shape="circle"  :size="50" fit="fit" :src="dataInfo.image_url_cdn" alt="alt"></el-avatar>
        <h1 class="symbol">{{ dataInfo.coin }}</h1>
        <div class="name">{{ dataInfo.name }}</div>
        <el-tag class="chain" size="small" type="info" style="margin-right:5px">{{ dataInfo.chain | UpperCase }}链</el-tag>
        <el-tag size="small" type="info" v-if="dataInfo.contract || dataInfo.contract.length == 2">代币</el-tag>
        <el-select v-model="lang" placeholder="语言展示" class="lang" @change="langChange">
          <el-option v-for="item in languageTypeOptions" :key="item.lang" :label="item.lang" :value="item.lang" />
        </el-select>
      </div>
      <div>
        <el-tag :type="dataInfo.status | appovalFilterColor">{{ dataInfo.status | appovalFilter }}</el-tag>
        <el-tag :type="(dataInfo.is_online==1? 1: 2) | appovalFilterColor" style="margin-left:5px">{{ dataInfo.is_online ==1 ? '已上线': '未上线' }}</el-tag>
    
      </div>
    </div>
    <div style="margin-top:30px" v-if="dataInfo.status == 2 && dataInfo.remark">
      <el-alert type="error"> 拒绝原因： {{ dataInfo.remark }} </el-alert>
    </div>
    <el-form class="body" :inline="true" label-position="right">
      <div class="info">
        <el-divider class="title">基本信息</el-divider>
        <!-- <h3 class="title">基本信息</h3> -->
        <!-- <h3 class="title">基本信息</h3> -->
        <el-row :gutter="10" class="content">
          <el-col :xs="col.xs || 24" :sm="col.sm || 6" v-for="col in IconColumus" :key="col.key">
            <el-form-item v-if="col.type == 'href'" :label="col.label || col.key">
              <el-link :href="dataInfo[col.key] || col.value" target="_blank">{{ col.filter ? col.filter(dataInfo[col.key] || col.value) : dataInfo[col.key] || col.value }}</el-link>
            </el-form-item>
            <el-form-item v-else-if="col.type == 'image'" :label="col.label || col.key">
              <el-avatar shape="circle" :size="30" fit="fit" :src="dataInfo[col.key] || col.value" alt="alt"></el-avatar>
            </el-form-item>
            <el-form-item :label="col.label || col.key" v-else>
              {{ col.filter ? col.filter(dataInfo[col.key] || col.value) : dataInfo[col.key] }}
            </el-form-item>
          </el-col>
        </el-row>

        <el-divider class="title">NFT介绍</el-divider>

        <el-row :gutter="10" class="content">
          <el-col :xs="col.xs || 24" :sm="col.sm || 6" :offset="col.offset || 0" v-for="col in OtherColumus" :key="col.key" :style="col.style || {}">
            <el-form-item v-if="col.key == 'price_from'" :label="col.label || col.key" :style="col.Contentstyle || {}">
              {{ dataInfo[col.key] }} <span style="padding-left:5px; color: #8492a6; font-size: 20px">${{ icon_price }}</span>
            </el-form-item>
            <el-form-item v-else :label="col.label || col.key" :style="col.Contentstyle || {}">
              {{ dataInfo[col.key] || col.value }}
            </el-form-item>
          </el-col>
        </el-row>

        <el-divider class="title">其他信息</el-divider>

        <el-row :gutter="10" class="content">
          <el-col :xs="col.xs || 24" :sm="col.sm || 6" v-for="col in Other1Columus" :key="col.key">
            <el-form-item v-if="col.type == 'href'" :label="col.label || col.key">
              <el-link :href="dataInfo[col.key] || col.value" target="_blank">{{ col.filter ? col.filter(dataInfo[col.key] || col.value) : dataInfo[col.key] || col.value }}</el-link>
            </el-form-item>
            <el-form-item v-else-if="col.type == 'image'" :label="col.label || col.key">
              <el-avatar shape="circle" :size="30" fit="fit" :src="dataInfo[col.key] || col.value" alt="alt"></el-avatar>
            </el-form-item>
            <el-form-item :label="col.label || col.key" v-else>
              {{ col.filter ? col.filter(dataInfo[col.key] || col.value) : dataInfo[col.key] }}
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
import { getDetails, verify } from '@/api/nft'
import { parseTime, UpperCase } from '@/utils'

const languageTypeOptions = [{ id: 'en', lang: 'en', tagtype: 'warn' }]

const IconColumus = [
  { label: 'NFT名称:', key: 'title', type: 'string', show: false, value: '' },
  { label: '图标:', key: 'image_url_cdn', type: 'image', show: false, value: '' },
  { label: '主链:', key: 'chain', type: 'string', show: false, value: '', filter: UpperCase },
  { label: '合约:', key: 'contract', type: 'string', show: false, value: '', sm: 24 }
]

const OtherColumus = [
  { label: 'NFT渠道:', key: 'channel', type: 'string', show: false, value: '--' },
  { label: '数量:', key: 'items_number', type: 'string', show: false, value: '' },
  { label: 'introduction:', key: 'introduction', sm: 20, type: 'string', show: false, value: '--' },
  { label: '对应线上collectionId:', key: 'collection_id', type: 'string', show: false, value: '--' }
]

const Other1Columus = [
  { label: '生日：', key: 'birthday_time', type: 'href', show: false, value: '--', filter: parseTime},
  { label: '排序：', key: 'sort', type: 'href', show: false, value: '--' },
  // { label: '是否上线：', key: 'is_online', type: 'href', show: false, value: '' }
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
      lang: 'en',
      dataInfo: {
        multiLanguageList: [],
        contract: ''
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
    },
    UpperCase(val = '') {
      return val.toUpperCase()
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
          if (!res.data) return
          const data = res.data
          this.dataInfo = Object.assign(this.dataInfo, data)

          this.languageTypeOptions = data.multiLanguageList && data.multiLanguageList.length > 0 ? data.multiLanguageList : [{ id: '', lang: 'en', data }]
          const { lang } = this.languageTypeOptions[0]
          this.langChange(lang)
          // this.IconColumus = this.IconColumus.map(v => {
          //   if (data[v.key]) {
          //     v.show = true
          //     v.value = data[v.key]
          //   }
          //   return v
          // })
          // this.OtherColumus = this.OtherColumus.map(v => {
          //   if (data[v.key]) {
          //     v.show = true
          //     v.value = data[v.key]
          //   }
          //   return v
          // })
        })
        .catch(err => console.error(err))
    },
    async langChange(val) {
      const langData = this.languageTypeOptions.find(v => v.lang == val)
      Object.assign(this.dataInfo, { title: '', introduction: ''}, (langData && langData.data) || {})
    },
    async submitApproval(type) {
      if (type == 1) {
        const r = await this.$confirm('确认通过后将在BitKeep后台中显示该NFT，确认审核通过？')
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
        setTimeout(()=> this.$refs['dataForm'].clearValidate())
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
    flex-wrap: wrap;
    .icon-info {
      display: flex;
      align-items: center;
      // justify-content: stretch;
      flex-wrap: wrap;
      .symbol {
        margin-left: 5px;
      }
      .icon{
        min-width: 50px;
      }
      .name {
        margin: 0 10 0 5px;
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
