// store/modules/registrants.js
import axios from "axios";

const state = {
  registrants: [], // Initial empty array to store the registrants' data
};

const getters = {
  allRegistrants: (state) => state.registrants,
};

const actions = {
  async fetchRegistrants({ commit }) {
    try {
      const response = await axios.get("http://localhost:3000/registrants");
      const registrants = response.data; // Assuming the response contains the registrants' data

      // Commit a mutation to update the registrants' data in the store
      commit("SET_REGISTRANTS", registrants);
    } catch (error) {
      console.error("Error fetching registrants:", error);
    }
  },
};

const mutations = {
  SET_REGISTRANTS(state, registrants) {
    state.registrants = registrants;
  },
  ADD_REGISTRANT(state, registrant) {
    state.registrants.push(registrant);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
