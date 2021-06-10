import '@/stories/baseImport'
import AddQuerybuilder from '@/components/addQuerybuilder'
export default {
  title: '查询生成器/查询生成器',
  component: AddQuerybuilder
}

const AddQuerybuilderComp = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { AddQuerybuilder },
  template:
    '<AddQuerybuilder v-bind="$props"  />'
})

export const AddQuerybuilderTemp = AddQuerybuilderComp.bind({})

AddQuerybuilderTemp.args = {
  maincondition: [{ 'dictLabel': '微信端登录', 'dictValue': 21, 'assert': [{ 'dictLabel': '等于', 'dictValue': '等于' }], 'tobe': [{ 'dictLabel': '已登录', 'dictValue': '是' }, { 'dictLabel': '未登录', 'dictValue': '否' }] }, { 'dictLabel': '助手端登录', 'dictValue': 23, 'assert': [{ 'dictLabel': '等于', 'dictValue': '等于' }], 'tobe': [{ 'dictLabel': '已登录', 'dictValue': '是' }, { 'dictLabel': '未登录', 'dictValue': '否' }] }, { 'dictLabel': '本年功能应用次数', 'dictValue': 4, 'assert': [{ 'dictLabel': '等于', 'dictValue': '等于' }, { 'dictLabel': '不小于', 'dictValue': '不小于' }, { 'dictLabel': '不大于', 'dictValue': '不大于' }, { 'dictLabel': '大于', 'dictValue': '大于' }, { 'dictLabel': '小于', 'dictValue': '小于' }, { 'dictLabel': '区间', 'dictValue': '区间' }], 'tobe': [] }, { 'dictLabel': '本年核心功能应用次数', 'dictValue': 5, 'assert': [{ 'dictLabel': '等于', 'dictValue': '等于' }, { 'dictLabel': '不小于', 'dictValue': '不小于' }, { 'dictLabel': '不大于', 'dictValue': '不大于' }, { 'dictLabel': '大于', 'dictValue': '大于' }, { 'dictLabel': '小于', 'dictValue': '小于' }, { 'dictLabel': '区间', 'dictValue': '区间' }], 'tobe': [] }, { 'dictLabel': '去年1月截止至当前的活动参与频次', 'dictValue': 19, 'assert': [{ 'dictLabel': '等于', 'dictValue': '等于' }, { 'dictLabel': '不小于', 'dictValue': '不小于' }, { 'dictLabel': '不大于', 'dictValue': '不大于' }, { 'dictLabel': '大于', 'dictValue': '大于' }, { 'dictLabel': '小于', 'dictValue': '小于' }, { 'dictLabel': '区间', 'dictValue': '区间' }], 'tobe': [] }, { 'dictLabel': '2020年8月广材网网页端会员日互动次数', 'dictValue': 43, 'assert': [{ 'dictLabel': '等于', 'dictValue': '等于' }, { 'dictLabel': '不小于', 'dictValue': '不小于' }, { 'dictLabel': '不大于', 'dictValue': '不大于' }, { 'dictLabel': '大于', 'dictValue': '大于' }, { 'dictLabel': '小于', 'dictValue': '小于' }, { 'dictLabel': '区间', 'dictValue': '区间' }], 'tobe': [] }, { 'dictLabel': '触达后使用天数', 'dictValue': 91, 'assert': [{ 'dictLabel': '等于', 'dictValue': '等于' }, { 'dictLabel': '不小于', 'dictValue': '不小于' }, { 'dictLabel': '不大于', 'dictValue': '不大于' }, { 'dictLabel': '大于', 'dictValue': '大于' }, { 'dictLabel': '小于', 'dictValue': '小于' }, { 'dictLabel': '区间', 'dictValue': '区间' }], 'tobe': [] }, { 'dictLabel': '触达后功能使用次数', 'dictValue': 92, 'assert': [{ 'dictLabel': '小于', 'dictValue': '小于' }, { 'dictLabel': '不大于', 'dictValue': '不大于' }, { 'dictLabel': '大于', 'dictValue': '大于' }, { 'dictLabel': '小于', 'dictValue': '小于' }, { 'dictLabel': '区间', 'dictValue': '区间' }], 'tobe': [] }],
  defaultValue: { 'type': 'and', 'content': [] }
}
