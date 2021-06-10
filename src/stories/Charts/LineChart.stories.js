/*
 * 2021-06-09 09:23:24
 * @LastEditTime: 2021-06-09 11:11:28
 * @FilePath: \gcj-manager-ui\src\stories\Charts\LineChart.stories.js
 * @Description: 折线图
 */
import '@/stories/baseImport'
import LineChart from '@/components/Charts/LineChart'
export default {
  title: '图表/折线图',
  component: LineChart
}

const baseComp = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { LineChart },
  template:
    '<LineChart  v-bind="$props" style="height:400px"/>'
})

export const baseTemp = baseComp.bind({})

baseTemp.args = {
  chartData: {
    'title': 'TESTCHART',
    'legend': ['test'],
    'units': ['个'],
    'series': [{ name: 'test', type: 'bar', data: [1, 3, 4] }],
    'xAxis': [1, 2, 3]
  }
}
