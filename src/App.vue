<template>
  <div id="app">
    <Header />
    <Main />
    <Footer />
  </div>
</template>

<script>
import Header from "@/Layout/Header";
import Main from "@/Layout/Main";
import Footer from "@/Layout/Footer";
export default {
  components:{
    Header,
    Main,
    Footer
  }
}
</script>
<style lang="less" scoped>
#app{
  display: flex;
  flex-direction: column;
  padding-top: 128px;
}
</style>