<template>
  <div :class="{ 'container-footer': true }" :style="style">
    <div class="container-footer-place"></div>
    <div  id="container-footer-content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContainerFooter',
  props: {
    fixed: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      style: {
        height: '100px'
      }
    }
  },

  created() {},
  methods: {},
  async mounted() {
    await this.$nextTick()
    const { width, height } = this.$el.querySelector('#container-footer-content').getBoundingClientRect()
    this.style = {
      height: `${height}px`
    }
  }
}
</script>

<style lang="scss" scoped>
.container-footer {
  // padding: 10px 0;
  border-top: 1px solid #ccc;
}
.fixed {
  background: #fff;
  position:absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 99;
}
</style>
