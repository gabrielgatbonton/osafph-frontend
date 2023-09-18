import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

export const services = {
  namespaced: true,
  state: () => ({
    hospitalServices: [],
    hospitalService: null,
  }),
  mutations: {
    SET_HOSPITAL_SERVICES(state, services) {
      state.hospitalServices = services;
    },
    SET_HOSPITAL_SERVICE(state, service) {
      state.hospitalService = service;
    },
    ADD_HOSPITAL_SERVICE(state, service) {
      state.hospitalServices.push(service);
    },
    UPDATE_HOSPITAL_SERVICE(state, service) {
      state.hospitalService = service
    },
    DELETE_HOSPITAL_SERVICE(state, target) {
      state.hospitalServices = state.hospitalServices.filter(
        (service) => service.id !== target.id
      );
    },
  },
  actions: {
    fetchServicesById({ commit }, id) {
      return this.$axios
        .get(`citizens/${id}/hospital-services/`)
        .then((response) => {
          const services = response.data.hospitalServices;
          commit("SET_HOSPITAL_SERVICES", services);
        })
        .catch((error) => {
          console.error("Error requesting services: ", error);
        });
    },
    fetchHospitalServiceById({ commit }, { id, hospital_service_id }) {
      return this.$axios
        .get(`citizens/${id}/hospital-services/${hospital_service_id}`)
        .then((response) => {
          const service = response.data;
          commit("SET_HOSPITAL_SERVICE", service);
        })
        .catch((error) => {
          console.error("Error requesting service: ", error);
        });
    },
    addHospitalService({ commit, dispatch }, { id, data }) {
      return this.$axios
        .post(`citizens/${id}/hospital-services`, data)
        .then((response) => {
          const service = response.data;
          commit("ADD_HOSPITAL_SERVICE", service);
          dispatch("fetchServicesById", id);
        })
        .catch((error) => {
          console.error("Error adding services: ", error);
        });
    },
    updateHospitalService({ commit, dispatch }, { id, hospital_service_id, data }) {
      return this.$axios
        .put(`citizens/${id}/hospital-services/${hospital_service_id}`, data)
        .then((response) => {
          const updatedHospitalService = response.data;
          commit("UPDATE_HOSPITAL_SERVICE", updatedHospitalService);
          dispatch("fetchServicesById", id);
        }).catch((error) => {
          console.error("Error Updating Hospital Service: ", error);
        });
    },
    deleteHospitalService({ commit, dispatch }, { id, hospital_service_id }) {
      return this.$axios
        .delete(`citizens/${id}/hospital-services/${hospital_service_id}`)
        .then((response) => {
          const data = response.data;
          commit("DELETE_HOSPITAL_SERVICE", data);
          dispatch("fetchServicesById", id);
        })
        .catch((error) => {
          console.error("Error Deleting Service: ", error);
        });
    },
  },
  getters: {
    getHospitalServices: (state) => state.hospitalServices,
    getHospitalService: (state) => state.hospitalService,
  },
};
