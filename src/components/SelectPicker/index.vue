<template>
  <el-select
    :value="selectValue"
    v-bind="$attrs"
    :style="{'width': width }"
    filterable
    :size="size"
    :multiple="multiple"
    :placeholder="placeholder"
    v-on="$listeners"
    @change="changeHandle"
  >
    <el-option
      v-for="item in dict"
      :key="item.dictValue"
      :value="item[dictValue]"
      :label="item[dictLabel]"
    />
  </el-select>
</template>
<script>
export default {
  name: 'SelectPicker',
  props: {
    dict: {
      type: Array,
      default: () => []
    },
    multiple: {
      type: Boolean,
      default: false
    },
    dictValue: {
      type: String,
      default: 'dictValue'
    },
    dictLabel: {
      type: String,
      default: 'dictLabel'
    },
    width: {
      type: String,
      default: '180px'
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    defaultValue: {
      type: [String, Number, Array],
      default: ''
    },
    size: {
      type: String,
      default: 'small'
    }
  },
  data() {
    return {
      selectValue: ''
    }
  },
  watch: {
    defaultValue(val) {
      this.selectValue = val
    },
    dictLabel() {
      this.$forceUpdate()
    }
  },
  created() {
    this.selectValue = this.defaultValue
  },
  methods: {
    changeHandle(e) {
      this.selectValue = e
      this.$emit('update:defaultValue', e)
      this.$emit('changeHandle', e)
    }
  }
}
</script>
