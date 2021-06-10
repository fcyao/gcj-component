import '@/stories/baseImport'
import DayPicker from '@/components/DatePickers/DayPicker'
export default {
  title: '日期组件/单选日',
  component: DayPicker
}

const DayPickerComp = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { DayPicker },
  template:
    '<DayPicker  v-bind="$props" />'
})

export const DayPickerTemp = DayPickerComp.bind({})

DayPickerComp.args = {
  size: 'mini'
}
