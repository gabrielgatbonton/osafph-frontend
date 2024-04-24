<template>
  <div>
    <SubmissionAlert v-if="success.alert" :message="success.message" />
    <ErrorAlert v-if="failed.alert" :message="failed.message" />
    <div v-if="getAdminConsultations">
      <v-container fluid class="table-title ma-1">
        <v-row no-gutters>
          <v-col cols="auto">
            <v-icon left>mdi-medical-bag</v-icon>
            <span class="title">List of Requested Consultations</span>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="auto"></v-col>
        </v-row>
      </v-container>
      <v-divider class="mx-3"></v-divider>
      <v-container fluid class="ma-1">
        <ConsultationsTable
          :route-name="routeName"
          :consultations="getAdminConsultations"
        />
      </v-container>
    </div>
    <div v-else class="pa-6">
      <v-skeleton-loader type="table"></v-skeleton-loader>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ConsultationsTable from "@/components/Consultation/Consultations-Table.vue";
import ErrorAlertsLogic from "@/mixins/Alerts & Errors/ErrorAlertsLogic";
export default {
  name: "ConsultationIndexView",
  data: () => ({
    routeName: "citizens-consultations-view",
  }),
  mixins: [ErrorAlertsLogic],
  components: {
    ConsultationsTable,
  },
  methods: {
    ...mapActions("admin_consultations", ["fetchConsultations"]),
  },
  computed: {
    ...mapGetters("admin_consultations", ["getAdminConsultations"]),
  },
  created() {
    this.fetchConsultations();
  },
};
</script>

<style scoped>
.table-title {
  width: 100%;
}
</style>
