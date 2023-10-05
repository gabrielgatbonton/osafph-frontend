import ConsultationView from '@/views/Consultation/Doctor/ConsultationView.vue';
import ConsultationInformationView from '@/views/Consultation/ConsultationInformationView.vue'
import AddConsultationForm from '@/views/Consultation/ConsultationForm.vue'
import ConsultationFormContinuation from '@/views/Consultation/ConsultationFormContinuation.vue';
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
  },
  {
    path: "/consultations/:consultation_id/view/:hospital_service_id/form",
    name: "add-consultation-form",
    component: AddConsultationForm,
    props: true,
    meta: { requiresAuth: true },
    beforeEnter: checkLoggedIn,
  },
  {
    path: "/consultations/:consultation_id/view/:hospital_service_id/form/2",
    name: "consultation-form-continuation",
    component: ConsultationFormContinuation,
    props: true,
    meta: { requiresAuth: true },
    beforeEnter: checkLoggedIn,
  }
];
