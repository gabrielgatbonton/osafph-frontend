import Vuex from "vuex";
import Vue from "vue";
import store from "../../";

Vue.use(Vuex);

export const consultations = {
  namespaced: true,
  state: () => ({
    pendingConsultations: [],
    archivedConsultations: [],
    consultation: null,
    doctorConsultationForms: [],
    consultation_form: null,
    consultation_files: null,
    consultation_file: null,
  }),
  getters: {
    getPendingConsultations: (state) => state.pendingConsultations,
    getArchivedConsultations: (state) => state.archivedConsultations,
    getConsultation: (state) => state.consultation,
    getConsultationForm: (state) => state.consultation_form,
    getConsultationFiles: (state) => state.consultation_files,
    getConsultationFile: (state) => state.consultation_file,
  },
  mutations: {
    SET_CONSULTATIONS(state, consultations) {
      const pendingConsultations = consultations.consultations
        .filter((consultation) =>
          consultation.hospital_service.status.includes("PENDING")
        )
        .sort((a, b) => {
          //Filter to Older to Newest Dates
          const dateA = new Date(a.hospital_service.scheduled_date);
          const dateB = new Date(b.hospital_service.scheduled_date);
          return dateA - dateB;
        });
      state.pendingConsultations = pendingConsultations;

      const archivedConsultations = consultations.consultations
        .filter(
          (consultation) =>
            consultation.hospital_service.status.includes("COMPLETED") ||
            consultation.hospital_service.status.includes("UNATTENDED")
        )
        .sort((a, b) => {
          //Filter to Newer to Oldest Dates
          const dateA = new Date(b.hospital_service.scheduled_date);
          const dateB = new Date(a.hospital_service.scheduled_date);
          return dateA - dateB;
        });
      state.archivedConsultations = archivedConsultations;
    },
    SET_CONSULTATION(state, consultation) {
      state.consultation = consultation;
    },
    ADD_DOCTOR_CONSULTATION(state, consultation) {
      state.doctorConsultationForms.push(consultation);
    },
    UPDATE_CONSULTATION_FORM(state, { data }) {
      // const consultation_form = state.doctorConsultationForms.find((form) => {
      //   form.consultation_form_id === consultation_form_id;
      // });
      // console.log("Consultation Found! ", consultation_form);
      console.log("Consultation Update Data! ", data);
      state.consultation_form = data;
    },
    SET_CONSULTATION_FORM(state, consultation_form) {
      state.consultation_form = consultation_form;
    },
    SET_CONSULTATION_FILES(state, files) {
      state.consultation_files = files;
    },
    SET_CONSULTATION_FILE(state, file) {
      state.consultation_file = file;
    },
  },
  actions: {
    fetchConsultations({ commit }) {
      return this.$axios
        .get(`doctors/consultations`)
        .then((response) => {
          const consultations = response.data;
          commit("SET_CONSULTATIONS", consultations);
        })
        .catch((error) => {
          console.error("Error Fetching Consultations: ", error);
        });
    },
    fetchConsultationById({ commit }, consultation_id) {
      return this.$axios
        .get(`doctors/consultations/${consultation_id}`)
        .then((response) => {
          const consultation = response.data;
          commit("SET_CONSULTATION", consultation);
        })
        .catch((error) => {
          console.error("Error Fetching Consultation: ", error);
        });
    },
    fetchConsultationFormById({ commit }, consultation_id) {
      console.log(consultation_id);
      const url = `/doctors/consultations/${consultation_id}/consultation-forms`;
      return this.$axios
        .get(url)
        .then((response) => {
          const consultation_form = response.data.consultation_form;
          commit("SET_CONSULTATION_FORM", consultation_form);
        })
        .catch((error) => {
          console.error("Error Fetching Consultation Form: ", error);
        });
    },
    addConsultationToId({ commit }, { consultation_id, data }) {
      return this.$axios
        .post(
          `doctors/consultations/${consultation_id}/consultation-forms`,
          data
        )
        .then((response) => {
          const consultation = response.data;
          commit("ADD_DOCTOR_CONSULTATION", consultation);
          store.commit("alerts/SET_SHOW_ALERT", {
            alert: true,
            message: "Added Consultation Form",
          });
        })
        .catch((error) => {
          store.commit("alerts/SET_SHOW_ERROR", {
            alert: true,
            message: "Adding",
          });
          console.log("Error Adding Consultation by Doctor", error);
        });
    },
    updateConsultationToId(
      { commit },
      { consultation_id, consultation_form_id, data }
    ) {
      const url = `doctors/consultations/${consultation_id}/consultation-forms/${consultation_form_id}`;
      return this.$axios
        .put(url, data)
        .then((response) => {
          const data = response.data;
          commit("UPDATE_CONSULATION_FORM", { data });
        })
        .catch((error) => {
          console.error("Error Updating Consultation Form: ", error);
        });
    },
    completeConsultationToId({ dispatch }, consultation_id) {
      const url = `doctors/consultations/${consultation_id}/complete`;
      return this.$axios
        .patch(url)
        .then((response) => {
          dispatch("fetchConsultationById", consultation_id);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error Completing Consultation: ", error);
        });
    },
    fetchConsultationFiles({ commit }, hospital_service_id) {
      const url = `doctors/hospital-services/${hospital_service_id}/files`;
      return this.$axios
        .get(url)
        .then((response) => {
          const files = response.data.data;
          commit("SET_CONSULTATION_FILES", files);
        })
        .catch((error) => {
          console.error("Error Fetching Consultation Files", error);
        });
    },
    uploadConsultationFile({ dispatch }, { hospital_service_id, file }) {
      const url = `doctors/hospital-services/${hospital_service_id}/files`;
      return this.$axios
        .post(url, file)
        .then((response) => {
          dispatch("fetchConsultationFiles", hospital_service_id);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error Uploading Consultation File", error);
        });
    },
    deleteConsultationFile({ dispatch }, { hospital_service_id, file_id }) {
      const url = `doctors/hospital-services/${hospital_service_id}/files/${file_id}`;
      return this.$axios.delete(url).then((response) => {
        dispatch("fetchConsultationFiles", hospital_service_id);
        console.log(response.data);
      });
    },
    fetchConsultationFile({ commit }, { hospital_service_id, file_id }) {
      const url = `doctors/hospital-services/${hospital_service_id}/files/${file_id}`;
      return this.$axios.get(url, { responseType: "blob" }).then((response) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            const imageBase64 = event.target.result;
            commit("SET_CONSULTATION_FILE", imageBase64);
            console.log(imageBase64);
            resolve();
          };
          reader.onerror = (error) => {
            console.error("Error Loading Consultation File: ", error);
            commit("SET_CONSULTATION_FILE", null);
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
