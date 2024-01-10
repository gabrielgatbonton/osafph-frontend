import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    // hospital_service_id: null,
    // file_id: null,
    overlay: false,
  }),
  methods: {
    ...mapActions("consultations", ["fetchConsultationFile"]),
    activator(file_id, hospital_service_id) {
      this.fetchConsultationFile({
        file_id: file_id,
        hospital_service_id: hospital_service_id,
      }).catch((error) => {
        console.log("Error Proceding with fetch:", error);
      });
      this.overlay = !this.overlay;
    },
    resetOverlayActivator(value) {
        this.overlay = value;
    }
  },
  computed: {
    ...mapGetters("consultations", ["getConsultationFile"]),
  },
  // resetActivator(data) {
  //   this.deleteDialog = data;
  // },
  // deleteItem() {
  //   this.deleteConsultationFile({
  //     file_id: this.file_id,
  //     hospital_service_id: this.hospital_service_id,
  //   })
  //     .catch((error) => {
  //       console.log("Error Proceding with delete:", error);
  //     })
  //     .finally(() => {
  //       this.deleteDialog = false;
  //     });
  // },
};
