import { mapActions } from "vuex";
export default {
  data: () => ({
    deleteDialog: false,
    hospital_service_id: null,
    file_id: null,
  }),
  methods: {
    ...mapActions("files", ["deleteFile"]),
    deleteActivator(file_id, hospital_service_id) {
      this.deleteDialog = !this.deleteDialog;
      this.file_id = file_id;
      this.hospital_service_id = hospital_service_id;
    },
    resetActivator(data) {
      this.deleteDialog = data;
    },
    deleteItem() {
      this.deleteFile({
        file_id: this.file_id,
        hospital_service_id: this.hospital_service_id,
      })
        .catch((error) => {
          console.log("Error Proceding with delete:", error);
        })
        .finally(() => {
          this.deleteDialog = false;
        });
    },
  },
};
