<template>
  <div class="container-header">
        <h3>{{title}}</h3>
  </div>
</template>

<script>
export default {
  name: 'containerheader',
  props: {
      title:{
          type:String,
          default:""
      }
  },
  data() {
    return {}
  },

  created() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.container-header {
    // padding: 10px 0;
    border-bottom: 1px solid #ccc;
    margin-bottom: 20px;
}
</style>
