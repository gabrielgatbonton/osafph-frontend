import ConsultationView from '@/views/Doctor/ConsultationView.vue';
import ConsultationInformationView from '@/views/Doctor/ConsultationInformationView.vue'
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
  {
    path: "/consultations/:consultation_id/view/:hospital_service_id",
    name: "consultation-view",
    component: ConsultationInformationView,
    props: true,
    meta: { requiresAuth: true },
    beforeEnter: checkLoggedIn,
  }
];
