<template>
  <div>
    <v-navigation-drawer
      v-model="localDrawer"
      app
      color="grey lighten-4"
      width="200"
    >
      <v-container class="grey lighten-3">
        <v-row>
          <v-col cols="auto" class="ma-n2 pl-4">
            <v-img
              src="../assets/OSAFPH LOGO.png"
              height="55"
              width="55"
            ></v-img>
          </v-col>
          <v-col cols="auto">
            <div class="title py-1">OSAFPH</div>
          </v-col>
        </v-row>
      </v-container>
      <v-list nav dense>
        <v-list-item
          v-for="link in links"
          :key="link.text"
          router
          :to="link.route"
        >
          <v-list-item-icon>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data: () => ({
    links: [
      { icon: "mdi-view-dashboard", text: "Dashboard", route: "/dashboard" },
      { icon: "mdi-folder", text: "Citizens", route: "/citizens" },
      { icon: "mdi-account", text: "Management", route: "/management" },
    ],
  }),
  props: ["drawer"],
  computed: {
    localDrawer: {
      get() {
        return this.drawer;
      },
      set(value) {
        this.$emit("update-drawer", value);
      },
    },
  },
};
</script>
