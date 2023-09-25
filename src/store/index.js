import Vue from "vue";
import Vuex from "vuex";
import { registrants } from "./modules/registrants";
import { login } from "./modules/login";
import { categories } from "./modules/categories";
import { philippines } from "./modules/philippines";
import { card } from "./modules/card";
import { services } from "./modules/services";
import { alerts } from "./modules/alerts";
import { services_choices } from "./modules/services-choices";
import { consultations } from "./modules/consultations";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    registrants,
    login,
    categories,
    philippines,
    card,
    services,
    alerts,
    services_choices,
    consultations,
  },
});
