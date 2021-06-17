
import errorCode from '@/utils/errorCode'
import { Message } from 'element-ui'
import { parseTime } from '@/utils/ruoyi'
/**
 * 表格时间格式化
 */
export function formatDate(cellValue) {
  if (cellValue == null || cellValue === '') return ''
  var date = new Date(cellValue)
  var year = date.getFullYear()
  var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    // eslint-disable-next-line no-undef
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function getQueryObject(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 * @param {string} input value
 * @returns {number} output value
 */
export function byteLength(str) {
  // returns the byte length of an utf8 string
  let s = str.length
  for (var i = str.length - 1; i >= 0; i--) {
    const code = str.charCodeAt(i)
    if (code > 0x7f && code <= 0x7ff) s++
    else if (code > 0x7ff && code <= 0xffff) s += 2
    if (code >= 0xDC00 && code <= 0xDFFF) i--
  }
  return s
}

/**
 * @param {Array} actual
 * @returns {Array}
 */
export function cleanArray(actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

/**
 * @param {Object} json
 * @returns {Array}
 */
export function param(json) {
  if (!json) return ''
  return cleanArray(
    Object.keys(json).map(key => {
      if (json[key] === undefined) return ''
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    })
  ).join('&')
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, ' ') +
      '"}'
  )
}

/**
 * @param {string} val
 * @returns {string}
 */
export function html2Text(val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

/**
 * Merges two objects, giving the last one precedence
 * @param {Object} target
 * @param {(Object|Array)} source
 * @returns {Object}
 */
export function objectMerge(target, source) {
  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  Object.keys(source).forEach(property => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return target
}

/**
 * @param {HTMLElement} element
 * @param {string} className
 */
export function toggleClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString =
      classString.substr(0, nameIndex) +
      classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

/**
 * @param {string} type
 * @returns {Date}
 */
export function getTime(type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/**
 * @param {Array} arr
 * @returns {Array}
 */
export function uniqueArr(arr) {
  return Array.from(new Set(arr))
}

/**
 * @returns {string}
 */
export function createUniqueString() {
  const timestamp = +new Date() + ''
  const randomNum = parseInt((1 + Math.random()) * 65536) + ''
  return (+(randomNum + timestamp)).toString(32)
}

/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}

export function makeMap(str, expectsLowerCase) {
  const map = Object.create(null)
  const list = str.split(',')
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true
  }
  return expectsLowerCase
    ? val => map[val.toLowerCase()]
    : val => map[val]
}

export const exportDefault = 'export default '

export const beautifierConf = {
  html: {
    indent_size: '2',
    indent_char: ' ',
    max_preserve_newlines: '-1',
    preserve_newlines: false,
    keep_array_indentation: false,
    break_chained_methods: false,
    indent_scripts: 'separate',
    brace_style: 'end-expand',
    space_before_conditional: true,
    unescape_strings: false,
    jslint_happy: false,
    end_with_newline: true,
    wrap_line_length: '110',
    indent_inner_html: true,
    comma_first: false,
    e4x: true,
    indent_empty_lines: true
  },
  js: {
    indent_size: '2',
    indent_char: ' ',
    max_preserve_newlines: '-1',
    preserve_newlines: false,
    keep_array_indentation: false,
    break_chained_methods: false,
    indent_scripts: 'normal',
    brace_style: 'end-expand',
    space_before_conditional: true,
    unescape_strings: false,
    jslint_happy: true,
    end_with_newline: true,
    wrap_line_length: '110',
    indent_inner_html: true,
    comma_first: false,
    e4x: true,
    indent_empty_lines: true
  }
}

/**
 * @description: 首字母大小
 * @param {*} str
 * @return {*}
 */
export function titleCase(str) {
  return str.replace(/( |^)[a-z]/g, L => L.toUpperCase())
}

/**
 * @description: 下划转驼峰
 * @param {*} str
 * @return {*}
 */
export function camelCase(str) {
  return str.replace(/-[a-z]/g, str1 => str1.substr(-1).toUpperCase())
}

/**
 * @description: 
 * @param {*} str
 * @return {*}
 */
export function isNumberStr(str) {
  return /^[+-]?(0|([1-9]\d*))(\.\d+)?$/g.test(str)
}

/**
 * @description: 数字分隔
 * @param {*} cellValue
 * @return {*}
 */
export function numsplitFormat(cellValue) {
  if (cellValue) {
    cellValue += ''
    if (!cellValue.includes('.')) cellValue += '.'
    return cellValue
      .replace(/(\d)(?=(\d{3})+\.)/g, ($0, $1) => {
        return $1 + ','
      })
      .replace(/\.$/, '')
  } else {
    return 0
  }
}

/**
 * @description: 数字分隔,保留2位小数
 * @param {*} cellValue
 * @return {*}
 */
export function numsplitFormatDecimals(cellValue) {
  if (cellValue) {
    return Number(cellValue)
      .toFixed(2)
      .replace(/(\d)(?=(\d{3})+\.)/g, ($0, $1) => {
        return $1 + ','
      })
      .replace(/\.$/, '')
  } else {
    return 0
  }
}

/**
 * params: date ->new Date()
 * state: old 老系统，周划分按正常周 第一周不满一周算一周
 * @description: 按年份获取周数
 * @param {*} date
 * @param {*} state
 * @return {*}
 */
export function getYearWeek(date, state) {
  var date2 = new Date(date.getFullYear(), 0, 1)
  var day1 = date.getDay()
  if (day1 === 0) day1 = 7
  var day2 = date2.getDay()
  if (day2 === 0) day2 = 7
  const d = Math.round((date.getTime() - date2.getTime() + (day2 - day1) * (24 * 60 * 60 * 1000)) / 86400000)
  const resd = state === 'old' ? (Math.ceil(d / 7) + 1) : (Math.ceil(d / 7) || 1)
  const r = resd < 10 ? ('0' + resd) : resd
  return date.getFullYear() + ',' + r
}

/*
  表格空值判断,处理 formatter 为true 的data
  @params data
  data = 0 => 0
  data = '' && state = true => 0
  data = '' && null => '/'
  data = 0 => 0
  @params state
  state = true => numsplitFormat(data) 数字分割
*/
export function tableDataFormat(data, state) {
  if (data === 0 || data === '0' || (!data && state)) {
    return '0'
  } else if (!data) {
    return '/'
  } else {
    if (state) {
      return numsplitFormat(data)
    } else {
      return data
    }
  }
}

/**
 * @description: 万元处理
 * @param {*} data
 * @return {*}
 */
export function tablewanFunc(data) {
  if (data || data === 0) {
    return fixednum((data / 10e11), 3)
  }
  return '/'
}

/**
 * @description: 保留2位小数
 * @param {*} number
 * @param {*} n
 * @return {*}
 */
export function fixednum(number, n = 2) {
  var f = parseFloat(number)
  if (isNaN(f)) {
    return ''
  }
  f = Math.round(number * Math.pow(10, n)) / Math.pow(10, n) // n 幂
  // var s = f.toString()
  return f // float类型
}

/**
 * @description: 计算百分比
 * @param {*} number1 分子
 * @param {*} number2 分母
 * @return {*} null 返回'/',0 返回'0%',其他空值返回'/' 
 * 返回百分比,保留2位小数
 */
export function fixedpercent(number1, number2) {
  try {
    number1 = parseFloat(number1)
    number2 = parseFloat(number2)
  } catch (e) {
    return '/'
  }
  if (number1 === null || number2 === null) {
    return '/'
  } else if (number1 === 0 || number2 === 0) {
    return '0%'
  } else if (!number1 || !number2) {
    return '0%'
  } else {
    return fixednum(number1 / number2 * 100) + '%'
  }
}

/**
 * @description: 计算百分比2
 * @param {*} number1 分子
 * @param {*} number2 分母
 * @return {*} 空 返回'0%'
 * 返回百分比,保留2位小数
 */
export function fixedpercentEcho0(number1, number2) {
  if (!number1 || !number2) {
    return '0%'
  } else {
    return fixednum(number1 / number2 * 100) + '%'
  }
}

/**
 * @description: table空值提示
 * @param {*}
 * @return {*}
 */
export function tableDataNull() {
  Message({
    message: errorCode['1001'],
    type: 'warning'
  })
}

/**
 * @description: 处理日期
 * @param {*} date
 * @param {*} state
 * W 周 "2020年第01周~2020年第02周"
 * D 日 "2020年01月02日"
 * Y 年 "2020年01月~2020年03月"
 * @return {*}
 * formattableDate('202001') "2020年01月"
 * formattableDate('202001~202002') "2020年01月~2020年02月"
 * formattableDate() false
 */
export function formattableDate(date, state) {
  const formatedate = (fdate) => {
    if (fdate) {
      if (state === 'W') {
        return fdate.slice(0, 4) + '年第' + fdate.slice(4, 6) + '周'
      }
      if (state === 'D') {
        return fdate.slice(0, 4) + '年' + fdate.slice(4, 6) + '月' + fdate.slice(6, 8) + '日'
      }
      if (state === 'Y') {
        return fdate.slice(0, 4) + '年01月' + '~' + fdate.slice(0, 4) + '年' + fdate.slice(4, 6) + '月'
      }
      return fdate.slice(0, 4) + '年' + fdate.slice(4, 6) + '月'
    } else {
      return fdate
    }
  }
  // 处理date未格式化的
  if (!date) return false
  date = date.toString()
  if (!date.includes('~')) {
    return formatedate(date)
  } else {
    const resdate = date.split('~')
    if (resdate[0] !== resdate[1]) {
      return formatedate(resdate[0]) + '~' + formatedate(resdate[1])
    } else {
      return formatedate(resdate[0])
    }
  }
}

/**
 * @description: 计算同比
 * @param {*} a
 * @param {*} b
 * @param {*} c
 * @param {*} d
 * @return {*}
 */
export function yoyBasis(a, b, c, d) {
  if (isNaN(a / b >= c / d) || isNaN(a / b) || isNaN(c / d)) {
    return {
      level: '-',
      percent: '-'
    }
  }
  const basepercent = a / b - c / d
  return {
    level: a / b >= c / d,
    percent: Math.abs(fixednum(basepercent * 100)) + '%'
  }
}

/**
 * @description: 相较去年
 * @param {*} cur 当年
 * @param {*} last 去年
 * @return {*}
 */
export function compairLastYear(cur, last) {
  if (isNaN(cur) || isNaN(last)) {
    return {
      level: '-',
      percent: '-'
    }
  }
  const basepercent = (cur - last) / last
  return {
    level: cur - last >= 0,
    percent: Math.abs(fixednum(basepercent * 100)) + '%'
  }
}

/**
 * @description: 获取天数 date2不传为当年0101
 * @param {*} date1
 * @param {*} date2
 * @return {*}
 */
export function DateDiff(date1, date2) {
  const oDate1 = new Date(date1).getTime()
  let oDate2 = ''
  if (!date2) {
    oDate2 = new Date(new Date(date1).getFullYear() + '-01-01').getTime()
  } else {
    oDate2 = new Date(date2).getTime()
  }
  return parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24) + 1
}

/**
 * @description: 获取当年天数
 * @param {*} date1
 * @return {*}
 */
export function DateCurrentyearDiff(date1) {
  const oDate1 = new Date(date1).getFullYear()
  return DateDiff(oDate1 + '-12-31')
}

/** 
 * @description: 获取本月，若为一号返回上个月
 * @param {*}
 * @return {*}
 */
export function getthismonth() {
  const dt = new Date()
  if (dt.getDate() === 1) {
    dt.setMonth(dt.getMonth() - 1)
    return parseTime(dt, '{y}-{m}')
  }
  return parseTime(dt, '{y}-{m}')
}

/**
 * @description: 获取字典对应的值
 * @param {*} dict 字典
 * @param {*} key 键
 * @param {*} label 键名 默认dictLabel
 * @param {*} value 值名 默认dictValue
 * @return {*}
 */
export function getDictValue(dict, key, label = 'dictLabel', value = 'dictValue') {
  if (dict && dict.length) {
    try {
      return dict.find(item => item[value] === key)[label]
    } catch {
      return ''
    }
  } else {
    return ''
  }
}
/**
 * @description: 获取字典对应的键名
 * @param {*} dict 字典
 * @param {*} key 键名
 * @param {*} label 键名 默认dictLabel
 * @param {*} value 值名 默认dictValue
 * @return {*}
 */
export function getDictLabel(dict, key, label = 'dictLabel', value = 'dictValue') {
  if (dict && dict.length) {
    try {
      return dict.find(item => item[label] === key)[value]
    } catch {
      return ''
    }
  } else {
    return ''
  }
}
