import Vuex from "vuex";
import Vue from "vue";
// import store from "../../";

Vue.use(Vuex);

export const consultation_form = {
  namespaced: true,
  state: () => ({
    consultation_form: null,
  }),
  getters: {},
  mutations: {},
  actions: {
    addConsultationForm({ id, hospital_service_id, data }) {
      const url = `citizens/${id}/hospital-services/${hospital_service_id}/consultation-form`;
      return this.$axios.post(url, data).catch((error) => {
        console.error("Error Posting Consultation Form", error);
      });
    },
  },
};
