/*
 * 2021-06-10 16:37:16
 * @LastEditTime: 2021-06-15 15:27:19
 * @FilePath: \gcj-component\src\stories\SelectPicker\index.stories.js
 * @Description: 
 */

import SelectPicker from '@gcj-component/select-picker'
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
