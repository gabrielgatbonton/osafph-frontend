import { mapGetters } from "vuex";
import SubmissionAlert from "@/components/SubmissionAlert.vue";
import ErrorAlert from "@/components/ErrorAlert.vue";
export default {
  components: {
    SubmissionAlert,
    ErrorAlert,
  },
  computed: {
    ...mapGetters("alerts", ["getShowAlert", "getShowError"]),
    success() {
      let alert = false;
      let message = null;
      if (this.getShowAlert) {
        message = this.getShowAlert;
        alert = true;
      }
      setTimeout(() => {
        alert = false;
      }, 3000);
      return {
        alert: alert,
        message: message,
      };
    },
    failed() {
      let alert = false;
      let message = null;
      if (this.getShowError) {
        message = this.getShowError;
        alert = true;
      }
      setTimeout(() => {
        alert = false;
      }, 3000);
      return {
        alert: alert,
        message: message,
      };
    },
  },
};
