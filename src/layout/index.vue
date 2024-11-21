<template>
  <div class="app-wrapper">
    <div class="main-container">
      <navbar></navbar>

      <app-main></app-main>
    </div>
  </div>
</template>
<script>
import AppMain from "./components/AppMain.vue";

import Navbar from "./components/Navbar/index";

export default {
  name: "LayoutView",
  components: {
    AppMain,

    Navbar,
  },
  data() {
    return {};
  },
  computed: {},
};
</script>
<style lang="scss" scoped>
.app-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
