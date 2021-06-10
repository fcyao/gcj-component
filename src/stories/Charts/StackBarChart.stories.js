/*
 * 2021-06-09 09:23:24
 * @LastEditTime: 2021-06-09 11:18:01
 * @FilePath: \gcj-manager-ui\src\stories\Charts\StackBarChart.stories.js
 * @Description:柱状堆叠图
 */
import '@/stories/baseImport'
import StackBarChart from '@/components/Charts/StackBarChart'
export default {
  title: '图表/堆叠图混合',
  component: StackBarChart
}

const baseComp = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { StackBarChart },
  template:
    '<StackBarChart  v-bind="$props" style="height:400px"/>'
})

export const baseTemp = baseComp.bind({})

baseTemp.args = {
  chartData: {
    title: 'TESTCHART',
    legend: ['test1', 'test2', 'test3'],
    units: ['个'],
    xAxis: ['已转化', '未转化'],
    series: [
      {
        name: 'test1',
        type: 'bar',
        stack: 'A',
        data: [1, 2, 3],
        label: {
          show: true,
          position: ''
        }
      },
      {
        name: 'test2',
        type: 'bar',
        stack: 'A',
        data: [4, 5, 6],
        label: {
          show: true,
          position: ''
        }
      },
      {
        name: 'test3',
        type: 'bar',
        stack: 'A',
        data: [7, 5, 6],
        label: {
          show: true,
          position: ''
        }
      }
    ]
  }
}
