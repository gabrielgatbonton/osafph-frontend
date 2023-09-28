import { mapGetters } from "vuex";
import SubmissionAlert from "@/components/SubmissionAlert.vue";
import ErrorAlert from "@/components/ErrorAlert.vue";
export default {
  data: () => ({
    showAlert: false,
    showError: false,
    title: null,
  }),
  components: {
    SubmissionAlert,
    ErrorAlert,
  },
  computed: {
    ...mapGetters("alerts", ["getShowAlert", "getShowError"]),
  },
  watch: {
    getShowAlert(value) {
      console.log("alert", value);
      this.showAlert = value.alert;
      this.title = value.message;
      setTimeout(() => {
        this.showAlert = false;
      }, 5000);
    },
    getShowError(value) {
      console.log("error", value);
      this.showError = value.alert;
      this.title = value.message;
      setTimeout(() => {
        this.showError = false;
      }, 5000);
    },
  },
};
