import { checkLoggedIn } from "./auth-guard";
export default [
  {
    path: "/management",
    name: "management",
    component: () =>
      import(/* webpackChunkName: "management" */ "@/views/ManagementView.vue"),
    meta: { requiresAuth: true, activeIcon: "User Management" },
    beforeEnter: checkLoggedIn,
  },
];
