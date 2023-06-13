<template>
  <div class="housekeep-container" v-loading="loading">
    <aside class="left-layout">
      <div class="title">{{ scode.name }}</div>
      <ul class="nav-list">
        <li
          class="nav-item"
          @click="changeIndex(index)"
          v-for="(data, index) in datas"
          :key="data.id"
          :class="{ on: activeIndex === index }"
        >
          <a>{{ data.title }}</a>
        </li>
      </ul>
    </aside>
    <div class="cont right-layout" v-if="datas[activeIndex]">
      <div class="banner">
        <div class="title-box">
          <div class="title">{{ datas[activeIndex].ext_nb1 }}</div>
          <div class="desc">{{ datas[activeIndex].ext_ms }}</div>
        </div>
        <img :src="webSite + datas[activeIndex].ico" class="bg" />
      </div>
      <div class="content" v-html="datas[activeIndex].content"></div>
    </div>
  </div>
</template>

<script>
import getList from "@/api/getList";
import { mapState } from "vuex";
export default {
  data() {
    return {
      webSite: window.webSite,
      scodeId: 52,
      activeIndex: 0,
      datas: [],
      loading:false
    };
  },
  async created() {
    this.loading = true;
    this.$store.dispatch("scode/getData", this.scodeId);
    this.getDataList();
    this.loading = false;
  },
  methods: {
    async getDataList() {
      const datas = await getList({ scode: this.scodeId });
      if (datas && datas.data) {
        this.datas = datas.data;
      }
    },
    changeIndex(index) {
      this.activeIndex = index;
    },
  },
  computed: {
    ...mapState({
      scode: (state) => state.scode.data,
    }),
  },
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>