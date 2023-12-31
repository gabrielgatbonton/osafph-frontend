import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

export const categories = {
  namespaced: true,
  state: () => ({
    categories: [], // Store only descriptions
  }),
  mutations: {
    SET_CATEGORIES(state, descriptions) {
      state.categories = descriptions;
    },
  },
  actions: {
    fetchCategories({ commit }) {
      return this.$axios
        .get("/categories")
        .then((response) => {
          const categories = response.data.categories;
          const descriptions = categories.map((categories) => categories.description);
          commit("SET_CATEGORIES", descriptions);
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
        });
    },
  },
  getters: {
    getCategories: (state) => state.categories,
  },
};
