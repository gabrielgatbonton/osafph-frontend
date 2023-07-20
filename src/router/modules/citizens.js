import CitizensView from "@/views/CitizensView.vue";
import RegisterView from '@/views/RegisterView.vue';
import ViewPrototype from '@/views/ViewDetailsPrototype.vue';
import ViewVaccination from '@/views/VaccinationDetailsView.vue';
import EditView from '@/views/EditView.vue'
export default [
  {
    path: "/citizens",
    name: "citizens",
    component: CitizensView,
    meta: { requiresAuth: true },
  },
  {
    path: "/citizens/register",
    name: "register",
    component: RegisterView,
    meta: { requiresAuth: true },
  },
  {
    path: '/citizens/edit/:id',
    name: 'edit',
    component: EditView,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/citizens/details/vaccination/:id',
    name: 'vaccination',
    component: ViewVaccination,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/citizens/details/:id',
    name: 'details',
    component: ViewPrototype,
    props: true,
    meta: { requiresAuth: true },
  },
];
