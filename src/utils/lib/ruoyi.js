/**
 * 通用js方法封装处理
 * Copyright (c) 2019 glodon
 */

const baseURL = process.env.VUE_APP_BASE_API

/**
 * @description: 日期格式化
 * @param {*} time
 * @param {*} pattern
 * @return {*}
 */
export function parseTime(time, pattern) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    } else if (typeof time === 'string') {
      time = time.replace(new RegExp(/-/gm), '/')
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}
/**
 * @description: 获取几个月前，几天前
 * @param {*} n
 * @param {*} ymd
 * @return {*}
 */
export function getnDayago(n = 0, ymd = '') {
  if (ymd === 'm') {
    return gettomonthago(n)
  } else {
    return parseTime(new Date() - n * 24 * 60 * 60 * 1000, '{y}-{m}-{d}')
  }
}
/**
 * @description: 获得周一~周日的年月日
 * @param {*} date
 * @return {*}
 */
export function getWeekDate(date) {
  date = new Date(date)
  var thisweek = {}
  // 本周一的日期
  date.setDate(date.getDate() - (date.getDay() || 7) + 1)
  thisweek.start_day = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()

  // 本周日的日期
  date.setDate(date.getDate() + 6)
  thisweek.end_day = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
  return [parseTime(thisweek.start_day, '{y}-{m}-{d}'), parseTime(thisweek.end_day, '{y}-{m}-{d}')]
}

/**
 * @description: 初始时间,获取几个月前
 * @param {*} n
 * @return {*}
 */
export function gettomonthago(n) {
  const dt = new Date()
  if (dt.getDate() === 1) {
    n++
  }
  dt.setDate(1) // 31->30  bug
  dt.setMonth(dt.getMonth() - n)
  return parseTime(dt, '{y}-{m}')
}

/**
 * @description: 表单重置
 * @param {*} refName
 * @return {*}
 */
export function resetForm(refName) {
  if (this.$refs[refName]) {
    this.$refs[refName].resetFields()
  }
}

/**
 * @description: 添加日期范围
 * @param {*} params
 * @param {*} dateRange
 * @return {*}
 */
export function addDateRange(params, dateRange) {
  var search = params
  search.beginTime = ''
  search.endTime = ''
  if (dateRange != null && dateRange !== '') {
    search.beginTime = this.dateRange[0]
    search.endTime = this.dateRange[1]
  }
  return search
}

/**
 * @description: 回显数据字典
 * @param {*} datas
 * @param {*} value
 * @return {*}
 */
export function selectDictLabel(datas, value) {
  var actions = []
  Object.keys(datas).map((key) => {
    if (datas[key].dictValue === ('' + value)) {
      actions.push(datas[key].dictLabel)
      return false
    }
  })
  return actions.join('')
}

/**
 * @description: 通用下载方法
 * @param {*} fileName
 * @return {*}
 */
export function download(fileName) {
  window.location.href = baseURL + '/common/download?fileName=' + encodeURI(fileName) + '&delete=' + true
}

/**
 * @description: 字符串格式化(%s )
 * @param {*} str
 * @return {*}
 */
export function sprintf(str) {
  var args = arguments; var flag = true; var i = 1
  str = str.replace(/%s/g, function() {
    var arg = args[i++]
    if (typeof arg === 'undefined') {
      flag = false
      return ''
    }
    return arg
  })
  return flag ? str : ''
}

/**
 * @description: 转换字符串，undefined,null等转化为""
 * @param {*} str
 * @return {*}
 */
export function praseStrEmpty(str) {
  if (!str || str === 'undefined' || str === 'null') {
    return ''
  }
  return str
}

/**
 * 构造树型结构数据
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 * @param {*} rootId 根Id 默认 0
 */
export function handleTree(data, id, parentId, children, rootId) {
  id = id || 'id'
  parentId = parentId || 'parentId'
  children = children || 'children'
  rootId = rootId || 0
  // 对源数据深度克隆
  const cloneData = JSON.parse(JSON.stringify(data))
  // 循环所有项
  const treeData = cloneData.filter(father => {
    const branchArr = cloneData.filter(child => {
      // 返回每一项的子级数组
      return father[id] === child[parentId]
    })
    branchArr.length > 0 ? father.children = branchArr : ''
    // 返回第一层
    return father[parentId] === rootId
  })
  return treeData !== '' ? treeData : data
}

/**
 * 参数处理
 * @param {*} params  参数
 */
export function tansParams(params) {
  let result = ''
  Object.keys(params).forEach((key) => {
    if (!Object.is(params[key], undefined) && !Object.is(params[key], null)) {
      result += encodeURIComponent(key) + '=' + encodeURIComponent(params[key]) + '&'
    }
  })
  return result
}
