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
        <DropdownDrawer
          v-if="auth.citizen"
          :content="citizen.dropDownData"
          :sublinks="citizen.citizensSublinks"
        />
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import DropdownDrawer from "./Dropdown/DropdownDrawer.vue";
export default {
  data: () => ({
    links: null,
    citizen: {
      dropDownData: {
        icon: null,
        title: null,
      },
      citizensSublinks: [],
    },
    auth: {
      citizen: false,
    },
  }),
  props: ["drawer"],
  components: {
    DropdownDrawer,
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
  },
  methods: {
    setLinks() {
      let links = [];
      if (this.userRole === "ADMIN" || this.userRole === "ROOT") {
        links = [
          {
            icon: "mdi-view-dashboard",
            text: "Dashboard",
            route: "/dashboard",
          },
          { icon: "mdi-cog", text: "Management", route: "/management" },
        ];
        //Configuration for the Citizen Dropdown NavDrawer
        this.auth.citizen = true;
        this.citizen.dropDownData = {
          icon: "mdi-account-group",
          title: "Citizens",
        };
        this.citizen.citizensSublinks = [
          {
            icon: "mdi-account",
            text: "Registrants",
            route: "/citizens",
          },
          {
            icon: "mdi-medical-bag",
            text: "Consultations",
            route: "/citizens-consultations",
          },
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
          { icon: "mdi-cog", text: "Management", route: "/management" },
        ];
      } else if (this.userRole === "ENCODER") {
        links = [
          {
            icon: "mdi-view-dashboard",
            text: "Dashboard",
            route: "/dashboard",
          },
          { icon: "mdi-cog", text: "Management", route: "/management" },
        ];
        //Configuration for the Citizen Dropdown NavDrawer
        this.auth.citizen = true;
        this.citizen.dropDownData = {
          icon: "mdi-account-group",
          title: "Citizens",
        };
        this.citizen.citizensSublinks = [
          {
            icon: "mdi-account",
            text: "Registrants",
            route: "/citizens",
          },
        ];
      }

      this.links = links;
    },
  },
  mounted() {
    console.log(this.userRole);
    this.setLinks();
  },
};
</script>
