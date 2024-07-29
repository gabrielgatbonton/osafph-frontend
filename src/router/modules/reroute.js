export default [
  {
    path: "/vaccination/:hub_registrant_id?",
    name: "reroute",
    component: () =>
      import(/* webpackChunkName: "reroute" */ "@/views/PublicPageView.vue"),
    meta: { requiresAuth: false, routeName: "Citizen Record" },
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
  {
    path: "/vaccination/file",
    name: "public-file-view",
    component: () =>
      import(/* webpackChunkName: "reroute" */ "@/views/FileView.vue"),
    meta: { requiresAuth: false, routeName: "Citizen Record File" },
  },
];
