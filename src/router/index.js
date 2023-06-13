import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";
import Product from "@/views/Product";
import About from "@/views/About";
import News from "@/views/About/views/News";
import Contact from "@/views/Contact";
import Reservation from "@/views/Contact/views/Reservation";
import Dealer from "@/views/Contact/views/Dealer";
import Message from "@/views/Contact/views/Message";
import Innovate from "@/views/Innovate";
import InnovateList from "@/views/Innovate/views/List";
import Design from "@/views/Innovate/views/Design";
import Interconnection from "@/views/Innovate/views/Interconnection";
import Customized from "@/views/Customized";
import Housekeep from "@/views/Customized/views/Housekeep";
import CustomizedDesign from "@/views/Customized/Design";
import ProductDetail from "@/views/ProductDetail";
import Lobby from "@/views/Lobby";
import ManMachine from "@/views/ManMachine";
import ProductDetailOrder from "@/views/ProductDetail/Order";
import titleController from "../utils/titleController";
import store from "@/store";

Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/product/:id",
    name: "Product",
    component: Product,
    meta: {
      title: "轿厢设计",
    },
  },
  {
    path: "/product/detail/:id",
    name: "ProductDetail",
    component: ProductDetail,
  },
  {
    path: "/product/detail/order/:id",
    name: "ProductDetailOrder",
    component: ProductDetailOrder,
  },
  {
    path: "/lobby",
    name: "Lobby",
    component: Lobby,
  },
  {
    path: "/man-machine",
    name: "ManMachine",
    component: ManMachine,
  },
  {
    path: "/about",
    name: "About",
    component: About,
    meta: {
      title: "关于我们",
    },
  },
  {
    path: "/about/news",
    name: "News",
    component: News,
    meta: {
      title: "新闻中心",
    },
  },
  {
    path: "/contact",
    name: "Contact",
    component: Contact,
    meta: {
      title: "联系我们",
    },
  },
  {
    path: "/contact/reservation",
    name: "Reservation",
    component: Reservation,
  },
  {
    path: "/contact/dealer",
    name: "Dealer",
    component: Dealer,
  },
  {
    path: "/contact/join",
    name: "Join",
    component: Dealer,
  },
  {
    path: "/contact/message",
    name: "Message",
    component: Message,
  },
  {
    path: "/innovate",
    name: "Innovate",
    component: Innovate,
  },
  {
    path: "/innovate/list",
    name: "InnovateList",
    component: InnovateList,
  },
  {
    path: "/innovate/design",
    name: "Design",
    component: Design,
  },
  {
    path: "/innovate/interconnection",
    name: "Interconnection",
    component: Interconnection,
  },
  {
    path: "/customized",
    name: "Customized",
    component: Customized,
  },
  {
    path: "/customized/housekeep",
    name: "Housekeep",
    component: Housekeep,
  },
  {
    path: "/customized/design",
    name: "CustomizedDesign",
    component: CustomizedDesign,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
router.afterEach(async (to) => {
  document.body.scrollTop = 0;
  await store.dispatch("site/getData");
  if (
    store.state.site &&
    store.state.site.data &&
    store.state.site.data.title
  ) {
    titleController.setSiteTitle(store.state.site.data.title);
    if (to.meta.title) {
      titleController.setRouteTitle(to.meta.title);
    }
  }
});
router.beforeEach((to, from, next) => {
  if (to.path === "/product/1") {
    next("/product/8");
  } else {
    next();
  }
});
export default router;
