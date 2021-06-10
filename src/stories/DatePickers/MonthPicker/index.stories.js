import '@/stories/baseImport'
import MonthPicker from '@/components/DatePickers/MonthPicker'
export default {
  title: '日期组件/多选月',
  component: MonthPicker
}

const MonthPickerComp = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { MonthPicker },
  template:
    '<MonthPicker v-bind="$props"  />'
})

export const MonthPickerTemp = MonthPickerComp.bind({})
