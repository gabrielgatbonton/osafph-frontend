import Vue from 'vue'
import VueRouter from 'vue-router'
import CitizensView from '../views/CitizensView.vue'
import DashboardView from '../views/DashboardView.vue'
import ManagementView from '../views/ManagementView.vue'
import RegisterView from '../views/RegisterView.vue'
import ViewPrototype from '../views/ViewDetailsPrototype.vue'
import ViewVaccination from '../views/VaccinationDetailsView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/citizens',
    name: 'citizens',
    component: CitizensView
  },
  {
    path: '/management',
    name: 'management',
    component: ManagementView
  },
  {
    path: '/',
    name: 'dashboard',
    component: DashboardView
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/citizens/register',
    name: 'register',
    component: RegisterView,
  },
  {
    path: '/citizens/edit/:id',
    name: 'edit',
    component: RegisterView
  },
  {
    path: '/citizens/details/:id',
    name: 'details',
    component: ViewPrototype,
    props: true,
  },
  {
    path: '/citizens/details/vaccination/:id',
    name: 'vaccination',
    component: ViewVaccination,
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
