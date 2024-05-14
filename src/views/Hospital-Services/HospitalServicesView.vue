<template>
  <div>
    <SubmissionAlert v-if="success.alert" :message="success.message" />
    <ErrorAlert v-if="failed.alert" :message="failed.message" />
    <v-container fluid :style="`max-width: ${breakpointVal};`">
      <div v-if="services">
        <v-row no-gutters align="center">
          <v-col cols="auto">
            <p class="title">Acquired Services</p>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="auto">
            <v-btn
              v-if="!$vuetify.breakpoint.xs"
              class="mr-3 mb-4"
              color="primary"
              dark
              @click="activator"
            >
              Add Service
            </v-btn>
            <v-btn
              v-else
              class="mr-3 mb-4"
              color="primary"
              dark
              icon
              @click="activator"
              ><v-icon> mdi-plus </v-icon></v-btn
            >
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <ServicesTable @query_params="updateFetch" :services="services" />
      </div>
      <div v-else>
        <v-skeleton-loader type="table"></v-skeleton-loader>
      </div>
    </v-container>
    <ServiceDialog
      v-on:dialogResponse="resetActivator"
      v-on:submitForm="submitForm"
      :activator="dialog"
      :reset="payload"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import ServicesTable from "@/components/Hospital-Service/Services-Table.vue";
import ServiceDialog from "@/components/Hospital-Service/ServiceDialog.vue";
import addServiceMixin from "@/mixins/Hospital-Service/AddService";
import ErrorAlertsLogic from "../../mixins/Alerts & Errors/ErrorAlertsLogic";
import ContainerBreakpoint from "@/mixins/ContainerBreakpoint";
export default {
  data: () => ({}),
  mixins: [addServiceMixin, ErrorAlertsLogic, ContainerBreakpoint],
  components: {
    ServicesTable,
    ServiceDialog,
  },
  methods: {
    ...mapActions("services", ["fetchServicesById"]),
    requestServices(query_params = {}) {
      const id = this.$route.params.id;
      this.fetchServicesById({
        id: id,
        queryParams: query_params,
      });
    },
    updateFetch(query_params) {
      this.requestServices(query_params);
    },
    routeEvents() {
      const channel = this.$pusher.subscribe("public-hospital-services");

      channel.bind("status.changed", () => {
        this.requestServices();
      });
      channel.bind("hospital-service.created", () => {
        this.requestServices();
      });
      channel.bind("hospital-service.updated", () => {
        this.requestServices();
      });
      channel.bind("hospital-service.deleted", () => {
        this.requestServices();
      });
    },
  },
  computed: {
    ...mapState("services", {
      services: "hospitalServices",
    }),
  },
  created() {
    this.requestServices();
    this.routeEvents();
  },
};
</script>

<style scoped>
.table-title {
  width: 100%;
}
</style>
