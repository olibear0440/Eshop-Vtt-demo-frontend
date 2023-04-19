import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CartView from "../views/Cart.vue";
import VttView from "../views/Vtt.vue";

import Register from "../views/Signup.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/vtt/:id",
    name: "vtt",
    component: VttView,
  },
  {
    path: "/cart",
    name: "cart",
    component: CartView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
