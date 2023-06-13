<template>
  <div class="form-container">
    <div class="title">请填写以下信息</div>
    <div class="form" >
      <p>
        <el-input
          type="textarea"
          :rows="4"
          placeholder="请输入留言"
          v-model="form.content"
        >
        </el-input>
      </p>
      <template v-if="type===2">
        <p>
        <el-input
          placeholder="所在城市"
          v-model="form.city"
          clearable
        >
        </el-input>
      </p>
        <p>
        <el-input
          placeholder="经销商名称"
          v-model="form.dealer"
          clearable
        >
        </el-input>
      </p>
      </template>
      <p>
        <el-input
          placeholder="请输入您的姓氏"
          v-model="form.firstname"
          clearable
        >
        </el-input>
      </p>
      <p>
        <el-input
          placeholder="请输入您的手机号"
          v-model="form.mobile"
          clearable
        >
        </el-input>
      </p>
      <p>
        <input
          type="checkbox"
          name="privacy-policy"
          id="privacy-policy"
          v-model="form.privacyPolicy"
        />
        <label for="privacy-policy">
          同意<router-link to="/">隐私政策</router-link>
        </label>
      </p>
      <p>
        <el-button class="button" type="button" :loading="loading" @click="submit">提交</el-button>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    loading:{
      type:Boolean,
      default:false
    },
    type:{
        type:Number,
        default:1
    }
  },
  data() {
    return {
      form: {
        content: "",
        city: "",
        dealer: "",
        firstname: "",
        mobile: "",
        privacyPolicy: false,
      },
    };
  },
  methods: {
    submit() {
      this.$emit("submit", this.form);
    },
  },
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>