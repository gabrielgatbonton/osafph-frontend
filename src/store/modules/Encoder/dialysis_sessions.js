import Vuex from "vuex";
import Vue from "vue";
import store from "../..";

Vue.use(Vuex);

export const dialysis_sessions = {
  namespaced: true,
  state: () => ({
    dialysis_sessions: null,
    dialysis_session: null,
  }),
  getters: {
    getPendingSessions: (state) => {
      if (state.dialysis_sessions) {
        const pendingSessions = state.dialysis_sessions
          .filter((dialysis) => {
            return (
              dialysis.status.includes("PENDING") ||
              dialysis.status.includes("IN PROGRESS")
            );
          })
          .sort((a, b) => {
            //Filter to Older to Newest Dates
            const dateA = new Date(a.scheduled_date);
            const dateB = new Date(b.scheduled_date);
            return dateA - dateB;
          });
        return pendingSessions;
      }
    },
    getArchivedSessions: (state) => {
      if (state.dialysis_sessions) {
        const archivedSessions = state.dialysis_sessions
          .filter((dialysis) => {
            return (
              dialysis.status.includes("COMPLETED") ||
              dialysis.status.includes("UNATTENDED")
            );
          })
          .sort((a, b) => {
            //Filter to Older to Newest Dates
            const dateA = new Date(a.scheduled_date);
            const dateB = new Date(b.scheduled_date);
            return dateA - dateB;
          });
        return archivedSessions;
      }
    },
    getDialysisSession: (state) => state.dialysis_session,
  },
  mutations: {
    SET_DIALYSIS_SESSIONS(state, sessions) {
      state.dialysis_sessions = sessions;
    },
    SET_DIALYSIS_SESSION(state, session) {
      state.dialysis_session = session;
    },
  },
  actions: {
    fetchDialysisSessions({ commit }, queryParams = {}) {
      // Construct the query string from the queryParams object
      let queryString = Object.keys(queryParams)
        .map((key) => `${key}=${queryParams[key]}`)
        .join("&");

      // Add the query string to the URL if it exists
      let url = `encoder/dialysis/sessions`;
      if (queryString) {
        url += `?${queryString}`;
      }

      return this.$axios
        .get(url)
        .then((response) => {
          const sessions = response.data.dialysis_sessions;
          commit("SET_DIALYSIS_SESSIONS", sessions);
        })
        .catch((error) => {
          console.error("Error Fetching Dialysis Sessions", error);
        });
    },
    fetchDialysisSessionById({ commit }, id) {
      const url = `encoder/dialysis/sessions/${id}`;
      return this.$axios
        .get(url)
        .then((response) => {
          const session = response.data.dialysis_session;
          commit("SET_DIALYSIS_SESSION", session);
        })
        .catch((error) => {
          console.error("Error Fetching Dialysis Session", error);
        });
    },
    completeDialysisSessionById({ dispatch }, id) {
      const url = `encoder/dialysis/sessions/${id}/complete`;
      return this.$axios
        .patch(url)
        .then((response) => {
          dispatch("fetchDialysisSessionById", id);
          //Success Alert
          store.commit("alerts/SET_SHOW_ALERT", response.data.message);
        })
        .catch((error) => {
          console.error("Error Patching Dialysis Session: ", error);
          //Failed Alert
          store.commit("alerts/SET_SHOW_ERROR", error.response.data.message);
        });
    },
    toggleServiceProgress(
      { dispatch },
      { hospital_service_id, id, status }
    ) {
      const url = `hospital-services/${hospital_service_id}/toggle-status`;
      return this.$axios
        .patch(url, status)
        .then((response) => {
          store.commit("alerts/SET_SHOW_ALERT", response.data.message);
          dispatch("fetchDialysisSessionById", id);
        })
        .catch((error) => {
          console.error("Error Patching Status: ", error);
          //Failed Alert
          store.commit("alerts/SET_SHOW_ERROR", error.response.data.message);
        });
    },
  },
};

export const dialysis_sessions_packages = {
  namespaced: true
}
