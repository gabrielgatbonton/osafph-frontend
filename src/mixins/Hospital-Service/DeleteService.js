import { mapActions } from "vuex";
export default {
  data: () => ({
    deleteDialog: false,
    citizen_id: null,
    hospital_service_id: null,
  }),
  methods: {
    ...mapActions("services", ["deleteHospitalService"]),
    deleteActivator(citizen_id, hospital_service_id) {
      this.deleteDialog = !this.deleteDialog;
      this.citizen_id = citizen_id;
      this.hospital_service_id = hospital_service_id;
    },
    resetActivator(data) {
        this.deleteDialog = data;
      },
    deleteItem() {
      this.loading = true;

      this.deleteHospitalService({
        id: this.citizen_id,
        hospital_service_id: this.hospital_service_id,
      })
        .then(() => (this.loading = false))
        .catch((error) => {
          console.log("Error Proceding with delete:", error);
        })
        .finally(() => {
          this.deleteDialog = false;
        });
    },
  },
};
