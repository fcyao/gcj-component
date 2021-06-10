<template>
  <div class="contentbox">
    <div v-show="!disabled" class="addbox">
      <el-button type="text" size="mini" icon="el-icon-plus" class="addbtn" @click="addSegmentform()">添加</el-button>
    </div>
    <div v-if="segmentform.content && segmentform.content.length" class="formbox">
      <div v-if="segmentform.content.length>1" class="baseline" @click="!disabled?changeType(segmentform):''"><span>{{ getAndOr(segmentform.type) }}</span></div>
      <div>
        <div v-for="(main,key) in segmentform.content" :key="key">
          <div style="display:flex">
            <div>
              <SelectPicker
                :dict="maincondition"
                :default-value.sync="main.data.maincondition"
                placeholder="请选择"
                class="baseselect"
                width="120px"
                size="mini"
                :title="getDictValue(maincondition,main.data.maincondition)"
                :disabled="disabled"
                @changeHandle="mainconditionChange(main.data)"
              />
              <SelectPicker
                :dict="getDictsAssets(main.data.maincondition)"
                :default-value.sync="main.data.assert"
                placeholder="请选择"
                class="baseselect"
                width="85px"
                size="mini"
                :disabled="disabled"
                @changeHandle="assertconditionChange(main.data)"
              />
              <div v-if="getDictsTobe(main.data.maincondition) && getDictsTobe(main.data.maincondition).length" style="display:inline-block" class="baseselect">
                <SelectPicker
                  v-if="main.data.assert!=='包含'&&!Array.isArray(main.data.tobe)"
                  :dict="getDictsTobe(main.data.maincondition)"
                  :default-value.sync="main.data.tobe"
                  placeholder="请选择"
                  :title="getDictValue(getDictsTobe(main.data.maincondition),main.data.tobe)"
                  width="180px"
                  size="mini"
                  :disabled="disabled"
                />
                <SelectPicker
                  v-show="main.data.assert==='包含'|| Array.isArray(main.data.tobe)"
                  :dict="getDictsTobe(main.data.maincondition)"
                  :default-value.sync="main.data.tobe"
                  placeholder="请选择"
                  width="180px"
                  size="mini"
                  :title="Array.isArray(main.data.tobe) && getDictDatas(getDictsTobe(main.data.maincondition),main.data.tobe)"
                  multiple
                  :disabled="disabled"
                  collapse-tags
                />
              </div>
              <div v-else style="display:inline-block" class="baseselect">
                <div v-if="main.data.assert==='区间'">
                  <el-input
                    v-model.trim="main.data.tobe[0]"
                    :title="main.data.tobe[0]"
                    size="mini"
                    :disabled="disabled"
                    placeholder="请输入"
                    maxlength="100"
                    style="width:84px"
                  />
                  -
                  <el-input
                    v-model.trim="main.data.tobe[1]"
                    :title="main.data.tobe[1]"
                    size="mini"
                    :disabled="disabled"
                    placeholder="请输入"
                    maxlength="100"
                    style="width:84px"
                  />
                </div>
                <el-input
                  v-if="main.data.assert!=='区间'&&!Array.isArray(main.data.tobe)"
                  v-model.trim="main.data.tobe"
                  size="mini"
                  :title="main.data.tobe"
                  placeholder="请输入"
                  maxlength="100"
                  :disabled="disabled"
                  style="width:180px"
                />
              </div>
            </div>
            <el-button
              v-if="hasChild && !disabled"
              type="text"
              size="mini"
              icon="el-icon-plus"
              style="margin-left: 10px"
              @click="addSegChildren(main.children.content)"
            />
            <el-button
              v-if="!disabled"
              type="text"
              :disabled="disabled"
              size="mini"
              icon="el-icon-minus"
              style="margin-left: 10px"
              @click="minusFunc(segmentform.content, key)"
            />
          </div>
          <div class="childrenbox">
            <div v-if="main.children.content.length>1" class="baseline baselinechild" @click="!disabled?changeType(main.children):''">
              <span>{{ getAndOr(main.children.type) }}</span>
            </div>
            <div>
              <div v-for="(child,childkey) in main.children.content" :key="`child`+childkey">
                <div>
                  <SelectPicker
                    :dict="maincondition"
                    :disabled="disabled"
                    :default-value.sync="child.maincondition"
                    :title="getDictData(maincondition,child.maincondition)"
                    placeholder="请选择"
                    width="120px"
                    class="baseselect"
                    size="mini"
                    @changeHandle="mainconditionChange(child)"
                  />
                  <SelectPicker
                    :dict="getDictsAssets(child.maincondition)"
                    :disabled="disabled"
                    :default-value.sync="child.assert"
                    placeholder="请选择"
                    width="85px"
                    class="baseselect"
                    size="mini"
                    @changeHandle="assertconditionChange(child)"
                  />
                  <div v-if="getDictsTobe(child.maincondition) && getDictsTobe(child.maincondition).length" style="display:inline-block" class="baseselect">
                    <SelectPicker
                      v-if="child.assert!=='包含'&&!Array.isArray(child.tobe)"
                      :disabled="disabled"
                      :dict="getDictsTobe(child.maincondition)"
                      :default-value.sync="child.tobe"
                      :title="getDictValue(getDictsTobe(child.maincondition),child.tobe)"
                      placeholder="请选择"
                      width="180px"
                      size="mini"
                    />
                    <SelectPicker
                      v-show="child.assert==='包含'||Array.isArray(child.tobe)"
                      :dict="getDictsTobe(child.maincondition)"
                      :disabled="disabled"
                      :default-value.sync="child.tobe"
                      placeholder="请选择"
                      width="180px"
                      size="mini"
                      :title="Array.isArray(child.tobe) && getDictDatas(getDictsTobe(child.maincondition),child.tobe)"
                      multiple
                      collapse-tags
                    />
                  </div>
                  <div v-else style="display:inline-block" class="baseselect">
                    <div v-if="child.assert==='区间'&&Array.isArray(child.tobe)">
                      <el-input v-model.trim="child.tobe[0]" :title="child.tobe[0]" :disabled="disabled" size="mini" placeholder="请输入" maxlength="100" style="width:84px" />
                      -
                      <el-input v-model.trim="child.tobe[1]" :title="child.tobe[1]" :disabled="disabled" size="mini" placeholder="请输入" maxlength="100" style="width:84px" />
                    </div>
                    <el-input
                      v-if="child.assert!=='区间'&&!Array.isArray(child.tobe)"
                      v-model.trim="child.tobe"
                      :title="child.tobe"
                      :disabled="disabled"
                      size="mini"
                      placeholder="请输入"
                      maxlength="100"
                      style="width:180px"
                    />
                  </div>
                  <el-button
                    v-if="!disabled"
                    type="text"
                    size="mini"
                    icon="el-icon-minus"
                    style="margin-left: 10px"
                    @click="minusFunc(main.children.content, childkey)"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AddQuerybuilder',
  props: {
    maincondition: {
      type: Array,
      default: () => []
    },
    hasChild: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    maxLength: {
      type: Number,
      default: 0
    },
    defaultValue: {
      type: Object,
      default: () => ({ 'type': 'and', 'content': [] })
    }
  },
  data() {
    return {
      segmentform: { 'type': 'and', 'content': [] }
    }
  },
  watch: {
    defaultValue: {
      immediate: true,
      deep: true,
      handler(newValue, oldValue) {
        this.segmentform = this.defaultValue
      }
    },
    segmentform: {
      immediate: true,
      deep: true,
      handler(newValue, oldValue) {
        this.$emit('update:defaultValue', this.segmentform)
      }
    }
  },
  methods: {
    getDictData(dict, data) {
      return this.getDictValue(dict, data)
    },
    getDictDatas(dicts, datas) {
      const res = []
      dicts.forEach(item => {
        if (datas.includes(item.dictValue)) {
          res.push(item.dictLabel)
        }
      })
      return res.join('，')
    },
    getAndOr(data) {
      if (data === 'and') {
        return '且'
      } else if (data === 'or') {
        return '或'
      }
    },
    changeType(data) {
      if (data.type === 'and') {
        data.type = 'or'
      } else if (data.type === 'or') {
        data.type = 'and'
      }
    },
    mainconditionChange(mainData) {
      let defaultValue = ''
      mainData.assert = this.maincondition.find(item => item.dictValue === mainData.maincondition).assert[0].dictValue
      defaultValue = this.getDefaultTobe(mainData.maincondition, mainData.assert)
      mainData.tobe = defaultValue
    },
    assertconditionChange(assertData) {
      if (assertData.assert === '包含' || assertData.assert === '区间') {
        assertData.tobe = []
        this.$forceUpdate()
      } else {
        assertData.tobe = ''
      }
    },
    getDictsAssets(data) {
      try {
        return this.maincondition.find(item => item.dictValue === data).assert
      } catch {
        return []
      }
    },
    getDictsTobe(data) {
      try {
        return this.maincondition.find(item => item.dictValue === data).tobe
      } catch {
        return ''
      }
    },
    addSegmentform() {
      // 主数组添加
      if (this.maxLength) {
        if (this.segmentform.content.length >= this.maxLength) {
          this.msgWarning(`最大设置${this.maxLength}层`)
          return false
        }
      }
      // this.segmentform.content.push({ data: { maincondition: '所属分支', assert: '包含', tobe: '' }, children: { 'type': 'and', 'content': [] }})
      let defaultValue = ''
      defaultValue = this.getDefaultTobe(this.maincondition[0].dictValue, this.maincondition[0].assert[0].dictValue)
      this.segmentform.content.push({ data: { maincondition: this.maincondition[0].dictValue, assert: this.maincondition[0].assert[0].dictValue, tobe: defaultValue }, children: { 'type': 'and', 'content': [] }})
    },
    addSegChildren(data) {
      let defaultValue = ''
      defaultValue = this.getDefaultTobe(this.maincondition[0].dictValue, this.maincondition[0].assert[0].dictValue)
      data.push({ maincondition: this.maincondition[0].dictValue, assert: this.maincondition[0].assert[0].dictValue, tobe: defaultValue })
    },
    getDefaultTobe(mainValue, assertValue) {
      // 默认TOBE值
      const dicts = this.getDictsTobe(mainValue)
      if (Array.isArray(dicts) && dicts.length) {
        if (assertValue === '包含') {
          return [dicts[0].dictValue]
        } else {
          return dicts[0].dictValue
        }
      } else {
        return ''
      }
    },
    minusFunc(arr, key) {
      arr.splice(key, 1)
    },
    reset() {
      this.segmentform = {
        type: 'and',
        content: []
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/styles/variables.scss";
.contentbox {
  border: 1px solid #DCDFE6;
  width: 510px;
  border-radius: 4px;
}
.addbox {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding-right: 15px;
  padding-top: 2px;
  background: #f8f9fa;
  border-bottom: 1px solid #DCDFE6;
}
.formbox {
  display: flex;
  padding-top: 15px;
  margin-bottom: 15px;
  position: relative;
  padding-left: 30px;
  .childrenbox {
    display: flex;
    position: relative;
    padding-left: 30px;
  }
}

.baselinechild {
  top: 50% !important;
  transform: translateY(-50%);
}
.baseline {
  position: absolute;
  left: 0;
  top: calc(50% + 7px);
  transform: translateY(-50%);
  padding: 0 10px;
  cursor: pointer;
  height: 100%;
  display: flex;
  align-items: center;
  span {
    background: #fff;
    position: relative;
    color: $blue;
  }
  &::before {
    content: '';
    position: absolute;
    height: calc(100% - 40px);
    width: 1px;
    background: #c0c4cc;
    left: 50%;
  transform: translateX(-50%);
  }
}
.baseselect + .baseselect {
  margin-left: 5px;
}
/deep/ .el-input.is-disabled .el-input__inner {
  color: #686868;
}
/deep/ .el-input__inner {
  display: inline-block;
  max-width: 180px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
