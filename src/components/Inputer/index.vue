<template>
  <el-input
    :placeholder="placeholder"
    maxlength="100"
    :clearable="clearable"
    v-bind="$attrs"
    :style="{width}"
    :size="size"
    v-on="$listeners"
  />
</template>
<script>
export default {
  name: 'Inputer',
  props: {
    width: {
      type: String,
      default: '180px'
    },
    clearable: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: String,
      default: '请输入'
    },
    size: {
      type: String,
      default: 'small'
    }
  }
}
</script>
<style scoped lang="scss">
/deep/ [type="number"]::-webkit-inner-spin-button, [type="number"]::-webkit-outer-spin-button {
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
}
</style>
