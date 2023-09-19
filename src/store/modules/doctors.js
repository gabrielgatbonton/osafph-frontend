import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

export const doctors = {
    namespaced: true,
    state: () => ({
        doctors: []
    }),
    mutations: {

    },
    actions: {
        // fetchDoctorsByServiceable({ commit }, )
    },
    getters: {

    }
}