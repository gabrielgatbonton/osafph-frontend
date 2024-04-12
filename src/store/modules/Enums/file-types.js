import Vuex from "vuex";
import Vue from "vue";
import store from "../..";

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

// Root or Admin Actions
export const file_types_actions = {
  namespaced: true,
  state: () => ({}),
  getters: {},
  mutations: {},
  actions: {
    createFileType(_, data) {
      const url = `enums/hospital-services/files/document-types`;
      return this.$axios
        .post(url, data)
        .then((response) => {
          store.dispatch("file_types/fetchFileTypes");
          store.commit("alerts/SET_SHOW_ALERT", response.data.message);
        })
        .catch((error) => {
          console.error("Error Adding File Type: ", error);
          store.commit("alerts/SET_SHOW_ERROR", error.response.data.message);
        });
    },
    deleteFileType(_, id) {
      const url = `enums/hospital-services/files/document-types/${id}`;
      return this.$axios
        .delete(url)
        .then((response) => {
          store.dispatch("file_types/fetchFileTypes");
          store.commit("alerts/SET_SHOW_ALERT", response.data.message);
        })
        .catch((error) => {
          console.error("Error Deleting File Type: ", error);
          store.commit("alerts/SET_SHOW_ERROR", error.response.data.message);
        });
    },
  },
};
