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
    service_types: [],
  }),
  getters: {
    getDoctors: (state) => state.doctors,
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
      state.crowd_fundings = data;
    },
    SET_SERVICE_TYPES(state, service_types) {
      state.service_types = service_types;
    },
  },
  actions: {
    fetchEnums({ dispatch, state }) {
      // dispatch("fetchDoctors");

      // This will fetch all the enums needed and will check for fetching duplication
      if (!state.specialties.length) {
        dispatch("fetchSpecialties");
      }
      if (!state.laboratory_types.length) {
        dispatch("fetchLaboratoryTypes");
      }
      if (!state.diagnostic_types.length) {
        dispatch("fetchDiagnosticTypes");
      }
      if (!state.hospitals.length) {
        dispatch("fetchHospitals");
      }
      if (!state.crowd_fundings.length) {
        dispatch("fetchCrowdFundings");
      }
      if (!state.service_types.length) {
        dispatch("fetchServiceTypes");
      }
    },
    fetchSpecialtiesEnum({ dispatch, state }) {
      if (!state.specialties.length) {
        dispatch("fetchSpecialties");
      }
    },
    fetchServiceTypesEnum({ dispatch, state }) {
      if (!state.service_types.length) {
        dispatch("fetchServiceTypes");
      }
    },
    fetchCrowdFundersEnum({ dispatch, state }) {
      if (!state.crowd_fundings.length) {
        dispatch("fetchCrowdFundings");
      }
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
      const url = `enums/hospital-services/specialties`;
      return this.$axios
        .get(url)
        .then((response) => {
          const specialties = response.data.specialty;
          commit("SET_SPECIALTIES", specialties);
        })
        .catch((error) => {
          console.error("Error fetching specialties: ", error);
        });
    },
    fetchLaboratoryTypes({ commit }) {
      const url = `enums/hospital-services/laboratory-types`;
      return this.$axios
        .get(url)
        .then((response) => {
          const laboratory_types = response.data.laboratoryType;
          commit("SET_LABORATORY_TYPES", laboratory_types);
        })
        .catch((error) => {
          console.error("Error fetching Laboratory Types: ", error);
        });
    },
    fetchDiagnosticTypes({ commit }) {
      const url = `enums/hospital-services/diagnostic-types`;
      return this.$axios
        .get(url)
        .then((response) => {
          const diagnostic_types = response.data.diagnosticType;
          commit("SET_DIAGNOSTIC_TYPES", diagnostic_types);
        })
        .catch((error) => {
          console.error("Error fetching Diagnostic Types: ", error);
        });
    },
    fetchHospitals({ commit }) {
      const url = `enums/hospital-services/hospitals`;
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
      const url = `enums/hospital-services/funders`;
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
    fetchServiceTypes({ commit }) {
      const url = `enums/hospital-services/types`;
      return this.$axios
        .get(url)
        .then((response) => {
          const types = response.data.service_types;
          commit("SET_SERVICE_TYPES", types);
        })
        .catch((error) => {
          console.error("Error Fetching Service Types Enums: ", error);
        });
    },
  },
};
