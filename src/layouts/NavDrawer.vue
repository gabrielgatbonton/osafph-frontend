<template>
  <div>
    <v-navigation-drawer
      v-model="localDrawer"
      app
      color="grey lighten-4"
      width="200"
    >
      <v-container>
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
      <LinkComponent :links="navLinks" />
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import LinkComponent from "./LinkComponent.vue";
export default {
  props: ["drawer"],
  components: {
    LinkComponent,
  },
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
    navLinks() {
      let links = [];
      if (this.userRole === "ADMIN" || this.userRole === "ROOT") {
        links = [
          {
            icon: "mdi-view-dashboard",
            text: "Dashboard",
            route: "/dashboard",
          },
          {
            icon: "mdi-account-group",
            text: "Citizens",
            route: "/citizens",
          },
          {
            dropdown: {
              icon: "mdi-tune-variant",
              title: "Enums",
            },
            subroutes: [
              {
                icon: "mdi-package-up",
                text: "Dialysis Packages",
                route: "/dialysis-packages",
              },
              {
                icon: "mdi-needle",
                text: "Dialysis Items",
                route: "/dialysis-items",
              },
              {
                icon: "mdi-file-document",
                text: "Document Types",
                route: "/document-types",
              },
            ],
          },
          {
            icon: "mdi-medical-bag",
            text: "Consultations",
            route: "/citizens-consultations",
          },
          { icon: "mdi-cog", text: "Management", route: "/management" },
        ];
        if (this.userRole === "ROOT") {
          const index = links.length - 1;
          links.splice(index, 0, {
            icon: "mdi-human-queue",
            text: "Dialysis Queuing",
            route: "/dialysis-queuing",
          });
        }
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
          { icon: "mdi-cog", text: "Management", route: "/management" },
        ];
      } else if (this.userRole === "ENCODER") {
        links = [
          {
            icon: "mdi-view-dashboard",
            text: "Dashboard",
            route: "/dashboard",
          },
          {
            icon: "mdi-account-group",
            text: "Citizens",
            route: "/citizens",
          },
          { icon: "mdi-cog", text: "Management", route: "/management" },
        ];
      } else if (this.userRole === "DIALYSIS_ENCODER") {
        links = [
          {
            icon: "mdi-view-dashboard",
            text: "Dashboard",
            route: "/dashboard",
          },
          {
            icon: "mdi-medical-bag",
            text: "Dialysis",
            route: "/dialysis",
          },
          {
            icon: "mdi-human-queue",
            text: "Dialysis Queuing",
            route: "/dialysis-queuing",
          },
          { icon: "mdi-cog", text: "Management", route: "/management" },
        ];
      }
      return links;
    },
  },
};
</script>
