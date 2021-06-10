/*
 * 2021-05-12 14:14:28
 * @LastEditTime: 2021-06-09 11:44:13
 * @FilePath: \gcj-manager-ui\src\stories\TableMeta\index.stories.js
 * @Description: 表格组件
 */
import '@/stories/baseImport'
import TableMeta from '@/components/TableMeta'
export default {
  title: '表格组件/表格组件',
  component: TableMeta
}

const TableMetaComp = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TableMeta },
  template:
    '<TableMeta v-bind="$props"  />'
})

export const TableMetaTemp = TableMetaComp.bind({})

TableMetaTemp.args = {
  columnsData: [{
    label: '管理部',
    prop: 'customerArea'
  }, {
    label: '时间',
    prop: 'date'
  }, {
    label: '分支',
    prop: 'branch',
    width: '80'
  }],
  dataList: [{
    customerArea: '测试',
    date: '测试',
    branch: '测试'
  }]
}
