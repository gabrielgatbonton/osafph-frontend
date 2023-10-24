import { mapActions, mapGetters } from "vuex";
// import format from "date-fns/format";
// import parseISO from "date-fns/parseISO";
export default {
  data: () => ({
    dialog: false,
  }),
  methods: {
    ...mapActions("services", [
      "fetchHospitalServiceById",
      "updateHospitalService",
    ]),
    activator(citizen_id, hospital_service_id) {
      this.dialog = !this.dialog;

      return this.fetchHospitalServiceById({
        id: citizen_id,
        hospital_service_id: hospital_service_id,
      }).catch((error) => {
        console.error(
          "Error fetching hospital service request in edit: ",
          error
        );
      });
    },
    resetEditActivator(data) {
      this.dialog = data;
    },
    submitForm(payload, citizen_id, hospital_service_id) {
      let data = {};
      if (payload.service_type === "CONSULTATION") {
        data = {
          hospital: payload.hospital,
          service_type: payload.service_type,
          specialty: payload.serviceable_type,
          scheduled_date: payload.scheduled_date,
          date_released: payload.date_released,
          status: payload.status,
          remarks: payload.remarks,
        };
      } else if (payload.service_type === "DIAGNOSTIC") {
        data = {
          hospital: payload.hospital,
          service_type: payload.service_type,
          diagnostic_type: payload.serviceable_type,
          scheduled_date: payload.scheduled_date,
          date_released: payload.date_released,
          status: payload.status,
          remarks: payload.remarks,
        };
      } else if (payload.service_type === "LABORATORY") {
        data = {
          hospital: payload.hospital,
          service_type: payload.service_type,
          laboratory_type: payload.serviceable_type,
          scheduled_date: payload.scheduled_date,
          date_released: payload.date_released,
          status: payload.status,
          remarks: payload.remarks,
        };
      }
      return this.updateHospitalService({
        id: citizen_id,
        hospital_service_id: hospital_service_id,
        data: data,
      })
        .catch((error) => {
          console.error("Error Updating in Services-Table: ", error);
        })
        .finally(() => {
          this.dialog = false;
        });
    },
  },
  computed: {
    ...mapGetters("services", ["getHospitalService"]),
  },
};
