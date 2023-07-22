// auth-guard.js
import store from '@/store';

export function checkLoggedIn(to, from, next) {
  const isLoggedIn = store.getters['login/isLoggedIn'];

  if (to.name === 'login' && isLoggedIn) {
    // If the user is already logged in and tries to access the login page,
    // redirect to the dashboard
    next({ name: 'dashboard' });
  } else if (to.meta.requiresAuth && !isLoggedIn) {
    // If the route requires authentication and the user is not logged in,
    // redirect to the login page
    next({ name: 'login' });
  } else {
    // Proceed with the navigation
    next();
  }
}
