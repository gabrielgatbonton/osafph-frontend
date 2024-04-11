import { mapActions } from "vuex";
export default {
  data: () => ({
    deleteDialog: false,
    file_type_id: null,
  }),
  methods: {
    ...mapActions("file_types_actions", ["deleteFileType"]),
    deleteActivator(id) {
      this.file_type_id = id;
      this.deleteDialog = !this.deleteDialog;
    },
    resetActivator(data) {
      this.deleteDialog = data;
    },
    deleteItem() {
      this.deleteFileType(this.file_type_id)
        .catch((error) => {
          console.error("Error Deleting File Type", error);
        })
        .finally(() => {
          this.deleteDialog = false;
        });
    },
  },
};
