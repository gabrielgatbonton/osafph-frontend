import Vue from "vue";
import Vuex from "vuex";
import { registrants } from "./modules/registrants";
import { login } from "./modules/login";
import { categories } from "./modules/categories";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    registrants,
    login,
    categories
  },
});
