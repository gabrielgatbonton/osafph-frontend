<template>
  <div>
    <v-container fluid class="table-title ma-2">
      <v-row>
        <v-col cols="auto">
          <v-icon left>mdi-medical-bag</v-icon>
          <span class="title">List of Requested Consultations</span>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="auto">
          <!-- <v-btn
              class="mr-3"
              color="blue darken-4"
              dark
              @click="switchConsultations"
              >{{
                consultationsStatus ? "Pending" : "Archived"
              }}</v-btn
            > -->
        </v-col>
      </v-row>
    </v-container>
    <v-divider class="mx-3"></v-divider>
    <ConsultationsTable :route-name="routeName" :consultations="getAdminConsultations" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ConsultationsTable from "@/components/Hospital-Service/Consultations-Table.vue";
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
