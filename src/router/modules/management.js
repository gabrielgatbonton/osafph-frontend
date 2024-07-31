export default [
  {
    path: "/management",
    name: "management",
    component: () =>
      import(/* webpackChunkName: "management" */ "@/views/ManagementView.vue"),
    meta: {
      requiresAuth: true,
      activeIcon: "User Management",
      routeName: "User Management",
    },
  },
];
