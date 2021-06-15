/*
 * 2021-05-12 14:14:28
 * @LastEditTime: 2021-06-15 14:31:26
 * @FilePath: \gcj-component\src\stories\Inputer\index.stories.js
 * @Description:输入组件
 */
// import '@/stories/baseImport'
import Inputer from '@gcj-component/inputer'
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
  components: {
    Inputer
  },
  template:
    '<Inputer v-bind="$props" v-model="test" />'
})

export const InputerTemp = InputerComp.bind({})

InputerTemp.args = {
}
