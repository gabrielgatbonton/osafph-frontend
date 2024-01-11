import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    data: {
      base64: null,
      file_type: null,
    },
  }),
  methods: {
    ...mapActions("consultations", ["fetchConsultationFile"]),
    activator(file_id, hospital_service_id) {
      this.$router
        .push({
          name: "consultation-files-view",
          query: {
            file_id: JSON.stringify(file_id),
            hospital_service_id: JSON.stringify(hospital_service_id),
          },
        })
        .catch((error) => {
          console.log("Error Moving to Next Route:", error);
        });
    },
  },
  computed: {
    ...mapGetters("consultations", ["getConsultationFile"]),
  },
  watch: {
    getConsultationFile(value) {
      this.data.base64 = value.file;
      this.data.file_type = value.file_type;
    },
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
