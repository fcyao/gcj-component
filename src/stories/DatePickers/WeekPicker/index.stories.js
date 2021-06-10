import '@/stories/baseImport'
import WeekPicker from '@/components/DatePickers/WeekPicker'
export default {
  title: '日期组件/多选周',
  component: WeekPicker
}

const WeekPickerComp = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WeekPicker },
  template:
    '<WeekPicker v-bind="$props"  />'
})

export const WeekPickerTemp = WeekPickerComp.bind({})
