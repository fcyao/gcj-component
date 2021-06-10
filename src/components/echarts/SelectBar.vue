<template>
  <div style="width:100%;height:100%;position: relative">
    <SelectPicker v-show="chartData" style="position:absolute;right: 100px;z-index: 2" size="mini" :default-value.sync="selectValue" :dict="dicts" />
    <div ref="chart" style="width:100%;height:100%" />
  </div>
</template>
<script>
import resize from '@/utils/charts/mixins/resize'
import _ from 'lodash'
export default {
  name: 'Bar',
  mixins: [resize],
  props: {
    chartData: {
      type: Object,
      default: () => {}
    },
    units: {
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
      chart: null,
      selectValue: 1
    }
  },
  computed: {
    dicts() {
      let res = []
      res = this.units.map((item, key) => {
        return {
          dictValue: key + 1,
          dictLabel: item
        }
      })
      return res
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
    },
    selectValue() {
      this.chart.dispose()
      this.initChart()
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
      let options = {}
      try {
        options = this.getOptions(this.chartData.dataList)
      } catch (e) {
        options = {}
      }
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
      let xSeries = []
      let ySeries1 = []
      let ySeries2 = []
      let ySeries = []
      let yAxisName = ''
      if (!chartData || !chartData.length) {
        return {
          title: {
            text: this.title
          }
        }
      }
      if (this.selectValue === 1) {
        chartData = _.sortBy(chartData, (o) => -o.usePv)
      } else {
        chartData = _.sortBy(chartData, (o) => -o.useUv)
      }
      xSeries = chartData.map(item => item.fnModule)
      ySeries1 = chartData.map(item => item.usePv)
      ySeries2 = chartData.map(item => item.useUv)
      if (this.selectValue === 1) {
        ySeries = ySeries1
        yAxisName = this.units[0]
      } else {
        ySeries = ySeries2
        yAxisName = this.units[1]
      }
      // const xName = this.units.length ? this.units[1] : ''
      function RetainedDecimalPlaces(num, del) { // 值：num 小数位：del
        if (del !== 0) {
          num = parseFloat(num).toFixed(del) // 天花板函数保留小数并四舍五入
        }
        var source = String(num).split('.')// 按小数点分成2部分
        source[0] = source[0].replace(new RegExp('(\\d)(?=(\\d{3})+$)', 'ig'), '$1,')// 只将整数部分进行都好分割
        return source.join('.')// 再将小数部分合并进来
      }
      const option = {
        title: {
          text: this.title
        },
        tooltip: {
          formatter: function(params) {
            var count = 0
            for (var i = 0; i < ySeries.length; i++) {
              count = count + ySeries[i]
            }
            let res = params.name + ':' + RetainedDecimalPlaces(params.data, 0)
            res = res + '(' + ((params.data / count) * 100).toFixed(2) + '%)'
            return res
          }
        },
        color: ['#7685a2', '#BE7B7F', '#4f81bd', '#20cab0', '#bec278', '#f5ad1b', '#1890ff'],
        grid: {
          top: '20%',
          left: '5%',
          right: '5%',
          bottom: '10%',
          containLabel: true
        },
        legend: {
          top: '40',
          data: [yAxisName]
        },
        toolbox: {
          feature: {
            dataView: {
              readOnly: true
            },
            saveAsImage: {
              pixelRatio: 2
            },
            restore: {
              show: true
            }
          }
        },
        xAxis: {
          type: 'category',
          data: xSeries,
          axisLabel: {
            interval: 0,
            rotate: 40
          }
        },
        yAxis: {
          name: yAxisName,
          type: 'value'
        },
        aria: {
          enabled: true,
          decal: {
            show: true,
            decals: {
              dashArrayX: [1, 0],
              dashArrayY: [2, 5],
              symbolSize: 1,
              rotation: Math.PI / 6
            }
          }
        },
        series: [{
          name: yAxisName,
          data: ySeries,
          type: 'bar',
          label: {
            show: true,
            position: 'top',
            color: '#BE7B7F'
          }
        }],
        dataZoom: [{
          show: true,
          height: 25,
          xAxisIndex: [0],
          bottom: 15,
          start: 50, // 数据窗口范围的起始百分比
          end: 100, // 数据窗口范围的结束百分比
          // startValue: 50,
          // end: 100, // 初始显示1-12周
          // handleIcon: 'path://M8.2,13.6V3.9H6.3v9.7H3.1v14.9h3.3v9.7h1.8v-9.7h3.3V13.6H8.2z M9.7,24.4H4.8v-1.4h4.9V24.4z M9.7,19.1H4.8v-1.4h4.9V19.1z',//拖动按钮图形-默认
          // handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z', // 拖动按钮图形-矩形
          // handleIcon: 'image://images/echartmap-bg4.png',//自定义图形
          // handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z', // 拖动按钮图形-猪
          // handleSize: "150%", //拖动按钮大小
          fillerColor: 'rgb(21, 128, 253, 0.2)', // 拖动块颜色
          showDetail: false,
          handleStyle: {
            color: 'rgb(21, 128, 253, 0.5)', // 拖动按钮颜色
            borderColor: 'rgb(21, 128, 253, 0.5)' // 整体边框
          },
          textStyle: {
            color: '#fff'
          },
          borderColor: '#DFE6F3' // 整体边框
        }]
      }
      return option
    }
  }
}
</script>
