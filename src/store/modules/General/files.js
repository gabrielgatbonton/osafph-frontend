import Vuex from "vuex";
import Vue from "vue";
import store from "../../";

Vue.use(Vuex);

export const files = {
  namespaced: true,
  state: () => ({
    files: null,
    file: null,
  }),
  getters: {
    getFiles: (state) => state.files,
    getFile: (state) => state.file,
  },
  mutations: {
    SET_FILES(state, files) {
      state.files = files;
    },
    SET_FILE(state, { file, file_type }) {
      state.file = {
        file: file,
        file_type: file_type,
      };
    },
  },
  actions: {
    fetchFiles({ commit }, hospital_service_id) {
      const url = `hospital-services/${hospital_service_id}/files`;
      return this.$axios
        .get(url)
        .then((response) => {
          const files = response.data.data;
          commit("SET_FILES", files);
        })
        .catch((error) => {
          console.error("Error Fetching Consultation Files", error);
        });
    },
    uploadFile({ dispatch }, { hospital_service_id, file }) {
      const url = `hospital-services/${hospital_service_id}/files`;
      return this.$axios
        .post(url, file)
        .then((response) => {
          dispatch("fetchFiles", hospital_service_id);
          //Success Alert
          store.commit("alerts/SET_SHOW_ALERT", response.data.message);
        })
        .catch((error) => {
          console.error("Error Uploading Consultation File", error);
          //Failed Alert
          store.commit("alerts/SET_SHOW_ERROR", error.response.data.message);
        });
    },
    deleteFile({ dispatch }, { hospital_service_id, file_id }) {
      const url = `hospital-services/${hospital_service_id}/files/${file_id}`;
      return this.$axios
        .delete(url)
        .then((response) => {
          dispatch("fetchFiles", hospital_service_id);
          //Success Alert
          store.commit("alerts/SET_SHOW_ALERT", response.data.message);
        })
        .catch((error) => {
          console.error("Error Deleting Consultation File", error);
          //Failed Alert
          store.commit("alerts/SET_SHOW_ERROR", error.response.data.message);
        });
    },
    fetchFile({ commit }, { hospital_service_id, file_id }) {
      const url = `hospital-services/${hospital_service_id}/files/${file_id}`;
      return this.$axios.get(url, { responseType: "blob" }).then((response) => {
        const contentType = response.headers["content-type"];
        let file_type = null;

        // Check the Content-Type to determine the type of content
        if (contentType.startsWith("image/")) {
          file_type = "Image";
        } else if (contentType === "application/pdf") {
          file_type = "PDF";
        } else {
          console.log("Cannot Handle These File Types");
        }

        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            const file = event.target.result;
            commit("SET_FILE", { file, file_type });
            resolve();
          };
          reader.onerror = (error) => {
            console.error("Error Loading Consultation File: ", error);
            commit("SET_FILE", null);
            resolve();
          };
          reader.readAsDataURL(response.data);
        });
      });
    },
    // fetchConsultationFile({ commit }, { hospital_service_id, file_id }) {
    //   const url = `doctors/hospital-services/${hospital_service_id}/files/${file_id}`;
    //   return this.$axios
    //     .get(url, { responseType: "arraybuffer" })
    //     .then((response) => {
    //       const base64 = btoa(
    //         new Uint8Array(response.data).reduce(
    //           (data, byte) => data + String.fromCharCode(byte),
    //           ""
    //         )
    //       );
    //       commit("SET_CONSULTATION_FILE", base64);
    //       console.log(base64);
    //     });
    // },
  },
};

export const public_files = {
  namespaced: true,
  state: () => ({
    public_files: null,
    public_file: null,
  }),
  getters: {},
  mutations: {
    SET_PUBLIC_FILES(state, files) {
      state.public_files = files;
    },
    RESET_PUBLIC_FILES(state, reset) {
      state.public_files = reset;
    },
    SET_PUBLIC_FILE(state, { file, file_type }) {
      state.public_file = {
        file: file,
        file_type: file_type,
      };
    },
  },
  actions: {
    fetchPublicFiles({ commit }, { citizen_id, queryParams = {} }) {
      // Construct the query string from the queryParams object
      let queryString = Object.keys(queryParams)
        .map((key) => `${key}=${queryParams[key]}`)
        .join("&");

      // Add the query string to the URL if it exists
      let url = `citizens/${citizen_id}/public/hospital-services/files`;
      if (queryString) {
        url += `?${queryString}`;
      }
      return this.$axios
        .get(url)
        .then((response) => {
          const files = response.data;
          commit("SET_PUBLIC_FILES", files);
        })
        .catch((error) => {
          console.error("Error fetching files: ", error);
        });
    },
    resetPublicFiles({ commit }) {
      commit("RESET_PUBLIC_FILES", []);
    },
    fetchPublicFile(
      { commit },
      { citizen_id, hospital_service_id, hospital_service_file_id }
    ) {
      const url = `citizens/${citizen_id}/public/hospital-services/${hospital_service_id}/files/${hospital_service_file_id}`;
      return this.$axios.get(url, { responseType: "blob" }).then((response) => {
        
        const contentType = response.headers["content-type"];
        let file_type = null;

        // Check the Content-Type to determine the type of content
        if (contentType.startsWith("image/")) {
          file_type = "Image";
        } else if (contentType === "application/pdf") {
          file_type = "PDF";
        } else {
          console.log("Cannot Handle These File Types");
        }

        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            const file = event.target.result;
            commit("SET_PUBLIC_FILE", { file, file_type });
            resolve();
          };
          reader.onerror = (error) => {
            console.error("Error Loading Consultation File: ", error);
            commit("SET_PUBLIC_FILE", null);
            resolve();
          };

          reader.readAsDataURL(response.data);
        });
      });
    },
  },
};
