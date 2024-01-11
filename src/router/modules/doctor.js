import ConsultationView from "@/views/Consultation/Doctor/RequestedConsultationsView.vue";
import ConsultationInformationView from "@/views/Consultation/ConsultationInformationView.vue";
import AddConsultationForm from "@/views/Consultation/Doctor/AddConsultationForm.vue";
import ConsultationFormContinuation from "@/views/Consultation/ConsultationFormContinuation.vue";
import EditConsultationFormView from "@/views/Consultation/Admin/EditConsultationForm.vue";
import EditConsultationFormContinuation from "@/views/Consultation/ConsultationFormContinuation.vue";
import ConsultationFiles from "@/views/Consultation/ConsultationFiles.vue";
import FileView from "@/views/FileView.vue";
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
  },
  {
    path: "/consultations/:consultation_id/view/:hospital_service_id/edit-form",
    name: "doctor-edit-consultation-form",
    component: EditConsultationFormView,
    props: true,
    meta: { requiresAuth: true },
    beforeEnter: checkLoggedIn,
  },
  {
    path: "/consultations/:consultation_id/view/:hospital_service_id/edit-form/2",
    name: "doctor-edit-consultation-form-continuation",
    component: EditConsultationFormContinuation,
    props: true,
    meta: { requiresAuth: true },
    beforeEnter: checkLoggedIn,
  },
  {
    path: "/consultations/:consultation_id/view/:hospital_service_id/files",
    name: "consultation-files",
    component: ConsultationFiles,
    props: true,
    meta: { requiresAuth: true },
    beforeEnter: checkLoggedIn,
  },
  {
    path: "/consultations/:consultation_id/view/:hospital_service_id/files/viewer",
    name: "consultation-files-view",
    component: FileView,
    props: true,
    meta: { requiresAuth: true },
    beforeEnter: checkLoggedIn,
  },
];
