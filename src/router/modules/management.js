import { checkLoggedIn } from "./auth-guard";
export default [
  {
    path: "/management",
    name: "management",
    component: () => import("@/views/ManagementView.vue"),
    meta: { requiresAuth: true },
    beforeEnter: checkLoggedIn,
  },
];
