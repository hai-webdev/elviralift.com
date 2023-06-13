<template>
  <div class="innovate-list-container">
    <div class="item" v-for="item in navList" :key="item.id" :class="item.def1">
      <div class="content-container">
        <div class="left-layout">
          <div class="text">
            <div class="title">{{ item.name }}</div>
            <router-link :to="{ name: item.filename }" class="more"
              >了解更多</router-link
            >
          </div>
        </div>
        <div class="right-layout">
          <img v-if="item.ico" :src="webSite + item.ico" />
        </div>
      </div>
      <img :src="webSite + item.pic" class="bg" />
    </div>
  </div>
</template>

<script>
import getNav from "@/api/getNav";
export default {
  data() {
    return {
      scodeId: 4,
      navList: [],
      webSite: window.webSite,
    };
  },
  async created() {
    const navList = await getNav(this.scodeId);
    if (navList.data) {
      this.navList = navList.data;
    }
  },
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>