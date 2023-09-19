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
          service_type: payload.service_type,
          specialty: payload.serviceable_type,
          scheduled_date: payload.scheduled_date,
          scheduled_time: payload.scheduled_time,
          date_released: null,
          time_released: null,
          status: "PENDING",
          remarks: payload.remarks,
          doctor_id: 1,
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
          doctor_id: 1,
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
          doctor_id: 1,
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
};
