import '@/stories/baseImport'
import WeekSinglePicker from '@/components/DatePickers/WeekPicker/single'
export default {
  title: '日期组件/单选周',
  component: WeekSinglePicker
}

const WeekSinglePickerComp = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WeekSinglePicker },
  template:
    '<WeekSinglePicker v-bind="$props"  />'
})

export const WeekSinglePickerTemp = WeekSinglePickerComp.bind({})
