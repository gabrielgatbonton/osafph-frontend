<template>
  <div>
    <SubmissionAlert v-if="success.alert" :message="success.message" />
    <ErrorAlert v-if="failed.alert" :message="failed.message" />
    <v-container fluid class="table-title ma-2">
      <v-row no-gutters>
        <v-col cols="auto">
          <v-icon left>mdi-account-box-multiple</v-icon>
          <span class="title">Acquired Services</span>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="auto">
          <v-btn
            class="mr-3"
            color="blue darken-4"
            dark
            @click="switchServices"
            >{{
              servicesStatus ? "Pending Services" : "Archived Services"
            }}</v-btn
          >
        </v-col>
        <v-col cols="auto">
          <v-btn class="mr-3" color="blue darken-4" dark @click="activator">
            Add Service
          </v-btn>
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
    <ServicesTable :services="switchData" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ServicesTable from "@/components/Hospital-Service/Services-Table.vue";
import ServiceDialog from "@/components/Hospital-Service/ServiceDialog.vue";
import addServiceMixin from "@/mixins/Hospital-Service/AddService";
import ErrorAlertsLogic from "../../mixins/Alerts & Errors/ErrorAlertsLogic";
export default {
  data: () => ({
    servicesStatus: false,
  }),
  mixins: [addServiceMixin, ErrorAlertsLogic],
  components: {
    ServicesTable,
    ServiceDialog,
  },
  methods: {
    ...mapActions("services", ["fetchServicesById"]),
    requestServices() {
      const id = this.$route.params.id;
      this.fetchServicesById(id);
    },
    switchServices() {
      this.servicesStatus = !this.servicesStatus;
    },
  },
  computed: {
    ...mapGetters("services", ["getPendingServices", "getArchivedServices"]),
    switchData() {
      return this.servicesStatus
        ? this.getArchivedServices
        : this.getPendingServices;
    },
  },
  created() {
    this.requestServices();
  },
};
</script>

<style scoped>
.table-title {
  width: 100%;
}
</style>
