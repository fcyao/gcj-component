/*
 * 2021-05-12 14:14:28
 * @LastEditTime: 2021-06-09 11:44:39
 * @FilePath: \gcj-manager-ui\src\stories\Inputer\index.stories.js
 * @Description:输入组件
 */
import '@/stories/baseImport'
export default {
  title: '输入组件/输入组件',
  argTypes: {
    size: { control: { type: 'select', options: ['small', 'medium', 'large'] }}
  }
}

const InputerComp = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  data() {
    return { test: '' }
  },
  template:
    '<Inputer v-bind="$props" v-model="test" />'
})

export const InputerTemp = InputerComp.bind({})

InputerTemp.args = {
}
