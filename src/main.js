// import "./mock";
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import "@/styles/reset.css"
import "@/styles/common.less"
import "@/styles/fonts.css"

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import VueAwesomeSwiper  from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
Vue.use(VueAwesomeSwiper)

if(process.env.NODE_ENV === "development"){
  window.webSite = "http://elviralift.mym35.com/"
} else{
  window.webSite = ""
}

// 引入api
import api from "@/api";
Vue.prototype.$api = api;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
