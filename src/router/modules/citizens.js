import { checkLoggedIn } from "./auth-guard";
export default [
  {
    path: "/citizens",
    name: "citizens",
    component: () => import("@/views/CitizensView.vue"),
    meta: { requiresAuth: true },
    beforeEnter: checkLoggedIn,
  },
  {
    path: "/citizens/register",
    name: "register",
    component: () => import("@/views/RegisterView.vue"),
    meta: { requiresAuth: true },
    beforeEnter: checkLoggedIn,
  },
  {
    path: "/citizens/edit/:id",
    name: "edit",
    component: () => import("@/views/EditView.vue"),
    props: true,
    meta: { requiresAuth: true },
    beforeEnter: checkLoggedIn,
  },
  {
    path: "/citizens/details/:id",
    name: "details",
    component: () => import("@/views/ViewDetailsView.vue"),
    props: true,
    meta: { requiresAuth: true },
    beforeEnter: checkLoggedIn,
  },
  {
    path: "/citizens-consultations",
    name: "citizens-consultations",
    component: () =>
      import("@/views/Consultation/Admin/CompletedConsultationsView.vue"),
    props: true,
    meta: { requiresAuth: true },
    beforeEnter: checkLoggedIn,
  },
  {
    path: "/citizens-consultations/:consultation_id/view/:hospital_service_id",
    name: "citizens-consultations-view",
    component: () =>
      import("@/views/Consultation/ConsultationInformationView.vue"),
    props: true,
    meta: { requiresAuth: true },
    beforeEnter: checkLoggedIn,
  },
  {
    path: "/citizens-consultations/:consultation_id/view/:hospital_service_id/form",
    name: "edit-consultation-form",
    component: () =>
      import("@/views/Consultation/Admin/EditConsultationForm.vue"),
    props: true,
    meta: { requiresAuth: true },
    beforeEnter: checkLoggedIn,
  },
  {
    path: "/citizens-consultations/:consultation_id/view/:hospital_service_id/form/2",
    name: "edit-consultation-form-continuation",
    component: () =>
      import("@/views/Consultation/ConsultationFormContinuation.vue"),
    props: true,
    meta: { requiresAuth: true },
    beforeEnter: checkLoggedIn,
  },
];
