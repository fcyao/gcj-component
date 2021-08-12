import { Branch2021 } from '@/utils/lib/dicCode'
import { CustomType } from '@/utils/lib/dicCode'
const assertConf = [
  { dictLabel: '包含', dictValue: '包含' },
  { dictLabel: '等于', dictValue: '等于' },
  { dictLabel: '不小于', dictValue: '不小于' },
  { dictLabel: '不大于', dictValue: '不大于' },
  { dictLabel: '大于', dictValue: '大于' },
  { dictLabel: '小于', dictValue: '小于' },
  { dictLabel: '区间', dictValue: '区间' }
]
const orderState = [
  { dictLabel: '已交付', dictValue: '已交付' },
  { dictLabel: '未交付', dictValue: '未交付' }
]
const accountState = [
  { dictLabel: '已过期', dictValue: '已过期' },
  { dictLabel: '未开始', dictValue: '未开始' },
  { dictLabel: '进行中', dictValue: '进行中' }
]
const accountRole = [
  { dictLabel: '主账号', dictValue: '主账号' },
  { dictLabel: '子账号', dictValue: '子账号' },
  { dictLabel: '企业账号', dictValue: '企业账号' },
  { dictLabel: '员工账号', dictValue: '员工账号' }
]
const isno = [
  { dictLabel: '是', dictValue: '是' },
  { dictLabel: '否', dictValue: '否' }
]
const isLogin = [
  { dictLabel: '已登录', dictValue: '已登录' },
  { dictLabel: '未登录', dictValue: '未登录' }
]
const isActive = [
  { dictLabel: '高活跃', dictValue: '高活跃' },
  { dictLabel: '中活跃', dictValue: '中活跃' },
  { dictLabel: '低活跃', dictValue: '低活跃' }
]
const isFollowup = [
  { dictLabel: '已跟进', dictValue: '已跟进' },
  { dictLabel: '未跟进', dictValue: '未跟进' }
]
const moduleUse = [
  { dictLabel: '供应商搜索', dictValue: '供应商搜索' },
  { dictLabel: '价格预测', dictValue: '价格预测' },
  { dictLabel: '订阅服务', dictValue: '订阅服务' },
  { dictLabel: '信息价', dictValue: '信息价' },
  { dictLabel: '价格行情', dictValue: '价格行情' },
  { dictLabel: '人工询价', dictValue: '人工询价' },
  { dictLabel: '批量导出', dictValue: '批量导出' },
  { dictLabel: '在线客服', dictValue: '在线客服' },
  { dictLabel: '人工询价搜索', dictValue: '人工询价搜索' },
  { dictLabel: '信息价搜索', dictValue: '信息价搜索' },
  { dictLabel: '市场价搜索', dictValue: '市场价搜索' },
  { dictLabel: '期刊资讯', dictValue: '期刊资讯' },
  { dictLabel: '报价单', dictValue: '报价单' },
  { dictLabel: '历史价', dictValue: '历史价' }
]
const accountRightType = [
  { dictLabel: 'VIP授权', dictValue: 'VIP授权' },
  { dictLabel: '造价云授权', dictValue: '造价云授权' }
]
export default [
  { dictLabel: '所属分支', dictValue: '所属分支', assert: [assertConf[0]], tobe: Branch2021.slice(1) },
  { dictLabel: '订单状态', dictValue: '订单状态', assert: [assertConf[0]], tobe: orderState },
  { dictLabel: '账号权益状态', dictValue: '账号权益状态', assert: [assertConf[0]], tobe: accountState },
  { dictLabel: '本年账号权益时长', dictValue: '本年账号权益时长', assert: [assertConf[1], assertConf[2], assertConf[3], assertConf[6]], tobe: [] },
  { dictLabel: '本季度账号权益时长', dictValue: '本季度账号权益时长', assert: [assertConf[1], assertConf[2], assertConf[3], assertConf[6]], tobe: [] },
  { dictLabel: '本月账号权益时长', dictValue: '本月账号权益时长', assert: [assertConf[1], assertConf[2], assertConf[3], assertConf[6]], tobe: [] },
  { dictLabel: '账号权益已开始天数', dictValue: '账号权益已开始天数', assert: assertConf.slice(1), tobe: [] },
  { dictLabel: '账号角色', dictValue: '账号角色', assert: [assertConf[0]], tobe: accountRole },
  { dictLabel: '本年功能应用次数', dictValue: '本年功能应用次数', assert: assertConf.slice(1), tobe: [] },
  { dictLabel: '历年功能应用次数', dictValue: '历年功能应用次数', assert: assertConf.slice(1), tobe: [] },
  { dictLabel: '近7天应用次数', dictValue: '近7天应用次数', assert: assertConf.slice(1), tobe: [] },
  { dictLabel: '近30天月应用次数', dictValue: '近30天月应用次数', assert: assertConf.slice(1), tobe: [] },
  { dictLabel: '本年核心功能应用次数', dictValue: '本年核心功能应用次数', assert: assertConf.slice(1), tobe: [] },
  { dictLabel: '近一个月计价是否应用', dictValue: '近一个月计价是否应用', assert: [assertConf[1]], tobe: isno },
  { dictLabel: '去年1月截止至当前的活动参与频次', dictValue: '去年1月截止至当前的活动参与频次', assert: assertConf.slice(1), tobe: [] },
  { dictLabel: '微信端登录', dictValue: '微信端登录', assert: [assertConf[1]], tobe: isLogin },
  { dictLabel: '助手端登录', dictValue: '助手端登录', assert: [assertConf[1]], tobe: isLogin },
  { dictLabel: '活跃标签', dictValue: '活跃标签', assert: [assertConf[1]], tobe: isActive },
  { dictLabel: '跟进状态', dictValue: '跟进状态', assert: [assertConf[1]], tobe: isFollowup },
  { dictLabel: '连续购买年限', dictValue: '连续购买年限', assert: [assertConf[1], assertConf[6]], tobe: [] },
  { dictLabel: '模块应用偏好', dictValue: '模块应用偏好', assert: [assertConf[1], assertConf[0]], tobe: moduleUse },
  { dictLabel: '客户大类', dictValue: '客户大类', assert: [assertConf[0]], tobe: CustomType.slice(1) },
  { dictLabel: '账号授权类型', dictValue: '账号授权类型', assert: [assertConf[0]], tobe: accountRightType },
  { dictLabel: '本年使用天数', dictValue: '本年使用天数', assert: assertConf.slice(1), tobe: [] },
  { dictLabel: '近30天使用天数', dictValue: '近30天使用天数', assert: assertConf.slice(1), tobe: [] },
  { dictLabel: '本年连续使用天数', dictValue: '本年连续使用天数', assert: assertConf.slice(1), tobe: [] },
  { dictLabel: '近30天的连续使用天数', dictValue: '近30天的连续使用天数', assert: assertConf.slice(1), tobe: [] },
  { dictLabel: '材料更新与用户偏好匹配', dictValue: '材料更新与用户偏好匹配', assert: [assertConf[1]], tobe: isno },
  { dictLabel: '账号剩余权益天数', dictValue: '账号剩余权益天数', assert: assertConf.slice(1), tobe: [] }
]
