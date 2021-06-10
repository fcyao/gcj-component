/*
 * 2021-06-09 09:23:24
 * @LastEditTime: 2021-06-09 11:18:20
 * @FilePath: \gcj-manager-ui\src\stories\Charts\BarlineChart.stories.js
 * @Description: 双轴图
 */
import '@/stories/baseImport'
import BarlineChart from '@/components/Charts/BarlineChart'
export default {
  title: '图表/柱状折线图混合',
  component: BarlineChart
}

const baseComp = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { BarlineChart },
  template:
    '<BarlineChart  v-bind="$props" style="height:400px"/>'
})

export const baseTemp = baseComp.bind({})

baseTemp.args = {
  chartData: {
    'title': 'TESTCHART',
    'legend': ['test', 'test2'],
    'units': ['个', '%'],
    'series': [{ name: 'test', type: 'bar', data: [1, 3, 4] }, { name: 'test2', type: 'line', yAxisIndex: 1, data: [1, 3, 4] }],
    'xAxis': [1, 2, 3]
  }
}
