import Vuex from "vuex";
import Vue from "vue";
import store from "../..";

Vue.use(Vuex);

export const services = {
  namespaced: true,
  state: () => ({
    hospitalServices: [],
    hospitalService: null,
    archivedServices: [],
    publicHospitalServices: [],
  }),
  mutations: {
    SET_HOSPITAL_SERVICES(state, services) {
      console.log(services)
      const pendingServices = services
        .filter((service) => {
          return service.status.includes("PENDING");
        })
        .sort((a, b) => {
          //Filter to Older to Newest Dates
          const dateA = new Date(a.scheduled_date);
          const dateB = new Date(b.scheduled_date);
          return dateA - dateB;
        });
      state.hospitalServices = pendingServices;
    },
    SET_ARCHIVED_HOSPITAL_SERVICES(state, services) {
      // Use filter to keep only services with 'PENDING' or 'UNATTENDED' status
      const archivedServices = services
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

      // Replace the contents of the archivedServices state variable
      state.archivedServices = archivedServices;
      console.log(state.archivedServices);
    },
    SET_HOSPITAL_SERVICE(state, service) {
      state.hospitalService = service;
    },
    ADD_HOSPITAL_SERVICE(state, service) {
      state.hospitalServices.push(service);
    },
    UPDATE_HOSPITAL_SERVICE(state, service) {
      state.hospitalService = service;
    },
    DELETE_HOSPITAL_SERVICE(state, target) {
      state.hospitalServices = state.hospitalServices.filter(
        (service) => service.id !== target.id
      );
    },
    SET_PUBLIC_HOSPITAL_SERVICES(state, publicServices) {
      state.publicHospitalServices = publicServices;
    },
  },
  actions: {
    fetchServicesById({ commit }, id) {
      return this.$axios
        .get(`citizens/${id}/hospital-services/`)
        .then((response) => {
          const services = response.data.hospitalServices;
          commit("SET_HOSPITAL_SERVICES", services);
          commit("SET_ARCHIVED_HOSPITAL_SERVICES", services);
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
          store.commit("alerts/SET_SHOW_ALERT", {
            alert: true,
            message: "Added Service",
          });
          dispatch("fetchServicesById", id);
        })
        .catch((error) => {
          store.commit("alerts/SET_SHOW_ERROR", {
            alert: true,
            message: "Adding",
          });
          console.error("Error adding services: ", error);
        });
    },
    updateHospitalService(
      { commit, dispatch },
      { id, hospital_service_id, data }
    ) {
      return this.$axios
        .put(`citizens/${id}/hospital-services/${hospital_service_id}`, data)
        .then((response) => {
          const updatedHospitalService = response.data;
          commit("UPDATE_HOSPITAL_SERVICE", updatedHospitalService);
          store.commit("alerts/SET_SHOW_ALERT", {
            alert: true,
            message: "Updated Service",
          });
          dispatch("fetchServicesById", id);
        })
        .catch((error) => {
          store.commit("alerts/SET_SHOW_ERROR", {
            alert: true,
            message: "Updating",
          });
          console.error("Error Updating Hospital Service: ", error);
        });
    },
    deleteHospitalService({ commit, dispatch }, { id, hospital_service_id }) {
      return this.$axios
        .delete(`citizens/${id}/hospital-services/${hospital_service_id}`)
        .then((response) => {
          const data = response.data;
          commit("DELETE_HOSPITAL_SERVICE", data);
          store.commit("alerts/SET_SHOW_ALERT", {
            alert: true,
            message: "Deleted Service",
          });
          dispatch("fetchServicesById", id);
        })
        .catch((error) => {
          store.commit("alerts/SET_SHOW_ERROR", {
            alert: true,
            message: "Deleting",
          });
          console.error("Error Deleting Service: ", error);
        });
    },
    fetchPublicServicesById({ commit }, id) {
      return this.$axios
        .get(`citizens/${id}/public/hospital-services`)
        .then((response) => {
          const publicServices = response.data.hospitalServices;
          commit("SET_PUBLIC_HOSPITAL_SERVICES", publicServices);
        })
        .catch((error) => {
          console.error("Error requesting public services: ", error);
        });
    },
  },
  getters: {
    getHospitalServices: (state) => state.hospitalServices,
    getHospitalService: (state) => state.hospitalService,
    getArchivedServices: (state) => state.archivedServices,
    getPublicHospitalServices: (state) => state.publicHospitalServices,
  },
};
