// store/modules/registrants.js
import Vuex from "vuex";
import Vue from "vue";
import store from "../..";
// import axios from "axios";

Vue.use(Vuex);

export const registrants = {
  namespaced: true,
  state: () => ({
    registrants: [],
    registrant: null,
    vaccinationDetails: null,
    boosterDetails: null,
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
    UPDATE_CARD_STATUS(state, { id, claim }) {
      const registrant = state.registrant;
      if (registrant && registrant.id === id) {
        registrant.citizen.mcg_cares_card = claim;
      }
    },
    SET_VACCINATION_INFORMATION(state, vaccineInformation) {
      state.vaccinationDetails = vaccineInformation;
    },
    UPDATE_VACCINATION_INFORMATION(state, { id, updateVaccineInformation }) {
      // console.log(updateVaccineInformation)
      const vaccineInformation = state.vaccinationDetails;
      if (
        vaccineInformation &&
        vaccineInformation.vaccinationStat.citizen_id === id &&
        vaccineInformation.vaccinationStat.id === updateVaccineInformation.id
      ) {
        vaccineInformation.vaccinationStat = updateVaccineInformation;
      }
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
          const registrants = response.data.citizens;
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
    claimCard({ commit }, { id, data }) {
      const url = `citizens/${id}/card`;
      return this.$axios
        .put(url, data)
        .then((response) => {
          const claim = response.data;
          commit("UPDATE_CARD_STATUS", { id, claim });
        })
        .catch((error) => {
          console.error("Error requesting claim:", error);
        });
    },
    fetchVaccineInformation({ commit }, id) {
      const url = `citizens/${id}/vaccines`;
      commit("SET_VACCINATION_INFORMATION", null);
      return this.$axios
        .get(url)
        .then((response) => {
          const vaccineInformation = response.data;
          commit("SET_VACCINATION_INFORMATION", vaccineInformation);
        })
        .catch((error) => {
          console.error("Error fetching vaccine information:", error);
        });
    },
    updateVaccineInformation({ commit, dispatch }, { id, data }) {
      let alert_message = null;
      let error_message = null;
      const promises = data.map(async (vaccineData, index) => {
        const url = `citizens/${id}/vaccines/${data[index].id}/addOrUpdate`;
        return this.$axios
          .put(url, vaccineData)
          .then((response) => {
            alert_message = response.data.message;
          })
          .catch((error) => {
            console.error("Error updating vaccination information:", error);
            error_message = error.response.data.message;
            throw error;
          });
      });

      return Promise.all(promises)
        .then((updateVaccineInformation) => {
          commit("UPDATE_VACCINATION_INFORMATION", {
            id,
            updateVaccineInformation,
          });
          //Commit to the other module for alert
          store.commit("alerts/SET_SHOW_ALERT", alert_message);
          dispatch("fetchRegistrants");
        })
        .catch((error) => {
          //Commit to the other module for alert
          store.commit("alerts/SET_SHOW_ERROR", error_message);
          console.error("Error requesting vaccination update:", error);
        });
    },
    fetchBoosterInformation({ commit }, id) {
      const url = `citizens/${id}/boosters`;
      commit("SET_BOOSTER_INFORMATION", null);
      return this.$axios
        .get(url)
        .then((response) => {
          const boosterInformation = response.data;
          commit("SET_BOOSTER_INFORMATION", boosterInformation);
        })
        .catch((error) => {
          console.error("Error fetching booster information:", error);
        });
    },
    updateBoosterInformation({ commit, dispatch }, { id, data }) {
      let alert_message = null;
      let error_message = null;
      const promises = data.map(async (boosterData, index) => {
        const url = `citizens/${id}/boosters/${data[index].id}/addOrUpdate`;
        return this.$axios
          .put(url, boosterData)
          .then((response) => {
            alert_message = response.data.message;
          })
          .catch((error) => {
            console.error("Error updating vaccination information:", error);
            error_message = error.response.data.message;
            throw error;
          });
      });

      return Promise.all(promises)
        .then((updateBoosterInformation) => {
          commit("UPDATE_BOOSTER_INFORMATION", {
            id,
            updateBoosterInformation,
          });
          //Commit to the other module for alert
          store.commit("alerts/SET_SHOW_ALERT", alert_message);
          dispatch("fetchRegistrants");
        })
        .catch((error) => {
          //Commit to the other module for alert
          store.commit("alerts/SET_SHOW_ERROR", error_message);
          console.error("Error requesting vaccination update:", error);
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
