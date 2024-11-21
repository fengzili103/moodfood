import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "normalize.css/normalize.css"; // Reset CSS
import ElementUI from "element-ui"; // Import Element-UI
import "element-ui/lib/theme-chalk/index.css";
import "./styles/style/theme/index.css";
import "@/styles/index.scss"; // Global CSS

import locale from "element-ui/lib/locale/lang/en"; // Import Element UI's English language pack

// Use Element UI and set the language to English
Vue.use(ElementUI, {
  size: window.sessionStorage.getItem("size") || "small",
  locale, // Set language to English
});

// Use Element UI again to set the default size
Vue.use(ElementUI, {
  size: "small",
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
