<template>
  <header class="mz-header">
    <div class="title">
      <div>{{ title }}</div>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    // 标题
    title: {
      type: String,
      default: '卖座电影'
    }
  }
}
</script>

<style lang="less">
@import url('./index.less');
</style>
