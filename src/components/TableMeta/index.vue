<template>
  <el-table
    ref="tablemeta"
    element-loading-text="数据查询中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(255, 255, 255, 0.7)"
    :data="dataList"
    :border="border"
    stripe
    :span-method="spanMethod"
    :height="height"
    :size="size"
    v-bind="$attrs"
    :row-class-name="rowClassName"
    @header-dragend="$refs.tablemeta.doLayout()"
    v-on="$listeners"
  >
    <div slot="empty"><Emptybox style="width:100px;margin:0 auto" /></div>
    <slot name="defaultcolumn" :columnsData="columnsData">
      <el-table-column
        v-for="column in columnsData"
        :key="column.prop"
        :type="column.type"
        :label="column.label"
        :width="column.width"
        :prop="column.prop"
        :fixed="column.fixed"
        :render-header="labelHead"
        :sortable="column.sortable"
      >
        <template slot-scope="scope">
          <div v-if="column.type === 'index'">
            {{ scope.row.index + 1 }}
          </div>
          <div v-else>
            <!--  表格空值判断,处理 formatter 为true 的data -->
            {{ tableDataFormat(scope.row[column.prop],column.formatter) }}
          </div>
        </template>
      </el-table-column>
    </slot>
    <slot name="tablecolumn" />
  </el-table>
</template>
<script>
export default {
  name: 'TableMeta',
  props: {
    border: {
      type: Boolean,
      default: true
    },
    dataList: {
      type: Array,
      default: () => []
    },
    size: {
      type: String,
      default: 'small'
    },
    columnsData: {
      type: Array,
      default: () => []
    },
    height: {
      type: String,
      default: 'calc(100vh - 270px)'
    }
  },
  data() {
    return {
      spanArray: []
    }
  },
  watch: {
    dataList: {
      immediate: true,
      deep: true,
      handler(newValue, oldValue) {
        this.doLayout()
      }
    }
  },
  created() {
    this.doLayout()
    window.onresize = () => {
      this.doLayout()
    }
  },
  activated() {
    this.doLayout()
  },
  methods: {
    rowClassName({ row, rowIndex }) {
      row.index = rowIndex
    },
    labelHead(h, { column, index }) {
      column.minWidth = 100 // 字大小乘个数即长度 ,注意不要加px像素，这里minWidth只是一个比例值，不是真正的长度

      // 然后将列标题放在一个div块中，注意块的宽度一定要100%，否则表格显示不完全
      return h('span', { class: 'table-head' }, [column.label])
    },
    /* 合并单元格 */
    spanMethod({ row, column, rowIndex, columnIndex }) {
      if (this.spanArray.length) {
        if (columnIndex === 0) {
          const _row = this.spanArray[rowIndex]
          const _col = _row > 0 ? 1 : 0
          return {
            rowspan: _row,
            colspan: _col
          }
        }
      }
    },
    // 获取合并arr
    getSpanArr(data, mergeindexArr) {
      let arrfill = []
      let numindex = 0
      let resarr = []
      arrfill = new Array(data.length).fill(0)
      numindex = mergeindexArr.reduce((prev, current, currentIndex, arr) => {
        arrfill[prev] = arr[currentIndex]
        return prev + current
      }, 0)
      resarr = arrfill.map((map, key) => {
        key >= numindex ? map = 1 : ''
        return map
      })
      this.spanArray = resarr
    },
    doLayout() {
      try {
        this.$refs.tablemeta.doLayout()
      } catch (e) {
        new Error(e)
      }
    }
  }
}
</script>
<style scoped lang="scss">
// /deep/ .table-head{
  // min-width: 150px;
// }
</style>
