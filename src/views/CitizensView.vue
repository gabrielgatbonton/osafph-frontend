<template>
  <div>
    <SubmissionAlert :message="success.message" v-if="success.alert" />
    <ErrorAlert :message="failed.message" v-if="failed.alert" />
    <v-container fluid :style="`max-width: ${breakpointVal};`">
      <div v-if="registrants">
        <v-row no-gutters align="center">
          <v-col cols="auto">
            <p class="title">Citizens</p>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="auto">
            <v-btn
              v-if="!$vuetify.breakpoint.xs"
              dark
              class="mr-3 mb-4"
              color="primary"
              @click="toRegister"
              >Register</v-btn
            >
            <v-btn
              v-else
              dark
              class="mr-3 mb-4"
              color="primary"
              @click="toRegister"
              icon
              ><v-icon>mdi-plus</v-icon></v-btn
            >
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <DataTable :registrants="registrants" @query_params="filterQuery" />
      </div>
      <div v-else>
        <v-skeleton-loader type="table"></v-skeleton-loader>
      </div>
    </v-container>
  </div>
</template>

<script>
import DataTable from "@/components/Data-Table.vue";
import ErrorAlertsLogic from "@/mixins/Alerts & Errors/ErrorAlertsLogic";
import TableBreakpoint from "@/mixins/Tables/TableBreakpoint";
import { mapState, mapActions } from "vuex";
export default {
  name: "CitizensView",
  mixins: [ErrorAlertsLogic, TableBreakpoint],
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
    routeEvents() {
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
  },
  computed: {
    ...mapState("registrants", {
      registrants: "registrants",
    }),
  },
  created() {
    this.fetchData();
    this.routeEvents();
  },
};
</script>

<style scoped></style>
