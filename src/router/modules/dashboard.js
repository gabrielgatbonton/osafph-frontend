import { checkLoggedIn } from "./auth-guard";
export default [
  {
    path: "/dashboard",
    name: "dashboard",
    component: () =>
      import(/* webpackChunkName: "dashboard" */ "@/views/DashboardView.vue"),
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    meta: { requiresAuth: true, activeIcon: "Dashboard" },
    beforeEnter: checkLoggedIn,
  },
];
