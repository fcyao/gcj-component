import '@/stories/baseImport'
import SelectPicker from '@/components/SelectPicker'
export default {
  title: '下拉组件/下拉选择',
  component: SelectPicker
}

const SelectPickerComp = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { SelectPicker },
  template:
    '<SelectPicker v-bind="$props"  />'
})

export const SelectPickerTemp = SelectPickerComp.bind({})

SelectPickerTemp.args = {
  dict: [
    { dictLabel: '广材网', dictValue: '-100002' },
    { dictLabel: '广材助手', dictValue: '-100000' }]
}
