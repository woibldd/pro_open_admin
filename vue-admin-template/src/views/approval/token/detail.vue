<template>
  <div class="app-container">
    <el-form>
        
      <el-form-item :label="col.label" v-for="col in columus" :key="col.key">
              {{col.value}}
      </el-form-item>
      <el-form-item label="语言展示">
        <el-select v-model="info.lang" placeholder="语言展示"  class="filter-item" >
          <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name + '(' + item.key + ')'" :value="item.key" />
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getDetails } from '@/api/token'
import { parseTime } from '@/utils'

const calendarTypeOptions = [
  { key: "en", display_name: '英文', tagtype: 'warn' }
]

const columus = [
  { label:"", key:"", type:"string" , show: false, value:""}
]
export default {
  name: 'approval_token_detail',

  filters: {},
  created() {
    getDetails({
      id:this.$route.params.id
    }).then(response => {
      console.log({ response })
    }).catch(err=>console.error(err))
  },
  data() {
    return {
      calendarTypeOptions,
      info:{
        lang:"en"
      },
      columus,
    }
  },
  created() {

  },
  methods: {}
}
</script>
