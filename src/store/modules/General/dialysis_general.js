import Vuex from "vuex";
import Vue from "vue";
// import store from "../..";

Vue.use(Vuex);

export const dialysis_general = {
  namespaced: true,
  state: () => ({
    dialysis_queuing: null,
  }),
  getters: {
    queuingDialysisList: (state) => {
      if (state.dialysis_queuing) {
        const date = state.dialysis_queuing.date;
        const machine_data = state.dialysis_queuing.machines;
        let payload = {
          date: date,
          data: [],
        };

        const machines = Object.keys(machine_data); //Names

        machines.forEach((machine) => {
          const item = machine_data[machine]; //Session
          const machineObj = { dialysis_machine: machine };

          // Loop through the desired sessions
          ["MORNING", "NOON", "AFTERNOON"].forEach((session) => {
            // Check if the session exists in the item object using the 'in' operator
            if (session in item) {
              // If the session exists, add it to machineObj
              machineObj[session.toLowerCase()] = item[session];
            } else {
              // If the session doesn't exist, add it with a null value
              machineObj[session.toLowerCase()] = null;
            }
          });

          payload.data.push(machineObj);
        });

        return payload;
      }
    },
  },
  mutations: {
    SET_DIALYSIS_QUEUE(state, queue) {
      state.dialysis_queuing = queue;
    },
  },
  actions: {
    fetchDialysisQueue({ commit }) {
      const url = `dialysis-queue`;
      return this.$axios
        .get(url)
        .then((response) => {
          const queue = response.data;
          commit("SET_DIALYSIS_QUEUE", queue);
        })
        .catch((error) => {
          console.error("Error Fetching Dialysis Queue", error);
        });
    },
  },
};
