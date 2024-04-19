<template>
  <div>
    <SubmissionAlert v-if="success.alert" :message="success.message" />
    <ErrorAlert v-if="failed.alert" :message="failed.message" />
    <v-container fluid class="table-title ma-1">
      <v-row no-gutters>
        <v-col cols="auto">
          <v-icon left>mdi-account-box-multiple</v-icon>
          <span class="title">Acquired Services</span>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="auto">
          <v-btn
            v-if="!$vuetify.breakpoint.xs"
            class="mr-3"
            color="blue darken-4"
            dark
            @click="activator"
          >
            Add Service
          </v-btn>
          <v-btn
            v-else
            class="mr-3"
            color="blue darken-4"
            dark
            icon
            @click="activator"
            ><v-icon> mdi-plus </v-icon></v-btn
          >
          <ServiceDialog
            v-on:dialogResponse="resetActivator"
            v-on:submitForm="submitForm"
            :activator="dialog"
            :reset="payload"
          />
        </v-col>
      </v-row>
    </v-container>
    <v-divider class="mx-3"></v-divider>
    <v-container fluid class="ma-1">
      <ServicesTable @query_params="updateFetch" :services="services" />
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import ServicesTable from "@/components/Hospital-Service/Services-Table.vue";
import ServiceDialog from "@/components/Hospital-Service/ServiceDialog.vue";
import addServiceMixin from "@/mixins/Hospital-Service/AddService";
import ErrorAlertsLogic from "../../mixins/Alerts & Errors/ErrorAlertsLogic";
export default {
  data: () => ({}),
  mixins: [addServiceMixin, ErrorAlertsLogic],
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
  },
  computed: {
    ...mapState("services", {
      services: "hospitalServices",
    }),
  },
  created() {
    this.requestServices();
    const channel = this.$pusher.subscribe("public-hospital-services");
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
};
</script>

<style scoped>
.table-title {
  width: 100%;
}
</style>
