<template>
  <div class="product-detail-container" v-loading="loading">
    <div class="banner-container">
      <div class="main-box">
        <div class="left-layout">
          <div class="en-title">
            <p>{{ scode.def1 }}</p>
            <p>
              <span>{{ scode.def2 }}</span>
            </p>
          </div>
          <div class="cn-title">{{ scode.name }}</div>
          <div class="btns">
            <router-link :to="{ name: 'Reservation' }" class="btn"
              >预约试乘</router-link
            >
          </div>
        </div>
        <div class="right-layout">
          <img :src="webSite + rs.ico" class="pro" />
          <div class="text">
            <div class="title-box">
              <p>{{ rs.title }}</p>
              <p>
                <span>{{ rs.ext_jj }}</span>
              </p>
            </div>
            <ul class="params" v-if="params.length">
              <li class="param" v-for="(param, index) in params" :key="index">
                <p class="bold">{{ param.key }}</p>
                <p>{{ param.val }}</p>
              </li>
              <li class="param patent" v-if="rs.ext_patent">
                <p class="bold">专利号</p>
                <p>{{ rs.ext_patent }}</p>
              </li>
            </ul>
            <a :href="rs.ext_qj" target="_blank" class="view">观看720°全景</a>
          </div>
        </div>
      </div>
      <img :src="webSite + rs.ext_bg" alt="" class="bg" />
    </div>
    <TitleComp :title="`${scode.name} ${rs.title} ${rs.ext_jj}`" />
    <div class="content">
      <div class="left-layout">
        <div class="cont">
          <div class="text">
            <div class="left-layout">
              <div class="title">{{ scode.name }}</div>
              <div class="desc">{{ rs.title }} {{ rs.ext_jj }}</div>
            </div>
            <div class="right-layout">
              <img :src="webSite + rs.ico" alt="" />
            </div>
          </div>
          <img :src="webSite + rs.ext_bg" class="bg-img" />
        </div>
      </div>
      <div class="right-layout">
        <div class="top">
          <el-tabs v-model="activeName">
            <el-tab-pane label="轿厢设计" name="first">
              <div class="select">
                <div class="title">家用电梯设计</div>
                <div class="option" v-for="item in jydtsj" :key="item.id">
                  {{ item }}
                </div>
              </div>
              <div class="select">
                <div class="title">轿厢装饰型号</div>
                <div class="option">
                  {{ rs.title + " " + rs.ext_jj }}
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="井道设计" name="second">
              <div class="select">
                <div class="type-title">井道类型</div>
                <div class="option" v-for="item in kj_typeList" :key="item.id">
                  {{ item }}
                </div>
              </div>

              <ul class="type-cont-list">
                <li class="type-cont-item">
                  <div class="color-title">框架颜色</div>
                  <ul class="color-list">
                    <li
                      class="color-item"
                      v-for="item in typeColor"
                      :key="item.id"
                    >
                      <div
                        class="color c"
           
                      >
                        <img :src="webSite + item.ico" :alt="item.title" />
                      </div>
                      <p>{{ item.title }}</p>
                    </li>
                  </ul>
                </li>
                <li class="type-cont-item">
                  <template
                    v-if="$route.query.scode == 10 || $route.query.scode == 12"
                  >
                    <div class="programme-title">安装方案</div>
                    <ul class="programme-list">
                      <li
                        class="programme-item"
                        v-for="(item, i) in programmeList"
                        :key="i"
                      >
                        <img
                          :src="webSite + item.img"
                          :alt="item.title"
             
                          :class="{ on: i === programmeIndex }"
                        />
                        <p>{{ item.title }}</p>
                      </li>
                    </ul>
                  </template>
                </li>
              </ul>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="bottom">
          <div class="price">{{ rs.ext_jcj }}<span>起</span></div>
          <a @click="next" class="next">下一步</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TitleComp from "./components/Title";
import getContent from "@/api/getContent";
import { mapState } from "vuex";
export default {
  components: {
    TitleComp,
  },
  data() {
    return {
      loading: false,
      webSite: window.webSite,
      rs: {},
      activeName: "first",
      // colorIndex: null,
      // programmeIndex: null,
      type: 1,
      dtsjList: [],
      forms: {
        kj_color: "",
        azfa: "",
      },
      allColor: [],
    };
  },
  async created() {
    this.loading = true;
    this.$store.dispatch("scode/getData", this.$route.query.scode);
    const cont = await getContent({ id: this.$route.params.id });
    if (cont.data) {
      this.rs = cont.data;
    }
    const dtsjList = await this.$api.getNav(this.$route.query.scode);
    if (dtsjList && dtsjList.data) {
      this.dtsjList = dtsjList.data;
    }
    this.forms.product_id = this.$route.params.id;
    const allColor = await this.$api.getList({ scode: 50 });
    if (allColor && allColor.data) {
      this.allColor = allColor.data;
    }
    this.loading = false;
  },
  computed: {
    ...mapState({
      scode: (state) => state.scode.data,
    }),
    jydtsj(){
      if(this.rs.ext_jydtsj){
        return this.rs.ext_jydtsj.split("<br>");
      }
      return []
    },
    kj_typeList() {
      if (this.rs.ext_kj_type) {
        return this.rs.ext_kj_type.split(",");
      } else {
        return [];
      }
    },
    params() {
      if (this.rs.ext_params) {
        const data = this.rs.ext_params.split(",");
        return data.map((item) => {
          const d = item.split("|");
          return {
            key: d[0],
            val: d[1],
          };
        });
      } else {
        return [];
      }
    },
    typeColor() {
      const result = this.allColor.filter((item) =>
        this.rs.ext_kjys.includes(item.id)
      );
      if (result) {
        return result;
      }
      return [];
    },
    programmeList() {
      let pics, picsname;
      if (this.rs.pics) {
        pics = this.rs.pics.split(",");
      }
      if (this.rs.picsname) {
        picsname = this.rs.picsname.split(",");
      }
      if (pics && typeof pics.map === "function") {
        return pics.map((item, index) => {
          return {
            title: picsname[index],
            img: item,
          };
        });
      }
      return [];
    },
  },
  methods: {

    next() {
      if (this.activeName === "first") {
        this.activeName = "second";
      } else {
        if (!this.forms.product_id) {
          this.$message({
            message: "请选择产品！",
            type: "error",
          });
          return;
        }
        sessionStorage.setItem("product", JSON.stringify(this.forms));
        this.$router.push({
          name: "ProductDetailOrder",
          query: {
            scode: this.$route.query.scode,
          },
        });
      }
    },
    changeType(i) {
      this.type = i;
    },
  },
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>