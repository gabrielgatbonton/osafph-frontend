// auth-guard.js
import store from "@/store";

export function checkLoggedIn(to, from, next) {
  const isLoggedIn = store.getters["login/isLoggedIn"];
  const userRole = store.getters["login/userRole"];

  if (to.name === "login" && isLoggedIn) {
    // If the user is already logged in and tries to access the login page,
    // redirect to the dashboard
    next({ name: "dashboard" });
  } else if (to.meta.requiresAuth && !isLoggedIn) {
    // If the route requires authentication and the user is not logged in,
    // redirect to the login page
    next({ name: "login" });
  } else if (userRole === "ADMIN" && !isAllowedRoutes(to.name, userRole)) {
    // If the user is an admin and is trying to access a restricted route,
    // redirect to a different route (e.g., 'home') or display an error message
    next({ name: "dashboard" });
  } else if (userRole === "ROOT" && !isAllowedRoutes(to.name, userRole)) {
    next({ name: "dashboard" });
  } else if (userRole === "DOCTOR" && !isAllowedRoutes(to.name, userRole)) {
    next({ name: "dashboard" });
  } else if (userRole === "ENCODER" && !isAllowedRoutes(to.name, userRole)) {
    next({ name: "dashboard" });
  } else if (
    userRole === "VIP_ENCODER" &&
    !isAllowedRoutes(to.name, userRole)
  ) {
    next({ name: "dashboard" });
  } else if (
    userRole === "DIALYSIS_ENCODER" &&
    !isAllowedRoutes(to.name, userRole)
  ) {
    next({ name: "dashboard" });
  } else {
    // Proceed with the navigation
    next();
  }
}

function isAllowedRoutes(routeName, userRole) {
  // Define an array of route names that should be restricted for 'ADMIN', 'DOCTOR', 'ENCODER' users
  let allowedRoutes = [];
  if (userRole === "DOCTOR") {
    allowedRoutes = [
      "consultation-view",
      "consultations",
      "add-consultation-form",
      "consultation-form-continuation",
      "doctor-edit-consultation-form",
      "doctor-edit-consultation-form-continuation",
      "consultation-files",
      "consultation-files-view",
    ];
  } else if (userRole === "ADMIN" || userRole === "ROOT") {
    allowedRoutes = [
      "citizens",
      "register",
      "edit",
      "details",
      "citizens-consultations",
      "citizens-consultations-view",
      "edit-consultation-form",
      "edit-consultation-form-continuation",
      "hospital-services",
      "hospital-services-information",
      "dialysis-packages",
      "dialysis-items",
      "document-types",
    ];
    if (userRole === "ROOT") {
      allowedRoutes.push("dialysis-queuing");
    }
  } else if (userRole === "ENCODER" || userRole === "VIP_ENCODER") {
    allowedRoutes = [
      "citizens",
      "register",
      "edit",
      "details",
      "hospital-services",
      "hospital-services-information",
    ];
  } else if (userRole === "DIALYSIS_ENCODER") {
    allowedRoutes = [
      "dialysis-queuing",
      "dialysis",
      "dialysis-session",
      "dialysis-files",
      "dialysis-files-view",
    ];
  }

  //Allow all roles to use these routes:
  allowedRoutes.push("reroute","public-file-view", "management", "dashboard", "test");

  // Check if the provided routeName is in the restrictedRoutes array
  return allowedRoutes.includes(routeName);
}
