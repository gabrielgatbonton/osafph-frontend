import Vue from "vue";
import Vuex from "vuex";
import { registrants } from "./modules/Citizens/registrants";
import { login } from "./modules/Citizens/login";
import { categories } from "./modules/Enums/categories";
import { philippines } from "./modules/Enums/philippines";
import { card } from "./modules/Citizens/card";
import { services } from "./modules/Citizens/services";
import { alerts } from "./modules/alerts";
import { services_choices } from "./modules/Enums/services-choices";
import { consultations } from "./modules/Doctor/consultations";
import { consultation_enum } from "./modules/Enums/consultation-enum";
import { admin_consultations } from "./modules/Admin/admin-consultations";

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
    consultation_enum,

    //Admin Exclusive Stores
    admin_consultations,
  },
});
