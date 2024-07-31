export default [
  {
    path: "/citizens/hospital-services/:id",
    name: "hospital-services",
    component: () =>
      import(
        /* webpackChunkName: "hospital-service" */ "@/views/Hospital-Services/HospitalServicesView.vue"
      ),
    props: true,
    meta: {
      requiresAuth: true,
      activeIcon: "Citizens",
      routeName: "Hospital Services",
    },

  },
  {
    path: "/citizens/hospital-services/:id/view/:hospital_service_id",
    name: "hospital-services-information",
    component: () =>
      import(
        /* webpackChunkName: "hospital-service" */ "@/views/Hospital-Services/HospitalServiceInformationView.vue"
      ),
    props: true,
    meta: {
      requiresAuth: true,
      activeIcon: "Citizens",
      routeName: "Hospital Service Details",
    },

  },
];
