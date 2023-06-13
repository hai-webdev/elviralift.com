<template>
  <div class="info-container">
    <div class="title">{{title}}</div>
    <div class="desc" v-html="desc"></div>
  </div>
</template>

<script>
export default {
    props:["title", "desc"]
}
</script>

<style lang="less" scoped>
@import "./index.less";
</style>