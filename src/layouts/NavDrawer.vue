<template>
  <div>
    <v-navigation-drawer
      v-model="localDrawer"
      app
      :permanent="isPermanent"
      :mini-variant="miniVariant"
      :width="drawerWidth"
    >
      <!-- Shows only when nav drawer is mini variant -->
      <v-img
        v-if="miniVariant"
        class="mx-auto my-2"
        :src="logoUrl"
        width="40"
        height="40"
      ></v-img>

      <!-- Shows only when nav drawer is collapsible -->
      <v-container v-else>
        <v-row class="red darken-1">
          <v-col cols="auto" class="d-flex align-start">
            <v-img :src="logoUrl" height="35" width="35" contain eager></v-img>
          </v-col>
          <v-col cols="auto">
            <p class="subtitle-2 white--text pa-0 ma-0">OSAFPH</p>
            <p class="caption white--text pa-0 ma-0">
              Mabalacat City, Pampanga
            </p>
          </v-col>
        </v-row>
      </v-container>

      <NavButtons :links="navLinks" :user="userRole" :isMini="miniVariant" />
    </v-navigation-drawer>
  </div>
</template>

<script>
import NavButtons from "./NavButtons.vue";
export default {
  props: ["drawer"],
  data: () => ({
    logoUrl: require("@/assets/logo/OSAFPH LOGO.png"),
    miniVariant: false,
    drawerWidth: "200",
    isPermanent: false,
  }),
  components: {
    NavButtons,
  },
  computed: {
    userRole: function () {
      return this.$auth.role();
    },
    localDrawer: {
      get() {
        return this.drawer;
      },
      set(value) {
        this.$emit("update-drawer", value);
      },
    },
    navLinks() {
      return [
        {
          icon: "mdi-view-dashboard-outline",
          filledIcon: "mdi-view-dashboard",
          text: "Dashboard",
          route: "/dashboard",
          users: [
            "ADMIN",
            "ROOT",
            "DOCTOR",
            "ENCODER",
            "VIP_ENCODER",
            "DIALYSIS_ENCODER",
          ],
        },
        {
          icon: "mdi-account-group-outline",
          filledIcon: "mdi-account-group",
          text: "Citizens",
          route: "/citizens",
          users: ["ADMIN", "ROOT", "ENCODER", "VIP_ENCODER"],
        },
        {
          icon: "mdi-tune-variant",
          filledIcon: "mdi-tune-variant",
          text: "Service Managament",
          users: ["ADMIN", "ROOT"],
          subroutes: [
            {
              icon: "mdi-package-variant-closed",
              filledIcon: "mdi-package-variant",
              text: "Dialysis Packages",
              route: "/dialysis-packages",
              users: ["ADMIN", "ROOT"],
            },
            {
              icon: "mdi-needle",
              filledIcon: "mdi-needle",
              text: "Dialysis Items",
              route: "/dialysis-items",
              users: ["ADMIN", "ROOT"],
            },
            {
              icon: "mdi-file-document-outline",
              filledIcon: "mdi-file-document",
              text: "Documents",
              route: "/document-types",
              users: ["ADMIN", "ROOT"],
            },
          ],
        },
        {
          icon: "mdi-hospital-box-outline",
          filledIcon: "mdi-hospital-box",
          text: "Dialysis",
          route: "/dialysis",
          users: ["DIALYSIS_ENCODER"],
        },
        {
          icon: "mdi-human-queue",
          filledIcon: "mdi-human-queue",
          text: "Dialysis Queuing",
          route: "/dialysis-queuing",
          users: ["DIALYSIS_ENCODER", "ROOT"],
        },
        {
          icon: "mdi-hospital-box-outline",
          filledIcon: "mdi-hospital-box",
          text: "Consultations",
          route: `${
            this.userRole === "DOCTOR"
              ? "/consultations"
              : "/citizens-consultations"
          }`,
          users: ["ADMIN", "ROOT", "DOCTOR"],
        },
        {
          icon: "mdi-cog-outline",
          filledIcon: "mdi-cog",
          text: "User Management",
          route: "/management",
          users: [
            "ADMIN",
            "ROOT",
            "DOCTOR",
            "ENCODER",
            "VIP_ENCODER",
            "DIALYSIS_ENCODER",
          ],
        },
      ];
    },

    size() {
      return this.$vuetify.breakpoint;
    },
  },
  watch: {
    size: {
      handler: function (newVal) {
        if (newVal.xs || newVal.sm) {
          this.miniVariant = false;
          this.drawerWidth = "300";
          this.isPermanent = false;
        } else {
          this.miniVariant = true;
          this.drawerWidth = "56";
          this.isPermanent = true;
        }
      },
      deep: true,
    },
  },
};
</script>
