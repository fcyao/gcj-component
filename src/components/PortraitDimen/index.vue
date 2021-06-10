<template>
  <div>
    <div class="listbox">
      <div class="listtitle">已选维度：</div>
      <div v-if="showDimenchecked" class="taglist">
        <div v-for="(item,key) in Object.keys(dimenchecked)" v-show="dimenchecked[item].length" :key="key" class="tagsli">
          <el-tag
            v-for="(tag, dkey) in dimenchecked[item]"
            :key="dkey"
            closable
            class="tags"
            size="mini"
            @close="closeTag(dkey,dimenchecked[item],item)"
          >
            {{ tag }}
          </el-tag>
        </div>
      </div>
    </div>

    <div v-for="item in listbox" :key="item.value" class="listbox">
      <div class="listtitle">{{ item.label }}：</div>
      <el-checkbox
        v-model="checkAll[item.value]"
        :indeterminate="isIndeterminate[item.value]"
        style="font-weight: 700"
        @change="(val)=>{handleCheckAllChange(val,item.value)}"
      >全选</el-checkbox>
      <el-checkbox-group
        v-model="dimenchecked[item.value]"
        class="listgroup"
        :class="showmore[item.value]?'listgroupup':''"
        @change="(val)=>{handleCheckedChange(val,item.value)}"
      >
        <el-checkbox
          v-for="data in dimens[item.value]"
          v-show="isShowLabel(data)"
          :key="data"
          :label="data"
          class="checkboxli"
        >{{ data }}</el-checkbox>
      </el-checkbox-group>
      <div
        class="more"
        :class="showmore[item.value]?'moreup':''"
        @click="showmore[item.value] = !showmore[item.value]"
      >更多</div>
    </div>
  </div>
</template>
<script>
import _ from 'lodash'
export default {
  name: 'PortraitDimen',
  props: {
    userPv: {
      type: String,
      default: ''
    },
    userPvCondition: {
      type: String,
      default: ''
    },
    commonPcode: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      showmore: {
        fact: false,
        behavior: false
      },
      checkAll: {
        fact: false,
        behavior: false
      },
      dimenchecked: {
        fact: [],
        behavior: []
      },
      isIndeterminate: {
        fact: false,
        behavior: false
      },
      listbox: [
        { value: 'fact', label: '事实属性' },
        { value: 'behavior', label: '用户行为' }
      ],
      alldimens: {
        fact: ['分支', '客户大类', '客户类型', '客户行业', '客户资质级别', '客户单位级别', '订单状态', '账号授权模式/账号角色', '资产分配情况', '权益状态', '权益时长', '权益已开始天数', '权益剩余天数', '激活状态', '激活时长'],
        behavior: ['访问频次', '访问天数', '用户留存情况', '微信端登录情况', '助手端登录情况', '本年会员日参与次数', '本年活动参与次数', '功能模块偏好', '渠道/平台使用偏好']
      },
      dimens: {},
      showDimenChecked: []
    }
  },
  computed: {
    selectData() {
      return Object.keys(this.dimenchecked).reverse().reduce((prev, cur) => {
        return this.dimenchecked[cur].concat(prev)
      }, [])
    },
    showDimenchecked() {
      let show = false
      Object.keys(this.dimenchecked).map(item => {
        if (this.dimenchecked[item].length) {
          show = true
        }
      })
      return show
    }
  },
  watch: {
    userPv() {
      this.getCheckedData()
    },
    commonPcode() {
      // 3）”用户留存情况“：若查询时间为“按月”或“本年”，则显示月留存卡片；其它情况显示日留存卡片
      this.getCheckedData()
    },
    userPvCondition() {
      this.getCheckedData()
    },
    dimenchecked: {
      immediate: true,
      deep: true,
      handler() {
        this.showDimenChecked = []
        Object.keys(this.dimenchecked).forEach(map => {
          this.dimenchecked[map].forEach(item => {
            this.showDimenChecked.push(item)
          })
        })
        this.$emit('update:checkedValue', this.showDimenChecked)
        this.$emit('update:dimenChecked', this.dimenchecked)
      }
    }
  },
  mounted() {
    this.dimens = _.cloneDeep(this.alldimens)
  },
  methods: {
    getCheckedData() {
      // 可选 和选中 随切换变化
      this.dimens = _.cloneDeep(this.alldimens)
      Object.keys(this.dimenchecked).forEach(map => {
        const temparr = []
        this.dimenchecked[map].forEach((item) => {
          if (this.isShowLabel(item)) {
            temparr.push(item)
          }
        })
        this.dimenchecked[map] = temparr
      })
      Object.keys(this.dimens).forEach(map => {
        const temparr = []
        this.dimens[map].forEach((item) => {
          if (this.isShowLabel(item)) {
            temparr.push(item)
          }
        })
        this.dimens[map] = temparr
      })
      // 全选和半选状态
      // this.isIndeterminate[item] = false
      // this.checkAll[item] = true
      Object.keys(this.dimenchecked).forEach(map => {
        if (this.dimenchecked[map].length === 0) {
          this.isIndeterminate[map] = false
          this.checkAll[map] = false
        } else if (this.dimenchecked[map].length === this.dimens[map].length) {
          this.isIndeterminate[map] = false
          this.checkAll[map] = true
        } else if (this.dimenchecked[map].length > 0 && this.dimenchecked[map].length !== this.dimens[map].length) {
          this.isIndeterminate[map] = true
          this.checkAll[map] = false
        }
      })
    },
    isShowLabel(data) {
      const isPvnotShowLabel = ['访问频次', '访问天数', '用户留存情况', '功能模块偏好', '渠道/平台使用偏好']
      const isAcountAssetLabel = ['账号授权模式/账号角色', '资产分配情况']
      const isGCLabel = ['微信端登录情况', '本年活动参与次数', '本年会员日参与次数']
      const isGCWLabel = ['助手端登录情况', '功能模块偏好', '渠道/平台使用偏好']
      let result = true
      if (this.userPv === '0' && (this.userPvCondition === 'eq' || this.userPvCondition === 'lt' || this.userPvCondition === 'lte')) {
        // 6）“访问频次”、“访问天数”、“用户留存情况”、“功能模块偏好”、“渠道/平台使用偏好”：应用频次设置“等于0”时，此维度不可选、不展示
        result = !isPvnotShowLabel.includes(data)
        if (!result) return false
      }
      if (this.commonPcode === '-100000') {
        // 1）“账号授权模式/账号角色“：仅限账号体系产品，当【产品/事件组功能编码所属产品/用户分群所属产品】为广材助手时，此维度不可选、不展示
        // 2）“资产分配情况”：若查询对象中无资产(广材助手)，则不显示此维度卡片
        result = !isAcountAssetLabel.includes(data)
        if (!result) return false
      }
      if (this.commonPcode !== '-100000' && this.commonPcode !== '-100002') {
        // 4）“微信端登录情况”、“本年活动参与次数”、“本年会员日参与次数”：仅限广材网和广材助手，当【产品/事件组功能编码所属产品/用户分群所属产】为广材网或广材助手时，此维度才可选、可展示
        result = !isGCLabel.includes(data)
        if (!result) return false
      }
      if (this.commonPcode !== '-100002') {
        // 5）“助手端登录情况”、“功能模块偏好”、“渠道/平台使用偏好”：仅限广材网，当【产品/事件组功能编码所属产品/用户分群所属产品】为广材网时，此维度才可选、可展示
        result = !isGCWLabel.includes(data)
        if (!result) return false
      }
      return result
    },
    handleCheckAllChange(val, type) {
      // 事实全选
      this.dimenchecked[type] = val ? [...this.dimens[type]] : []
      this.isIndeterminate[type] = false
    },
    handleCheckedChange(value, type) {
      // 事实单选
      const checkedCount = value.length
      this.checkAll[type] = checkedCount === this.dimens[type].length
      this.isIndeterminate[type] = checkedCount > 0 && checkedCount < this.dimens[type].length
    },
    checkAlldimen() {
      Object.keys(this.isIndeterminate).map(item => {
        this.isIndeterminate[item] = false
        this.checkAll[item] = true
      })
      Object.keys(this.dimenchecked).map(item => {
        this.dimenchecked[item] = [...this.dimens[item]]
      })
    },
    clearAlldimen() {
      Object.keys(this.isIndeterminate).map(item => {
        this.isIndeterminate[item] = false
        this.checkAll[item] = false
      })
      Object.keys(this.dimenchecked).map(item => {
        this.dimenchecked[item] = []
      })
    },
    closeTag(key, arr, item) {
      arr.splice(key, 1)
      this.checkAll[item] = false
      this.isIndeterminate[item] = !!this.dimenchecked[item].length
    }
  }
}
</script>
<style scoped lang="scss">

.taglist {
  padding: 0px 15px 0;
  // border-bottom: 1px solid #eee;
   flex: 1;
  .tagsli {
    position: relative;
    &::before {
      content: '';
      position: absolute;
      left: -15px;
      border-radius: 50%;
      top: 10px;
      width: 5px;
      height: 5px;
      background: #1890ff;
    }
  }
  .tags {
    margin-bottom: 5px;
    margin-right: 5px;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
}
.listbox {
  font-size: 14px;
  color: #464546;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  display: flex;
  flex-wrap: wrap;
  line-height: 1.8em;
  transition: all 0.2s linear;
  .listtitle {
    margin-right: 10px;
    font-weight: 700;
  }
  .listgroup {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    margin-left: 20px;
    height: 28px;
    overflow: hidden;
  }
  .listgroupup {
    height: auto;
  }
  .more {
    font-size: 12px;
    color: #444;
    font-weight: 700;
    position: relative;
    padding-right: 18px;
    cursor: pointer;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    &::after {
      transition: all 0.2s linear;
      content: '';
      position: absolute;
      right: 0;
      top: 2px;
      width: 20px;
      height: 20px;
      background-size: 100% 100%;
      background-image: url(~@/assets/image/arrow.png);
      transform: rotateZ(0deg);
    }
  }
  .moreup {
    &::after {
      transform: rotateZ(-180deg);
    }
  }
}
</style>
