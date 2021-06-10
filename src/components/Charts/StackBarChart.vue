<template>
  <div ref="chart" style="width:100%;height:100%;min-height: 250px" />
</template>
<script>
import resize from '@/utils/charts/mixins/resize'
export default {
  name: 'StackBarChart',
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
      handler() {
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
          }
        },
        grid: {
          top: '20%',
          left: '2%',
          right: '7%',
          bottom: '5%',
          containLabel: true
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            // magicType: { show: true, type: ['line', 'bar'] },
            // restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        legend: {
          top: '20',
          data: this.chartData.legend
        },
        xAxis: [
          {
            name: this.chartData.units[0],
            type: 'category',
            data: this.chartData.xAxis,
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            name: this.chartData.units[1],
            axisLine: { show: true },
            type: 'value'
          }
        ],
        series: this.chartData.series
      }
      return option
    }
  }
}
</script>
