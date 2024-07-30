import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import { registrants, registrant_vaccines } from "./modules/citizens/citizens";
import { authentication } from "./modules/authentication/authentication";
import { categories } from "./modules/enums/categories";
import { philippines } from "./modules/enums/philippines";
import { card } from "./modules/card/card";
import { services } from "./modules/hospital-services/services";
import { alerts } from "./modules/alerts";
import { services_choices } from "./modules/enums/services-choices";
import { consultations } from "./modules/consultations/consultations";
import { consultation_enum } from "./modules/enums/consultation-enum";
import { admin_consultations } from "./modules/admin-consultations/admin-consultations";
import { identification_cards } from "./modules/enums/identification-cards";
import { professions } from "./modules/enums/professions";
import { consultation_form } from "./modules/consultation-form/consultation-form";
import { file_types, file_types_actions } from "./modules/enums/file-types";
import { dialysis, dialysis_items_actions } from "./modules/enums/dialysis";
import {
  dialysis_sessions,
  dialysis_sessions_packages,
} from "./modules/dialysis-sessions/dialysis_sessions";
import { files, public_files } from "./modules/files/files";
import { dialysis_calendar } from "./modules/dialysis-calendar/dialysis_calendar";
import { dashboard, funders_actions } from "./modules/dashboard/dashboard";
import { accounts } from "./modules/accounts/accounts";
import { management } from "./modules/enums/management";
import { dialysis_general } from "./modules/dialysis-general/dialysis_general";
// import { funding } from "./modules/Admin/funding";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    // Authentication
    authentication,

    // Citizens
    registrants,
    card,
    services,
    alerts,
    consultations,
    registrant_vaccines,

    //Admin Exclusive Stores
    admin_consultations,
    dialysis_items_actions,
    funders_actions,
    // funding,
    file_types_actions,

    //Encoder
    consultation_form,
    dialysis_sessions,
    dialysis_sessions_packages,
    dialysis_calendar,

    //Enums
    identification_cards,
    professions,
    philippines,
    categories,
    consultation_enum,
    services_choices,
    file_types,
    dialysis,
    management,

    //General
    files,
    dashboard,
    dialysis_general,
    public_files,

    //Management
    accounts,
  },
  plugins: [
    createPersistedState({
      paths: ["authentication.currentUser"],
    }),
  ],
});
