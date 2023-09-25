import ConsultationView from '@/views/Doctor/ConsultationView.vue'
import { checkLoggedIn } from "./auth-guard";
export default [
  {
    path: "/consultations",
    name: "consultations",
    component: ConsultationView,
    props: true,
    meta: { requiresAuth: true },
    beforeEnter: checkLoggedIn,
  },
];
