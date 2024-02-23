import Vuex from "vuex";
import Vue from "vue";
import store from "../../";

Vue.use(Vuex);

export const dialysis_sessions = {
  namespaced: true,
  state: () => ({
    dialysis_sessions: [],
    dialysis_session: [],
    dialysis_calendar: [],
    dialysis_machine_calendar: [],
    calendar_events: [],
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
    getCalendarEvents: (state) => {
      if (state.calendar_events) {
        const calendar = state.calendar_events;
        let events = [];

        const sessionDate = Object.keys(calendar);

        sessionDate.forEach((sessionDate) => {
          const sessions = calendar[sessionDate];

          Object.keys(sessions).forEach((sessionType) => {
            const dialysisMachines = sessions[sessionType];

            dialysisMachines.forEach(() => {
              const existingDate = events.find((item) => item === sessionDate);
              if (existingDate) {
                if (!existingDate.includes(sessionDate)) {
                  existingDate.push(sessionDate);
                }
              } else {
                events.push(sessionDate);
              }
            });
          });
        });

        return events;
      }
    },
  },
  mutations: {
    SET_DIALYSIS_SESSIONS(state, sessions) {
      state.dialysis_sessions = sessions;
    },
    SET_DIALYSIS_SESSION(state, session) {
      state.dialysis_session = session;
    },
    SET_DIALYSIS_CALENDAR(state, dialysis_calendar) {
      state.dialysis_calendar = dialysis_calendar;
    },
    SET_DIALYSIS_MACHINE_CALENDAR(state, calendar) {
      state.dialysis_machine_calendar = calendar;
    },
    SET_CALENDAR_EVENTS(state, events) {
      state.calendar_events = events;
      console.log(state.calendar_events);
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
    fetchDialysisCalendar({ commit }, queryParams = {}) {
      let queryString = Object.keys(queryParams)
        .map((key) => `${key}=${queryParams[key]}`)
        .join("&");

      let url = `hospital-services/dialysis/calendar/pick-dates`;
      if (queryString) {
        url += `?${queryString}`;
      }

      return this.$axios
        .get(url)
        .then((response) => {
          const dialysis_calendar = response.data.results;
          commit("SET_DIALYSIS_CALENDAR", dialysis_calendar);
        })
        .catch((error) => {
          console.error("Error Fetching Dialysis Calendar: ", error);
        });
    },
    fetchDialysisMachineCalendar({ commit }, queryParams = {}) {
      let queryString = Object.keys(queryParams)
        .map((key) => `${key}=${queryParams[key]}`)
        .join("&");

      let url = `hospital-services/dialysis/calendar/availability`;
      if (queryString) {
        url += `?${queryString}`;
      }

      return this.$axios
        .get(url)
        .then((response) => {
          const calendar = response.data.results;
          commit("SET_DIALYSIS_MACHINE_CALENDAR", calendar);
        })
        .catch((error) => {
          console.error("Error Fetching Dialysis Machine Calendar: ", error);
        });
    },
    fetchDialysisMachineCalendarEvents({ commit }, queryParams = {}) {
      let queryString = Object.keys(queryParams)
        .map((key) => `${key}=${queryParams[key]}`)
        .join("&");

      let url = `hospital-services/dialysis/calendar/availability`;
      if (queryString) {
        url += `?${queryString}`;
      }

      return this.$axios
        .get(url)
        .then((response) => {
          const events = response.data.results;
          commit("SET_CALENDAR_EVENTS", events);
        })
        .catch((error) => {
          console.error("Error Fetching Dialysis Machine Calendar: ", error);
        });
    },
  },
};
