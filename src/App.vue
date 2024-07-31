<template>
  <v-app>
    <NavComponents v-if="!noNavBarRoutes.includes($route.name)" />
    <v-main>
      <!-- <SubmissionAlert v-if="success.alert" :message="success.message" />
      <ErrorAlert v-if="failed.alert" :message="failed.message" /> -->
      <router-view />
    </v-main>
    <FooterComponent />
  </v-app>
</template>

<script>
import NavComponents from "./layouts/NavComponents.vue";
import FooterComponent from "./layouts/Footer/FooterComponent.vue";
// import ErrorAlertsLogic from "@/mixins/Alerts & Errors/ErrorAlertsLogic";
export default {
  name: "App",
  // mixins: [ErrorAlertsLogic],
  data: () => ({
    noNavBarRoutes: ["login", "reroute", "public-file-view"],
  }),
  components: {
    NavComponents,
    FooterComponent,
  },
};
</script>
