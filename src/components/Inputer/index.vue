<!--
 * 2021-06-10 16:37:16
 * @LastEditTime: 2021-06-15 14:46:19
 * @FilePath: \gcj-component\src\components\Inputer\index.vue
 * @Description: 
-->
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
