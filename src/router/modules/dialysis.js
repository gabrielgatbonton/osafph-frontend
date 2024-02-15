import DialysisView from "@/views/Dialysis/DialysisView.vue";
import DialysisSession from "@/views/Dialysis/DialysisSessionView.vue";
import DialysisFiles from "@/views/Consultation/ConsultationFiles.vue";
import FileView from "@/views/FileView.vue";
import DialysisPackagesView from "@/views/Dialysis/DialysisPackagesView.vue";
import DialysisItemsView from "@/views/Dialysis/DialysisItemsView.vue";
import { checkLoggedIn } from "./auth-guard";
export default [
  {
    path: "/dialysis",
    name: "dialysis",
    component: DialysisView,
    props: true,
    meta: { requiresAuth: true },
    beforeEnter: checkLoggedIn,
  },
  {
    path: "/dialysis/session/:id",
    name: "dialysis-session",
    component: DialysisSession,
    props: true,
    meta: { requiresAuth: true },
    beforeEnter: checkLoggedIn,
  },
  {
    path: "/dialysis/session/:id/files/:hospital_service_id",
    name: "dialysis-files",
    component: DialysisFiles,
    props: true,
    meta: { requiresAuth: true },
    beforeEnter: checkLoggedIn,
  },
  {
    path: "/dialysis/session/:id/files/viewer",
    name: "dialysis-files-view",
    component: FileView,
    props: true,
    meta: { requiresAuth: true },
    beforeEnter: checkLoggedIn,
  },
  {
    path: "/dialysis-packages",
    name: "dialysis-packages",
    component: DialysisPackagesView,
    props: true,
    meta: { requiresAuth: true },
    beforeEnter: checkLoggedIn,
  },
  {
    path: "/dialysis-items",
    name: "dialysis-items",
    component: DialysisItemsView,
    props: true,
    meta: { requiresAuth: true },
    beforeEnter: checkLoggedIn,
  },
];
