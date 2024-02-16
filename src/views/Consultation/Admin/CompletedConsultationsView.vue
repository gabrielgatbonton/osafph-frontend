<template>
  <div>
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
    <ConsultationsTable :route-name="routeName" :consultations="getAdminConsultations" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ConsultationsTable from "@/components/Consultation/Consultations-Table.vue";
export default {
  name: "ConsultationIndexView",
  data: () => ({
    routeName: "citizens-consultations-view",
  }),
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
