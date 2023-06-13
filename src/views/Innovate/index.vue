<template>
  <div class="innovate-container" v-loading="loading">
    <div class="content-container">
      <div class="left-layout">
        <img :src="webSite + scode.ico">
      </div>
      <div class="right-layout">
        <div class="text">
          <div class="title">{{scode.name}}</div>
          <div class="desc">{{scode.subname}}</div>
          <router-link :to="{name:'InnovateList'}" class="more">了解更多</router-link>
        </div>
      </div>
    </div>
    <img :src="webSite + scode.pic" class="bg">
  </div>
</template>

<script>
import { getScodeInfo } from "@/api/getScode";
export default {
  data(){
    return {
      scodeId:4,
      scode:{},
      webSite:window.webSite,
      loading:false
    }
  },
  async created(){
    this.loading = true;
    const scodeInfo = await getScodeInfo(this.scodeId);
    if(scodeInfo && scodeInfo.data){
      this.scode = scodeInfo.data;
    }
    this.loading = false;
  },
}
</script>

<style lang="less" scoped>
@import "./index.less";
</style>