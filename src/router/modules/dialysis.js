import DialysisView from "@/views/Dialysis/DialysisView.vue";
import DialysisSession from "@/views/Dialysis/DialysisSessionView.vue"
import { checkLoggedIn } from "./auth-guard";
export default [
  {
    path: "/dialysis",
    name: "dialysis",
    component: DialysisView,
    props: true,
    meta: { requiresAuth: true },
    beforeEnter: checkLoggedIn,
  },
  {
    path: "/dialysis/session/:id",
    name: "dialysis-session",
    component: DialysisSession,
    props: true,
    meta: { requiresAuth: true },
    beforeEnter: checkLoggedIn,
  }
];
