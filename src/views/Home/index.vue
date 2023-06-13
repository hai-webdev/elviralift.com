<template>
  <div class="home-container">
    <div class="banner-swiper">
      <Swiper ref="mySwiper" :options="swiperOptions" v-if="banners && banners.length">
        <SwiperSlide
          class="banner-item"
          v-for="banner in banners"
          :key="banner.id"
        >
          <img :src="webSite + banner.pic" class="bg" />
          <div class="banner-box">
            <div class="text" :class="banner.description">
            <div class="title">{{ banner.title }}</div>
            <div class="desc">{{ banner.subtitle }}</div>
            <router-link :to="banner.link" class="link">了解更多</router-link>
          </div>
          <img :src="webSite + banner.wappic" class="img">
          </div>
        </SwiperSlide>
      </Swiper>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
      <div class="swiper-pagination"></div>
    </div>
    <Product />
    <Lobby />
    <ManMachine />
    <Innovate />
    <Customized />
    <Contact />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import Product from "@/views/Product"
import Lobby from "@/views/Lobby"
import ManMachine from "@/views/ManMachine"
import Innovate from "@/views/Innovate"
import Customized from "@/views/Customized"
import Contact from "@/views/Contact"
export default {
  components: {
    Swiper,
    SwiperSlide,
    Product,
    Lobby,
    ManMachine,
    Innovate,
    Customized,
    Contact
  },
  data() {
    return {
      webSite:window.webSite,
      swiperOptions: {
        autoplay:{
          delay:5000
        },
        loop: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next",
        },
      },
    };
  },
  async created() {
    this.$store.dispatch("slide/getData");
  },
  computed: {
    ...mapState({
      banners: (state) => state.slide.data,
    }),
  },
  methods: {

  },
};
</script>

<style scoped lang="less">
@import "./index.less";
</style>
