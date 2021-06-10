import '@/stories/baseImport'
import SingleMonthPicker from '@/components/DatePickers/MonthPicker/single'
export default {
  title: '日期组件/单选月',
  component: SingleMonthPicker
}

const SingleMonthPickerComp = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { SingleMonthPicker },
  template:
    '<SingleMonthPicker v-bind="$props"  />'
})

export const SingleMonthPickerTemp = SingleMonthPickerComp.bind({})
