import { checkLoggedIn } from "./auth-guard";
export default [
  {
    path: "/dialysis",
    name: "dialysis",
    component: () =>
      import(
        /* webpackChunkName: "dialysis" */ "@/views/Dialysis/DialysisView.vue"
      ),
    props: true,
    meta: { requiresAuth: true },
    beforeEnter: checkLoggedIn,
  },
  {
    path: "/dialysis/session/:id",
    name: "dialysis-session",
    component: () =>
      import(
        /* webpackChunkName: "dialysis" */ "@/views/Dialysis/DialysisSessionView.vue"
      ),
    props: true,
    meta: { requiresAuth: true },
    beforeEnter: checkLoggedIn,
  },
  {
    path: "/dialysis/session/:id/files/:hospital_service_id",
    name: "dialysis-files",
    component: () =>
      import(
        /* webpackChunkName: "dialysis" */ "@/views/Consultation/ConsultationFiles.vue"
      ),
    props: true,
    meta: { requiresAuth: true },
    beforeEnter: checkLoggedIn,
  },
  {
    path: "/dialysis/session/:id/files/viewer",
    name: "dialysis-files-view",
    component: () =>
      import(/* webpackChunkName: "dialysis" */ "@/views/FileView.vue"),
    props: true,
    meta: { requiresAuth: true },
    beforeEnter: checkLoggedIn,
  },
  {
    path: "/dialysis-packages",
    name: "dialysis-packages",
    component: () =>
      import(
        /* webpackChunkName: "dialysis-admin" */ "@/views/Dialysis/DialysisPackagesView.vue"
      ),
    props: true,
    meta: { requiresAuth: true },
    beforeEnter: checkLoggedIn,
  },
  {
    path: "/dialysis-items",
    name: "dialysis-items",
    component: () =>
      import(
        /* webpackChunkName: "dialysis-admin" */ "@/views/Dialysis/DialysisItemsView.vue"
      ),
    props: true,
    meta: { requiresAuth: true },
    beforeEnter: checkLoggedIn,
  },
  {
    path: "/dialysis-queuing",
    name: "dialysis-queuing",
    component: () =>
      import(
        /* webpackChunkName: "dialysis-admin" */ "@/views/Dialysis/DialysisQueuingView.vue"
      ),
    props: true,
    meta: { requiresAuth: true },
    beforeEnter: checkLoggedIn,
  },
];
