import { createWebHistory, createRouter } from "vue-router";
import Home from "../pages/Home.vue";
import Portfolio from "../pages/Portfolio.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/portfolio/:id",
    name: "Portfolio",
    component: Portfolio,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 }
  },
});

export default router;