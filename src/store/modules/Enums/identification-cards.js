import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

export const identification_cards = {
  namespaced: true,
  state: () => ({
    identification_cards: [],
  }),
  mutations: {
    SET_IDENTIFICATION_CARDS(state, identification_cards) {
      state.identification_cards = identification_cards;
    },
  },
  actions: {
    fetchEnumIdentificationCards({ dispatch, state }) {
      if (!state.identification_cards.length) {
        dispatch("fetchIdentificationCards");
      }
    },
    fetchIdentificationCards({ commit }) {
      const url = `enums/identification-cards`;
      return this.$axios
        .get(url)
        .then((response) => {
          const identification_cards = response.data.identificationCards;
          commit("SET_IDENTIFICATION_CARDS", identification_cards);
        })
        .catch((error) => {
          console.error("Error Fetching Identification Cards Enum", error);
        });
    },
  },
  getters: {},
};
