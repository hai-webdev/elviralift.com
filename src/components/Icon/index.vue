<template>
  <div class="icon-container">
    <img :src="src" :style="{height,marginBottom:mb}">
    <p v-html="title" :style="{fontSize:fontSize + 'px'}"></p>
  </div>
</template>

<script>
export default {
    props:["src", "title", "height", "mb", "fontSize"]
}
</script>

<style lang="less" scoped>
img{
    width: 30px;
    display: block;
    margin: 0 auto 15px;
}
p{
    text-align: center;
    font-size: 13px;
}
</style>