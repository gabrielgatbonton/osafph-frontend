export default [
  {
    path: "/consultations",
    name: "consultations",
    component: () =>
      import(
        /* webpackChunkName: "doctor-consultations" */ "@/views/Consultation/Doctor/RequestedConsultationsView.vue"
      ),
    props: true,
    meta: {
      requiresAuth: true,
      activeIcon: "Consultations",
      routeName: "Consultations",
    },
  },
  {
    path: "/consultations/:consultation_id/view/:hospital_service_id",
    name: "consultation-view",
    component: () =>
      import(
        /* webpackChunkName: "doctor-consultations" */ "@/views/Consultation/ConsultationInformationView.vue"
      ),
    props: true,
    meta: {
      requiresAuth: true,
      activeIcon: "Consultations",
      routeName: "Consultation Details",
    },
  },
  {
    path: "/consultations/:consultation_id/view/:hospital_service_id/form",
    name: "add-consultation-form",
    component: () =>
      import(
        /* webpackChunkName: "doctor-consultations" */ "@/views/Consultation/Doctor/AddConsultationForm.vue"
      ),
    props: true,
    meta: {
      requiresAuth: true,
      activeIcon: "Consultations",
      routeName: "Add Consultation Form",
    },
  },
  {
    path: "/consultations/:consultation_id/view/:hospital_service_id/form/2",
    name: "consultation-form-continuation",
    component: () =>
      import(
        /* webpackChunkName: "doctor-consultations" */ "@/views/Consultation/ConsultationFormContinuation.vue"
      ),
    props: true,
    meta: {
      requiresAuth: true,
      activeIcon: "Consultations",
      routeName: "Add Consultation Form",
    },
  },
  // {
  //   path: "/consultations/:consultation_id/view/:hospital_service_id/edit-form",
  //   name: "doctor-edit-consultation-form",
  //   component: () =>
  //     import(
  //       /* webpackChunkName: "doctor-consultations" */ "@/views/Consultation/Admin/EditConsultationForm.vue"
  //     ),
  //   props: true,
  //   meta: { requiresAuth: true, activeIcon: "Consultations" },
  //   beforeEnter: checkLoggedIn,
  // },
  // {
  //   path: "/consultations/:consultation_id/view/:hospital_service_id/edit-form/2",
  //   name: "doctor-edit-consultation-form-continuation",
  //   component: () =>
  //     import(
  //       /* webpackChunkName: "doctor-consultations" */ "@/views/Consultation/ConsultationFormContinuation.vue"
  //     ),
  //   props: true,
  //   meta: { requiresAuth: true, activeIcon: "Consultations" },
  //   beforeEnter: checkLoggedIn,
  // },
  {
    path: "/consultations/:consultation_id/view/:hospital_service_id/files",
    name: "consultation-files",
    component: () =>
      import(
        /* webpackChunkName: "doctor-consultations" */ "@/views/Consultation/ConsultationFiles.vue"
      ),
    props: true,
    meta: {
      requiresAuth: true,
      activeIcon: "Consultations",
      routeName: "Consultation Files",
    },
  },
  {
    path: "/consultations/:consultation_id/view/:hospital_service_id/files/viewer",
    name: "consultation-files-view",
    component: () =>
      import(
        /* webpackChunkName: "doctor-consultations" */ "@/views/FileView.vue"
      ),
    props: true,
    meta: {
      requiresAuth: true,
      activeIcon: "Consultations",
      routeName: "Consultation Files",
    },
  },
];
