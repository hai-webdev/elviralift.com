<template>
  <div id="amap-container" ref="amap-container"></div>
</template>

<script>
import AMapLoader from "@amap/amap-jsapi-loader";
window._AMapSecurityConfig = {
  securityJsCode: "f4c9135eec29b2c59470813f486ff43d",
};
export default {
  props: {
    city: {
      type: String,
    },
    address: {
      type: String,
    },
    contentId: {
      type: Number,
    },
  },
  data() {
    return {
      AMap: null,
      map: null,
      mouseTool: null,
      overlays: [],
      auto: null,
      placeSearch: null,
    };
  },
  methods: {
    async mapRender() {
      this.placeSearch = await new this.AMap.PlaceSearch({
        map: this.map,
        center:[116.436144,39.855115],
        panel: "panel", // 结果列表将在此容器中进行展示。
        city: this.$props && this.$props.city ? this.$props.city : "", // 兴趣点城市
        autoFitView: true, // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
        extensions: "base", //返回基本地址信息
      });
      // ip定位
      if (this.$props.address) {
        this.placeSearch.search(this.$props.address);
      } else {
        this.showCityInfo(this.AMap);
      }
    },
    async initMap() {
      this.map = new this.AMap.Map(this.$refs["amap-container"], {
        viewMode: "2D", //  是否为3D地图模式
        zoom: 13, // 初始化地图级别
        resizeEnable: true,
      });
      this.mapRender(this.AMap);
    },
    showCityInfo() {
      const that = this;
      //实例化城市查询类
      var citysearch = new this.AMap.CitySearch();
      //自动获取用户IP，返回当前城市
      citysearch.getLocalCity(function (status, result) {
        if (status === "complete" && result.info === "OK") {
          if (result && result.city && result.bounds) {
            var cityinfo = result.city;
            var citybounds = result.bounds;
            that.$emit("getCurrentCity", cityinfo);
            //地图显示当前城市
            that.map.setBounds(citybounds);
          }
        } else {
          // document.getElementById('info').innerHTML = result.info;
        }
      });
    },
  },
  async mounted() {
    this.AMap = await AMapLoader.load({
      key: "297de09674d8a3858964796ed270b333", // 申请好的Web端开发者Key，首次调用 load 时必填
      version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: ["AMap.AutoComplete", "AMap.PlaceSearch", "AMap.CitySearch"], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    });
    this.initMap();
  },
  watch: {
    city() {
      this.mapRender(this.AMap);
    },
    address() {
      this.mapRender(this.AMap);
    },
    contentId() {
      this.mapRender(this.AMap);
    },
  },
};
</script>

<style lang="less" scoped>
#amap-container {
  width: 100%;
  height: 100%;
}
</style>