import { checkLoggedIn } from "./auth-guard";
export default [
  {
    path: "/dialysis-packages",
    name: "dialysis-packages",
    component: () =>
      import(
        /* webpackChunkName: "admin-enums" */ "@/views/Dialysis/DialysisPackagesView.vue"
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
        /* webpackChunkName: "admin-enums" */ "@/views/Dialysis/DialysisItemsView.vue"
      ),
    props: true,
    meta: { requiresAuth: true },
    beforeEnter: checkLoggedIn,
  },
  {
    path: "/document-types",
    name: "document-types",
    component: () =>
      import(
        /* webpackChunkName: "admin-enums" */ "@/views/Enums/DocumentTypesView.vue"
      ),
    props: true,
    meta: { requiresAuth: true },
    beforeEnter: checkLoggedIn,
  },
];
