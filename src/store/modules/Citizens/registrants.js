// store/modules/registrants.js
import Vuex from "vuex";
import Vue from "vue";
import store from "../..";
// import axios from "axios";

Vue.use(Vuex);

export const registrants = {
  namespaced: true,
  state: () => ({
    registrants: null,
    registrant: null,
    vaccinationDetails: [],
    boosterDetails: [],
    publicData: null,
  }),
  getters: {
    getPublicData: (state) => state.publicData,
  },
  mutations: {
    SET_REGISTRANTS(state, registrants) {
      state.registrants = registrants;
    },
    SET_REGISTRANT(state, registrant) {
      state.registrant = registrant;
    },
    // UPDATE_CARD_STATUS(state, { id, claim }) {
    //   const registrant = state.registrant;
    //   if (registrant && registrant.id === id) {
    //     registrant.citizen.mcg_cares_card = claim;
    //   }
    // },
    SET_VACCINATION_INFORMATION(state, vaccineInformation) {
      state.vaccinationDetails = vaccineInformation;
    },
    SET_BOOSTER_INFORMATION(state, boosterInformation) {
      state.boosterDetails = boosterInformation;
    },
    UPDATE_BOOSTER_INFORMATION(state, { id, updateBoosterInformation }) {
      // console.log(updateVaccineInformation)
      const boosterInformation = state.boosterDetails;
      if (
        boosterInformation &&
        boosterInformation.boosterStat.citizen_id === id &&
        boosterInformation.boosterStat.id === updateBoosterInformation.id
      ) {
        boosterInformation.boosterStat = updateBoosterInformation;
      }
    },
    SET_PUBLIC_DATA(state, publicData) {
      state.publicData = publicData;
    },
  },
  actions: {
    fetchRegistrants({ commit }, queryParams = {}) {
      // Construct the query string from the queryParams object
      let queryString = Object.keys(queryParams)
        .map((key) => `${key}=${queryParams[key]}`)
        .join("&");

      // Add the query string to the URL if it exists
      let url = "citizens";
      if (queryString) {
        url += `?${queryString}`;
      }

      return this.$axios
        .get(url)
        .then((response) => {
          const registrants = response.data;
          commit("SET_REGISTRANTS", registrants);
        })
        .catch((error) => {
          console.error("Error fetching registrants:", error);
        });
    },
    addRegistrant({ dispatch }, data) {
      const url = `citizens/create`;
      return this.$axios
        .post(url, data)
        .then((response) => {
          // const registrant = response.data;
          // commit("ADD_REGISTRANT", registrant);

          //Commit to the other module for alert
          store.commit("alerts/SET_SHOW_ALERT", response.data.message);

          //Call Again Fetch Registrants
          dispatch("fetchRegistrants");
        })
        .catch((error) => {
          console.error("Error adding citizen:", error);

          //Commit to the other module for alert
          store.commit("alerts/SET_SHOW_ERROR", error.response.data.message);
        });
    },
    fetchRegistrantId({ commit }, id) {
      const url = `citizens/${id}`;
      return this.$axios
        .get(url)
        .then((response) => {
          const registrant = response.data;
          commit("SET_REGISTRANT", registrant);
        })
        .catch((error) => {
          console.error("Error fetching registrant:", error);
        });
    },
    updateRegistrant({ dispatch }, { id, data }) {
      const url = `citizens/${id}`;
      return this.$axios
        .put(url, data)
        .then((response) => {
          store.commit("alerts/SET_SHOW_ALERT", response.data.message);

          //Call Again Fetch Registrants
          dispatch("fetchRegistrants");
        })
        .catch((error) => {
          //Commit to the other module for alert
          store.commit("alerts/SET_SHOW_ERROR", error.response.data.message);
          console.error("Error updating request to registrant vuex:", error);
        });
    },
    updateRegistrantFiles({ dispatch }, { id, data }) {
      const url = `citizens/${id}/files`;
      return this.$axios
        .post(url, data)
        .then((response) => {
          //Store dispatch so that images will be updated
          store.dispatch("card/fetchImage", id);
          store.dispatch("card/fetchSignature", id);
          store.dispatch("card/fetchBiometrics", id);

          //Commit to the other module for alert
          store.commit("alerts/SET_SHOW_ALERT", response.data.message);

          dispatch("fetchRegistrantId", id);
        })
        .catch((error) => {
          //Commit to the other module for alert
          store.commit("alerts/SET_SHOW_ERROR", error.response.data.message);
          console.error("Error updating registrant files:", error);
        });
    },
    claimCard({ dispatch }, id) {
      const url = `citizens/${id}/card`;
      return this.$axios
        .patch(url)
        .then((response) => {
          store.commit("alerts/SET_SHOW_ALERT", response.data.message);
          dispatch("fetchRegistrantId", id);
        })
        .catch((error) => {
          console.error("Error requesting claim:", error);
        });
    },
    fetchVaccineInformation({ commit }, id) {
      commit("SET_VACCINATION_INFORMATION", []);
      const url = `citizens/${id}/vaccines`;
      return this.$axios
        .get(url)
        .then((response) => {
          const vaccineInformation = response.data;
          commit(
            "SET_VACCINATION_INFORMATION",
            vaccineInformation.vaccinationStats
          );
        })
        .catch((error) => {
          console.error("Error fetching vaccine information:", error);
        });
    },
    updateVaccineInformation({ dispatch }, { id, data }) {
      const url = `citizens/${id}/vaccines/add-or-update`;
      return this.$axios
        .post(url, data)
        .then((response) => {
          //Commit to the other module for alert
          store.commit("alerts/SET_SHOW_ALERT", response.data.message);
          dispatch("fetchVaccineInformation", id);
          dispatch("fetchRegistrantId", id);
        })
        .catch((error) => {
          console.error("Error updating vaccination information:", error);
          //Commit to the other module for alert
          store.commit("alerts/SET_SHOW_ERROR", error.response.data.message);
        });
    },
    fetchBoosterInformation({ commit }, id) {
      commit("SET_BOOSTER_INFORMATION", []);
      const url = `citizens/${id}/boosters`;
      return this.$axios
        .get(url)
        .then((response) => {
          const boosterInformation = response.data;
          commit("SET_BOOSTER_INFORMATION", boosterInformation.boosterStats);
        })
        .catch((error) => {
          console.error("Error fetching booster information:", error);
        });
    },
    updateBoosterInformation({ dispatch }, { id, data }) {
      const url = `citizens/${id}/boosters/add-or-update`;
      return this.$axios
        .post(url, data)
        .then((response) => {
          //Commit to the other module for alert
          store.commit("alerts/SET_SHOW_ALERT", response.data.message);
          dispatch("fetchBoosterInformation", id);
        })
        .catch((error) => {
          console.error("Error updating booster information:", error);
          //Commit to the other module for alert
          store.commit("alerts/SET_SHOW_ERROR", error.response.data.message);
        });
    },
    deleteRegistrant({ dispatch }, id) {
      const url = `citizens/${id}`;
      return this.$axios
        .delete(url)
        .then((response) => {
          // const data = response.data;
          // commit("DELETE_REGISTRANT", data);
          //Commit to the other module for alert
          store.commit("alerts/SET_SHOW_ALERT", response.data.message);
          dispatch("fetchRegistrants");
        })
        .catch((error) => {
          //Commit to the other module for alert
          store.commit("alerts/SET_SHOW_ERROR", error.response.data.message);
          console.error("Error deleting registrant:", error);
        });
    },
    fetchPublicCitizenRecord({ commit }, hub_registrant_id) {
      const url = `public-citizen/${hub_registrant_id}`;
      return this.$axios
        .get(url)
        .then((response) => {
          const publicData = response.data;
          commit("SET_PUBLIC_DATA", publicData);
        })
        .catch((error) => {
          console.error("Error fetching registrant:", error);
        });
    },
  },
};
