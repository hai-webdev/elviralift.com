import Vue from 'vue'
import Vuex from 'vuex'
import site from "./site";
import label from "./label";
import scode from "./scode";
import nav from "./nav";
import slide from "./slide";
import about from "./about";
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    site,
    label,
    scode,
    nav,
    slide,
    about
  },
  strict:true
})
