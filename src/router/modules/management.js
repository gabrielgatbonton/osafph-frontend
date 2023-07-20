import ManagementView from '@/views/ManagementView.vue'
import { checkLoggedIn } from './auth-guard';
export default [
  {
    path: "/management",
    name: "management",
    component: ManagementView,
    meta: { requiresAuth: true },
    beforeEnter: checkLoggedIn,
  },
];
