import '@/stories/baseImport'
import YearmonthPicker from '@/components/DatePickers/YearmonthPicker'
export default {
  title: '日期组件/按年选首月固定',
  component: YearmonthPicker
}

const YearmonthPickerComp = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { YearmonthPicker },
  template:
    '<YearmonthPicker v-bind="$props"  />'
})

export const YearmonthPickerTemp = YearmonthPickerComp.bind({})
