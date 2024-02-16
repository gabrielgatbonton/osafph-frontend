<template>
  <v-app>
    <NavComponents
      v-if="
        this.$route.name === 'login' || this.$route.name === 'reroute'
          ? false
          : true
      "
    />
    <v-main>
      <router-view />
    </v-main>
    <FooterComponent /> 
  </v-app>
</template>

<script>
import NavComponents from "./layouts/NavComponents.vue";
import FooterComponent from "./layouts/Footer/FooterComponent.vue";
export default {
  name: "App",
  data: () => ({
    //
  }),
  components: {
    NavComponents,
    FooterComponent
  },
};
</script>
