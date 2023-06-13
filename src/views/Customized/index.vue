<template>
  <div class="innovate-container" v-loading="loading">
    <div class="content-container">
      <div class="left-layout">
        <div class="text">
          <div class="title">
            <img :src="webSite + label.icon_customized" class="icon" />{{ scode.subname }}
          </div>
          <div class="desc">{{ scode.def1 }}</div>
          <div class="links">
            <router-link :to="{ name: nav.filename }" class="more" :class="{on:index === 1}" v-for="(nav, index) in navs" :key="nav.id"
            >{{nav.name}}</router-link
          >
          </div>
        </div>
      </div>
      <div class="right-layout">
        <img :src="webSite + scode.ico" />
      </div>
    </div>
    <img :src="webSite + scode.pic" class="bg" />
  </div>
</template>

<script>
import { getScodeInfo } from "@/api/getScode";
import {mapState} from "vuex";
import getNav from "@/api/getNav";
export default {
  data() {
    return {
      webSite: window.webSite,
      scodeId: 5,
      navs:[],
      scode:{},
      loading:false
    };
  },
  async created() {
    this.loading = true;
    const scodeInfo = await getScodeInfo(this.scodeId);
    if(scodeInfo && scodeInfo.data){
      this.scode = scodeInfo.data;
    }
    const navs = await getNav(this.scodeId);
    if(navs.data){
      this.navs = navs.data;
    }
    this.loading = false;
  },
  computed:{
    ...mapState({
      label:state => state.label.data
    })
  }
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>