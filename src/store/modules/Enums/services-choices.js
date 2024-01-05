import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

export const services_choices = {
  namespaced: true,
  state: () => ({
    doctors: [],
    specialties: [],
    laboratory_types: [],
    diagnostic_types: [],
    hospitals: [],
    crowd_fundings: [],
  }),
  getters: {
    getDoctors: (state) => state.doctors,
    getSpecialties: (state) => state.specialties,
    getLaboratoryTypes: (state) => state.laboratory_types,
    getDiagnosticTypes: (state) => state.diagnostic_types,
    getHospitals: (state) => state.hospitals,
    getCrowdFundings: (state) => state.crowd_fundings,
  },
  mutations: {
    SET_DOCTORS(state, doctors) {
      state.doctors = doctors.map((doctor) => ({
        doctor_id: doctor.id, // Assuming 'id' is the doctor_id
        full_name: `${doctor.user.last_name}, ${doctor.user.first_name} ${doctor.user.middle_name}`,
      }));
    },
    SET_SPECIALTIES(state, specialties) {
      state.specialties = specialties;
      // console.log("specialties:", state.specialties);
    },
    SET_LABORATORY_TYPES(state, laboratory_types) {
      state.laboratory_types = laboratory_types;
      // console.log("laboratory:", state.laboratory_types);
    },
    SET_DIAGNOSTIC_TYPES(state, diagnostic_types) {
      state.diagnostic_types = diagnostic_types;
      // console.log("diagnostic:", state.diagnostic_types);
    },
    SET_HOSPITALS(state, data) {
      state.hospitals = data;
    },
    SET_CROWD_FUNDINGS(state, data) {
      console.log("Check",data);
      state.crowd_fundings = data;
    },
  },
  actions: {
    fetchData({ dispatch }) {
      dispatch("fetchDoctors");
      dispatch("fetchSpecialties");
      dispatch("fetchLaboratoryTypes");
      dispatch("fetchDiagnosticTypes");
      dispatch("fetchHospitals");
      dispatch("fetchCrowdFundings");
    },
    fetchDoctors({ commit }) {
      return this.$axios
        .get(`account/doctors`)
        .then((response) => {
          const doctors = response.data.doctors;
          commit("SET_DOCTORS", doctors);
        })
        .catch((error) => {
          console.error("Error fetching Doctors: ", error);
        });
    },
    fetchSpecialties({ commit }) {
      return this.$axios
        .get(`specialties`)
        .then((response) => {
          const specialties = response.data.specialty;
          commit("SET_SPECIALTIES", specialties);
        })
        .catch((error) => {
          console.error("Error fetching specialties: ", error);
        });
    },
    fetchLaboratoryTypes({ commit }) {
      return this.$axios
        .get(`laboratory-types`)
        .then((response) => {
          const laboratory_types = response.data.laboratoryType;
          commit("SET_LABORATORY_TYPES", laboratory_types);
        })
        .catch((error) => {
          console.error("Error fetching Laboratory Types: ", error);
        });
    },
    fetchDiagnosticTypes({ commit }) {
      return this.$axios
        .get(`diagnostic-types`)
        .then((response) => {
          const diagnostic_types = response.data.diagnosticType;
          commit("SET_DIAGNOSTIC_TYPES", diagnostic_types);
        })
        .catch((error) => {
          console.error("Error fetching Diagnostic Types: ", error);
        });
    },
    fetchHospitals({ commit }) {
      const url = `hospitals`;
      return this.$axios
        .get(url)
        .then((response) => {
          const data = response.data.hospitals;
          commit("SET_HOSPITALS", data);
        })
        .catch((error) => {
          console.error("Error Fetching Hospitals Enum: ", error);
        });
    },
    fetchCrowdFundings({ commit }) {
      const url = `crowd-fundings`;
      return this.$axios
        .get(url)
        .then((response) => {
          const data = response.data.crowd_fundings;
          commit("SET_CROWD_FUNDINGS", data);
        })
        .catch((error) => {
          console.error("Error Fetching Crowd Funding Enums: ", error);
        });
    },
  },
};
