// auth-guard.js
import store from "@/store";

export function checkLoggedIn(to, from, next) {
  const isLoggedIn = store.getters["login/isLoggedIn"];
  const userRole = store.getters['login/userRole'];

  if (to.name === "login" && isLoggedIn) {
    // If the user is already logged in and tries to access the login page,
    // redirect to the dashboard
    next({ name: "dashboard" });
  } else if (to.meta.requiresAuth && !isLoggedIn) {
    // If the route requires authentication and the user is not logged in,
    // redirect to the login page
    next({ name: "login" });
  } else if (userRole === "ADMIN" && isRestrictedRoute(to.name)) {
    // If the user is an admin and is trying to access a restricted route,
    // redirect to a different route (e.g., 'home') or display an error message
    next({ name: "dashboard" });
  } else {
    // Proceed with the navigation
    next();
  }
}

function isRestrictedRoute(routeName) {
  // Define an array of route names that should be restricted for 'ADMIN' users
  const restrictedRoutes = [
    "consultation-view",
    "consultations",
    "add-consultation-form",
    "consultation-form-continuation",
  ];

  // Check if the provided routeName is in the restrictedRoutes array
  return restrictedRoutes.includes(routeName);
}
