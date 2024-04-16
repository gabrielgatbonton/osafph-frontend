<template>
  <div>
    <SubmissionAlert :message="success.message" v-if="success.alert" />
    <ErrorAlert :message="failed.message" v-if="failed.alert" />
    <v-container fluid class="ma-1">
      <v-row no-gutters>
        <v-col cols="auto">
          <v-icon left>mdi-account-box-multiple</v-icon>
          <span class="title">List of Citizens</span>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="auto">
          <v-btn
            v-if="!$vuetify.breakpoint.xs"
            dark
            class="mr-3 blue darken-4"
            @click="toRegister"
            >Register</v-btn
          >
          <v-btn
            v-else
            dark
            class="mr-3"
            color="blue darken-4"
            @click="toRegister"
            icon
            ><v-icon>mdi-plus</v-icon></v-btn
          >
        </v-col>
      </v-row>
    </v-container>
    <v-divider class="mx-3"></v-divider>
    <v-container fluid class="ma-1">
      <DataTable
        v-if="registrants"
        :registrants="registrants"
        @query:options="filterQuery"
        @query:search="filterQuery"
        @dialog:filter="filterQuery"
      />
    </v-container>
  </div>
</template>

<script>
import DataTable from "@/components/Data-Table.vue";
import ErrorAlertsLogic from "@/mixins/Alerts & Errors/ErrorAlertsLogic";
import { mapState, mapActions } from "vuex";
export default {
  name: "CitizensView",
  mixins: [ErrorAlertsLogic],
  components: {
    DataTable,
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions("registrants", ["fetchRegistrants"]),
    toRegister() {
      this.$router.push({ name: "register" });
    },
    filterQuery(value) {
      this.fetchRegistrants(value);
    },
    fetchData() {
      // Fetch registrants' data when the component is created
      this.fetchRegistrants();
    },
  },
  computed: {
    ...mapState("registrants", {
      registrants: "registrants",
    }),
    mobileBreakpoint() {
      return {
        filter: {
          value: this.$vuetify.breakpoint.xs ? "mdi-magnify" : "Filter",
          icon: true,
        },
      };
    },
  },
  created() {
    this.fetchData();
    const channel = this.$pusher.subscribe("public-citizens");
    channel.bind("citizen.created", () => {
      this.fetchData();
    });
    channel.bind("citizen.updated", () => {
      this.fetchData();
    });
    channel.bind("citizen.deleted", () => {
      this.fetchData();
    });
  },
};
</script>

<style scoped></style>
