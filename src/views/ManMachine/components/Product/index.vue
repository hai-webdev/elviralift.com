<template>
  <ul class="product-container">
    <li class="product-item" v-for="(item, i) in list" :key="i" :style="{marginRight:mr}">
      <img :src="webSite + item.ico" :alt="item.title" :style="{width:item.ext_width + 'px'}" />
      <p>{{ item.title }}</p>
    </li>
  </ul>
</template>

<script>
export default {
  props: ["list", "mr"],
  data(){
    return {
      webSite: window.webSite
    }
  }
};
</script>

<style lang="less" scoped>
.product-container {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: flex-start;
}
.product-item {
  display: flex;
  // flex: 1;
  flex-direction: column;
  align-items: center;
  margin-right: 30px;
  img {
    max-width: 100%;
    // margin: 0 auto 30px;
    margin-bottom: 30px;
  }
  p {
    text-align: center;
    color: #cfae88;
  }
}
@media screen and (max-width: 768px) {
  .product-container {
    justify-content: flex-start;
  }
  .product-item {
    flex: none;
    margin-right: 20px;
    margin-bottom: 20px;
    width: calc((100% - 40px) / 3);
    &:nth-child(3n + 3){
      margin-right: 0;
    }
    img {
      max-width: 90%;
      margin: 0 auto 10px;
    }
    p {
      text-align: center;
      color: #cfae88;
      font-size: 13px;
    }
  }
}
</style>