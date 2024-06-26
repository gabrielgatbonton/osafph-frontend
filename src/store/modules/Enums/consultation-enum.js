import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

export const consultation_enum = {
  namespaced: true,
  state: () => ({
    history_of_present_illnesses: [],
    past_medical_histories: [],
    family_medical_histories: [],
    diagnosis: [],
    diagnostics: [],
  }),
  getters: {},
  mutations: {
    SET_HISTORY(state, history) {
      state.history_of_present_illnesses = history;
    },
    SET_PAST_MEDICAL_HISTORY(state, history) {
      state.past_medical_histories = history;
    },
    SET_FAMILY_MEDICAL_HISTORY(state, history) {
      state.family_medical_histories = history;
    },
    SET_DIAGNOSIS(state, diagnosis) {
      state.diagnosis = diagnosis;
    },
    SET_DIAGNOSTICS(state, diagnostics) {
      state.diagnostics = diagnostics;
    },
  },
  actions: {
    fetchCheckboxes({ dispatch, state }) {
      if (!state.history_of_present_illnesses.length) {
        dispatch("fetchHistoryOfPresentIllnesses");
      }
      if (!state.past_medical_histories.length) {
        dispatch("fetchPastMedicalHistories");
      }
      if (!state.family_medical_histories.length) {
        dispatch("fetchFamilyMedicalHistories");
      }
    },
    fetchMoreCheckboxes({ dispatch, state }) {
      if (!state.diagnosis.length) {
        dispatch("fetchDiagnosis");
      }
      if (!state.diagnostics.length) {
        dispatch("fetchDiagnostics");
      }
    },
    fetchHistoryOfPresentIllnesses({ commit }) {
      const url = `enums/consultation-forms/history-of-present-illnesses`;
      return this.$axios
        .get(url)
        .then((response) => {
          const history = response.data.history_of_present_illnesses;
          commit("SET_HISTORY", history);
        })
        .catch((error) => {
          console.error(
            "Error Fetching History of Present Illnesses ENUM: ",
            error
          );
        });
    },
    fetchPastMedicalHistories({ commit }) {
      const url = `enums/consultation-forms/past-medical-histories`;
      return this.$axios
        .get(url)
        .then((response) => {
          const history = response.data.past_medical_histories;
          commit("SET_PAST_MEDICAL_HISTORY", history);
        })
        .catch((error) => {
          console.error("Error Fetching Past Medical Histories ENUM: ", error);
        });
    },
    fetchFamilyMedicalHistories({ commit }) {
      const url = `enums/consultation-forms/family-medical-histories`;
      return this.$axios
        .get(url)
        .then((response) => {
          const history = response.data.family_medical_histories;
          commit("SET_FAMILY_MEDICAL_HISTORY", history);
        })
        .catch((error) => {
          console.error(
            "Error Fetching Family Medical Histories ENUM: ",
            error
          );
        });
    },
    fetchDiagnosis({ commit }) {
      const url = `enums/consultation-forms/diagnosis`;
      return this.$axios
        .get(url)
        .then((response) => {
          const diagnosis = response.data.diagnosis;
          commit("SET_DIAGNOSIS", diagnosis);
        })
        .catch((error) => {
          console.error("Error Fetching Diagnosis ENUM: ", error);
        });
    },
    fetchDiagnostics({ commit }) {
      const url = `enums/hospital-services/diagnostic-types`;
      return this.$axios
        .get(url)
        .then((response) => {
          const diagnostics = response.data.diagnosticType;
          commit("SET_DIAGNOSTICS", diagnostics);
        })
        .catch((error) => {
          console.error("Error Fetching Diagnostics ENUM: ", error);
        });
    },
  },
};
