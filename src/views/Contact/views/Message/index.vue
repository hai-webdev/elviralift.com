<template>
  <div class="message-container">
    <el-tabs v-model="activeName">
      <el-tab-pane v-if="navs[0]" :label="navs[0].name" name="first">
        <Info :title="navs[0].data.title" :desc="navs[0].data.content" />
        <Form @submit="formSubmit($event, 2)" :loading="loading" />
      </el-tab-pane>
      <el-tab-pane v-if="navs[1]" :label="navs[1].name" name="second">
        <Info :title="navs[1].data.title" :desc="navs[1].data.content" />
        <Form :type="2" @submit="formSubmit2" :loading="loading" />
      </el-tab-pane>
      <el-tab-pane v-if="navs[2]" :label="navs[2].name" name="third">
        <Info :title="navs[2].data.title" :desc="navs[2].data.content" />
        <Form @submit="formSubmit($event, 4)" :loading="loading" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Info from "./Info";
import Form from "./Form";
import getNav from "@/api/getNav";
import getList from "@/api/getList";

export default {
  components: {
    Info,
    Form,
  },
  data() {
    return {
      scodeId: 27,
      navs: [],
      loading: false,
      activeName: "first",
    };
  },
  async created() {
    const navs = await getNav(this.scodeId);
    if (navs.data) {
      const navList = navs.data.map(async (item) => {
        const cont = await getList({ scode: item.scode });
        if (cont.data) {
          item.data = {
            title: cont.data[0].title,
            content: cont.data[0].content,
          };
        }
        return item;
      });
      this.navs = await Promise.all(navList);
    }
  },
  methods: {
    async formSubmit(data, id) {
      if (!data.content) {
        this.$message({
          message: "请输入留言信息",
          type: "error",
        });
        return;
      }
      if (!data.firstname) {
        this.$message({
          message: "请输入姓氏",
          type: "error",
        });
        return;
      }
      if (!data.mobile) {
        this.$message({
          message: "请输入手机号",
          type: "error",
        });
        return;
      }
      const mobileReg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;
      if (!mobileReg.test(data.mobile)) {
        this.$message({
          message: "手机号格式错误！",
          type: "error",
        });
        return;
      }
      if (!data.privacyPolicy) {
        this.$message({
          message: "请先勾选隐私政策",
          type: "error",
        });
        return;
      }
      delete data.city;
      delete data.dealer;
      delete data.privacyPolicy;
      this.loading = true;
      const result = await this.$api.postMsg(data, id);
      const that = this;
      if (result.total) {
        this.$message({
          message: result.data,
          type: "success",
          onClose() {
            data.content = "";
            data.mobile = "";
            data.firstname = "";
            that.loading = false;
          },
        });
      }
    },
    async formSubmit2(data) {
      if (!data.content) {
        this.$message({
          message: "请输入留言信息",
          type: "error",
        });
        return;
      }
      if (!data.city) {
        this.$message({
          message: "请输入所在城市",
          type: "error",
        });
        return;
      }
      if (!data.dealer) {
        this.$message({
          message: "请输入经销商名称",
          type: "error",
        });
        return;
      }
      if (!data.firstname) {
        this.$message({
          message: "请输入姓氏",
          type: "error",
        });
        return;
      }
      if (!data.mobile) {
        this.$message({
          message: "请输入手机号",
          type: "error",
        });
        return;
      }
      const mobileReg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;
      if (!mobileReg.test(data.mobile)) {
        this.$message({
          message: "手机号格式错误！",
          type: "error",
        });
        return;
      }
      if (!data.privacyPolicy) {
        this.$message({
          message: "请先勾选隐私政策",
          type: "error",
        });
        return;
      }
      delete data.privacyPolicy;
      this.loading = true;
      const that = this;
      const result = await this.$api.postMsg(data, 3);
      if (result.total) {
        this.$message({
          message: result.data,
          type: "success",
          onClose() {
            data.content = "";
            data.city = "";
            data.dealer = "";
            data.mobile = "";
            data.firstname = "";
            that.loading = false;
          },
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>