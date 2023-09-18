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
            :activator="activatorValue"
            :reset="payload"
            :dialogStatus="dialog"
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
export default {
  data: () => ({
    activatorValue: false,
    payload: null,
    dialog: null,
  }),
  components: {
    ServicesTable,
    ServiceDialog,
  },
  methods: {
    ...mapActions("services", ["fetchServicesById", "addHospitalService"]),
    requestServices() {
      const id = this.$route.params.id;
      this.fetchServicesById(id);
    },
    activator() {
      this.activatorValue = !this.activatorValue;
    },
    resetActivator(data) {
      this.activatorValue = data;
    },
    submitForm(payload) {
      const id = this.$route.params.id;
      let data = {};
      if (payload.service_type === "CONSULTATION") {
        data = {
          service_type: payload.service_type,
          specialty: payload.serviceable_type,
          scheduled_date: payload.scheduled_date,
          scheduled_time: payload.scheduled_time,
          date_released: null,
          time_released: null,
          status: "PENDING",
          remarks: payload.remarks,
          doctor_id: 1
        };
      } else if (payload.service_type === "DIAGNOSTIC") {
        data = {
          service_type: payload.service_type,
          diagnostic_type: payload.serviceable_type,
          scheduled_date: payload.scheduled_date,
          scheduled_time: payload.scheduled_time,
          date_released: null,
          time_released: null,
          status: "PENDING",
          remarks: payload.remarks,
          doctor_id: 1
        };
      } else if (payload.service_type === "LABORATORY") {
        data = {
          service_type: payload.service_type,
          laboratory_type: payload.serviceable_type,
          scheduled_date: payload.scheduled_date,
          scheduled_time: payload.scheduled_time,
          date_released: null,
          time_released: null,
          status: "PENDING",
          remarks: payload.remarks,
          doctor_id: 1
        };
      }

      return this.addHospitalService({
        id: id,
        data: data,
      })
        .then(() => {
          const payload = {
            service_type: null,
            serviceable_type: null,
            scheduled_date: null,
            scheduled_time: null,
            remarks: null,
          };
          this.payload = payload;
        })
        .catch((error) => {
          console.error(
            "Error in Adding Service in AddServiceDialog Component",
            error
          );
        })
        .finally(() => (this.dialog = false));
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
