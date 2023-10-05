import CitizensView from "@/views/CitizensView.vue";
import RegisterView from "@/views/RegisterView.vue";
import ViewDetailsView from "@/views/ViewDetailsView.vue";
import EditView from "@/views/EditView.vue";
import CitizensConsultationView from "@/views/Consultation/Admin/ConsultationsIndexView.vue";
import CitizensConsultationInformationView from '@/views/Consultation/ConsultationInformationView.vue';
import EditConsultationForm from '@/views/Consultation/Admin/EditConsultationForm.vue';
import EditConsultationFormContinuation from '@/views/Consultation/ConsultationFormContinuation.vue';
import { checkLoggedIn } from "./auth-guard";
export default [
  {
    path: "/citizens",
    name: "citizens",
    component: CitizensView,
    meta: { requiresAuth: true },
    beforeEnter: checkLoggedIn,
  },
  {
    path: "/citizens/register",
    name: "register",
    component: RegisterView,
    meta: { requiresAuth: true },
    beforeEnter: checkLoggedIn,
  },
  {
    path: "/citizens/edit/:id",
    name: "edit",
    component: EditView,
    props: true,
    meta: { requiresAuth: true },
    beforeEnter: checkLoggedIn,
  },
  {
    path: "/citizens/details/:id",
    name: "details",
    component: ViewDetailsView,
    props: true,
    meta: { requiresAuth: true },
    beforeEnter: checkLoggedIn,
  },
  {
    path: "/citizens-consultations",
    name: "citizens-consultations",
    component: CitizensConsultationView,
    props: true,
    meta: { requiresAuth: true },
    beforeEnter: checkLoggedIn,
  },
  {
    path: "/citizens-consultations/:consultation_id/view/:hospital_service_id",
    name: "citizens-consultations-view",
    component: CitizensConsultationInformationView,
    props: true,
    meta: { requiresAuth: true },
    beforeEnter: checkLoggedIn,
  },
  {
    path: "/citizens-consultations/:consultation_id/view/:hospital_service_id/form",
    name: "edit-consultation-form",
    component: EditConsultationForm,
    props: true,
    meta: { requiresAuth: true },
    beforeEnter: checkLoggedIn,
  },
  {
    path: "/citizens-consultations/:consultation_id/view/:hospital_service_id/form/2",
    name: "edit-consultation-form-continuation",
    component: EditConsultationFormContinuation,
    props: true,
    meta: { requiresAuth: true },
    beforeEnter: checkLoggedIn,
  },
];
