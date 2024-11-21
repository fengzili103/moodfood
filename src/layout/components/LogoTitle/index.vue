<template>
  <div class="container">
    <div class="link">
      <el-image class="sidebar-logo" :src="logoSrc"></el-image>
      <div class="title">Chef<font style="color: #ca0000">Simon</font></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "LogoTitle",
  props: {},
  computed: {},
  data() {
    return {
      logoSrc: require("@/assets/images/logo.png"),
    };
  },
};
</script>
<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1s;
}
.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}
.container {
  height: 50px;
  display: flex;
  align-items: center;
  .link {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    & .sidebar-logo {
      width: 80px;
    }
    & .title {
      margin-left: 12px;
      font-size: 18px;
      font-weight: bold;
      color: black;
    }
  }
}
</style>
