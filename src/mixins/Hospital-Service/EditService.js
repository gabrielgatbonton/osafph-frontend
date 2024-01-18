import { mapActions, mapGetters } from "vuex";
import { format, parse } from "date-fns";
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
          scheduled_date: format(
            parse(payload.scheduled_date, "MMMM dd, yyyy", new Date()),
            "yyyy-MM-d"
          ),
          date_released: format(
            parse(payload.date_released, "MMMM dd, yyyy", new Date()),
            "yyyy-MM-d"
          ),
          status: payload.status,
          remarks: payload.remarks,
          crowd_funding_backer: payload.crowd_funding_backer,
        };
      } else if (payload.service_type === "DIAGNOSTIC") {
        data = {
          hospital: payload.hospital,
          service_type: payload.service_type,
          diagnostic_type: payload.serviceable_type,
          scheduled_date: format(
            parse(payload.scheduled_date, "MMMM dd, yyyy", new Date()),
            "yyyy-MM-d"
          ),
          date_released: format(
            parse(payload.date_released, "MMMM dd, yyyy", new Date()),
            "yyyy-MM-d"
          ),
          status: payload.status,
          remarks: payload.remarks,
          crowd_funding_backer: payload.crowd_funding_backer,
        };
      } else if (payload.service_type === "LABORATORY") {
        data = {
          hospital: payload.hospital,
          service_type: payload.service_type,
          laboratory_type: payload.serviceable_type,
          scheduled_date: format(
            parse(payload.scheduled_date, "MMMM dd, yyyy", new Date()),
            "yyyy-MM-d"
          ),
          date_released: format(
            parse(payload.date_released, "MMMM dd, yyyy", new Date()),
            "yyyy-MM-d"
          ),
          status: payload.status,
          remarks: payload.remarks,
          crowd_funding_backer: payload.crowd_funding_backer,
        };
      } else if (payload.service_type === "DIALYSIS") {
        data = {
          service_type: payload.service_type,
          hospital: payload.hospital,
          dialysis_machine: payload.dialysis_machine,
          scheduled_date: format(
            parse(payload.scheduled_date, "MMMM dd, yyyy", new Date()),
            "yyyy-MM-d"
          ),
          scheduled_session: payload.scheduled_session,
          date_released: payload.date_released ? format(
            parse(payload.date_released, "MMMM dd, yyyy", new Date()),
            "yyyy-MM-d"
          ) : null,
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
