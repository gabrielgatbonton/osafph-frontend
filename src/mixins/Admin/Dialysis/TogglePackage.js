import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions("dialysis_packages", ["toggleDialysisPackage"]),
    togglePackage(id) {
      this.toggleDialysisPackage(id).catch((error) => {
        console.error("Error Toggling Dialysis Package", error);
      });
    },
  },
};
