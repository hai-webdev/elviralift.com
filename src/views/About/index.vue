<template>
  <div class="about-container" v-loading="loading">
    <img class="banner" :src="webSite + scode.pic" alt="" />
    <div class="content-container">
      <div class="content">
        <div class="title-box">
          <span>艾薇拉新闻</span>
        </div>
        <div class="bg-box">
          <router-link :to="{name:'News'}">了解更多</router-link>
          <img :src="webSite + scode.ico" class="bg" />
        </div>
      </div>
      <div class="content">
        <div class="title-box">
          <span>{{ scode.name }}</span>
        </div>
        <div class="cont" v-html="cont.content"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import getContent from "@/api/getContent";
export default {
  async created() {
    this.loading = true;
    this.$store.dispatch("about/getData");
    this.$store.dispatch("scode/getData", this.scodeId);
    const cont = await getContent({ scode: this.scodeId });
    if (cont.data) {
      this.cont = cont.data;
    }
    this.loading = false;
  },
  data() {
    return {
      webSite: window.webSite,
      loading:false,
      scodeId: 7,
      cont: {},
    };
  },
  computed: {
    ...mapState({
      about: (state) => state.about.data,
      scode: (state) => state.scode.data,
    }),
  },
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>