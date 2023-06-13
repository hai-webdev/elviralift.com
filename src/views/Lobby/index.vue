<template>
  <div class="lobby-container" v-loading="loading">
    <section class="banner-container">
      <div class="text">
        <div class="en-title">
          <p>{{ scode.def1 }}</p>
          <p>
            <span>{{ scode.def2 }}</span>
          </p>
        </div>
        <div class="cn-title">{{ scode.name }}</div>
      </div>
      <img :src="webSite + scode.pic" class="bg" />
    </section>
    <ul class="product-list">
      <li class="product-item" v-for="(item, i) in list" :key="i">
        <div class="img">
          <img :src="webSite + item.ico" alt="" />
        </div>
        <div class="text">
          <div class="en-title">{{ item.ext_xh }}</div>
          <div class="cn-title">{{ item.title }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import getList from "@/api/getList";
import { getScodeInfo } from "@/api/getScode";
export default {
  data() {
    return {
      webSite: window.webSite,
      scodeId: 2,
      list: [],
      scode: {},
      loading:false
    };
  },
  async created() {
    this.loading = true;
    const scodeInfo = await getScodeInfo(this.scodeId);
    if (scodeInfo && scodeInfo.data) {
      this.scode = scodeInfo.data;
    }
    const result = await getList({ scode: this.scodeId, num: 100 });
    if (result.data) {
      this.list = result.data;
    }
    this.loading = false;
  },
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>