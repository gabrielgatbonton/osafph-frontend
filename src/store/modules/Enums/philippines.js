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
    countries: [],
  }),
  getters: {
    getBarangays: (state) => state.barangays,
    getMunicipalities: (state) => state.municipalities,
    getProvinces: (state) => state.provinces,
    getRegions: (state) => state.regions,
    getCountries: (state) => state.countries,
  },
  mutations: {
    SET_COUNTRIES(state, countries) {
      state.countries = countries;
    },
    SET_REGIONS(state, { regions, id }) {
      if (id) {
        const filteredRegions = regions.filter(
          (region) => region.country_id === id
        );
        state.regions = filteredRegions;
      } else {
        state.regions = regions;
      }
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
      } else {
        state.barangays = barangays;
      }
    },
  },
  actions: {
    fetchEnumPhilippines({ dispatch, state }) {
      if (
        !state.barangays.length ||
        !state.provinces.length &&
        !state.municipalities.length &&
        !state.regions.length &&
        !state.countries.length
      ) {
        dispatch("fetchCountries");
      }
    },
    fetchEnumBarangayFilter({ dispatch, state }) {
      if (!state.barangays.length) {
        dispatch("fetchBarangays");
      }
    },
    fetchCountries({ commit }) {
      const url = `enums/philippines`;
      return this.$axios.get(url).then((response) => {
        const countries = response.data.countries;
        commit("SET_COUNTRIES", countries);

        const regions = response.data.regions;
        commit("SET_REGIONS", { regions });

        const provinces = response.data.provinces;
        commit("SET_PROVINCES", { provinces });

        const municipalities = response.data.municipalities;
        commit("SET_MUNICIPALITIES", { municipalities });

        const barangays = response.data.barangays;
        commit("SET_BARANGAYS", { barangays });
      });
    },
    fetchRegions({ commit }, id) {
      const url = `enums/philippines`;
      return this.$axios.get(url).then((response) => {
        const regions = response.data.regions;
        commit("SET_REGIONS", { regions, id });
      });
    },
    fetchProvinces({ commit }, id) {
      const url = `enums/philippines`;
      return this.$axios.get(url).then((response) => {
        const provinces = response.data.provinces;
        commit("SET_PROVINCES", { provinces, id });
      });
    },
    fetchMunicipalities({ commit }, id) {
      const url = `enums/philippines`;
      return this.$axios.get(url).then((response) => {
        const municipalities = response.data.municipalities;
        commit("SET_MUNICIPALITIES", { municipalities, id });
      });
    },
    fetchBarangays({ commit }, id) {
      const url = `enums/philippines`;
      return this.$axios.get(url).then((response) => {
        const barangays = response.data.barangays;
        commit("SET_BARANGAYS", { barangays, id });
      });
    },
  },
};
