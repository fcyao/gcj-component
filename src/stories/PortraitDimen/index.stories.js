/*
 * 2021-06-10 15:20:29
 * @LastEditTime: 2021-06-10 15:36:45
 * @FilePath: \gcj-component\src\stories\PortraitDimen\index.stories.js
 * @Description: 
 */
import '@/stories/baseImport'
import PortraitDimen from '@com/PortraitDimen'
export default {
  title: '画像维度选择器/画像维度选择器',
  component: PortraitDimen
}

const PortraitDimenComp = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { PortraitDimen },
  template:
    '<PortraitDimen v-bind="$props"  />'
})

export const PortraitDimenTemp = PortraitDimenComp.bind({})

PortraitDimenTemp.args = {
}
