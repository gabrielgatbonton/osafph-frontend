<template>
  <div>
    <v-navigation-drawer
      v-model="localDrawer"
      app
      color="grey lighten-4"
      width="200"
    >
      <v-container class="grey lighten-2">
        <v-row>
          <v-col cols="auto" class="ma-n2 pl-4">
            <v-img
              src="../assets/OSAFPH LOGO.png"
              height="55"
              width="55"
              contain
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
import { mapGetters } from "vuex";
export default {
  data: () => ({
    links: null,
  }),
  props: ["drawer"],
  computed: {
    ...mapGetters("login", ["userRole"]),
    localDrawer: {
      get() {
        return this.drawer;
      },
      set(value) {
        this.$emit("update-drawer", value);
      },
    },
  },
  methods: {
    setLinks() {
      let links = [];
      if (this.userRole === "ADMIN" || this.userRole === "ENCODER") {
        links = [
          {
            icon: "mdi-view-dashboard",
            text: "Dashboard",
            route: "/dashboard",
          },
          { icon: "mdi-folder", text: "Citizens", route: "/citizens" },
          { icon: "mdi-account", text: "Management", route: "/management" },
        ];
      } else if (this.userRole === "DOCTOR") {
        links = [
          {
            icon: "mdi-view-dashboard",
            text: "Dashboard",
            route: "/dashboard",
          },
          {
            icon: "mdi-medical-bag",
            text: "Consultations",
            route: "/consultations",
          },
          { icon: "mdi-account", text: "Management", route: "/management" },
        ];
      }
      this.links = links;
    },
  },
  mounted() {
    console.log(this.userRole);
    this.setLinks()
  }
};
</script>
