import CitizensView from "@/views/CitizensView.vue";
import RegisterView from '@/views/RegisterView.vue';
import ViewPrototype from '@/views/ViewDetailsPrototype.vue';
import ViewVaccination from '@/views/Vaccination/VaccinationDetailsView.vue';
import EditView from '@/views/EditView.vue'
import { checkLoggedIn } from './auth-guard';
export default [
  {
    path: "/citizens",
    name: "citizens",
    component: CitizensView,
    meta: { requiresAuth: true },
    beforeEnter: checkLoggedIn,
  },
  {
    path: "/citizens/register",
    name: "register",
    component: RegisterView,
    meta: { requiresAuth: true },
    beforeEnter: checkLoggedIn,
  },
  {
    path: '/citizens/edit/:id',
    name: 'edit',
    component: EditView,
    props: true,
    meta: { requiresAuth: true },
    beforeEnter: checkLoggedIn,
  },
  {
    path: '/citizens/details/vaccination/:id',
    name: 'vaccination',
    component: ViewVaccination,
    props: true,
    meta: { requiresAuth: true },
    beforeEnter: checkLoggedIn,
  },
  {
    path: '/citizens/details/:id',
    name: 'details',
    component: ViewPrototype,
    props: true,
    meta: { requiresAuth: true },
    beforeEnter: checkLoggedIn,
  },
];
