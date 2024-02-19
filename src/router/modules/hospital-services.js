import { checkLoggedIn } from "./auth-guard";
export default [
  {
    path: "/citizens/hospital-services/:id",
    name: "hospital-services",
    component: () =>
      import("@/views/Hospital-Services/HospitalServicesView.vue"),
    props: true,
    meta: { requiresAuth: true },
    beforeEnter: checkLoggedIn,
  },
  {
    path: "/citizens/hospital-services/:id/view/:hospital_service_id",
    name: "hospital-services-information",
    component: () =>
      import("@/views/Hospital-Services/HospitalServiceInformationView.vue"),
    props: true,
    meta: { requiresAuth: true },
    beforeEnter: checkLoggedIn,
  },
];
