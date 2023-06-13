<template>
  <div class="about-container" v-loading="loading">
    <img class="banner" :src="webSite + scode.pic" alt="" />
    <div class="content-container">
      <div class="content">
        <div class="item" v-for="item in list" :key="item.id">
          <div class="title-box">
            <span>{{ item.title }}</span>
          </div>
          <div class="cont" v-html="item.content"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  async created() {
    this.loading = true;
    this.$store.dispatch("about/getData");
    this.$store.dispatch("scode/getData", this.scodeId);
    const list = await this.$api.getList({ scode: this.scodeId });
    console.log(list);
    if (list.data) {
      this.list = list.data;
    }
    this.loading = false;
  },
  data() {
    return {
      webSite: window.webSite,
      loading: false,
      scodeId: 54,
      list: [],
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