import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

export const services = {
  namespaced: true,
  state: () => ({
    hospitalServices: [],
  }),
  mutations: {
    SET_HOSPITAL_SERVICES(state, services) {
      state.hospitalServices = services;
    },
    ADD_HOSPITAL_SERVICE(state, service) {
        state.hospitalServices.push(service);
    },
  },
  actions: {
    fetchServicesById({ commit }, id) {
      return this.$axios
        .get(`/citizens/${id}/hospital-services/`)
        .then((response) => {
          const services = response.data;
          commit("SET_HOSPITAL_SERVICES", services);
        })
        .catch((error) => {
          console.error("Error requesting services: ", error);
        });
    },
    addHospitalService({ commit, dispatch }, { id, data }) {
      return this.$axios
        .post(`/citizens/${id}/hospital-services`, data)
        .then((response) => {
          const service = response.data;
          commit("ADD_HOSPITAL_SERVICE", service);
          dispatch("fetchServicesById", id)
        })
        .catch((error) => {
          console.error("Error adding services: ", error);
        });
    },
  },
  getters: {
    getHospitalServices: (state) => state.hospitalServices,
  },
};
