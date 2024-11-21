import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

/* Layout */
import Layout from "@/layout";

export const constantRoutes = [
  {
    path: "/redirect",
    component: Layout,

    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index"),
      },
    ],
  },
  {
    path: "/loginConsumer",
    name: "loginConsumer",
    component: () => import("@/views/consumer/login/index"),
  },
  {
    path: "/registerConsumer",
    name: "registerConsumer",
    component: () => import("@/views/consumer/login/register"),
  },
  {
    path: "/consumer",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "home",
        name: "Home",
        component: () => import("@/views/consumer/home/index"),
      },
      {
        path: "foodlist",
        name: "FoodList",
        component: () => import("@/views/consumer/foodlist/index"),
      },
      {
        path: "cart",
        name: "Cart",
        component: () => import("@/views/consumer/cart/index"),
      },
      {
        path: "current",
        name: "Current",
        component: () => import("@/views/consumer/current/index"),
      },
      {
        path: "hub",
        name: "Hub",
        component: () => import("@/views/consumer/hub/index"),
      },
    ],
  },
  {
    path: "*",
    component: () => import("@/views/404.vue"),
  },
];

const createRouter = () =>
  new VueRouter({
    mode: "hash",
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });
const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher;
}

export default router;
