<template>
  <div class="title-container">
    <span>{{ title }}</span>
    <span class="white">|</span>
    <span class="white">{{ entitle }}</span>
  </div>
</template>

<script>
export default {
  props: ["title", "entitle"],
};
</script>

<style lang="less" scoped>
.title-container {
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  span {
    display: block;
    color: #cfae88;
    font-size: 18px;
    &:nth-child(2) {
      margin: 0 3px;
    }
    &.white {
      color: #fff;
    }
  }
}
</style>