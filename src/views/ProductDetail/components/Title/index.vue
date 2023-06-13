<template>
  <div class="title-container">
    <span>{{ title }}</span>
    <router-link :to="{name:'Reservation'}" class="reservation">预约试乘</router-link>
  </div>
</template>

<script>
export default {
    props:["title"]
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>