import { checkLoggedIn } from "./auth-guard";
export default [
  {
    path: "/citizens",
    name: "citizens",
    component: () =>
      import(/* webpackChunkName: "citizens" */ "@/views/CitizensView.vue"),
    meta: { requiresAuth: true },
    beforeEnter: checkLoggedIn,
  },
  {
    path: "/citizens/register",
    name: "register",
    component: () =>
      import(/* webpackChunkName: "citizens" */ "@/views/RegisterView.vue"),
    meta: { requiresAuth: true },
    beforeEnter: checkLoggedIn,
  },
  {
    path: "/citizens/edit/:id",
    name: "edit",
    component: () =>
      import(/* webpackChunkName: "citizens" */ "@/views/EditView.vue"),
    props: true,
    meta: { requiresAuth: true },
    beforeEnter: checkLoggedIn,
  },
  {
    path: "/citizens/details/:id",
    name: "details",
    component: () =>
      import(/* webpackChunkName: "citizens" */ "@/views/ViewDetailsView.vue"),
    props: true,
    meta: { requiresAuth: true },
    beforeEnter: checkLoggedIn,
  },
  {
    path: "/citizens-consultations",
    name: "citizens-consultations",
    component: () =>
      import(
        /* webpackChunkName: "citizen-admin" */ "@/views/Consultation/Admin/CompletedConsultationsView.vue"
      ),
    props: true,
    meta: { requiresAuth: true },
    beforeEnter: checkLoggedIn,
  },
  {
    path: "/citizens-consultations/:consultation_id/view/:hospital_service_id",
    name: "citizens-consultations-view",
    component: () =>
      import(
        /* webpackChunkName: "citizen-admin" */ "@/views/Consultation/ConsultationInformationView.vue"
      ),
    props: true,
    meta: { requiresAuth: true },
    beforeEnter: checkLoggedIn,
  },
  {
    path: "/citizens-consultations/:consultation_id/view/:hospital_service_id/form",
    name: "edit-consultation-form",
    component: () =>
      import(
        /* webpackChunkName: "citizen-admin" */ "@/views/Consultation/Admin/EditConsultationForm.vue"
      ),
    props: true,
    meta: { requiresAuth: true },
    beforeEnter: checkLoggedIn,
  },
  {
    path: "/citizens-consultations/:consultation_id/view/:hospital_service_id/form/2",
    name: "edit-consultation-form-continuation",
    component: () =>
      import(
        /* webpackChunkName: "citizen-admin" */ "@/views/Consultation/ConsultationFormContinuation.vue"
      ),
    props: true,
    meta: { requiresAuth: true },
    beforeEnter: checkLoggedIn,
  },
];
