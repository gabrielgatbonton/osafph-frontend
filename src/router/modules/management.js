import ManagementView from '@/views/ManagementView.vue'
export default [
  {
    path: "/management",
    name: "management",
    component: ManagementView,
    meta: { requiresAuth: true },
  },
];
