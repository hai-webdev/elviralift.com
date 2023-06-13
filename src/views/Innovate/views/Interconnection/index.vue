<template>
  <div class="interconnection-container">
    <div class="banner-container">
      <div class="text-box">
        <div class="title-box">
          <h1>
            <span>{{ info1.subname }}</span
            >{{ info1.def1 }}
          </h1>
          <h2>{{ info1.def2 }}</h2>
          <div class="cn-title">{{ info1.name }}</div>
        </div>
        <ul class="icon-list">
          <li class="icon-item" v-for="item in iconList" :key="item.id">
            <img :src="webSite + item.ico" alt="" class="icon" />
            <div class="text">
              <p>{{item.title}}</p>
              <p>{{item.ext_wb}}</p>
            </div>
          </li>
        </ul>
        <div class="title">{{ info2.title }}</div>
        <div class="desc" v-html="info2.content"></div>
      </div>
      <img :src="webSite + info2.ico" alt="" class="img" />
    </div>
    <ul class="list">
      <li
        class="item"
        v-for="item in list"
        :key="item.id"
        :class="{ bg: item.ext_bg_big === '是' }"
      >
        <img :src="webSite + item.ico" :alt="item.title" class="img" />
        <div class="text">
          <div class="title">{{ item.title }}</div>
          <div class="desc" v-html="item.content"></div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import getContent from "@/api/getContent";
import getList from "@/api/getList";
import { mapState } from "vuex";

export default {
  data() {
    return {
      webSite: window.webSite,
      info2: {},
      list: [],
      iconList:[]
    };
  },
  async created() {
    this.$store.dispatch("scode/getData", 20);
    const cont = await getContent({ scode: 21 });
    if (cont.data) {
      this.info2 = cont.data;
    }
    const list = await getList({ scode: 22 });
    if (list.data) {
      this.list = list.data;
    }
    const iconList = await getList({ scode: 20 });
    if (iconList.data) {
      this.iconList = iconList.data;
    }
  },
  computed: {
    ...mapState({
      info1: (state) => state.scode.data,
    }),
  },
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>