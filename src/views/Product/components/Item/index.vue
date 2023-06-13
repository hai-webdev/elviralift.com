<template>
  <div class="item-container">
    <div class="top">
      <div class="title">{{ data.title }} {{ data.ext_jj }}</div>
      <div class="img">
        <img :src="webSite + data.ico" :alt="data.title" />
      </div>
      <router-link :to="{
        name:'ProductDetail',
        params:{
          id:data.id,
        },
        query:{
          scode,
        }
      }" class="more">查看详情</router-link>
      
    </div>
    <div class="bottom">
      <ul>
        <li>
         <router-link :to="{name:'Dealer', params:{id:'24'}}"> <Icon title="查经销商" :src="IconCjxs" height="24px" mb="3px" :fontSize="12" /></router-link>
        </li>
        <li>
          <router-link :to="{name:'Reservation'}">
            <Icon title="预约试乘" :src="IconYysc" height="24px" mb="3px" :fontSize="12" />
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import IconCjxs from "@/assets/images/icon/cjxs.svg";
import IconYysc from "@/assets/images/icon/yysc.svg";
import Icon from "@/components/Icon";
export default {
  data() {
    return {
      webSite:window.webSite,
      IconCjxs,
      IconYysc,
    };
  },
  components: {
    Icon,
  },
  props: {
    data: {
      type: Object,
    },
    scode:{
      type:Number
    }
  },
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>