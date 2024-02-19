import { checkLoggedIn } from "./auth-guard";
export default [
  {
    path: "/consultations",
    name: "consultations",
    component: () =>
      import("@/views/Consultation/Doctor/RequestedConsultationsView.vue"),
    props: true,
    meta: { requiresAuth: true },
    beforeEnter: checkLoggedIn,
  },
  {
    path: "/consultations/:consultation_id/view/:hospital_service_id",
    name: "consultation-view",
    component: () =>
      import("@/views/Consultation/ConsultationInformationView.vue"),
    props: true,
    meta: { requiresAuth: true },
    beforeEnter: checkLoggedIn,
  },
  {
    path: "/consultations/:consultation_id/view/:hospital_service_id/form",
    name: "add-consultation-form",
    component: () =>
      import("@/views/Consultation/Doctor/AddConsultationForm.vue"),
    props: true,
    meta: { requiresAuth: true },
    beforeEnter: checkLoggedIn,
  },
  {
    path: "/consultations/:consultation_id/view/:hospital_service_id/form/2",
    name: "consultation-form-continuation",
    component: () =>
      import("@/views/Consultation/ConsultationFormContinuation.vue"),
    props: true,
    meta: { requiresAuth: true },
    beforeEnter: checkLoggedIn,
  },
  {
    path: "/consultations/:consultation_id/view/:hospital_service_id/edit-form",
    name: "doctor-edit-consultation-form",
    component: () =>
      import("@/views/Consultation/Admin/EditConsultationForm.vue"),
    props: true,
    meta: { requiresAuth: true },
    beforeEnter: checkLoggedIn,
  },
  {
    path: "/consultations/:consultation_id/view/:hospital_service_id/edit-form/2",
    name: "doctor-edit-consultation-form-continuation",
    component: () =>
      import("@/views/Consultation/ConsultationFormContinuation.vue"),
    props: true,
    meta: { requiresAuth: true },
    beforeEnter: checkLoggedIn,
  },
  {
    path: "/consultations/:consultation_id/view/:hospital_service_id/files",
    name: "consultation-files",
    component: () => import("@/views/Consultation/ConsultationFiles.vue"),
    props: true,
    meta: { requiresAuth: true },
    beforeEnter: checkLoggedIn,
  },
  {
    path: "/consultations/:consultation_id/view/:hospital_service_id/files/viewer",
    name: "consultation-files-view",
    component: () => import("@/views/FileView.vue"),
    props: true,
    meta: { requiresAuth: true },
    beforeEnter: checkLoggedIn,
  },
];
