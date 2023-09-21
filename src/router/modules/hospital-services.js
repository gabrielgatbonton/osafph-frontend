import HospitalServicesView from "@/views/Hospital-Services/HospitalServicesView.vue";
import HospitalServicesInformationsView from "@/views/Hospital-Services/HospitalServiceInformationView.vue";
import { checkLoggedIn } from "./auth-guard";
export default [
  {
    path: "/citizens/hospital-services/:id",
    name: "hospital-services",
    component: HospitalServicesView,
    props: true,
    meta: { requiresAuth: true },
    beforeEnter: checkLoggedIn,
  },
  {
    path: "/citizens/hospital-services/:id/view/:hospital_service_id",
    name: "hospital-services-information",
    component: HospitalServicesInformationsView,
    props: true,
    meta: { requiresAuth: true },
    beforeEnter: checkLoggedIn,
  },
];
