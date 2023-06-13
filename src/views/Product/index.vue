<template>
  <div class="product-container" v-loading="loading">
    <aside class="aside-container">
      <ul class="tab-list">
        <li class="tab-item">
          <Icon title="家用电梯<br>设计" height="54px" :src="IconJydt" />
        </li>
        <li class="tab-item">
          <Icon title="轿厢装饰<br>型号" height="54px" :src="IconJxzs" />
        </li>
      </ul>
    </aside>
    <div class="content-container">
      <Banner :banner="scode" :activeIndex="activeIndex" @changeScode="handleChangeScode" />
      <div class="paginations">
        <ul class="page-list">
          <li
            class="page-item"
            v-for="item in banners"
            :key="item.id"
            :class="{
              on: item.scode === ($route.params.id ? $route.params.id : '8'),
            }"
          >
            <router-link
              :to="{
                name: 'Product',
                params: {
                  id: item.scode,
                },
              }"
              class="link"
            ></router-link>
            <p>{{ item.subname }}</p>
          </li>
        </ul>
      </div>
      <div class="product-swiper">
        <Swiper
          ref="mySwiper"
          class="product-list"
          :options="swiperOptions"
          v-if="products && products.length"
        >
          <SwiperSlide
            class="product-item"
            v-for="item in products"
            :key="item.id"
          >
            <Item :data="item" :scode="+$route.params.id" />
          </SwiperSlide>
        </Swiper>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </div>
    </div>
  </div>
</template>

<script>
import IconJydt from "@/assets/images/icon/jydtsj.svg";
import IconJxzs from "@/assets/images/icon/jxzsxh.svg";
import Icon from "@/components/Icon";
import Banner from "./components/Banner";
import Item from "./components/Item";
import getNav from "@/api/getNav";
import { getScodeInfo } from "@/api/getScode";
import getList from "@/api/getList";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";

export default {
  components: {
    Icon,
    Item,
    Banner,
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      IconJydt,
      IconJxzs,
      products: [],
      banners: [],
      loading: false,
      swiperOptions: {
        // loop: true,
        navigation: {
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next",
        },
        slidesPerView: 2,
        spaceBetween: 10,
        breakpoints: {
          768: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
        },
      },
      thatId: null,
      scode: {},
      activeIndex:0
    };
  },
  created() {
    this.getData();
    this.thatId = this.$route.params.id;
  },
  methods: {
    async handleChangeScode({scode, index}) {
      this.activeIndex = index;
      let navId = scode;
      // if (scode == 43) {
      //   navId = scode;
      // } else {
      //   navId = this.$route.params.id;
      // }
      if (this.thatId == navId) {
        return;
      }
      const products = await getList({ scode: navId });
      if (products && products.data) {
        this.thatId = navId;
        this.products = products.data;
      } else {
        const products = await getList({ scode: this.$route.params.id });
        if (products && products.data) {
          this.thatId = this.$route.params.id;
          this.products = products.data;
        } else {
          this.products = [];
        }
      }
    },
    async getData() {
      this.loading = true;
      const scodeData = await getScodeInfo(this.$route.params.id || 8);
      if (scodeData && scodeData.data) {
        this.scode = scodeData.data;
      }
      const banners = await getNav(1);
      if (banners.total) {
        this.banners = banners.data;
      }
      const products = await getList({ scode: this.$route.params.id || 8 });
      if (products && products.data) {
        this.products = products.data;
      }
      this.loading = false;
    },
  },
  watch: {
    $route() {
      this.getData();
      this.thatId = this.$route.params.id;
    },
  },
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>