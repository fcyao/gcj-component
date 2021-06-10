<template>
  <!-- 时间选择框起始月固定为当年1月，终止月可选 -->
  <div>
    <el-date-picker
      ref="elpicker"
      v-model="searchMonth"
      size="small"
      style="width: 240px"
      value-format="yyyy-MM"
      type="month"
      :editable="false"
      :clearable="false"
      :picker-options="{disabledDate,firstDayOfWeek:1}"
      @change="showValue"
    />
  </div>
</template>
<script>
export default {
  name: 'YearmonthPicker',
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
      this.searchMonth = this.defaultTime
      this.showValue()
    }
  },
  mounted() {
    // this.showValue()
    if (this.defaultTime.length === 0) {
      this.searchMonth = this.parseTime(new Date(), '{y}-{m}')
    } else {
      this.searchMonth = this.defaultTime
    }
    this.showValue()
  },
  methods: {
    disabledDate(time) {
      let startState = false
      let endState = false
      if (time.getTime() < new Date(this.startTime)) {
        startState = true
      }
      if (time.getTime() > new Date(this.endTime)) {
        endState = true
      }
      return startState || endState || time.getTime() > new Date()
    },
    showValue() {
      this.$nextTick(() => {
        this.$refs.elpicker.$el.querySelector('input').value = new Date(this.searchMonth).getFullYear() + '-01' + '      -     ' + this.searchMonth
        this.$refs.elpicker.$forceUpdate()
      })
      this.$emit('update:defaultTime', this.searchMonth)
    }
  }
}
</script>
<style scoped lang="scss">
/deep/ .el-input--small .el-input__inner {
  text-align: center;
  position: relative;
  right: -1px;
}
/deep/ .el-icon-date:before {
  font-size: 14px;
}
</style>
