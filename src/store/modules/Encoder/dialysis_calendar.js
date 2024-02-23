import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

export const dialysis_calendar = {
  namespaced: true,
  state: () => ({
    dialysis_calendar: [],
    dialysis_machine_calendar: [],
    calendar_events: [],
  }),
  getters: {
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
    getMachineSessions: (state) => {
      if (state.dialysis_machine_calendar) {
        const calendar = state.dialysis_machine_calendar;
        const availableSessions = [];

        const sessionDate = Object.keys(calendar);

        sessionDate.forEach((sessionDate) => {
          const sessions = calendar[sessionDate];

          Object.keys(sessions).forEach((sessionType) => {
            const dialysisMachines = sessions[sessionType];

            dialysisMachines.forEach((machine) => {
              const existingMachine = availableSessions.find(
                (item) => item.machine === machine
              );
              if (existingMachine) {
                if (!existingMachine.available.includes(sessionType)) {
                  existingMachine.available.push(sessionType);
                }
              } else {
                availableSessions.push({
                  machine: machine,
                  available: [sessionType],
                });
              }
            });
          });
        });
        return availableSessions;
      }
    },
  },
  mutations: {
    SET_DIALYSIS_CALENDAR(state, dialysis_calendar) {
      state.dialysis_calendar = dialysis_calendar;
    },
    SET_DIALYSIS_MACHINE_CALENDAR(state, calendar) {
      state.dialysis_machine_calendar = calendar;
    },
    SET_CALENDAR_EVENTS(state, events) {
      state.calendar_events = events;
    },
  },
  actions: {
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
