/*
 * 2021-05-12 14:14:28
 * @LastEditTime: 2021-06-10 15:28:53
 * @FilePath: \gcj-component\src\stories\baseImport.js
 * @Description:
 */

import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import Vue from 'vue'
import Element from 'element-ui'
// import '@/assets/icons' // icon
import '@/assets/styles/element-variables.scss'
import '@/assets/styles/index.scss' // global css
import '@/assets/styles/ruoyi.scss' // ruoyi css
// import { download } from '@/utils/lib/request'
import * as echarts from 'echarts'

// import { getDicts } from '@/api/system/dict/data'
// import { getConfigKey } from '@/api/system/config'
// import { postIolog } from '@/api/system/operlog'
import { parseTime, resetForm, addDateRange, selectDictLabel, handleTree, getnDayago } from '@/utils/lib/ruoyi'
import { tableDataFormat, tableDataNull, getDictValue } from '@/utils/lib/index'
import Emptybox from '@/components/emptybox'
import './assets/basecss.css'

import SelectPicker from '@/components/SelectPicker'
import Inputer from '@/components/Inputer'
Vue.use(Element)
// 全局方法挂载
// Vue.prototype.getDicts = getDicts
// Vue.prototype.getConfigKey = getConfigKey
// Vue.prototype.postIolog = postIolog
Vue.prototype.parseTime = parseTime
Vue.prototype.getnDayago = getnDayago
Vue.prototype.resetForm = resetForm
Vue.prototype.addDateRange = addDateRange
Vue.prototype.selectDictLabel = selectDictLabel
// Vue.prototype.download = download
Vue.prototype.handleTree = handleTree
Vue.prototype.tableDataFormat = tableDataFormat
Vue.prototype.tableDataNull = tableDataNull
Vue.prototype.$echarts = echarts
Vue.prototype.getDictValue = getDictValue // 获取字典名称

Vue.component('SelectPicker', SelectPicker)
Vue.component('Emptybox', Emptybox)
Vue.component('Inputer', Inputer)

Vue.prototype.msgSuccess = function(msg) {
  this.$message.success(msg)
}

Vue.prototype.msgError = function(msg) {
  this.$message.error(msg)
}

Vue.prototype.msgWarning = function(msg) {
  this.$message.warning(msg)
}

Vue.prototype.msgInfo = function(msg) {
  this.$message.info(msg)
}
