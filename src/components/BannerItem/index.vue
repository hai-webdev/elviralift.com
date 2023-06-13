<template>
   <div class="banner-item-container">
      <div class="content-container">
        <img :src="webSite + banner.ico" class="bg" />
        <div class="banner-box">
          <div class="text" :class="banner.ext_color">
            <div class="title" :style="{color:banner.ext_btc}">{{ banner.title }}</div>
            <div class="desc" :style="{color:banner.ext_wbc}" v-html="banner.ext_wb"></div>
            <a :href="banner.outlink" target="_blank" v-if="banner.outlink" class="link">了解更多</a>
            <router-link v-if="isPage" :to="{name:name}" class="link">了解更多</router-link>
          </div>
          <img :src="webSite + banner.ext_t" class="img" />
        </div>
      </div>
    </div>
</template>

<script>

export default {
  props:["banner", "isPage"],
  data(){
    return {
      webSite: window.webSite
    }
  }
}
</script>

<style lang="less" scoped>
@import "./index.less";
</style>