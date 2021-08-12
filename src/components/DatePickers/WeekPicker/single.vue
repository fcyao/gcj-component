<template>
  <div>
    <el-date-picker
      ref="elpicker"
      v-model="weekvalue"
      type="date"
      style="width: 150px"
      :picker-options="{disabledDate,firstDayOfWeek:1}"
      placeholder="选择周"
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
  name: 'WeekSinglePicker',
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
      type: String,
      default: ''
    },
    weekState: {
      type: String,
      default: '' // old 老系统周划分， 不满一周算一周
    }
  },
  data() {
    return {
      weekvalue: ''
    }
  },
  async mounted() {
    if (!this.defaultTime) {
      this.weekvalue = parseTime(new Date(), '{y}-{m}-{d}')
    } else {
      this.weekvalue = parseTime(this.defaultTime, '{y}-{m}-{d}')
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
      const value = getYearWeek(new Date(this.weekvalue), this.weekState).split(',')
      this.$nextTick(() => {
        this.$refs.elpicker.$el.querySelector('input').value = value[0] + '第' + value[1] + '周'
        this.$refs.elpicker.$forceUpdate()
      })
      this.$emit('update:defaultTime', value.join('-'))
    }
  }
}
</script>
