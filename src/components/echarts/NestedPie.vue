<template>
  <div ref="chart" style="width:100%;height:100%" />
</template>
<script>
import resize from '@/utils/charts/mixins/resize'
export default {
  name: 'NestedPie',
  mixins: [resize],
  props: {
    chartData: {
      type: Object,
      default: () => {}
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
      if (!chartData || !Object.keys(chartData).length) {
        return {
          title: {
            text: this.title
          }
        }
      }
      const option = {
        title: {
          text: this.title
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        color: ['#7685a2', '#BE7B7F', '#4f81bd', '#20cab0', '#bec278', '#f5ad1b', '#1890ff'],
        toolbox: {
          feature: {
            dataView: {
              show: true
            },
            saveAsImage: {
              pixelRatio: 2
            },
            restore: {
              show: true
            }
          }
        },
        series: [
          {
            name: this.title,
            type: 'pie',
            selectedMode: 'single',
            radius: [0, '30%'],
            label: {
              position: 'inner',
              fontSize: 14
            },
            labelLine: {
              show: false
            },
            data: chartData[Object.keys(chartData)[1]]
          },
          {
            name: this.title,
            type: 'pie',
            radius: ['45%', '60%'],
            labelLine: {
              length: 30
            },
            label: {
              formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
              backgroundColor: '#F6F8FC',
              borderColor: '#8C8D8E',
              borderWidth: 1,
              borderRadius: 4,
              rich: {
                a: {
                  color: '#6E7079',
                  lineHeight: 22,
                  align: 'center'
                },
                hr: {
                  borderColor: '#8C8D8E',
                  width: '100%',
                  borderWidth: 1,
                  height: 0
                },
                b: {
                  color: '#4C5058',
                  fontSize: 14,
                  fontWeight: 'bold',
                  lineHeight: 33
                },
                per: {
                  color: '#fff',
                  backgroundColor: '#4C5058',
                  padding: [3, 4],
                  borderRadius: 4
                }
              }
            },
            data: chartData[Object.keys(chartData)[0]]
          }
        ]
      }
      return option
    }
  }
}
</script>
