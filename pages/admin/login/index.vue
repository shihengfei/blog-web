<template>
  <div class="login-wrap" id="loginWrap">
    <img
      src="~/static/images/admin/login1.jpg"
      alt
      id="loginBg"
      class="login-bg"
    />
    <canvas class="login-canvas" id="loginCanvas" />
    <div class="login-form">
      <div class="login-form-title">登录</div>
      <el-form ref="form" :rules="rules" :model="form">
        <el-form-item prop="account">
          <el-input prefix-icon="el-icon-user-solid" v-model="form.account" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-lock"
            v-model="form.password"
            show-password
          />
        </el-form-item>
        <el-button
          type="primary"
          size="medium"
          style="width: 100%"
          @click="login"
          >登录</el-button
        >
      </el-form>
    </div>
  </div>
</template>

<script>
import { Axios } from "@utils";

export default {
  layout: "blank",
  head() {
    return {
      title: "博客管理系统-登录",
      script: [
        {
          type: "text/javascript",
          src: "/js/rainyday.js",
          body: true,
          async: true,
        },
      ],
    };
  },
  created() {
    if (this.$store.state.admin.token) {
      this.$router.push("/admin/main/home");
    }
  },
  data() {
    return {
      form: {
        account: null,
        password: null,
      },
      rules: {
        account: [
          {
            required: true,
            message: "输入账号",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "输入账号",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    const timer = setInterval(() => {
      if (RainyDay) {
        this.initCanvas();
        clearInterval(timer);
      }
    }, 10);
  },
  methods: {
    /*
     *@title: 雨滴效果注册
     *@description:
     *@author: lupan
     *@date: 2020-10-16 17:45:45
     */
    initCanvas() {
      const engine = new RainyDay(
        "loginCanvas",
        "loginBg",
        window.innerWidth,
        window.innerHeight
      );
      engine.gravity = engine.GRAVITY_NON_LINEAR;
      engine.trail = engine.TRAIL_DROPS;
      engine.rain([engine.preset(0, 2, 500)]);
      engine.rain(
        [
          engine.preset(3, 3, 0.88),
          engine.preset(5, 5, 0.9),
          engine.preset(6, 2, 1),
        ],
        100
      );
    },
    login() {
      this.$refs["form"].validate(async (valid) => {
        if (!valid) return;
        const result = await Axios.post("/admin/user/login", this.form, {
          allData: true,
        });
        if (!result.success) return;
        this.$store.commit("admin/setToken", result.data);
        this.$router.push("/admin/main/home");
      });
    },
  },
};
</script>

<style lang="less">
.login {
  &-wrap {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
  &-bg {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
  }
  &-canvas {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 9;
  }
  &-form {
    position: fixed;
    width: 400px;
    height: 400px;
    top: calc(50vh - 200px);
    left: calc(50vw - 200px);
    border: 1px solid #666;
    z-index: 9999;
    border-radius: 20px;
    box-shadow: 10px #666;
    color: #fff;
    text-align: center;
    padding-top: 50px;
    padding: 50px;
    &-title {
      font-size: 30px;
      margin-bottom: 50px;
    }
    .el-input__inner {
      background: transparent;
      border: 1px solid #666;
      color: #fff;
    }
  }
}
</style>