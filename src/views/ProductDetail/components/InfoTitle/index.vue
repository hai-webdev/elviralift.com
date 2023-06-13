<template>
  <div class="info-title-container">
    {{ title }}
  </div>
</template>

<script>
export default {
  props: ["title"],
};
</script>

<style lang="less" scoped>
.info-title-container {
  font-size: 18px;
  padding-left: 55px;
  height: 56px;
  line-height: 56px;
  border-bottom: 1px solid #f2f2f2;
}
@media screen and (max-width: 768px) {
  .info-title-container {
    font-size: 16px;
    padding-left: 15px;
    height: 44px;
    line-height: 44px;
  }
}
</style>