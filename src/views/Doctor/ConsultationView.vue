<template>
  <div>
    <v-container fluid class="table-title ma-2">
      <v-row>
        <v-col cols="auto">
          <v-icon left>mdi-medical-bag</v-icon>
          <span class="title">Consultations</span>
        </v-col>
      </v-row>
    </v-container>
    <v-divider class="mx-3"></v-divider>
    <ConsultationsTable :consultations="getConsultations"/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ConsultationsTable from '@/components/Hospital-Service/Consultations-Table.vue';
export default {
  data: () => ({
    // servicesStatus: false,
  }),
  components: {
    ConsultationsTable,
  },
  methods: {
    ...mapActions("consultations", ["fetchConsultations"]),
  },
  computed: {
    ...mapGetters("consultations", ["getConsultations"]),
    // switchData() {
    //   return this.servicesStatus
    //     ? this.getArchivedServices
    //     : this.getHospitalServices;
    // },
  },
  watch: {
      getConsultations(value) {
        console.log(value);
      }
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
