// index.js
import Vue from "vue";
import VueRouter from "vue-router";
import dashboardRoute from "./modules/dashboard";
import citizensRoute from "./modules/citizens";
import managementRoute from "./modules/management";
import { checkLoggedIn } from "./modules/auth-guard";
import ReroutePage from "./modules/reroute";
// import html2pdfPage from "../components/File Viewer/FileViewer.vue"
import hospitalServicesRoute from "./modules/hospital-services";
import doctorRoute from "./modules/doctor";
import dialysisRoute from "./modules/dialysis";
import EnumsRoute from "./modules/enums";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: { name: "login" },
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "@/views/LandingPageView.vue"),
    meta: {
      routeName: "Login",
    },
  },
  // {
  //   path: "/test",
  //   name: "test",
  //   component: html2pdfPage,
  // },
  ...dashboardRoute,
  ...citizensRoute,
  ...managementRoute,
  ...ReroutePage,
  ...hospitalServicesRoute,
  ...doctorRoute,
  ...dialysisRoute,
  ...EnumsRoute,
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

// Use the checkLoggedIn global navigation guard
router.beforeEach(checkLoggedIn);

// Check if the route changes and must delete the sessionStorage on reroute.js
router.beforeEach((to, from, next) => {
  const publicRoutes = ["reroute", "public-file-view"];
  if (!publicRoutes.includes(to.name)) {
    // Remove the sessionStorage item whenever a route change occurs
    sessionStorage.removeItem("hub_registrant_id");
    next(); // Continue with the navigation
  } else {
    next();
  }
});

// Constantly update the HTML title per route change
router.afterEach((to) => {
  Vue.nextTick(() => {
    document.title = `${to.meta.routeName} | CHIMS`;
  });
});

export default router;
