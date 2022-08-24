<template>
  <div class="app-container tokenDetails"> 
    <!-- <ContainerHeader :title="$route.meta.title" /> -->
    <div class="header">
      <div class="icon-info">
        <el-avatar class="icon" shape="circle" :size="50" fit="fit" :src="dataInfo.icon" alt="alt"></el-avatar>
        <h1 class="symbol">{{ dataInfo.coin }}</h1>
        <div class="name">{{ dataInfo.name }}</div>
        <el-tag class="chain" size="small" type="info" style="margin-right:5px">{{ dataInfo.chain | UpperCase }}链</el-tag>
        <el-tag size="small" type="info" v-if="dataInfo.contract || dataInfo.contract.length == 2">代币</el-tag>
        <el-select v-model="lang" placeholder="语言展示" class="lang" @change="langChange">
          <el-option v-for="item in languageTypeOptions" :key="item.lang" :label="getLangTitle(item.lang)" :value="item.lang" />
        </el-select>
      </div>
      <div>
        <el-tag :type="dataInfo.status | appovalFilterColor">{{ dataInfo.status | appovalFilter }}</el-tag>
        <el-tag :type="(dataInfo.is_online == 1 ? 1 : 2) | appovalFilterColor" style="margin-left:5px">{{ dataInfo.is_online == 1 ? '已上线' : '未上线' }}</el-tag>
      </div>
    </div>
    <div style="margin-top:30px" v-if="dataInfo.status == 2 && dataInfo.remark">
      <el-alert type="error"> 拒绝原因： {{ dataInfo.remark }} </el-alert>
    </div>
    <el-form class="body">
      <div class="info">
        <el-divider class="title">基本信息</el-divider>
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

        <el-divider class="title">token介绍</el-divider>

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

        <el-divider class="title" v-if="Tools.length > 0">tools工具</el-divider>

        <el-row :gutter="10" class="content" v-for="row in Tools" :key="row.id">
          <el-col :xs="24" :sm="8">
            <el-form-item label="工具名称">
              {{ row.title || '--' }}
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="8">
            <el-form-item label="图标链接">
              <!-- <el-avatar :title="row.icon" shape="circle" :size="30" fit="fit" @error="()=>row.error=true" v-show="!row.error"  :src="row.icon" alt="alt"></el-avatar> -->
              <a :href="row.icon">{{row.icon}}</a>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="8">
            <el-form-item label="URL">
              <el-link v-if="row.url" :href="row.url" target="_blank"> {{ row.url }}</el-link>
              <span v-else>--</span>
            </el-form-item>
          </el-col>
        </el-row>

        <el-divider class="title">其他信息</el-divider>
        <el-row :gutter="10" class="content">
          <el-col :xs="col.xs || 24" :sm="col.sm || 8" v-for="col in Other1Columus" :key="col.key">
            <el-form-item v-if="col.type == 'href'" :label="col.label || col.key">
              <el-link v-if="dataInfo[col.key]" :href="dataInfo[col.key]" target="_blank">{{ col.filter ? col.filter(dataInfo[col.key]) : dataInfo[col.key] }}</el-link>
              <span v-else>--</span>
            </el-form-item>
            <el-form-item v-else :label="col.label || col.key">
              {{ dataInfo[col.key] || col.value || '--' }}
            </el-form-item>
          </el-col>
        </el-row>

        <el-divider class="title">可修改信息</el-divider>

        <el-form-item label="币价来源：">
          <el-select v-model="dataInfo.price_from" :disabled="dataInfo.status != 0" placeholder="价格来源（auto）" class="filter-item" @change="price_from_change">
            <el-option v-for="item in price_from_list" :key="item.key" :value="item.key">
              <span style="float: left">{{ item.key }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">${{ item.value }}</span>
            </el-option>
          </el-select>
        </el-form-item>
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
import { getDetails, verify, getPrice, update, getMultiLanguageList } from '@/api/token'
import { parseTime, UpperCase } from '@/utils'
import {getChainName} from '@/utils/chain-help'
import { BigNumber } from 'bignumber.js'
const languageTypeOptions = [{ id: 'en', lang: 'en', tagtype: 'warn' }]

const IconColumus = [
  { label: 'Token 名称:', key: 'name', type: 'string', show: false, value: '' },
  { label: '币名(标识):', key: 'coin', type: 'string', show: false, value: '' },
  { label: '图标:', key: 'icon', type: 'image', show: false, value: '' },
  { label: '主链:', key: 'chain', type: 'string', show: false, value: '', filter: getChainName },
  { label: '发布日期:', key: 'issue_date', type: 'date', sm: 6, show: false, value: '' ,filter: (val) => parseTime(val, '{y}-{m}-{d}')},
  { label: '合约:', key: 'contract', type: 'string', sm: 16, show: false, value: '' }

  // { label: '浏览器（账户）', key: 'coin', type: 'string', show: false, value: '' },
]

const OtherColumus = [
  { label: '总供应量:', key: 'supply_total', type: 'string', show: false, value: '--' },
  { label: '精度:', key: 'decimals', type: 'string', show: false, value: '--' },
  // { label: '币价:', key: 'price', type: 'string', show: false, value: '--' },
  { label: '币价来源:', key: 'price_from', type: 'string', show: false, value: '--' },

  { label: '货币介绍:', key: 'about', sm: 20, type: 'string', show: false, value: '--' }
]

const Other1Columus = [
  { label: '白皮书:', key: 'whitepaper', type: 'href', show: false, value: '' },
  { label: 'Twitter:', key: 'twitter', type: 'href', show: false, value: '' },
  { label: '官网:', key: 'website', type: 'href', show: false, value: '' },
  { label: 'GitHub:', key: 'github', type: 'href', show: false, value: '' },
  { label: 'Telegram:', key: 'telegram', type: 'href', show: false, value: '' },
  { label: 'Facebook:', key: 'facebook', type: 'href', show: false, value: '' },
  { label: 'email:', key: 'email', type: 'string', show: false, value: '' },
  { label: '社区信息:', key: 'community_info', type: 'string', show: false, value: '' },
  { label: '推荐人:', key: 'recommender', type: 'string', show: false, value: '' }
]

const calendarTypeOptions = [
  { key: 0, display_name: '审核中', tagtype: 'warn' },
  { key: 1, display_name: '审核通过', tagtype: 'success' },
  { key: 2, display_name: '审核拒绝', tagtype: 'danger' }
]


const langTypes = [
  { value: 'en', name: '英语' }, 
  { value: 'zh', name: '简体中文'},
  { value: 'zh_tw', name: '繁体中文' }, 
  { value: 'ko', name: '韩语' }, 
  { value: 'ja', name: '日本語' }, 
  { value: 'vi', name: '越南语' }, 
  { value: 'tr', name: '土耳其' }, 
  { value: 'es_la', name: '拉丁美语' },
  { value: 'id', name: '印度尼西亚' },
  { value: 'hi', name: '印地语' },
  { value: 'ar', name: '阿拉伯语'},
  { value: 'pt', name: '葡萄牙语' }]

export default {
  name: 'approval_token_detail',
  components: { ContainerHeader },
  data() {
    return {
      languageTypeOptions,
      price_from_list: [],
      lang: 'en',
      oDataInfo: {},
      dataInfo: {
        multiLanguageList: [],
        contract: '',
        price_from: 'auto'
      },
      formData: {
        remark: ''
      },
      submitLoading: false,
      dialogFormVisible: false,

      IconColumus,
      OtherColumus,
      Other1Columus,
      Tools: [],
      multiLanguageList: []
    }
  },
  computed: {
    icon_price() {
      const { value } = this.price_from_list.find(v => v.key == this.dataInfo.price_from) || { value: 0 }
      return BigNumber(value || 0).toFixed()
    }
  },
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
    getLangTitle(key) {
      return (langTypes.find(item => item.value == key) || {}).name
    },
    init() {
      getDetails({
        id: this.$route.params.id
      })
        .then(res => {
          if (!res.data) return
          const data = res.data
          this.oDataInfo = data
          this.dataInfo = Object.assign(this.dataInfo, data)

          // this.languageTypeOptions = data.multiLanguageList && data.multiLanguageList.length > 0 ? data.multiLanguageList : [{ id: '', lang: 'en', data }]
          // const { lang } = this.languageTypeOptions[0]
          // this.langChange(lang)
          this.getPrice()
          clearInterval(this.timer)
          this.timer = setInterval(() => {
            this.getPrice()
          }, 5000)

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
          //  this.Other1Columus = this.Other1Columus.map(v => {
          //   if (data[v.key]) {
          //     v.show = true
          //     v.value = data[v.key]
          //   }
          //   return v
          // })
          // this.tools = this.tools.map(v => {
          //   if (data[v.key]) {
          //     v.show = true
          //     v.value = data[v.key]
          //   }
          //   return v
          // })
        })
        .catch(err => console.error(err))

      getMultiLanguageList({id: this.$route.params.id})
        .then(res => {
          if (!res.data) return
          // console.log(res.data)
          this.languageTypeOptions = res.data  
          const { lang } = this.languageTypeOptions[0]
          this.langChange(lang)
        })

      // getChainList().then(res => {
      //   console.log({res})
      // })
    },
    async langChange(val) {
      const langData = this.languageTypeOptions.find(v => v.lang == val)
      Object.assign(this.dataInfo, { abort: '', name: '', whitepaper: '', tools: [] }, (langData && langData.data) || {})
      // console.log({langData} , this.dataInfo)
      this.Tools =  this.dataInfo.tools || []
    },
    async price_from_change(val) {
      console.log({ val })
    },
    async getPrice() {
      const { data, status } = await getPrice({
        currency: 'usdt',
        symbol: this.dataInfo.coin,
        chain: this.dataInfo.chain,
        contract: this.dataInfo.contract
      }).catch(err => ({ status: 5000 }))
      if (status == 0) {
        this.price_from_list = Object.entries(data).map(([key, value]) => ({ key: key == 'all' ? 'auto' : key, value }))
      }
    },
    async submitApproval(type) {
      if (type == 1) {
        const r = await this.$confirm('确认通过后将在BitKeep后台中显示该币种，确认审核通过？')
        if (r !== 'confirm') return
      } else {
        await this.$refs['dataForm'].validate()
      }
      if (type == 1 && this.oDataInfo.price_from != this.dataInfo.price_from) {
        await update({ id: this.dataInfo.id, price_from: this.dataInfo.price_from }).catch(err => {
          this.$message.error(err)
        })
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
        setTimeout(() => this.$refs['dataForm'].clearValidate())
      })
      this.dialogFormVisible = true
    }
  },
  beforeDestroy() {
    clearInterval(this.timer)
  }
}
</script>
<style lang="scss" scoped>
.tokenDetails {
  padding: 40px;
  .el-form-item {
    margin-bottom: 0px;
    height: 80px;
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
      justify-content: stretch;
      flex-wrap: wrap;
      .symbol {
        margin-left: 5px;
      }
      .icon {
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
      // margin: 30px 0px;
      .title {
        .el-divider__text {
          font-size: 18px;
        }
      }
      .content {
        padding-left: 10px;
        ::v-deep .el-form-item__content {
          overflow: hidden;
        }
        ::v-deep .el-form-item__content {
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap; 
          .el-link {
            width: 100%;
          }
          .el-link--inner {
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap; 
          }
        }
      }
    }
  }
  .footer {
    text-align: center;
  }
}
</style>

 