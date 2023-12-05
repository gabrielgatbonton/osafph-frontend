import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

export const card = {
  namespaced: true,
  state: () => ({
    image: null,
    signature: null,
    biometrics: null,
    publicImage: null,
    publicSignature: null,
    publicBiometrics: null,
  }),
  getters: {
    getImage: (state) => state.image,
    getSignature: (state) => state.signature,
    getBiometrics: (state) => state.biometrics,
    getPublicImage: (state) => state.publicImage,
    getPublicSignature: (state) => state.publicSignature,
    getPublicBiometrics: (state) => state.publicBiometrics,
  },
  mutations: {
    //Set Images to the Card
    SET_IMAGE(state, imageBase64) {
      state.image = imageBase64;
    },
    SET_SIGNATURE(state, imageBase64) {
      state.signature = imageBase64;
    },
    SET_BIOMETRICS(state, imageBase64) {
      state.biometrics = imageBase64;
    },

    //Delete Images from the database
    DELETE_IMAGE(state, targetImage) {
      if (state.image === targetImage) {
        state.image = null;
      }
    },
    DELETE_SIGNATURE(state, targetImage) {
      if (state.signature === targetImage) {
        state.signature = null;
      }
    },
    DELETE_BIOMETRICS(state, targetImage) {
      if (state.biometrics === targetImage) {
        state.biometrics = null;
      }
    },

    //Public Images for Reroute Module.
    SET_PUBLIC_IMAGE(state, imageBase64) {
      state.publicImage = imageBase64;
    },
    SET_PUBLIC_SIGNATURE(state, imageBase64) {
      state.publicSignature = imageBase64;
    },
    SET_PUBLIC_BIOMETRICS(state, imageBase64) {
      state.publicBiometrics = imageBase64;
    },
  },
  actions: {
    //Actions for fetching images to overlap in canvas for the printing of card.
    fetchImage({ commit }, id) {
      const url = `/citizens/${id}/files/image`;
      return this.$axios
        .get(url, { responseType: "blob" })
        .then((response) => {
          return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (event) => {
              const imageBase64 = event.target.result;
              console.log(imageBase64);
              commit("SET_IMAGE", imageBase64);
              resolve();
            };
            reader.onerror = (error) => {
              console.error("Error loading image:", error);
              commit("SET_IMAGE", null); // Set the value to null when an error occurs
              resolve(); // Resolve the promise to prevent uncaught promise rejection
            };
            reader.readAsDataURL(response.data);
          });
        })
        .catch((error) => {
          console.error("Fetch image error:", error);
          commit("SET_IMAGE", null); // Set the value to null when an error occurs
        });
    },
    fetchSignature({ commit }, id) {
      const url = `/citizens/${id}/files/signature`;
      return this.$axios
        .get(url, { responseType: "blob" })
        .then((response) => {
          return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (event) => {
              const imageBase64 = event.target.result;
              commit("SET_SIGNATURE", imageBase64);
              resolve();
            };
            reader.onerror = (error) => {
              console.error("Error loading image:", error);
              commit("SET_SIGNATURE", null); // Set the value to null when an error occurs
              resolve(); // Resolve the promise to prevent uncaught promise rejection
            };
            reader.readAsDataURL(response.data);
          });
        })
        .catch((error) => {
          console.error("Fetch signature image error:", error);
          commit("SET_SIGNATURE", null); // Set the value to null when an error occurs
        });
    },
    fetchBiometrics({ commit }, id) {
      const url = `/citizens/${id}/files/biometrics`;
      return this.$axios
        .get(url, { responseType: "blob" })
        .then((response) => {
          return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (event) => {
              const imageBase64 = event.target.result;
              commit("SET_BIOMETRICS", imageBase64);
              resolve();
            };
            reader.onerror = (error) => {
              console.error("Error loading biometrics:", error);
              commit("SET_BIOMETRICS", null); // Set the value to null when an error occurs
              resolve(); // Resolve the promise to prevent uncaught promise rejection
            };
            reader.readAsDataURL(response.data);
          });
        })
        .catch((error) => {
          console.error("Fetch biometrics error:", error);
          commit("SET_BIOMETRICS", null); // Set the value to null when an error occurs
        });
    },

    //Delete Actions for the removal of image in the database.
    deleteImage({ commit }, id) {
      const url = `citizens/${id}/files/image`;
      return this.$axios
        .delete(url)
        .then((response) => {
          const targetImage = response.data;
          commit("DELETE_IMAGE", targetImage);
        })
        .catch((error) => {
          console.error("Error deleting image: ", error);
        });
    },
    deleteSignature({ commit }, id) {
      const url = `citizens/${id}/files/signature`;
      return this.$axios
        .delete(url)
        .then((response) => {
          const targetImage = response.data;
          commit("DELETE_SIGNATURE", targetImage);
        })
        .catch((error) => {
          console.error("Error deleting signature: ", error);
        });
    },
    deleteBiometrics({ commit }, id) {
      const url = `citizens/${id}/files/biometrics`;
      return this.$axios
        .delete(url)
        .then((response) => {
          const targetImage = response.data;
          commit("DELETE_BIOMETRICS", targetImage);
        })
        .catch((error) => {
          console.error("Error deleting signature: ", error);
        });
    },

    //Actions for the public images used in the reroute module.
    fetchPublicImage({ commit }, id) {
      const url = `/citizens/${id}/public-files/image`;
      return this.$axios
        .get(url, { responseType: "blob" })
        .then((response) => {
          return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (event) => {
              const imageBase64 = event.target.result;
              commit("SET_PUBLIC_IMAGE", imageBase64);
              resolve();
            };
            reader.onerror = (error) => {
              console.error("Error loading image:", error);
              commit("SET_PUBLIC_IMAGE", null); // Set the value to null when an error occurs
              resolve(); // Resolve the promise to prevent uncaught promise rejection
            };
            reader.readAsDataURL(response.data);
          });
        })
        .catch((error) => {
          console.error("Fetch public image error:", error);
          commit("SET_PUBLIC_IMAGE", null); // Set the value to null when an error occurs
        });
    },
    fetchPublicSignature({ commit }, id) {
      const url = `/citizens/${id}/public-files/signature`;
      return this.$axios
        .get(url, { responseType: "blob" })
        .then((response) => {
          return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (event) => {
              const imageBase64 = event.target.result;
              commit("SET_PUBLIC_SIGNATURE", imageBase64);
              resolve();
            };
            reader.onerror = (error) => {
              console.error("Error loading image:", error);
              commit("SET_PUBLIC_SIGNATURE", null); // Set the value to null when an error occurs
              resolve(); // Resolve the promise to prevent uncaught promise rejection
            };
            reader.readAsDataURL(response.data);
          });
        })
        .catch((error) => {
          console.error("Fetch public signature image error:", error);
          commit("SET_PUBLIC_SIGNATURE", null); // Set the value to null when an error occurs
        });
    },
    fetchPublicBiometrics({ commit }, id) {
      const url = `/citizens/${id}/public-files/biometrics`;
      return this.$axios
        .get(url, {
          responseType: "blob",
        })
        .then((response) => {
          return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (event) => {
              const imageBase64 = event.target.result;
              commit("SET_PUBLIC_BIOMETRICS", imageBase64);
              resolve();
            };
            reader.onerror = (error) => {
              console.error("Error loading public image biometrics:", error);
              commit("SET_PUBLIC_BIOMETRICS", null); // Set the value to null when an error occurs
              resolve(); // Resolve the promise to prevent uncaught promise rejection
            };
            reader.readAsDataURL(response.data);
          });
        })
        .catch((error) => {
          console.error("Fetch biometrics error:", error);
          commit("SET_PUBLIC_BIOMETRICS", null); // Set the value to null when an error occurs
        });
    },
  },
};
