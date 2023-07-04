<template>
  <div>
    <v-app-bar app flat color="grey lighten-3">
      <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
      <div>
        <v-img
          src="../assets/MCG.png"
          width="120"
          height="60"
        ></v-img>
      </div>
      <v-spacer></v-spacer>
      <v-icon large>mdi-account</v-icon>
    </v-app-bar>
    <NavDrawer :drawer="drawer" @update-drawer="updateDrawer" />
  </div>
</template>

<script>
import NavDrawer from "../layouts/NavDrawer.vue";
export default {
  data: () => ({
    drawer: false,
  }),
  components: {
    NavDrawer,
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
    updateDrawer(value) {
      this.drawer = value;
    },
  },
};
</script>

<style></style>
