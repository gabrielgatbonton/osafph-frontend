<template>
  <div>
    <v-container fluid class="table-title ma-2">
      <v-row>
        <v-col cols="auto">
          <v-icon left>mdi-account-box-multiple</v-icon>
          <span class="title">Acquired Services</span>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="auto">
          <v-btn class="mr-3" color="blue darken-4" dark @click="activator">
            Add Service
          </v-btn>
          <ServiceDialog
            v-on:dialogResponse="resetActivator"
            v-on:submitForm="submitForm"
            :activator="dialog"
            :reset="payload"
          />
        </v-col>
      </v-row>
    </v-container>
    <v-divider class="mx-3"></v-divider>
    <ServicesTable :services="getHospitalServices" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ServicesTable from "@/components/Hospital-Service/Services-Table.vue";
import ServiceDialog from "@/components/Hospital-Service/ServiceDialog.vue";
import addServiceMixin from "@/mixins/Hospital-Service/AddService";
export default {
  mixins: [addServiceMixin],
  components: {
    ServicesTable,
    ServiceDialog,
  },
  methods: {
    ...mapActions("services", ["fetchServicesById"]),
    requestServices() {
      const id = this.$route.params.id;
      this.fetchServicesById(id);
    },
  },
  computed: {
    ...mapGetters("services", ["getHospitalServices"]),
  },
  watch: {
    // getHospitalServices(value) {
    //     console.log("success: ", value);
    // }
  },
  created() {
    this.requestServices();
  },
};
</script>

<style scoped>
.table-title {
  width: 100%;
}
</style>
