<template>
  <div>
    <div v-if="switchData">
      <v-container fluid class="table-title ma-1">
        <v-row>
          <v-col cols="auto">
            <v-icon left>mdi-medical-bag</v-icon>
            <span class="title">Consultations</span>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="auto">
            <v-btn
              class="mr-3"
              color="blue darken-4"
              dark
              @click="switchConsultations"
              >{{ consultationsStatus ? "Pending" : "Archived" }}</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
      <v-divider class="mx-3"></v-divider>
      <v-container fluid class="ma-1">
        <ConsultationsTable
          :routeName="routeName"
          :consultations="switchData"
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
export default {
  data: () => ({
    consultationsStatus: false,
    routeName: "consultation-view",
  }),
  components: {
    ConsultationsTable,
  },
  methods: {
    ...mapActions("consultations", ["fetchConsultations"]),
    switchConsultations() {
      this.consultationsStatus = !this.consultationsStatus;
    },
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
  },
  computed: {
    ...mapGetters("consultations", [
      "getPendingConsultations",
      "getArchivedConsultations",
    ]),
    switchData() {
      return this.consultationsStatus
        ? this.getArchivedConsultations
        : this.getPendingConsultations;
    },
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
