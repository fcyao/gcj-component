<template>
  <div>
    <el-date-picker
      v-model="searchMonthrange"
      size="small"
      style="width: 240px"
      value-format="yyyy-MM"
      type="monthrange"
      :editable="false"
      :clearable="false"
      range-separator="-"
      start-placeholder="开始月份"
      end-placeholder="结束月份"
      :picker-options="{disabledDate,firstDayOfWeek:1}"
      @change="showValue"
    />
  </div>
</template>
<script>
import { parseTime } from '@/utils/lib/ruoyi'
export default {
  name: 'MonthPicker',
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
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      searchMonthrange: []
    }
  },
  watch: {
    defaultTime() {
      this.searchMonthrange = this.defaultTime
    }
  },
  mounted() {
    // this.showValue()
    if (this.defaultTime.length === 0) {
      this.searchMonthrange = [parseTime(new Date(), '{y}-{m}'), parseTime(new Date(), '{y}-{m}')]
    } else {
      this.searchMonthrange = this.defaultTime
    }
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
      this.$emit('update:defaultTime', this.searchMonthrange)
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
