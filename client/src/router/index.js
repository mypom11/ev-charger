import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "",
    component: () => import("../pages/SearchPage.vue"),
  },
  {
    path: "/main",
    name: "MainPage",
    component: () => import("../pages/MainPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
