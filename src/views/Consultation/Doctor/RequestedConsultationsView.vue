<template>
  <div>
    <v-container fluid style="max-width: 85vw">
      <div v-if="consultations">
        <div class="d-flex justify-start align-center">
          <p class="title">Consultations</p>
        </div>
        <v-divider></v-divider>

        <ConsultationsTable
          :routeName="routeName"
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
export default {
  name: "RequestedConsultationsView",
  data: () => ({
    routeName: "consultation-view",
  }),
  components: {
    ConsultationsTable,
  },
  methods: {
    ...mapActions("consultations", ["fetchConsultations"]),
    routeEvents() {
      const channel = this.$pusher.subscribe("public-hospital-services");
      const channel2 = this.$pusher.subscribe("consultations");

      channel.bind("status.changed", () => {
        this.fetchConsultations();
      });
      channel2.bind("consultation.event", () => {
        this.fetchConsultations();
      });
    },
    updateFetch(query_params) {
      this.fetchConsultations(query_params);
    },
  },
  computed: {
    ...mapState("consultations", {
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
