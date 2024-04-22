import Vuex from "vuex";
import Vue from "vue";
import store from "../..";

Vue.use(Vuex);

export const services = {
  namespaced: true,
  state: () => ({
    hospitalServices: null,
    hospitalService: null,
    publicHospitalServices: [],
    service_types: []
  }),
  getters: {
    getPendingServices: (state) => {
      if (state.hospitalServices) {
        // Use filter to keep only services with 'PENDING', 'WALK IN', or 'IN PROGRESS' status
        const pendingServices = state.hospitalServices
          .filter((service) => {
            return (
              service.status.includes("PENDING") ||
              service.status.includes("WALK-IN") ||
              service.status.includes("IN PROGRESS")
            );
          })
          .sort((a, b) => {
            //Filter to Older to Newest Dates
            const dateA = new Date(a.scheduled_date);
            const dateB = new Date(b.scheduled_date);
            return dateA - dateB;
          });
        return pendingServices;
      }
    },
    getArchivedServices: (state) => {
      if (state.hospitalServices) {
        // Use filter to keep only services with 'COMPLETED' or 'UNATTENDED' status
        const archivedServices = state.hospitalServices
          .filter((service) => {
            return (
              service.status.includes("COMPLETED") ||
              service.status.includes("UNATTENDED")
            );
          })
          .sort((a, b) => {
            //Filter to Newer to Oldest Dates
            const dateA = new Date(b.scheduled_date);
            const dateB = new Date(a.scheduled_date);
            return dateA - dateB;
          });
        return archivedServices;
      }
    },
    getHospitalService: (state) => state.hospitalService,
    getPublicHospitalServices: (state) => state.publicHospitalServices,
  },
  mutations: {
    SET_HOSPITAL_SERVICES(state, services) {
      state.hospitalServices = services;
    },
    SET_HOSPITAL_SERVICE(state, service) {
      state.hospitalService = service;
    },
    SET_PUBLIC_HOSPITAL_SERVICES(state, publicServices) {
      state.publicHospitalServices = publicServices;
    },
    SET_SERVICE_TYPES(state, service_types) {
      state.service_types = service_types;
    },
  },
  actions: {
    fetchServicesById({ commit }, { id, queryParams = {} }) {
      // Construct the query string from the queryParams object
      let queryString = Object.keys(queryParams)
        .map((key) => `${key}=${queryParams[key]}`)
        .join("&");

      // Add the query string to the URL if it exists
      let url = `citizens/${id}/hospital-services`;
      if (queryString) {
        url += `?${queryString}`;
      }

      return this.$axios
        .get(url)
        .then((response) => {
          const services = response.data.hospitalServices;
          commit("SET_HOSPITAL_SERVICES", services);
        })
        .catch((error) => {
          console.error("Error requesting services: ", error);
        });
    },
    fetchHospitalServiceById({ commit }, { id, hospital_service_id }) {
      const url = `citizens/${id}/hospital-services/${hospital_service_id}`;
      return this.$axios
        .get(url)
        .then((response) => {
          const service = response.data;
          commit("SET_HOSPITAL_SERVICE", service);
        })
        .catch((error) => {
          console.error("Error requesting service: ", error);
        });
    },
    addHospitalService({ dispatch }, { id, data }) {
      const url = `citizens/${id}/hospital-services`;
      return this.$axios
        .post(url, data)
        .then((response) => {
          dispatch("fetchServicesById", id);
          store.commit("alerts/SET_SHOW_ALERT", response.data.message);
        })
        .catch((error) => {
          store.commit("alerts/SET_SHOW_ERROR", error.response.data.message);
          console.error("Error adding services: ", error);
        });
    },
    updateHospitalService({ dispatch }, { id, hospital_service_id, data }) {
      const url = `citizens/${id}/hospital-services/${hospital_service_id}`;
      return this.$axios
        .put(url, data)
        .then((response) => {
          dispatch("fetchServicesById", id);
          dispatch("fetchHospitalServiceById", {
            id: id,
            hospital_service_id: hospital_service_id,
          });
          store.commit("alerts/SET_SHOW_ALERT", response.data.message);
        })
        .catch((error) => {
          store.commit("alerts/SET_SHOW_ERROR", error.response.data.message);
          console.error("Error Updating Hospital Service: ", error);
        });
    },
    deleteHospitalService({ dispatch }, { id, hospital_service_id }) {
      const url = `citizens/${id}/hospital-services/${hospital_service_id}`;
      return this.$axios
        .delete(url)
        .then((response) => {
          dispatch("fetchServicesById", id);
          store.commit("alerts/SET_SHOW_ALERT", response.data.message);
        })
        .catch((error) => {
          store.commit("alerts/SET_SHOW_ERROR", error.response.data.message);
          console.error("Error Deleting Service: ", error);
        });
    },
    fetchPublicServicesById({ commit }, { id, queryParams = {} }) {
      // Construct the query string from the queryParams object
      let queryString = Object.keys(queryParams)
        .map((key) => `${key}=${queryParams[key]}`)
        .join("&");

      // Add the query string to the URL if it exists
      let url = `citizens/${id}/public/hospital-services`;
      if (queryString) {
        url += `?${queryString}`;
      }
      return this.$axios
        .get(url)
        .then((response) => {
          const publicServices = response.data.hospitalServices;
          commit("SET_PUBLIC_HOSPITAL_SERVICES", publicServices);
        })
        .catch((error) => {
          console.error("Error requesting public services: ", error);
        });
    },

  },
};
