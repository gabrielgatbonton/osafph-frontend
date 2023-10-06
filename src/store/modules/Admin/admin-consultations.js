import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

export const admin_consultations = {
  namespaced: true,
  state: () => ({
    consultations: [],
    consultation: null,
    consultation_form: null,
  }),
  mutations: {
    SET_CONSULTATIONS(state, consultations) {
      state.consultations = consultations;
    },
    SET_CONSULTATION(state, consultation) {
      state.consultation = consultation;
    },
    SET_CONSULTATION_FORM(state, consultation_form) {
      state.consultation_form = consultation_form;
    },
    UPDATE_CONSULTATION_FORM(state, consultation_form) {
      state.consultation_form = consultation_form;
    },
    DELETE_CONSULTATION_FORM(state, target_form) {
      state.consultation_form = state.consultation_form.filter(
        (consultation_form) =>
          consultation_form.consultation_form_id !==
          target_form.consultation_form_id
      );
    },
  },
  actions: {
    fetchConsultations({ commit }) {
      return this.$axios
        .get(`admin/consultations/`)
        .then((response) => {
          const consultations = response.data.consultations;
          commit("SET_CONSULTATIONS", consultations);
        })
        .catch((error) => {
          console.error("Error Fetching Consultations: ", error);
        });
    },
    fetchAdminConsultationById({ commit }, consultation_id) {
      return this.$axios
        .get(`admin/consultations/${consultation_id}`)
        .then((response) => {
          const consultation = response.data;
          commit("SET_CONSULTATION", consultation);
        })
        .catch((error) => {
          console.error("Error Fetching Consultation: ", error);
        });
    },
    fetchAdminConsultationFormById({ commit }, consultation_id) {
      return this.$axios
        .get(`admin/consultations/${consultation_id}/consultation-forms/`)
        .then((response) => {
          const consultation_form = response.data.consultation_form;
          commit("SET_CONSULTATION_FORM", consultation_form);
        })
        .catch((error) => {
          console.error("Error Fetching Consultation Form: ", error);
        });
    },
    updateAdminConsultationFormById(
      { commit },
      { consultation_id, consultation_form_id, data }
    ) {
      return this.$axios
        .put(
          `admin/consultations/${consultation_id}/consultation-forms/${consultation_form_id}/`,
          data
        )
        .then((response) => {
          const updatedConsultationForm = response.data;
          commit("SET_UPDATED_CONSULTATION_FORM", updatedConsultationForm);
        })
        .catch((error) => {
          console.log("Error updating Consultation Form", error);
        });
    },
    deleteAdminConsultationFormById(
      { commit, },
      { consultation_id, consultation_form_id }
    ) {
      return this.$axios
        .delete(
          `admin/consultations/${consultation_id}/consultation-forms/${consultation_form_id}/`
        )
        .then((response) => {
          const data = response.data;
          commit("DELETE_CONSULTATION_FORM", data);
        })
        .catch((error) => {
          console.error("Error Deleting Consultation Form: ", error);
        });
    },
  },
  getters: {
    getAdminConsultations: (state) => state.consultations,
    getAdminConsultation: (state) => state.consultation,
    getAdminConsultationForm: (state) => state.consultation_form,
  },
};
