<template>
  <div>
    <v-container fluid class="table-title ma-2">
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
            >{{
              consultationsStatus ? "Pending" : "Archived"
            }}</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
    <v-divider class="mx-3"></v-divider>
    <ConsultationsTable :routeName="routeName" :consultations="switchData"/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ConsultationsTable from '@/components/Consultation/Consultations-Table.vue';
export default {
  data: () => ({
    consultationsStatus: false,
    routeName: "consultation-view"
  }),
  components: {
    ConsultationsTable,
  },
  methods: {
    ...mapActions("consultations", ["fetchConsultations"]),
    switchConsultations() {
      this.consultationsStatus = !this.consultationsStatus;
    }
  },
  computed: {
    ...mapGetters("consultations", ["getPendingConsultations", "getArchivedConsultations"]),
    switchData() {
      return this.consultationsStatus
        ? this.getArchivedConsultations
        : this.getPendingConsultations;
    },
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
