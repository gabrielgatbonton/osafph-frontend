import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

export const dialysis = {
  namespaced: true,
  state: () => ({
    dialysis_machines: null,
    dialysis_items: null,
    dialysis_packages: null,
  }),
  getters: {
    getDialysisMachines: (state) => state.dialysis_machines,
    getDialysisItems: (state) => state.dialysis_items,
    getDialysisPackages: (state) => state.dialysis_packages,
  },
  mutations: {
    SET_DIALYSIS_MACHINES(state, machines) {
      state.dialysis_machines = machines;
    },
    SET_DIALYSIS_ITEMS(state, items) {
      state.dialysis_items = items;
    },
    SET_DIALYSIS_PACKAGES(state, packages) {
      state.dialysis_packages = packages;
    },
  },
  actions: {
    fetchEnums({ dispatch }) {
      dispatch("fetchDialysisMachines");
      dispatch("fetchDialysisItems");
    },
    fetchDialysisMachines({ commit }) {
      const url = `enums/hospital-services/dialysis/machines`;
      return this.$axios
        .get(url)
        .then((response) => {
          const machines = response.data.data;
          commit("SET_DIALYSIS_MACHINES", machines);
        })
        .catch((error) => {
          console.error("Error Fetching Dialysis Machine: ", error);
        });
    },
    fetchDialysisItems({ commit }) {
      const url = `enums/hospital-services/dialysis/item-options`;
      return this.$axios
        .get(url)
        .then((response) => {
          const items = response.data.data;
          commit("SET_DIALYSIS_ITEMS", items);
        })
        .catch((error) => {
          console.error("Error Fetching Dialysis Items: ", error);
        });
    },
    fetchDialysisPackages({ commit }) {
      const url = `enums/hospital-services/dialysis/packages`;
      return this.$axios
        .get(url)
        .then((response) => {
          const packages = response.data.data;
          commit("SET_DIALYSIS_PACKAGES", packages);
        })
        .catch((error) => {
          console.error("Error Fetching Dialysis Packages: ", error);
        });
    },
  },
};
