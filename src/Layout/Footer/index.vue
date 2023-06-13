<template>
  <footer class="footer-container">
    <div class="foot-box">
      <div class="left-layout">
        <router-link to="/" class="logo">
          <img :src="webSite + label.dlogo" />
        </router-link>
        <ul class="icon-list">
          <li class="icon-item">
            <a>
              <img :src="iconWechat" class="icon" />
            </a>
            <div class="show" v-if="label.wx">
              <img :src="webSite + label.wx" />
            </div>
          </li>
          <li class="icon-item">
            <a target="_blank" :href="label.yx">
              <img :src="iconEmail" class="icon" />
            </a>
          </li>
          <li class="icon-item">
            <a target="_blank" :href="label.dt">
              <img :src="iconTiktok" class="icon" />
            </a>
          </li>
          <li class="icon-item">
            <a target="_blank" :href="label.wb">
              <img :src="iconWeibo" class="icon" />
            </a>
          </li>
        </ul>
      </div>
      <div class="right-layout">
        <ul class="nav-list">
          <li class="nav-item" v-for="nav in navs" :key="nav.id">
            <div class="title">{{nav.name}}</div>
            <template v-if="nav.son">
              <router-link v-for="n in nav.son" :key="n.id" class="link"  :to="{ name:  n.filename || nav.filename, params: { id: n.scode } }">{{n.name}}</router-link>
            </template>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script>
import iconWechat from "@/assets/images/icon-wechat.png";
import iconEmail from "@/assets/images/icon-email.png";
import iconTiktok from "@/assets/images/icon-tiktok.png";
import iconWeibo from "@/assets/images/icon-weibo.png";
import { mapState } from "vuex";
export default {
  data() {
    return {
      webSite: window.webSite,
      iconWechat,
      iconEmail,
      iconTiktok,
      iconWeibo,
    };
  },
  created() {
    this.$store.dispatch("label/getData");
  },
  computed: {
    ...mapState({
      label: (state) => state.label.data,
      navs: state => state.nav.data
    }),
  },
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>