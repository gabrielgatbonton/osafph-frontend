<template>
  <div>
    <SubmissionAlert v-if="success.alert" :message="success.message" />
    <ErrorAlert v-if="failed.alert" :message="failed.message" />
    <v-container fluid style="max-width: 85vw">
      <div v-if="getAdminConsultations">
        <v-row no-gutters>
          <v-col cols="auto">
            <p class="title">Completed Consultations</p>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="auto"></v-col>
        </v-row>
        <v-divider></v-divider>
        <ConsultationsTable
          :route-name="routeName"
          :consultations="getAdminConsultations"
        />
      </div>
      <div v-else>
        <v-skeleton-loader type="table"></v-skeleton-loader>
      </div>
    </v-container>
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
    routeEvents() {
      const channel = this.$pusher.subscribe("public-hospital-services");

      channel.bind("consultation-form.created", () => {
        this.fetchConsultations();
      });
      channel.bind("consultation-form.updated", () => {
        this.fetchConsultations();
      });
      channel.bind("consultation-form.deleted", () => {
        this.fetchConsultations();
      });
    },
  },
  computed: {
    ...mapGetters("admin_consultations", ["getAdminConsultations"]),
  },
  created() {
    this.fetchConsultations();
    this.routeEvents();
  },
};
</script>

<style scoped>
.table-title {
  width: 100%;
}
</style>
