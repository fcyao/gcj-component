<template>
  <!-- 标题带问号 -->
  <div class="listdivheader">
    <div class="title"><svg-icon icon-class="list" style="color:#444;margin-right:5px;font-size:14px;position:relative;top:-1px" />{{ title }}
      <el-popover
        v-if="!!content"
        title="字段规则"
        placement="right"
        trigger="hover"
        :open-delay="200"
        :width="width"
      >
        <div class="contbox" v-html="content" />
        <svg-icon slot="reference" icon-class="questions" class="questions" />
      </el-popover>
      <div v-if="updateTime" class="updateTime">
        <span>数据最新更新时间：</span>
        <span class="times">{{ updateTime!=='-'?parseTime(updateTime,'{y}年{m}月{d}日{h}时{i}分{s}秒'):'-' }}</span>
      </div>
    </div>
    <slot />
  </div>

</template>
<script>
export default {
  name: 'ListDivheader',
  props: {
    title: {
      type: String,
      default: '列表'
    },
    content: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '600'
    },
    updateTime: {
      type: String,
      default: ''
    }
  }
}
</script>
<style scoped lang="scss">
@import "~@/assets/styles/variables.scss";

.listdivheader {
  background: #fff;
  .title {
    min-height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #dcdfe6;
    margin-bottom: 10px;
    font-weight: 700;
    text-align: left;
  }
}
/deep/ .tips {
  color: $red;
  font-size: 12px;
  margin-top: 5px;
  margin-bottom: 5px;
}
.questions {
  cursor: help;
  margin-left: 5px;
}
.contbox {
   border-top:1px solid #eee;
   padding: 10px 0;
   line-height: 1.5em;
   color: #676767;
}
.updateTime {
  font-weight: 300;
  display: inline-flex;
  font-size: 13px;
  color: #676767;
  margin-left: 10px;
  line-height: 1em;
  .times {
    margin-left: 2px;
    color: #676767;
    font-weight: 100;
    // font-family: auto;
    position: relative;
    // top: 1px;
  }
}
</style>
