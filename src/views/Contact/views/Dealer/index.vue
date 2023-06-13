<template>
  <div class="dealer-container">
    <h1 class="page-title">
      {{ $route.params.id === "24" ? "联系艾薇拉" : "加入艾薇拉" }}
    </h1>
    <div class="map-box">
      <div class="map-info">
        <div class="title-box">
          <div class="city">
            <div class="left-layout">
              <i class="address el-icon-location-outline"></i>
              <span>{{ cityObj.name || currentCity }}</span>
              <i class="el-icon-aim"></i>
            </div>
            <div class="right-layout">
              <el-cascader
                v-model="cityVal"
                :options="citys"
                placeholder="更改城市"
                @change="handleChange"
                :show-all-levels="false"
              ></el-cascader>
            </div>
          </div>
        </div>
        <div class="search-box">
          <i class="icon-search el-icon-search"></i>
          <input type="text" placeholder="经销商名称" />
        </div>
        <div class="info">为您找到{{ jxsList.length }}个经销商</div>

        <ul class="dealer-list">
          <li
            class="dealer-item"
            v-for="(item, index) in jxsList"
            :key="item.id"
            :class="{ on: index === jxsIndex }"
            @click="selectAddress(item)"
          >
            <div class="dealer-box">
              <div class="title">
                {{ (index + 1).toString().padStart(2, 0) }} {{ item.title }}
              </div>

              <div
                v-if="$route.fullPath === '/contact/dealer'"
                class="cont"
                v-html="item.ext_cont"
              ></div>
              <div
                v-else-if="$route.fullPath === '/contact/join'"
                class="cont"
                v-html="item.ext_join"
              ></div>
            </div>
          </li>
        </ul>
      </div>

      <div class="map-address" v-if="mapInfo.id && mapShow">
        <div class="title">{{ mapInfo.title }}</div>
        <div class="cont">
          <p
            v-if="$route.fullPath === '/contact/dealer'"
            v-html="mapInfo.ext_cont"
          ></p>
          <p
            v-else-if="$route.fullPath === '/contact/join'"
            v-html="mapInfo.ext_join"
          ></p>
        </div>
        <div class="btns">
          <router-link
            v-if="$route.params.id === '24'"
            :to="{ name: 'Reservation' }"
            class="btn"
            >预约试乘</router-link
          >
          <a
            :href="mapInfo.ext_route"
            v-if="mapInfo.ext_route"
            :target="mapInfo.ext_route && '_blank'"
            class="btn black"
            >查看路线</a
          >
        </div>
      </div>

      <Amap
        id="map"
        class="map"
        :city="currentCity"
        :address="address"
        :contentId="mapId"
        @getCurrentCity="getCurrentCity"
        @touch="handleMapTouch"
      />
    </div>
  </div>
</template>

<script>
import Amap from "@/components/Amap";
export default {
  data() {
    return {
      currentCity: "",
      cityVal: "",
      cityObj: {},
      citys: [],
      jxsList: [],
      jxsIndex: null,
      address: "",
      mapId: null,
      mapInfo: {},
      jxsId: null,
      mapShow:false,
    };
  },
  async created() {
    let citys = [];
    if (this.$route.name === "Dealer") {
      this.jxsId = 24;
    } else if (this.$route.name === "Join") {
      this.jxsId = 26;
    }
    if (!this.jxsId) {
      return [];
    }
    const province = await this.$api.getNav(this.jxsId);
    if (province && province.data) {
      citys = province.data.map((item) => ({
        value: item.scode,
        label: item.name,
      }));
    }
    for (const item of citys) {
      const ci = await this.$api.getNav(item.value);
      if (ci && ci.data) {
        item.children = ci.data.map((it) => ({
          value: it.scode,
          label: it.name,
        }));
      }
    }
    this.citys = citys;

    if (this.currentCity) {
      const cityReplace = this.currentCity.replace("市", "");
      let currentCityObj = {};
      for (const item of this.citys) {
        if (item.children) {
          for (const it of item.children) {
            if (it.label === cityReplace) {
              currentCityObj = it;
            }
          }
        }
      }
      if (!currentCityObj.length) {
        this.jxsList = [];
        return;
      }
      const jxsDatas = await this.$api.getList({ scode: currentCityObj.value });
      if (jxsDatas && jxsDatas.data) {
        this.jxsList = jxsDatas.data;
      } else {
        this.jxsList = [];
      }
    }
  },
  components: {
    Amap,
  },
  watch: {
    async cityVal(val) {
      const scode = val[val.length - 1];
      const scodeData = await this.$api.getScodeInfo(scode);
      if (scodeData && scodeData.data) {
        this.cityObj = {
          name: scodeData.data.name,
          scode,
        };
        this.currentCity = this.cityObj.name;
        const data = await this.$api.getList({ scode: this.cityObj.scode });
        if (data && data.data) {
          this.jxsList = data.data;
        } else {
          this.jxsList = [];
        }
      }
    },
    async $route() {
      this.jxsList = [];
      this.mapInfo = {};
      this.currentCity = null;
      this.address = null;
      this.mapId = null;
      let citys = [];
      if (this.$route.name === "Dealer") {
        this.jxsId = 24;
      } else if (this.$route.name === "Join") {
        this.jxsId = 26;
      }
      if (!this.jxsId) {
        return [];
      }
      const province = await this.$api.getNav(this.jxsId);
      if (province && province.data) {
        citys = province.data.map((item) => ({
          value: item.scode,
          label: item.name,
        }));
      }
      for (const item of citys) {
        const ci = await this.$api.getNav(item.value);
        if (ci && ci.data) {
          item.children = ci.data.map((it) => ({
            value: it.scode,
            label: it.name,
          }));
        }
      }
      this.citys = citys;
    },
  },
  methods: {
    handleMapTouch(mapShow){
      this.mapShow = mapShow;
    },
    getCurrentCity(city) {
      this.currentCity = city;
    },
    handleChange() {},
    selectAddress(item) {
      if (item) {
        this.mapInfo = item;
        this.mapShow = true;
      }
      if (item.ext_address) {
        this.address = item.ext_address;
      }
      if (item.id) {
        this.mapId = +item.id;
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>