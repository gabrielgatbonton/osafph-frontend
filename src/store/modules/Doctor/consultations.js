import Vuex from "vuex";
import Vue from "vue";
import store from "../../";

Vue.use(Vuex);

export const consultations = {
  namespaced: true,
  state: () => ({
    consultations: null,
    consultation: null,
    doctorConsultationForms: [],
    consultation_form: null,
  }),
  getters: {
    getPendingConsultations: (state) => {
      if (state.consultations.consultations) {
        const pendingConsultations = state.consultations.consultations
          .filter(
            (consultation) =>
              consultation.hospital_service.status.includes("PENDING") ||
              consultation.hospital_service.status.includes("IN PROGRESS") ||
              consultation.hospital_service.status.includes("WALK-IN")
          )
          .sort((a, b) => {
            //Filter to Older to Newest Dates
            const dateA = new Date(a.hospital_service.scheduled_date);
            const dateB = new Date(b.hospital_service.scheduled_date);
            return dateA - dateB;
          });
        return pendingConsultations;
      }
    },
    getArchivedConsultations: (state) => {
      if (state.consultations.consultations) {
        const archivedConsultations = state.consultations.consultations
          .filter(
            (consultation) =>
              consultation.hospital_service.status.includes("COMPLETED") ||
              consultation.hospital_service.status.includes("UNATTENDED")
          )
          .sort((a, b) => {
            //Filter to Newer to Oldest Dates
            const dateA = new Date(b.hospital_service.scheduled_date);
            const dateB = new Date(a.hospital_service.scheduled_date);
            return dateA - dateB;
          });
        return archivedConsultations;
      }
    },
    getConsultation: (state) => {
      if (state.consultation) {
        const consultation = state.consultation.consultation;
        return consultation;
      }
    },
    getConsultationForm: (state) => state.consultation_form,
    getPreviousConsultations: (state) =>
      state.consultation?.consultation.previous_consultation_forms,
  },
  mutations: {
    SET_CONSULTATIONS(state, consultations) {
      state.consultations = consultations;
    },
    SET_CONSULTATION(state, consultation) {
      state.consultation = consultation;
    },
    UPDATE_CONSULTATION_FORM(state, { data }) {
      // const consultation_form = state.doctorConsultationForms.find((form) => {
      //   form.consultation_form_id === consultation_form_id;
      // });
      // console.log("Consultation Found! ", consultation_form);
      state.consultation_form = data;
    },
    SET_CONSULTATION_FORM(state, consultation_form) {
      state.consultation_form = consultation_form;
    },
  },
  actions: {
    fetchConsultations({ commit }, queryParams = {}) {
      // Construct the query string from the queryParams object
      let queryString = Object.keys(queryParams)
        .map((key) => `${key}=${queryParams[key]}`)
        .join("&");

      // Add the query string to the URL if it exists
      let url = `doctors/consultations`;
      if (queryString) {
        url += `?${queryString}`;
      }

      return this.$axios
        .get(url)
        .then((response) => {
          const consultations = response.data;
          commit("SET_CONSULTATIONS", consultations);
        })
        .catch((error) => {
          console.error("Error Fetching Consultations: ", error);
        });
    },
    fetchConsultationById({ commit }, consultation_id) {
      const url = `doctors/consultations/${consultation_id}`;
      return this.$axios
        .get(url)
        .then((response) => {
          const consultation = response.data;
          commit("SET_CONSULTATION", consultation);
        })
        .catch((error) => {
          console.error("Error Fetching Consultation: ", error);
        });
    },
    fetchConsultationFormById({ commit }, consultation_id) {
      const url = `/doctors/consultations/${consultation_id}/consultation-forms`;
      return this.$axios
        .get(url)
        .then((response) => {
          const consultation_form = response.data.consultation_form;
          commit("SET_CONSULTATION_FORM", consultation_form);
        })
        .catch((error) => {
          console.error("Error Fetching Consultation Form: ", error);
        });
    },
    addConsultationToId({ dispatch }, { consultation_id, data }) {
      const url = `doctors/consultations/${consultation_id}/consultation-forms`;
      return this.$axios
        .post(url, data)
        .then((response) => {
          dispatch("fetchConsultations");
          dispatch("fetchConsultationById", consultation_id);

          //Success Alert
          store.commit("alerts/SET_SHOW_ALERT", response.data.message);
        })
        .catch((error) => {
          store.commit("alerts/SET_SHOW_ERROR", error.response.data.message);
          //Failed Alert
          console.log("Error Adding Consultation by Doctor", error);
        });
    },
    updateConsultationToId(
      { commit },
      { consultation_id, consultation_form_id, data }
    ) {
      const url = `doctors/consultations/${consultation_id}/consultation-forms/${consultation_form_id}`;
      return this.$axios
        .put(url, data)
        .then((response) => {
          const data = response.data;
          commit("UPDATE_CONSULATION_FORM", { data });
          //Sucess Alert
          store.commit("alerts/SET_SHOW_ALERT", response.data.message);
        })
        .catch((error) => {
          console.error("Error Updating Consultation Form: ", error);
          //Failed Alert
          store.commit("alerts/SET_SHOW_ERROR", error.response.data.message);
        });
    },
    completeConsultationToId({ dispatch }, consultation_id) {
      const url = `doctors/consultations/${consultation_id}/complete`;
      return this.$axios
        .patch(url)
        .then((response) => {
          dispatch("fetchConsultationById", consultation_id);
          //Success Alert
          store.commit("alerts/SET_SHOW_ALERT", response.data.message);
        })
        .catch((error) => {
          console.error("Error Completing Consultation: ", error);
          //Failed Alert
          store.commit("alerts/SET_SHOW_ERROR", error.response.data.message);
        });
    },
    toggleServiceProgress(
      { dispatch },
      { hospital_service_id, consultation_id, status }
    ) {
      const url = `hospital-services/${hospital_service_id}/toggle-status`;
      return this.$axios
        .patch(url, status)
        .then((response) => {
          store.commit("alerts/SET_SHOW_ALERT", response.data.message);
          dispatch("fetchConsultationById", consultation_id);
        })
        .catch((error) => {
          console.error("Error Patching Status: ", error);
          //Failed Alert
          store.commit("alerts/SET_SHOW_ERROR", error.response.data.message);
        });
    },
  },
};
