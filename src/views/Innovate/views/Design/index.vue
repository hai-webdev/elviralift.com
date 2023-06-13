<template>
  <div class="design-container">
    <div class="banner-container" v-for="item in topList" :key="item.id">
      <div class="text">
        <div class="en-title">
          <p>{{item.subtitle}}</p>
          <p><span>{{item.ext_wb}}</span></p>
        </div>
        <div class="cn-title">{{item.title}}</div>
      </div>
      <img :src="webSite + item.ico" class="bg" />
    </div>
    <template v-if="list">
      <BannerItem v-for="item in list" :banner="item" :key="item.id" />
    </template>
  </div>
</template>

<script>
import BannerItem from "@/components/BannerItem";
import { mapState } from 'vuex';
import getList from "@/api/getList";
export default {
  components:{
    BannerItem
  },
  data() {
    return {
      webSite:window.webSite,
      scodeId:19,
      topList:[],
      list:[],

    };
  },
  async created(){
      const list = await getList({scode:this.scodeId});
      if(list.data){
        this.list = list.data.filter(item => !+item.isrecommend);
        this.topList = list.data.filter(item => +item.isrecommend);
      }
  },
  computed:{
    ...mapState({
      scode:state => state.scode.data
    })
  }
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>