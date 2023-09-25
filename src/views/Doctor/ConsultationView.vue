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
    <!-- <ServicesTable :services="switchData" /> -->
  </div>
</template>

<script>
// import { mapActions, mapGetters } from "vuex";
// import ServicesTable from "@/components/Hospital-Service/Services-Table.vue";
export default {
  data: () => ({
    // servicesStatus: false,
  }),
  components: {
    // ServicesTable,
  },
  methods: {
    // ...mapActions("services", ["fetchServicesById"]),
    // requestServices() {
    //   const id = this.$route.params.id;
    //   this.fetchServicesById(id);
    // },
    // switchServices() {
    //   this.servicesStatus = !this.servicesStatus;
    // },
  },
  computed: {
    // ...mapGetters("services", ["getHospitalServices", "getArchivedServices"]),
    // switchData() {
    //   return this.servicesStatus
    //     ? this.getArchivedServices
    //     : this.getHospitalServices;
    // },
  },
  watch: {
      
  },
  created() {
    // this.requestServices();
  },
};
</script>

<style scoped>
.table-title {
  width: 100%;
}
</style>
