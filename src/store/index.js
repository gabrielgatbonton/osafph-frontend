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
import { identification_cards } from "./modules/Enums/identification-cards";
import { professions } from "./modules/Enums/professions";
import { consultation_form } from "./modules/Encoder/consultation-form";
import { file_types } from "./modules/Enums/file-types";
import { dialysis } from "./modules/Enums/dialysis";
import { dialysis_sessions } from "./modules/Encoder/dialysis";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    registrants,
    login,
    card,
    services,
    alerts,
    consultations,

    //Admin Exclusive Stores
    admin_consultations,

    //Encoder
    consultation_form,
    dialysis_sessions,

    //Enums
    identification_cards,
    professions,
    philippines,
    categories,
    consultation_enum,
    services_choices,
    file_types,
    dialysis,
  },
});
