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
  mutations: {
    SET_REGISTRANTS(state, registrants) {
      state.registrants = registrants;
    },
    ADD_REGISTRANT(state, registrant) {
      state.registrants.push(registrant);
    },
    SET_REGISTRANT(state, registrant) {
      state.registrant = registrant;
    },
    UPDATE_REGISTRANT() {
      this.dispatch("fetchRegistrants");
    },
    DELETE_REGISTRANT(state, data) {
      state.registrants = state.registrants.filter(
        (registrant) => registrant.id !== data.id
      );
    },
    UPDATE_REGISTRANT_FILES(state, { id, files }) {
      const registrant = state.registrant;
      if (registrant && registrant.id === id) {
        registrant.citizen.citizen_file = {
          image_url: files,
          e_signature: files,
        };
      }
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
  getters: {
    allRegistrants: (state) => state.registrants,
    getRegistrant: (state) => state.registrant,
    getVaccineInformation: (state) => state.vaccinationDetails,
    getBoosterInformation: (state) => state.boosterDetails,
    getPublicData: (state) => state.publicData,
  },
  actions: {
    fetchRegistrants({ commit }) {
      return this.$axios
        .get("/citizens")
        .then((response) => {
          const registrants = response.data.citizens;
          commit("SET_REGISTRANTS", registrants);
        })
        .catch((error) => {
          console.error("Error fetching registrants:", error);
        });
    },
    addRegistrant({ commit, dispatch }, data) {
      return this.$axios
        .post("/citizens/create", data)
        .then((response) => {
          const registrant = response.data;
          commit("ADD_REGISTRANT", registrant);
          //Commit to the other module for alert
          store.commit("alerts/SET_SHOW_ALERT", {
            alert: true,
            message: "Saved Registrant",
          });
          dispatch("fetchRegistrants");
        })
        .catch((error) => {
          //Commit to the other module for alert
          store.commit("alerts/SET_SHOW_ERROR", {
            alert: true,
            message: "Register",
          });
          console.error("Error adding citizen:", error);
        });
    },
    fetchRegistrantId({ commit }, id) {
      return this.$axios
        .get(`/citizens/${id}`)
        .then((response) => {
          const registrant = response.data;
          commit("SET_REGISTRANT", registrant);
        })
        .catch((error) => {
          console.error("Error fetching registrant:", error);
        });
    },
    updateRegistrant({ commit }, { id, data }) {
      console.log("CHECK ACTION: ", data);
      return this.$axios
        .put(`/citizens/${id}`, data)
        .then((response) => {
          const updateRegistrant = response.data;
          commit("UPDATE_REGISTRANT", { id, updateRegistrant });
          //Commit to the other module for alert
          store.commit("alerts/SET_SHOW_ALERT", {
            alert: true,
            message: "Updated Registrant",
          });
        })
        .catch((error) => {
          //Commit to the other module for alert
          store.commit("alerts/SET_SHOW_ERROR", {
            alert: true,
            message: "Update",
          });
          console.error("Error updating request to registrant vuex:", error);
        });
    },
    updateRegistrantFiles({ commit, dispatch }, { id, data }) {
      return this.$axios
        .post(`/citizens/${id}/files`, data)
        .then((response) => {
          const files = response.data;
          commit("UPDATE_REGISTRANT_FILES", { id, files });

          //Store dispatch so that images will be updated
          store.dispatch("card/fetchImage", id);
          store.dispatch("card/fetchSignature", id);

          //Commit to the other module for alert
          store.commit("alerts/SET_SHOW_ALERT", {
            alert: true,
            message: "Updated Image",
          });
          dispatch("fetchRegistrants");
        })
        .catch((error) => {
          //Commit to the other module for alert
          store.commit("alerts/SET_SHOW_ERROR", {
            alert: true,
            message: "Update",
          });
          console.error("Error updating registrant files:", error);
        });
    },
    claimCard({ commit }, { id, data }) {
      return this.$axios
        .put(`/citizens/${id}/card`, data)
        .then((response) => {
          const claim = response.data;
          commit("UPDATE_CARD_STATUS", { id, claim });
        })
        .catch((error) => {
          console.error("Error requesting claim:", error);
        });
    },
    fetchVaccineInformation({ commit }, id) {
      commit("SET_VACCINATION_INFORMATION", null);
      return this.$axios
        .get(`/citizens/${id}/vaccines/`)
        .then((response) => {
          const vaccineInformation = response.data;
          commit("SET_VACCINATION_INFORMATION", vaccineInformation);
        })
        .catch((error) => {
          console.error("Error fetching vaccine information:", error);
        });
    },
    updateVaccineInformation({ commit, dispatch }, { id, data }) {
      const promises = data.map(async (vaccineData, index) => {
        return this.$axios
          .put(
            `/citizens/${id}/vaccines/${data[index].id}/addOrUpdate`,
            vaccineData
          )
          .then((response) => {
            response.data;
          })
          .catch((error) => {
            console.error("Error updating vaccination information:", error);
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
          store.commit("alerts/SET_SHOW_ALERT", {
            alert: true,
            message: "Updated Vaccine",
          });
          dispatch("fetchRegistrants");
        })
        .catch((error) => {
          //Commit to the other module for alert
          store.commit("alerts/SET_SHOW_ERROR", {
            alert: true,
            message: "Update",
          });
          console.error("Error requesting vaccination update:", error);
        });
    },
    fetchBoosterInformation({ commit }, id) {
      commit("SET_BOOSTER_INFORMATION", null);
      return this.$axios
        .get(`/citizens/${id}/boosters/`)
        .then((response) => {
          const boosterInformation = response.data;
          commit("SET_BOOSTER_INFORMATION", boosterInformation);
        })
        .catch((error) => {
          console.error("Error fetching booster information:", error);
        });
    },
    updateBoosterInformation({ commit, dispatch }, { id, data }) {
      const promises = data.map(async (boosterData, index) => {
        return this.$axios
          .put(
            `/citizens/${id}/boosters/${data[index].id}/addOrUpdate`,
            boosterData
          )
          .then((response) => {
            response.data;
          })
          .catch((error) => {
            console.error("Error updating vaccination information:", error);
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
          store.commit("alerts/SET_SHOW_ALERT", {
            alert: true,
            message: "Updated Booster",
          });
          dispatch("fetchRegistrants");
        })
        .catch((error) => {
          //Commit to the other module for alert
          store.commit("alerts/SET_SHOW_ERROR", {
            alert: true,
            message: "Update",
          });
          console.error("Error requesting vaccination update:", error);
        });
    },
    deleteRegistrant({ commit, dispatch }, id) {
      return this.$axios
        .delete(`/citizens/${id}`)
        .then((response) => {
          const data = response.data;
          commit("DELETE_REGISTRANT", data);
          //Commit to the other module for alert
          store.commit("alerts/SET_SHOW_ALERT", {
            alert: true,
            message: "Deleted Registrant",
          });
          dispatch("fetchRegistrants");
        })
        .catch((error) => {
          //Commit to the other module for alert
          store.commit("alerts/SET_SHOW_ERROR", {
            alert: true,
            message: "Delete",
          });
          console.error("Error deleting registrant:", error);
        });
    },
    fetchPublicCitizenRecord({ commit }, hub_registrant_id) {
      return this.$axios
        .get(`/public-citizen/${hub_registrant_id}`)
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
