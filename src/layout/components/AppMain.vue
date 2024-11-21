<template>
  <section class="app-main">
    <div class="routerView-content">
      <transition>
        <keep-alive>
          <router-view :key="key" />
        </keep-alive>
      </transition>
    </div>
  </section>
</template>
<script>
export default {
  name: "AppMain",
  components: {},
  computed: {
    key() {
      return this.$route.path;
    },
  },
};
</script>
<style lang="scss" scoped>
.app-main {
  width: 100%;
  height: calc(100% - 123px);
  position: relative;
  overflow: auto;
  background-color: #f0f2f5;
}

.routerView-content {
  padding: 0px;
}
</style>
