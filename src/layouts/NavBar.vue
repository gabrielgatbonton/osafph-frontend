<template>
  <div>
    <v-app-bar app flat color="grey lighten-2">
      <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
      <div>
        <v-img src="../assets/MCG.png" width="120" height="60" contain></v-img>
      </div>
      <v-spacer></v-spacer>
      <div class="title py-1 mr-3">{{ userName }}</div>
      <v-menu bottom :offset-y="offset" class>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on" class="mr-1" :loading="loading">
            <v-icon large>mdi-menu-down</v-icon>
          </v-btn>
        </template>
        <v-list dense>
          <v-list-item
            v-for="(item, index) in getOptions()"
            :key="index"
            @click="executeAction(item)"
          >
            <v-list-item-title
              ><v-icon dense left>{{ item.icon }}</v-icon
              >{{ item.title }}</v-list-item-title
            >
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <NavDrawer :drawer="drawer" @update-drawer="updateDrawer" />
  </div>
</template>

<script>
import NavDrawer from "../layouts/NavDrawer.vue";
import { mapActions, mapState } from "vuex";
export default {
  data: () => ({
    offset: true,
    drawer: false,
    loading: false,
  }),
  components: {
    NavDrawer,
  },
  methods: {
    ...mapActions("login", ["logout"]),
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
    updateDrawer(value) {
      this.drawer = value;
    },
    executeAction(item) {
      if (item.action) {
        // Execute the action
        item.action();
      } else if (item.route) {
        // Navigate to the route
        this.$router.push(item.route);
      }
    },
    getOptions() {
      return [
        {
          icon: "mdi-logout",
          title: "LOG OUT",
          action: () => {
            this.loading = true;
            this.logout()
              .then(() => {
                this.$router.replace({ name: "login" });
              })
              .catch((error) => {
                console.error("Error logging out:", error);
              })
              .finally(() => {
                this.loading = false;
              });
          },
        },
      ];
    },
  },
  computed: {
    ...mapState("login", {
      userName: (state) => state.user.loggedInUser,
    }),
  },
};
</script>

<style></style>
