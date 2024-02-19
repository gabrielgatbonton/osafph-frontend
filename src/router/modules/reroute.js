import ReroutePage from "@/components/QR/ReroutePage.vue";
export default [
  {
    path: "/vaccination/:hub_registrant_id?",
    name: "reroute",
    component: ReroutePage,
    meta: { requiresAuth: false },
    beforeEnter: (to, from, next) => {
      const hubRegistrantId = to.params.hub_registrant_id;
      if (hubRegistrantId) {
        sessionStorage.setItem("hub_registrant_id", hubRegistrantId);
        const route = { ...to };
        delete route.params.hub_registrant_id;
        next(route);
      } else {
        next();
      }
    },
  },
];
