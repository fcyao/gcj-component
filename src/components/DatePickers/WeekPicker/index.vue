<template>
  <div>
    <el-date-picker
      ref="elpicker"
      v-model="weekvalue"
      type="daterange"
      style="width: 240px"
      :picker-options="{disabledDate,firstDayOfWeek:1}"
      start-placeholder="开始周"
      end-placeholder="结束周"
      :editable="false"
      :clearable="false"
      size="small"
      @change="showValue"
    />
  </div>
</template>
<script>
import { getYearWeek } from '@/utils/lib/index'
import { parseTime } from '@/utils/lib/ruoyi'
export default {
  name: 'WeekPicker',
  components: {
  },
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
      weekvalue: []
    }
  },
  async mounted() {
    if (this.defaultTime.length === 0) {
      this.weekvalue = [parseTime(new Date(), '{y}-{m}-{d}'), parseTime(new Date(), '{y}-{m}-{d}')]
    } else {
      this.weekvalue = [parseTime(this.defaultTime[0], '{y}-{m}-{d}'), parseTime(this.defaultTime[1], '{y}-{m}-{d}')]
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
      const value0 = getYearWeek(new Date(this.weekvalue[0])).split(',')
      const value1 = getYearWeek(new Date(this.weekvalue[1])).split(',')
      this.$nextTick(() => {
        this.$refs.elpicker.displayValue[0] = value0[0] + '第' + value0[1] + '周'
        this.$refs.elpicker.displayValue[1] = value1[0] + '第' + value1[1] + '周'
        this.$refs.elpicker.$forceUpdate()
      })
      this.$emit('update:defaultTime', [value0.join('-'), value1.join('-')])
    }
  }
}
</script>
