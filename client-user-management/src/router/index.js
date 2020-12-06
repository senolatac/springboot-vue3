import { createRouter, createWebHistory } from "vue-router";
import Store from "../store";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Profile from "../views/Profile.vue";
import Detail from "../views/Detail.vue";
import NotFound from "../views/NotFound.vue";
import Unauthorized from "../views/Unauthorized.vue";
import Role from "../models/role";

const routes = [
  //public pages
  {
    path: "/",
    name: "login",
    component: Login
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/register",
    component: Register
  },
  //User and admin page
  {
    path: "/profile",
    name: "profile",
    component: Profile,
    meta: { roles: [Role.ADMIN, Role.USER] }
  },
  //Only admin can see it.
  {
    path: "/admin",
    name: "admin",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/Admin.vue"),
    meta: { roles: [Role.ADMIN] }
  },
  {
    path: "/detail/:id",
    name: "detail",
    component: Detail,
    meta: { roles: [Role.ADMIN] }
  },
  //error pages are public
  {
    path: "/404",
    component: NotFound
  },
  {
    path: "/401",
    component: Unauthorized
  },
  //Otherwise redirect to not found page.
  {
    path: "/:catchAll(.*)",
    redirect: "/404"
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  const { roles } = to.meta;
  const { currentUser } = Store.state;

  if (roles) {
    if (!currentUser) {
      return next({ path: "/login" });
    }

    if (roles.length && !roles.includes(currentUser.role)) {
      return next({ path: "/401" });
    }
  }
  next();
});

export default router;
