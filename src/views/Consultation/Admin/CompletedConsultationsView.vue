<template>
  <div>
    <SubmissionAlert v-if="success.alert" :message="success.message" />
    <ErrorAlert v-if="failed.alert" :message="failed.message" />
    <v-container fluid :style="`max-width: ${breakpointVal};`">
      <div v-if="consultations">
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
          :consultations="consultations"
          @query_params="updateFetch"
        />
      </div>
      <div v-else>
        <v-skeleton-loader type="table"></v-skeleton-loader>
      </div>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import ConsultationsTable from "@/components/Consultation/Consultations-Table.vue";
import ErrorAlertsLogic from "@/mixins/Alerts & Errors/ErrorAlertsLogic";
import ContainerBreakpoint from "@/mixins/ContainerBreakpoint";
export default {
  name: "ConsultationIndexView",
  data: () => ({
    routeName: "citizens-consultations-view",
  }),
  mixins: [ErrorAlertsLogic, ContainerBreakpoint],
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
    updateFetch(query_params) {
      this.fetchConsultations(query_params);
    },
  },
  computed: {
    ...mapState("admin_consultations", {
      consultations: "consultations",
    }),
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
