import Vue from 'vue'
import VueRouter from 'vue-router'
import dashboardRoute from './modules/dashboard'
import citizensRoute from './modules/citizens'
import managementRoute from './modules/management'
import LogInLayout from '../components/LandingPage.vue'
import store from '../store';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: { name: 'login' }
  },
  {
    path:'/login',
    name: 'login',
    component: LogInLayout,
  },
  ...dashboardRoute,
  ...citizensRoute,
  ...managementRoute
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

// Route Guard
router.beforeEach((to, from, next) => {
  const isLoggedIn = store.getters['login/isLoggedIn']; // Get the isLoggedIn value from the store
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  // If the route requires authentication and the user is not logged in, redirect to the login page
  if (requiresAuth && !isLoggedIn) {
    next({ name: 'login' });
  } else {
    next(); // Proceed with the navigation
  }

  if (isLoggedIn) {
    next({ name: 'dashboard' }); // Redirect to the dashboard if the user is already logged in
  } else {
    next(); // Proceed with the navigation
  }
  
});

export default router
