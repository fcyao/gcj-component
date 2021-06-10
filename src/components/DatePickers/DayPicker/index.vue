<template>
  <el-date-picker
    ref="elpicker"
    v-model="dayvalue"
    value-format="yyyy-MM-dd"
    type="date"
    style="width: 150px"
    :editable="false"
    :clearable="false"
    :picker-options="{disabledDate,firstDayOfWeek:1}"
    placeholder="选择时间"
    :size="size"
    @change="showValue"
  />
</template>
<script>
import { parseTime } from '@/utils/ruoyi'
export default {
  name: 'DayPicker',
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
    },
    size: {
      type: String,
      default: 'small'
    }
  },
  data() {
    return {
      test: [],
      dayvalue: parseTime(new Date(), '{y}-{m}-{d}')
    }
  },
  watch: {
    defaultTime() {
      this.dayvalue = this.defaultTime
    }
  },
  mounted() {
    if (this.defaultTime) {
      this.dayvalue = this.defaultTime
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
      this.$emit('update:defaultTime', this.dayvalue)
    }
  }
}
</script>
