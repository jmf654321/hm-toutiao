<template>
  <div class='container_test'>
      <p>header</p>
    <!-- 内容 -->
    <div>
      <!-- 留一个坑 -->
      <slot name="content"  :pn="pageName">备用内容</slot>
    </div>
    <!-- 底 -->
    <p>
      <!-- 留一个坑 -->
      <slot name="footer">footer</slot>
    </p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pageName: '组件内部数据'
    }
  }
}
</script>

<style scoped lang='less'></style>
