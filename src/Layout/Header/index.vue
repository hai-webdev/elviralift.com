<template>
  <header class="header-container">
    <div class="logo-container">
      <router-link to="/">
        <img :src="webSite + logo" :alt="companyTitle"
      /></router-link>
    </div>
    <div class="nav-container">
      <ul class="nav-list">
        <li class="nav-item" v-for="nav in navs" :key="nav.id">
          <router-link
            :to="{
              name: nav.filename,
              params: { id: nav.scode },
            }"
            active-class="on"
            exact-active-class=""
            :class="{
              on:
                nav.filename === $route.name ||
                (nav.scode === '1' && $route.name === 'ProductDetail'),
            }"
            >{{ nav.name }}</router-link
          >
          <div class="nav-subbox" v-if="nav.son">
            <ul class="sublist">
              <li class="subitem" v-for="n in nav.son" :key="n.id">
                <router-link
                  :to="{
                    name: n.filename || nav.filename,
                    params: { id: n.scode },
                  }"
                  exact-active-class="on"
                  >{{ n.name }}</router-link
                >
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      webSite: window.webSite,
    };
  },
  created() {
    this.$store.dispatch("site/getData");
    this.$store.dispatch("nav/getData");
  },
  computed: {
    ...mapState({
      logo: (state) => state.site.data.logo,
      companyTitle: (state) => state.site.data.title,
      navs: (state) => {
        if (state && state.nav && state.nav.data && typeof state.nav.data.map === 'function') {
          state.nav.data.map((item) => {
            item.filename = item.filename.split("-")
              ? item.filename.split("-")[0]
              : item.filename;
            if (item.son && item.son.length) {
              item.son.map((i) => {
                i.filename = i.filename.split("-")
                  ? i.filename.split("-")[0]
                  : i.filename;
                return i;
              });
            }
            return item;
          });
          return state.nav.data;
        }
      },
    }),
  },
  watch: {
    $route() {},
  },
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>