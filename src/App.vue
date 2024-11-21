<template>
  <div id="app">
    <router-view />
    <div class="chatout" v-show="showChat">
      <chat></chat>
    </div>
  </div>
</template>

<script>
export default {
  name: "mainOut",
  components: {
    chat: () => import("./views/chat/chatIndex.vue"),
  },
  watch: {
    $route(to) {
      if (
        to.name !== "loginConsumer" &&
        to.path !== "/" &&
        to.path !== "/loginConsumer" &&
        to.path !== "/registerConsumer"
      ) {
        this.showChat = true;
      } else {
        this.showChat = false;
      }
    },
  },
  data() {
    return {
      search: {
        name: "",
      },
      showChat: false,
    };
  },
  methods: {},
  mounted() {
    console.log(this.$route.path);
    if (
      this.$route.name !== "loginConsumer" &&
      this.$route.path !== "/" &&
      this.$route.path !== "/loginConsumer" &&
      this.$route.path !== "/registerConsumer"
    ) {
      console.log(11111, this.$route.path);
      this.showChat = true;
    }
  },
};
</script>
<style scoped>
.chatout {
  position: fixed;
  width: auto;
  height: auto;
  z-index: 999;
  right: 5px;
  bottom: 5px;
}
</style>
