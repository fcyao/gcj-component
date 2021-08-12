<template>
  <div ref="chart" style="width:100%;height:100%" />
</template>
<script>
import resize from '@/utils/lib/resize'
import { fixednum } from '@/utils/lib/index'
export default {
  name: 'Treemap',
  mixins: [resize],
  props: {
    chartData: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: ''
    },
    // 图例字典
    chartKey: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartKey: {
      deep: true,
      handler() {
        this.initChart()
      }
    },
    chartData: {
      deep: true,
      handler() {
        this.initChart()
      }
    }
  },
  async mounted() {
    this.initChart()
  },
  methods: {
    initChart() {
      this.chart = this.$echarts.init(
        this.$refs['chart']
      )
      this.chart.hideLoading()
      const options = this.getOptions(this.chartData)
      this.chart.setOption(options, true)
      if (!options.series) {
        this.chart.showLoading({
          text: '暂无数据',
          color: '#ffffff',
          textColor: '#8a8e91',
          maskColor: 'rgba(255, 255, 255, 0)'
        })
      }
    },
    getOptions(chartData) {
      if (!chartData || !chartData.length) {
        return {
          title: {
            text: this.title
          }
        }
      }
      const total = chartData.reduce((prev, cur) => { return cur.value + prev }, 0)
      let newArr = []
      newArr = chartData.map(item => ({
        name: item.name,
        value: fixednum(item.value / total * 100),
        count: item.value
      }))
      chartData = newArr
      const option = {
        title: {
          text: this.title
        },
        color: ['#7685a2', '#BE7B7F', '#4f81bd', '#20cab0', '#bec278', '#f5ad1b'],
        tooltip: {
          formatter: function(params) {
            if (!params.data.name) return ''
            let res = params.name + ':' + params.data.count
            res = res + '(' + params.data.value + '%)'
            return res
          }
        },
        toolbox: {
          feature: {
            dataView: { show: true,
              optionToContent: function(opt) {
                var axisData = opt.series[0].data // 坐标数据
                var series = opt.series // 折线图数据
                var tdHeads = '<td  style="padding: 0 10px">' + opt.title[0].text + '</td>' // 表头
                var tdBodys = '' // 数据
                tdHeads += '<td style="padding: 0 10px">数据</td>'
                var table = '<table  style="margin-left:20px;font-size:14px;text-align:center"><tbody><tr>' + tdHeads + ' </tr>'
                for (var i = 0, l = axisData.length; i < l; i++) {
                  for (var j = 0; j < series.length; j++) {
                    // 组装表数据
                    tdBodys += '<td>' + series[j].data[i].value + '%</td>'
                  }
                  table += '<tr><td style="padding: 0 10px">' + axisData[i].name + '</td>' + tdBodys + '</tr>'
                  tdBodys = ''
                }
                table += '</tbody></table>'
                return table
              }
            },
            saveAsImage: {
              pixelRatio: 2
            },
            restore: {
              show: true
            }
          }
        },
        series: [{
          // name: title,
          breadcrumb: { show: false },
          itemStyle: {
            normal: {
              label: {
                show: true,
                formatter: '{b}:{c}%'
              },
              borderWidth: 1
            },
            emphasis: {
              label: {
                show: true
              }
            }
          },
          type: 'treemap',
          roam: 'false', // 不能缩放平移
          data: chartData
        }]
      }
      return option
    }
  }
}
</script>
