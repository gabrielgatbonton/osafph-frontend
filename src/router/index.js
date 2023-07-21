import Vue from 'vue'
import VueRouter from 'vue-router'
import dashboardRoute from './modules/dashboard'
import citizensRoute from './modules/citizens'
import managementRoute from './modules/management'
import ReroutePage from './modules/ReroutePage'
import LogInLayout from '../components/LandingPage.vue'
import { checkLoggedIn } from './modules/auth-guard';

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
    beforeEnter: checkLoggedIn,
  },
  ...dashboardRoute,
  ...citizensRoute,
  ...managementRoute,
  ...ReroutePage
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
