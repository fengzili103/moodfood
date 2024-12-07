<template>
  <div>
    <div class="menu">
      <div style="display: flex">
        <logo-title class="navBar-logo-title" />
        <el-menu
          :default-active="activeIndex"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-menu-item index="1">Home</el-menu-item>
          <el-menu-item index="2">Current Orders</el-menu-item>
          <el-menu-item index="3">History</el-menu-item>
        </el-menu>
      </div>

      <el-link style="margin-right: 10px">Quit</el-link>
    </div>

    <div class="pagecontainer">
      <foodcontrol v-if="activeIndex === '1'"></foodcontrol>
      <orderlist v-else-if="activeIndex === '2'"></orderlist>
      <history v-else-if="activeIndex === '3'"></history>
    </div>
  </div>
</template>
<script>
import logoTitle from "@/layout/components/LogoTitle/index.vue";
export default {
  components: {
    foodcontrol: () => import("./foodcontrol.vue"),
    orderlist: () => import("./orderlist.vue"),
    history: () => import("./history.vue"),
    logoTitle,
  },
  data() {
    return {
      activeIndex: "1",
      form: {},
    };
  },
  methods: {
    handleSelect(key) {
      this.activeIndex = key;
    },
  },
};
</script>
<style scoped lang="scss">
.pagecontainer {
  width: 100%;
  height: auto;
  padding: 20px;
}
.menu {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 90px;
  background-color: #fff;
  box-shadow: 1px 1px 3px black;
  align-items: center;
}
.navBar-logo-title {
  width: 210px;
  margin-right: 20px;
}
</style>
