<template>
  <div class="login-container">
    <video autoplay muted loop id="bg-video">
      <source src="@/assets/bg.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">Chef Simon (Delivery Version)</h3>
      </div>

      <el-form-item prop="username">
        <el-input
          v-model="loginForm.username"
          placeholder="username"
          type="text"
          size="large"
        />
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          placeholder="password"
          size="large"
        />
      </el-form-item>

      <el-button
        :loading="loading"
        type="danger"
        style="width: 100%; margin-bottom: 30px"
        @click="handleLogin"
        size="large"
        >login</el-button
      >
      <div></div>
    </el-form>
    <div class="largelogo"></div>
  </div>
</template>
<script>
import { setToken } from "@/utils/auth";
export default {
  name: "loginPage",
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "admin",
      },
      loginRules: {
        username: [{ required: true, trigger: "blur" }],
        password: [{ required: true, trigger: "blur" }],
      },
      loading: false,
    };
  },

  methods: {
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          setToken("test");
          this.$router
            .push({
              path: "/deliverHome",
            })
            .catch(() => {});
          this.loading = false;
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  height: 100%;
  width: 100%;

  background-color: #f8eee2;

  overflow: hidden;
  display: flex;
  align-items: center;
  overflow: hidden;
  position: relative;
  #bg-video {
    position: absolute;
    top: 0;
    left: 0;
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
    z-index: 0;
    background-size: cover;
  }

  .login-form {
    position: relative;
    width: 320px;
    overflow: hidden;
    left: 250px;
    position: absolute;
    z-index: 1;
    background-color: #f8eee2aa;
    border-radius: 5px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
    padding: 30px;
  }
  .largelogo {
    position: absolute;
    width: 400px;
    height: 400px;
    top: calc(50% - 200px);
    left: 50%;
    background-image: url("../../../assets/images/logo2.png");
    background-size: contain;
  }
}

.title-container {
  position: relative;

  .title {
    font-size: 26px;
    color: #f56c6c;
    width: 100%;
    text-align: center;
    margin-bottom: 20px;

    font-weight: bold;
  }
}
</style>
