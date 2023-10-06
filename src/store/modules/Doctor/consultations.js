import Vuex from "vuex";
import Vue from "vue";
import store from "../../";

Vue.use(Vuex);

export const consultations = {
  namespaced: true,
  state: () => ({
    pendingConsultations: [],
    archivedConsultations: [],
    consultation: null,
    doctorConsultationForms: [],
  }),
  mutations: {
    SET_CONSULTATIONS(state, consultations) {
      const pendingConsultations = consultations.consultations
        .filter((consultation) =>
          consultation.hospital_service.status.includes("PENDING")
        )
        .sort((a, b) => { //Filter to Older to Newest Dates
          const dateA = new Date(a.hospital_service.scheduled_date);
          const dateB = new Date(b.hospital_service.scheduled_date);
          return dateA - dateB;
        });
      state.pendingConsultations = pendingConsultations;

      const archivedConsultations = consultations.consultations
        .filter(
          (consultation) =>
            consultation.hospital_service.status.includes("COMPLETED") ||
            consultation.hospital_service.status.includes("UNATTENDED")
        )
        .sort((a, b) => { //Filter to Newer to Oldest Dates
          const dateA = new Date(b.hospital_service.scheduled_date);
          const dateB = new Date(a.hospital_service.scheduled_date);
          return dateA - dateB;
        });
      state.archivedConsultations = archivedConsultations;
    },
    SET_CONSULTATION(state, consultation) {
      state.consultation = consultation;
    },
    ADD_DOCTOR_CONSULTATION(state, consultation) {
      state.doctorConsultationForms.push(consultation);
    },
  },
  actions: {
    fetchConsultations({ commit }) {
      return this.$axios
        .get(`doctors/consultations`)
        .then((response) => {
          const consultations = response.data;
          commit("SET_CONSULTATIONS", consultations);
        })
        .catch((error) => {
          console.error("Error Fetching Consultations: ", error);
        });
    },
    fetchConsultationById({ commit }, consultation_id) {
      return this.$axios
        .get(`doctors/consultations/${consultation_id}`)
        .then((response) => {
          const consultation = response.data;
          commit("SET_CONSULTATION", consultation);
        })
        .catch((error) => {
          console.error("Error Fetching Consultation: ", error);
        });
    },
    addConsultationToId({ commit }, { consultation_id, data }) {
      return this.$axios
        .post(
          `doctors/consultations/${consultation_id}/consultation-forms`,
          data
        )
        .then((response) => {
          const consultation = response.data;
          commit("ADD_DOCTOR_CONSULTATION", consultation);
          store.commit("alerts/SET_SHOW_ALERT", {
            alert: true,
            message: "Added Consultation Form",
          });
        })
        .catch((error) => {
          store.commit("alerts/SET_SHOW_ERROR", {
            alert: true,
            message: "Adding",
          });
          console.log("Error Adding Consultation by Doctor", error);
        });
    },
  },
  getters: {
    getPendingConsultations: (state) => state.pendingConsultations,
    getArchivedConsultations: (state) => state.archivedConsultations,
    getConsultation: (state) => state.consultation,
  },
};
