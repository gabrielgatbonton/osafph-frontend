export default [
  {
    path: "/vaccination/:hub_registrant_id?",
    name: "reroute",
    component: () =>
      import(/* webpackChunkName: "public" */ "@/views/PublicPageView.vue"),
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
      import(/* webpackChunkName: "public" */ "@/views/FileView.vue"),
    meta: { requiresAuth: false, routeName: "Citizen Record File" },
  },
  {
    path: "/minalin-dialysis-center",
    name: "Minalin Dialysis Center",
    component: () =>
      import(/* webpackChunkName: "public" */ "@/views/MarketingView.vue"),
    meta: { requiresAuth: false, routeName: "Minalin Dialysis Center" },
  },
];
