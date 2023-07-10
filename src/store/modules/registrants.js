// store/modules/registrants.js
import axios from "axios";

const state = {
  registrants: [],
  registrant: null
};

const getters = {
  allRegistrants: (state) => state.registrants,
  getRegistrant: (state) => state.registrant
};

const actions = {
  async fetchRegistrants({ commit }) {
    try {
      const response = await axios.get("http://200.10.77.4/api/citizens");
      const registrants = response.data.citizens; // Assuming the response contains the registrants' data in the "data" property

      commit("SET_REGISTRANTS", registrants);
    } catch (error) {
      console.error("Error fetching registrants:", error);
    }
  },
  async addRegistrant({ commit }, data) {
    try {
      // Make the POST request to the endpoint using Axios
      const response = await axios.post(
        "http://200.10.77.4/api/citizens/create",
        data
      );
      const registrant = response.data;
      await commit("ADD_REGISTRANT", registrant);
    } catch (error) {
      console.error("Error adding citizen:", error);
    }
  },
  async fetchRegistrantId({ commit }, id) {
    try{
      const response = await axios.get(
        `http://200.10.77.4/api/citizens/${id}`
      );
      const registrant = response.data;
      commit("SET_REGISTRANT", registrant);
    }
    catch(error){
      console.error("Error fetching registrant:", error);
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
  SET_REGISTRANT(state, registrant){
    state.registrant = registrant;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
