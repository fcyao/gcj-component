<template>
  <div>
    <el-date-picker
      v-model="searchDayrange"
      size="small"
      :style="{width}"
      v-bind="$attrs"
      :type="dateType"
      :editable="false"
      :clearable="false"
      range-separator="到"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="{disabledDate,firstDayOfWeek:1,shortcuts:shortShow?shortcuts:false}"
      :disabled="disabled"
      @change="showValue"
      v-on="$listeners"
    />
  </div>
</template>
<script>
export default {
  name: 'DayRangeShortcuts',
  props: {
    shortShow: {
      type: Boolean,
      default: true
    },
    endState: {
      type: Boolean,
      default: true
    }, // 当前时间后是否可选
    dateType: {
      type: String,
      default: 'daterange'
    },
    startTime: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '240px'
    },
    defaultTime: {
      type: Array,
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      searchDayrange: [],
      endTime: new Date(new Date() - 24 * 60 * 60 * 1000),
      shortcuts: [{
        text: '昨日',
        onClick(picker) {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24)
          end.setTime(end.getTime() - 3600 * 1000 * 24)
          picker.$emit('pick', [start, end])
        }
      },
      { text: new Date().getDay() === 1 ? '' : '本周',
        onClick(picker) {
          const end = new Date(new Date() - 24 * 60 * 60 * 1000)
          let start = new Date()
          start = getFirstDayOfWeek(start)
          picker.$emit('pick', [start, end])
          function getFirstDayOfWeek(date) {
            var day = date.getDay() || 7
            return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1 - day)
          }
        }
      },
      {
        text: new Date().getDate() === 1 ? '' : '本月',
        onClick(picker) {
          const end = new Date(new Date() - 24 * 60 * 60 * 1000)
          const start = new Date()
          start.setDate(1)
          picker.$emit('pick', [start, end])
        }
      },
      {
        text: '上月',
        onClick(picker) {
          const oDate = new Date()
          var year = oDate.getFullYear()
          var month = oDate.getMonth()
          var start, end
          if (month === 0) {
            year--
            start = new Date(year, 11, 1)
            end = new Date(year, 11, 31)
          } else {
            start = new Date(year, month - 1, 1)
            end = new Date(year, month, 0)
          }

          picker.$emit('pick', [start, end])
        }
      },
      {
        text: (new Date().getDate() === 1 && new Date().getMonth() === 0) ? '' : '本年',
        onClick(picker) {
          const end = new Date(new Date() - 24 * 60 * 60 * 1000)
          const start = new Date()
          start.setMonth(0)
          start.setDate(1)
          picker.$emit('pick', [start, end])
        }
      }]
    }
  },
  watch: {
    defaultTime() {
      this.searchDayrange = this.defaultTime
    }
  },
  mounted() {
    this.searchDayrange = this.defaultTime
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
      if ((time.getTime() > new Date(this.endTime)) && this.endState) {
        endState = true
      }
      return startState || endState
    },
    showValue() {
      this.$emit('update:defaultTime', this.searchDayrange)
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
/deep/ .el-range-separator {
  position: relative;
  top: 1px;
  right: -2px;
}
</style>
