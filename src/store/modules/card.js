import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

export const card = {
  namespaced: true,
  state: () => ({
    image: null,
    signature: null,
    publicImage: null,
    publicSignature: null,
  }),
  mutations: {
    SET_IMAGE(state, imageBase64) {
      //   console.log(imageBase64);
      state.image = imageBase64;
    },
    SET_SIGNATURE(state, imageBase64) {
        state.signature = imageBase64
    },
    SET_PUBLIC_IMAGE(state, imageBase64) {
      //   console.log(imageBase64);
      state.publicImage = imageBase64;
    },
    SET_PUBLIC_SIGNATURE(state, imageBase64) {
      //   console.log(imageBase64);
      state.publicSignature = imageBase64;
    },
  },
  actions: {
    fetchImage({ commit }, id) {
      return this.$axios
        .get(`/citizens/${id}/files/image`, { responseType: "blob" })
        .then((response) => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
              const imageBase64 = event.target.result;
              commit("SET_IMAGE", imageBase64);
              resolve();
            };
            reader.onerror = (error) => {
              reject(error);
            };
            reader.readAsDataURL(response.data);
          });
        });
    },
    fetchSignature({ commit }, id) {
      return this.$axios
        .get(`/citizens/${id}/files/signature`, { responseType: "blob" })
        .then((response) => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
              const imageBase64 = event.target.result;
              commit("SET_SIGNATURE", imageBase64);
              resolve();
            };
            reader.onerror = (error) => {
              reject(error);
            };
            reader.readAsDataURL(response.data);
          });
        });
    },
    fetchPublicImage({ commit }, id) {
      return this.$axios
        .get(`/citizens/${id}/public-files/image`, { responseType: "blob" })
        .then((response) => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
              const imageBase64 = event.target.result;
              commit("SET_PUBLIC_IMAGE", imageBase64);
              resolve();
            };
            reader.onerror = (error) => {
              reject(error);
            };
            reader.readAsDataURL(response.data);
          });
        });
    },
    fetchPublicSignature({ commit }, id) {
      return this.$axios
        .get(`/citizens/${id}/public-files/signature`, { responseType: "blob" })
        .then((response) => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
              const imageBase64 = event.target.result;
              commit("SET_PUBLIC_SIGNATURE", imageBase64);
              resolve();
            };
            reader.onerror = (error) => {
              reject(error);
            };
            reader.readAsDataURL(response.data);
          });
        });
    },
  },
  getters: {
    getImage: (state) => state.image,
    getSignature: (state) => state.signature,
    getPublicImage: (state) => state.publicImage,
    getPublicSignature: (state) => state.publicSignature,
  },
};
