<template>
  <div class="banner-container">
    <img v-if="banner.pic" :src="webSite + banner.pic" alt="" />
    <div class="title-module">
      <div class="en-title" :style="{ color: banner.def3 }">
        {{ banner.def1 }}
      </div>
      <div class="en-subtitle" :style="{ color: banner.def3 }">
        {{ banner.def2 }}
      </div>
      <div class="title" :style="{ color: banner.def3 }">{{ banner.name }}</div>
    </div>
    <div class="nav-list">
      <a
        class="nav-item"
        v-for="(sub, index) in subNav"
        :class="{ on: index === activeIndex }"
        :key="sub.id"
        @click="changeScode(sub.scode, index)"
        >{{ sub.name }}</a
      >
    </div>
  </div>
</template>

<script>
import getNav from "@/api/getNav";
export default {
  props: {
    banner: {
      type: Object,
    },
    activeIndex: {
      default: 0,
      type: Number,
    },
  },
  data() {
    return {
      webSite: window.webSite,
      subNav: [],
    };
  },
  async created() {},
  methods: {
    changeScode(scode, index) {
      this.$emit("changeScode", { scode, index });
    },
  },
  watch: {
    async banner(val) {
      const result = await getNav(val.scode);
      if (result && result.data) {
        this.subNav = result.data;
      } else {
        this.subNav = [];
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>