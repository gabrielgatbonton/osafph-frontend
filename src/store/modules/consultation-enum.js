import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

export const consultation_enum = {
  namespaced: true,
  state: () => ({
    history_of_present_illnesses: [],
    past_medical_histories: [],
    family_medical_histories: [],
  }),
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
  },
  actions: {
    fetchCheckboxes({ dispatch }) {
      dispatch("fetchHistoryOfPresentIllnesses");
      dispatch("fetchPastMedicalHistories");
      dispatch("fetchFamilyMedicalHistories");
    },
    fetchHistoryOfPresentIllnesses({ commit }) {
      return this.$axios
        .get(`consultation-forms/history-of-present-illnesses`)
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
      return this.$axios
        .get(`consultation-forms/past-medical-histories`)
        .then((response) => {
          const history = response.data.past_medical_histories;
          commit("SET_PAST_MEDICAL_HISTORY", history);
        })
        .catch((error) => {
          console.error("Error Fetching Past Medical Histories ENUM: ", error);
        });
    },
    fetchFamilyMedicalHistories({ commit }) {
      return this.$axios
        .get(`consultation-forms/family-medical-histories`)
        .then((response) => {
          const history = response.data.family_medical_histories;
          commit("SET_FAMILY_MEDICAL_HISTORY", history);
        })
        .catch((error) => {
          console.error("Error Fetching Family Medical Histories ENUM: ", error);
        });
    },
  },
  getters: {
    getHistory: (state) => state.history_of_present_illnesses,
    getPastMedicalHistories: (state) => state.past_medical_histories,
    getFamilyMedicalHistories: (state) => state.family_medical_histories,
  },
};
