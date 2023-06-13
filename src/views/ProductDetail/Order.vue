<template>
  <div class="order-container">
    <TitleComp :title="`${scode.name} ${rs.title} ${rs.ext_jj}`" />
    <div class="main-container">
      <div class="info-container">
        <InfoTitle title="订单信息" />
        <div class="content">
          <div class="img">
            <img :src="webSite + rs.ico" alt="" />
          </div>
          <div class="table">
            <table>
              <thead>
                <tr>
                  <td>轿厢设计</td>
                  <td>项目名称</td>
                  <td>地址</td>
                  <td>停靠层站</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{{ scode.name }}<br />{{ rs.title }}{{ rs.ext_jj }}</td>
                  <td>
                    <el-input
                      type="textarea"
                      :rows="2"
                      v-model="forms.xmmc"
                      class="inp"
                    >
                    </el-input>
                  </td>
                  <td>
                    <el-input
                      type="textarea"
                      :rows="2"
                      v-model="forms.address"
                      class="inp"
                    >
                    </el-input>
                  </td>
                  <td>
                    <el-input
                      type="textarea"
                      :rows="2"
                      v-model="forms.tkcz"
                      class="inp"
                    >
                    </el-input>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="buyer-container">
        <InfoTitle title="购买人信息" />
        <div class="content">
          <div class="inp">
            <span>*姓名：</span>
            <input
              type="text"
              v-model="forms.name"
              placeholder="请输入您的姓名"
            />
          </div>
          <div class="inp">
            <span>*称谓：</span>
            <p class="radio">
              <el-radio v-model="forms.sex" label="先生">先生</el-radio>
              <el-radio v-model="forms.sex" label="女士">女士</el-radio>
            </p>
          </div>
          <div class="inp">
            <span>*手机号：</span>
            <input
              type="text"
              v-model="forms.mobile"
              placeholder="请输入您的手机号"
            />
          </div>
        </div>
      </div>
      <div class="select-container">
        <InfoTitle title="选择经销商" />
        <div class="content">
          <div class="select-box">
            <el-select
              class="select"
              v-model="provinceVal"
              placeholder="请选择省份"
              @change="selectChange"
            >
              <el-option
                v-for="item in provinces"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <el-select
              class="select"
              v-model="cityVal"
              placeholder="请选择城市"
            >
              <el-option
                v-for="item in citys"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <ul class="company-list" v-if="jxss">
            <li
              class="company-item"
              v-for="(item, index) in jxss"
              :class="{ on: index === companyIndex }"
              :key="item.id"
              @click="setJxssVal(item.title, index)"
            >
              <div class="company">{{ item.title }}</div>
              <div class="cont" v-html="item.ext_cont"></div>
            </li>
          </ul>
          <input type="hidden" v-model="forms.jxs" />
        </div>
      </div>
    </div>
    <div class="bottom-fixed">
      <div class="left-layout">
        <div class="price">{{ rs.ext_jcj }}</div>
        <div class="tip">起</div>
      </div>
      <div class="right-layout">
        <div class="prev btn" @click="$router.back()">上一步</div>
        <div class="submit btn" @click="formSubmit">提交信息</div>
      </div>
    </div>
  </div>
</template>

<script>
import TitleComp from "./components/Title";
import InfoTitle from "./components/InfoTitle";
export default {
  components: {
    TitleComp,
    InfoTitle,
  },
  data() {
    return {
      webSite: window.webSite,
      provinceVal: "",
      provinceIndex: 0,
      companyIndex: null,
      cityVal: "",
      textarea: "",
      provinces: [],
      citys: [],
      jxss: [],
      forms: {
        xmmc: "",
        address: "",
        tkcz: "",
        name: "",
        sex: "",
        mobile: "",
        jxs: "",
      },
      rs: {},
      scode: {},
    };
  },
  async created() {
    const rs = await this.$api.getContent({ id: this.$route.params.id });
    if (rs && rs.data) {
      this.rs = rs.data;
    }
    const scode = await this.$api.getScodeInfo(this.$route.query.scode);
    if (scode && scode.data) {
      this.scode = scode.data;
    }
    let provinces = [];
    const provinceData = await this.$api.getNav(24);
    if (provinceData && provinceData.data) {
      provinces = provinceData.data;
    }
    this.provinces = provinces.map((item) => {
      return {
        value: item.scode,
        label: item.name,
      };
    });
  },
  methods: {
    selectChange(index) {
      this.cityVal = null;
      this.provinceIndex = +index;
    },
    async formSubmit() {
      if (!this.forms.xmmc) {
        this.$message({
          message: "项目名称不能为空！",
          type: "error",
        });
        return;
      }
      if (!this.forms.address) {
        this.$message({
          message: "地址不能为空！",
          type: "error",
        });
        return;
      }
      if (!this.forms.tkcz) {
        this.$message({
          message: "停靠层站不能为空！",
          type: "error",
        });
        return;
      }
      if (!this.forms.name) {
        this.$message({
          message: "姓名不能为空！",
          type: "error",
        });
        return;
      }
      if (!this.forms.sex) {
        this.$message({
          message: "称谓不能为空！",
          type: "error",
        });
        return;
      }
      if (!this.forms.mobile) {
        this.$message({
          message: "手机号不能为空！",
          type: "error",
        });
        return;
      }
      const mobileReg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;
      if (!mobileReg.test(this.forms.mobile)) {
        this.$message({
          message: "手机号格式错误！",
          type: "error",
        });
        return;
      }

      if (!this.forms.jxs) {
        this.$message({
          message: "请选择经销商！",
          type: "error",
        });
        return;
      }
      const forms = {
        ...this.forms,
        ...JSON.parse(sessionStorage.getItem("product")),
      };
      const result = await this.$api.postMsg(forms, 5);
      const that = this;
      if (result.total === 1) {
        this.$message({
          type: "success",
          message: result.data,
          onClose() {
            sessionStorage.removeItem("product");
            that.$router.push("/")
          },
        });
      }
    },
    setJxssVal(val, index) {
      this.$set(this.forms, "jxs", val);
      this.companyIndex = index;
    },
  },
  watch: {
    async provinceVal(scode) {
      this.jxss = [];
      const cityData = await this.$api.getNav(scode);
      let citys = [];
      if (cityData && cityData.data) {
        citys = cityData.data;
      }
      this.citys = citys.map((item) => {
        return {
          value: item.scode,
          label: item.name,
        };
      });
    },
    async cityVal(scode) {
      this.jxss = [];
      if (!scode) {
        return;
      }
      const jsxData = await this.$api.getList({ scode });
      if (jsxData && jsxData.data) {
        this.jxss = jsxData.data;
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "./order.less";
</style>