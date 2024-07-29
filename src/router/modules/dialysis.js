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
    meta: { requiresAuth: true, activeIcon: "Dialysis", routeName: "Dialysis" },
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
    meta: {
      requiresAuth: true,
      activeIcon: "Dialysis",
      routeName: "Dialysis Session",
    },
    beforeEnter: checkLoggedIn,
  },
  {
    path: "/dialysis/session/:id/files/:hospital_service_id",
    name: "dialysis-files",
    component: () =>
      import(
        /* webpackChunkName: "dialysis" */ "@/views/Dialysis/DialysisFiles.vue"
      ),
    props: true,
    meta: {
      requiresAuth: true,
      activeIcon: "Dialysis",
      routeName: "Dialysis Files",
    },
    beforeEnter: checkLoggedIn,
  },
  {
    path: "/dialysis/session/:id/files/:hospital_service_id/viewer",
    name: "dialysis-files-view",
    component: () =>
      import(/* webpackChunkName: "dialysis" */ "@/views/FileView.vue"),
    props: true,
    meta: {
      requiresAuth: true,
      activeIcon: "Dialysis",
      routeName: "Dialysis Files",
    },
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
    meta: {
      requiresAuth: true,
      activeIcon: "Dialysis Queuing",
      routeName: "Dialysis Queue",
    },
    beforeEnter: checkLoggedIn,
  },
];
