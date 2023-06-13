<template>
  <div class="contact-container" v-loading="loading">
    <div class="text-container">
      <h1 class="title">{{ scode.name }}</h1>
      <div class="desc">{{ scode.def1 }}</div>
      <div class="btns" v-if="navs && navs.length">
        <router-link
          :to="{ name: item.filename,params:{id:item.scode} }"
          v-for="(item, index) in navs"
          :key="item.id"
          class="btn"
          :class="{on:index === 2}"
          >{{ item.name }}</router-link
        >
      </div>
    </div>
    <img :src="webSite + scode.pic" class="bg" />
  </div>
</template>

<script>
import { getScodeInfo } from "@/api/getScode";
export default {
  data() {
    return {
      webSite: window.webSite,
      scodeId: 6,
      scode: {},
      loading: false,
      navs: [],
    };
  },
  async created() {
    this.loading = true;
    const scodeInfo = await getScodeInfo(this.scodeId);
    if (scodeInfo && scodeInfo.data) {
      this.scode = scodeInfo.data;
    }
    this.$store.dispatch("scode/getData", this.scodeId);

    const navs = await this.$api.getNav(this.scodeId);
    if (navs && navs.data) {
      this.navs = navs.data
        .map((item) => ({
          scode: item.scode,
          name: item.name,
          filename: item.filename,
          id: item.id,
        }))
        .filter((item, index) => index < 3);
    }
    this.loading = false;
  },
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>