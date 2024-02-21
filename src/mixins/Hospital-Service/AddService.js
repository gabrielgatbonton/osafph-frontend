import { mapActions } from "vuex";
export default {
  data: () => ({
    payload: null,
    dialog: false,
  }),
  methods: {
    ...mapActions("services", ["addHospitalService"]),
    activator() {
      this.dialog = !this.dialog;
    },
    resetActivator(data) {
      this.dialog = data;
    },
    submitForm(payload) {
      const id = this.$route.params.id;
      let data = {};
      if (payload.service_type === "CONSULTATION") {
        data = {
          hospital: payload.hospital,
          service_type: payload.service_type,
          specialty: payload.serviceable_type,
          scheduled_date: payload.scheduled_date,
          date_released: null,
          status: payload.status,
          remarks: payload.remarks,
        };
      } else if (payload.service_type === "DIAGNOSTIC") {
        data = {
          hospital: payload.hospital,
          service_type: payload.service_type,
          diagnostic_type: payload.serviceable_type,
          scheduled_date: payload.scheduled_date,
          date_released: null,
          status: payload.status,
          remarks: payload.remarks,
          crowd_funding_backer: payload.crowd_funding_backer,
        };
      } else if (payload.service_type === "LABORATORY") {
        data = {
          hospital: payload.hospital,
          service_type: payload.service_type,
          laboratory_type: payload.serviceable_type,
          scheduled_date: payload.scheduled_date,
          date_released: null,
          status: payload.status,
          remarks: payload.remarks,
          crowd_funding_backer: payload.crowd_funding_backer,
        };
      } else if (payload.service_type === "DIALYSIS") {
        data = {
          service_type: payload.service_type,
          crowd_funding_backer: payload.crowd_funding_backer,
          total_sessions: payload.total_sessions,
          hospital: payload.hospital,
          schedule: payload.schedule,
          dialysis_package: payload.dialysis_items,
          all_items_sponsored: payload.all_items_sponsored,
          dialysis_machine: payload.dialysis_machine,
          all_sessions_sponsored: payload.all_sessions_sponsored,
          status: "PENDING",
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
            remarks: null,
            hospital: null,
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
};
