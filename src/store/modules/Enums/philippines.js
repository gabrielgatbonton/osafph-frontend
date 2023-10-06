import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

export const philippines = {
  namespaced: true,
  state: () => ({
    barangays: [],
    provinces: [],
    municipalities: [],
    regions: [],
  }),
  mutations: {
    SET_REGIONS(state, regions) {
      state.regions = regions;
    },
    SET_PROVINCES(state, { provinces, id }) {
      if (id) {
        const filteredProvinces = provinces.filter(
          (province) => province.region_id === id
        );
        state.provinces = filteredProvinces;
      } else {
        state.provinces = provinces;
      }
    },
    SET_MUNICIPALITIES(state, { municipalities, id }) {
      if (id) {
        const filteredMunicipalities = municipalities.filter(
          (municipality) => municipality.province_id === id
        );
        state.municipalities = filteredMunicipalities;
      } else {
        state.municipalities = municipalities;
      }
    },
    SET_BARANGAYS(state, { barangays, id }) {
      if (id) {
        const filteredBarangays = barangays.filter(
          (barangay) => barangay.municipality_id === id
        );
        state.barangays = filteredBarangays;
      }
      else {
        state.barangays = barangays;
      }
    },
  },
  actions: {
    fetchRegions({ commit }) {
      return this.$axios.get("/philippines").then((response) => {
        const regions = response.data.regions;
        commit("SET_REGIONS", regions);

        const provinces = response.data.provinces;
        commit("SET_PROVINCES", { provinces });

        const municipalities = response.data.municipalities;
        commit("SET_MUNICIPALITIES", { municipalities });

        const barangays = response.data.barangays;
        commit("SET_BARANGAYS", { barangays });
      });
    },
    fetchProvinces({ commit }, id) {
      return this.$axios.get("/philippines").then((response) => {
        const provinces = response.data.provinces;
        commit("SET_PROVINCES", { provinces, id });
      });
    },
    fetchMunicipalities({ commit }, id) {
      return this.$axios.get("/philippines").then((response) => {
        const municipalities = response.data.municipalities;
        commit("SET_MUNICIPALITIES", { municipalities, id });
      });
    },
    fetchBarangays({ commit }, id) {
      return this.$axios.get("/philippines").then((response) => {
        const barangays = response.data.barangays;
        commit("SET_BARANGAYS", { barangays, id });
      });
    },
  },
  getters: {
    getBarangays: (state) => state.barangays,
    getMunicipalities: (state) => state.municipalities,
    getProvinces: (state) => state.provinces,
    getRegions: (state) => state.regions,
  },
};
