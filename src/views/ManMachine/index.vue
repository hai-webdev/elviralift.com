<template>
  <div class="man-machine-container" v-loading="loading">
    <div class="left-layout">
      <div class="pro-box">
        <div class="left">
          <div class="top">
            <TitleComp v-if="navList[0]" :title="navList[0].name" :entitle="navList[0].subname" />
            <Product v-if="navList[0]" :list="navList[0].list" mr="70px" />
          </div>
          <div class="bottom">
            <TitleComp v-if="navList[1]" :title="navList[1].name" :entitle="navList[1].subname" />
            <Product v-if="navList[1]" :list="navList[1].list" />
          </div>
        </div>
        <div class="right">
          <TitleComp v-if="navList[2]" :title="navList[2].name" :entitle="navList[2].subname" />
          <Product v-if="navList[2]" :list="navList[2].list" />
        </div>
      </div>
    </div>
    <div class="right-layout" v-if="rjjmNav">
      <div class="text">
        <div class="title-box">
          <div class="en-title">
            <p>{{ rjjmNav.def1 }}</p>
            <p><span>{{ rjjmNav.def2 }}</span></p>
          </div>
          <div class="cn-title">{{ rjjmNav.name }}</div>
        </div>
        <ul class="info-list">
          <li class="info-item" v-for="(item,i) in rjjmList" :key="item.id">
            <b class="num">{{i + 1}}</b>
            <p>{{item.title}}</p>
          </li>
        </ul>
      </div>
      <img :src="webSite + rjjmNav.ico" class="bg" />
    </div>
  </div>
</template>

<script>
import TitleComp from "./components/Title";
import Product from "./components/Product";
export default {
  data() {
    return {
      webSite:window.webSite,
      scodeId:3,
      navList:[],
      rjjmList:[],
      rjjmNav:{},
      loading:false,
    };
  },
  async created(){
    this.loading = true;
    const rjjmNav = await this.$api.getScodeInfo(17);
    if(rjjmNav && rjjmNav.data){
      this.rjjmNav = rjjmNav.data;
    }
    const rjjmList = await this.$api.getList({scode:17});
    if(rjjmList && rjjmList.data){
      this.rjjmList = rjjmList.data;
    }

    const nav = await this.$api.getNav(this.scodeId);
    if(nav.data){
      this.navList = await nav.data.map(async item => {
        const list = await this.$api.getList({scode:item.scode});
        if(list.data){
          item.list = list.data;
        }
        return item;
      })
    }
    const result = await Promise.all(this.navList)
    this.navList = result;
    this.loading = false;
  },
  components: {
    TitleComp,
    Product,
  },
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>