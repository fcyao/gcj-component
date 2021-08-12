<template>
  <div>
    <el-date-picker
      v-model="searchMonth"
      size="small"
      placeholder="请选择月份"
      value-format="yyyy-MM"
      style="width: 150px"
      type="month"
      :editable="false"
      :clearable="false"
      :picker-options="{disabledDate,firstDayOfWeek:1}"
      @change="showValue"
    />
  </div>
</template>
<script>
import { parseTime } from '@/utils/lib/ruoyi'
export default {
  name: 'SingleMonthPicker',
  props: {
    startTime: {
      type: String,
      default: ''
    },
    endTime: {
      type: String,
      default: ''
    },
    defaultTime: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      searchMonth: ''
    }
  },
  watch: {
    defaultTime() {
      this.searchMonth = parseTime(this.defaultTime, '{y}-{m}')
    }
  },
  mounted() {
    this.searchMonth = this.defaultTime ? parseTime(this.defaultTime, '{y}-{m}') : parseTime(new Date(), '{y}-{m}')
    this.showValue()
  },
  methods: {
    disabledDate(time) {
      let startState = false
      let endState = false
      if (this.startTime) {
        if (time.getTime() < new Date(this.parseTime(this.startTime))) {
          startState = true
        }
      }
      if (time.getTime() > new Date(this.endTime)) {
        endState = true
      }
      return startState || endState || time.getTime() > new Date()
    },
    showValue() {
      this.$emit('update:defaultTime', this.searchMonth)
    }
  }
}
</script>
<style scoped lang="scss">
/deep/ .el-range-editor--small .el-range-input {
  position: relative;
  top: -1px;
  right: -2px;
}
</style>
