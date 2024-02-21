import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

export const file_types = {
  namespaced: true,
  state: () => ({
    file_types: [],
  }),
  getters: {},
  mutations: {
    SET_FILE_TYPES(state, data) {
      state.file_types = data;
    },
  },
  actions: {
    fetchEnum({ dispatch, state }) {
      if (!state.file_types.length) {
        dispatch("fetchFileTypes");
      }
    },
    fetchFileTypes({ commit }) {
      const url = `enums/hospital-services/files/document-types`;
      return this.$axios
        .get(url)
        .then((response) => {
          const file_types = response.data.document_types;
          commit("SET_FILE_TYPES", file_types);
        })
        .catch((error) => {
          console.error("Error Fetching File Types Enum: ", error);
        });
    },
  },
};
