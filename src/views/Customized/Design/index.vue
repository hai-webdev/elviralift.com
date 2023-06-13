<template>
  <div class="innovate-detail-container" v-loading="loading">
    <BannerItem v-for="item in list" :banner="item" :key="item.id" :isPage="true" />
  </div>
</template>

<script>
import BannerItem from "@/components/BannerItem";
import getList from "@/api/getList";
export default {
  components:{
    BannerItem
  },
  data() {
    return {
      scodeId: 53,
      list:[],
      loading:false
    };
  },
  async created(){
    this.loading = true;
    const list = await getList({scode: this.scodeId});
    if(list.data){
      this.list = list.data;
    }
    this.loading = false;
  }
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>