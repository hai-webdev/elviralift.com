<template>
  <div
    class="contact-container"
    :style="{ backgroundImage: `url(${webSite + scode.pic})` }"
  >
    <div class="contact-box">
      <div class="left-layout">
        <div class="title">{{ scode.name }}</div>
        <div class="subtitle">{{ scode.def1 }}</div>
      </div>
      <div class="center-layout">
        <img :src="webSite + scode.ico" alt="" />
      </div>
      <div class="right-layout">
        <div class="form-container" v-if="!formIsSuccess">
          <p>
            <input
              type="text"
              v-model="form.name"
              placeholder="请输入您的姓氏"
            />
          </p>
          <p class="sex-box">
            <label for="mr">
              <input type="radio" id="mr" value="先生" v-model="form.sex" />
              <i></i>
              <span>先生</span>
            </label>
            <label for="ms">
              <input type="radio" id="ms" value="女士" v-model="form.sex" />
              <i></i>
              <span>女士</span>
            </label>
          </p>
          <p>
            <input
              type="text"
              v-model="form.mobile"
              placeholder="请输入您的手机号"
            />
          </p>
          <p class="two">
            <select v-model="form.type">
              <option value="">请选择心仪电梯类型</option>
              <option
                :value="{value:item.value,name:item.label}"
                v-for="item in types"
                :key="item.value"
              >
                {{ item.label }}
              </option>
            </select>
            <select v-model="form.model">
              <option value="">请选择心仪电梯型号</option>
              <option
                :value="{value:item.value,name:item.label}"
                v-for="item in models"
                :key="item.value"
              >
                {{ item.label }}
              </option>
            </select>
          </p>
          <p>
            <select v-model="form.product">
              <option value="">请选择心仪装饰型号</option>
              <option
                :value="{value:item.value,name:item.label}"
                v-for="item in products"
                :key="item.value"
              >
                {{ item.label }}
              </option>
            </select>
          </p>
          <p>
            <select v-model="form.address">
              <option value="">请选择您的城市</option>
              <option :value="{value:item.scode,name:item.name}" v-for="item in citys" :key="item.id">{{item.name}}</option>
            </select>
            <label for="distance" class="prior-box">
              <input
                type="radio"
                id="distance"
                value="距离优先"
                v-model="form.distance"
              />
              <i></i>
              <span>距离优先</span>
            </label>
          </p>
          <p>
            <select v-model="form.position">
              <option value="">请选择您的展厅位置</option>
              <option
                :value="item.label"
                v-for="item in positions"
                :key="item.value"
              >
                {{ item.label }}
              </option>
            </select>
          </p>
          <div class="privacy-policy">
            <label for="privacy-policy">
              <input
                type="checkbox"
                id="privacy-policy"
                v-model="form.privacyPolicy"
              />
              <i></i>
              <span for="privacy-policy"
                >我仔细阅读了并接受所附属的<a>隐私政策</a></span
              >
            </label>
          </div>
          <button class="pre-book" @click="submit">即刻预约</button>
        </div>
        <div class="reservation-success" v-else>
          <div class="title">预约成功</div>
          <div class="desc">
            <p>您的预约申请已经提交成功，</p>
            <p>相应经销商将尽快与您联系。</p>
          </div>
          <div class="hr"></div>
          <div class="address">
            <p>艾薇拉家用（别墅）电梯城市展厅</p>
            <p>上城区九环路9号浙江省国家大学科技园</p>
          </div>
          <div class="btns">
            <div class="other btn">浏览其他梯形</div>
            <router-link to="/" class="to-home btn">返回首页</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import postMsg from "@/api/postMsg";
export default {
  data() {
    return {
      scodeId: 25,
      webSite: window.webSite,
      form: {
        name: "",
        sex: "",
        mobile: "",
        type: "",
        model: "",
        product: "",
        address: "",
        distance: "",
        position:"",
        privacyPolicy: false,
      },
      citys:[],
      types: [],
      models: [],
      products:[],
      positions:[],
      formIsSuccess: false,
    };
  },
  async created() {
    this.$store.dispatch("scode/getData", this.scodeId);
    const types = await this.$api.getNav(1);
    if (types && types.data) {
      this.types = types.data.map((item) => {
        return {
          value: item.scode,
          label: item.name,
        };
      });
    }
    const citys = await this.$api.getNav(31);
    if(citys && citys.data){
      this.citys = citys.data;
    }
  },
  watch: {
    async ["form.type"](val) {
      this.form.model = "";
      const model = await this.$api.getNav(val.value);
      if (model && model.data) {
        this.models = model.data.map((item) => {
          return {
            value: item.scode,
            label: item.name,
          };
        });
      }
    },
    async ["form.model"](val) {
      this.form.product = "";
      const product = await this.$api.getList({scode:val.value});
      if (product && product.data) {
        this.products = product.data.map((item) => {
          return {
            value: item.title,
            label: item.title,
          };
        });
      }
    },
    async ["form.address"](val) {
      this.form.position = "";
      const position = await this.$api.getList({scode:val.value});
      if (position && position.data) {
        this.positions = position.data.map((item) => {
          return {
            value: item.id,
            label: item.title,
          };
        });
      } else{
        this.positions = [];
      }
    },
  },
  computed: {
    ...mapState({
      scode: (state) => state.scode.data,
    }),
  },
  methods: {
    async submit() {
      if (!this.form.name) {
        this.$message({
          message: "姓氏不能为空！",
          type: "error",
        });
        return;
      }
      if (!this.form.sex) {
        this.$message({
          message: "性别不能为空！",
          type: "error",
        });
        return;
      }
      if (!this.form.mobile) {
        this.$message({
          message: "手机号不能为空！",
          type: "error",
        });
        return;
      }
      const mobileReg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;
      if (!mobileReg.test(this.form.mobile)) {
        this.$message({
          message: "手机号格式错误！",
          type: "error",
        });
        return;
      }
      if (!this.form.type) {
        this.$message({
          message: "请选择心仪的电梯类型",
          type: "error",
        });
        return;
      }
      if (!this.form.model) {
        this.$message({
          message: "请选择心仪的电梯类型",
          type: "error",
        });
        return;
      }
      if (!this.form.product) {
        this.$message({
          message: "请选择心仪的装饰型号",
          type: "error",
        });
        return;
      }
      if (!this.form.address) {
        this.$message({
          message: "请选择您的城市",
          type: "error",
        });
        return;
      }
      if (!this.form.distance) {
        this.$message({
          message: "请选择您的展厅位置",
          type: "error",
        });
        return;
      }
      if (!this.form.privacyPolicy) {
        this.$message({
          message: "请勾选隐私政策",
          type: "error",
        });
        return;
      }
      delete this.form.privacyPolicy;
      const result = await postMsg(this.form);
      if (result.total) {
        this.formIsSuccess = true;
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>