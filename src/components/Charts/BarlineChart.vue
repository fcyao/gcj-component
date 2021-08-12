<template>
  <div ref="chart" style="width:100%;height:100%;min-height: 250px" />
</template>
<script>
import resize from '@/utils/lib/resize'
export default {
  name: 'BarlineChart',
  mixins: [resize],
  props: {
    chartData: {
      type: Object,
      default: () => {}
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(newValue, oldValue) {
        this.initChart()
      }
    },
    loading() {
      if (this.chart) {
        if (this.loading) {
          this.chart.showLoading()
        } else {
          this.chart.hideLoading()
        }
      }
    }
  },
  mounted() {
    this.initChart()
  },
  methods: {
    initChart() {
      this.chart = this.$echarts.init(this.$refs['chart'])
      const options = this.getOptions()
      this.chart.setOption(options, true)
    },
    getOptions() {
      var colorsArr = ['#7685a2', '#BE7B7F', '#1890ff', '#20cab0', '#bec278', '#f5ad1b']
      const option = {
        title: { text: this.chartData.title },
        color: colorsArr,
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          },
          formatter: (seriesData, ticket, callback) => {
            var showHtm = ''
            for (var i = 0; i < seriesData.length; i++) {
              // 名称
              var name = seriesData[i].seriesName
              // x轴名称
              var text = seriesData[i].name
              // 值
              var value = seriesData[i].value
              if (i === 0) {
                showHtm = text + '<br>'
              }
              showHtm += seriesData[i].marker + name + ': ' + value + '<br>'
            }
            return showHtm
          }
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            // magicType: { show: true, type: ['line', 'bar'] },
            // restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        grid: {
          top: '20%',
          left: '2%',
          right: '2%',
          bottom: '5%',
          containLabel: true
        },
        legend: {
          top: '20',
          data: this.chartData.legend
        },
        xAxis: [
          {
            type: 'category',
            data: this.chartData.xAxis,
            axisPointer: {
              // type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: { show: true },
            axisLabel: {
              formatter: '{value} ' + this.chartData.units[0]
            },
            splitLine: { // y轴网格线
              show: false,
              lineStyle: {
                type: 'dashed',
                color: '#7685a230'
              }
            }
          },
          {
            type: 'value',
            axisLine: { show: true },
            axisLabel: {
              formatter: '{value} ' + this.chartData.units[1]
            },
            splitLine: { // y轴网格线
              show: false,
              lineStyle: {
                type: 'dashed',
                color: '#7685a230'
              }
            }
          }
        ],
        series: this.chartData.series
      }
      return option
    }
  }
}
</script>
