import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Vuelidate from "vuelidate";
import axiosInstance from "./services/axiosInstance";
import pusherInstance from "./services/pusherInstance";
import { auth } from "./utils/auth";

Vue.config.productionTip = false;
Vue.use(Vuelidate);

//Initialize Backend URL
const baseURL = process.env.VUE_APP_BACKEND_URL;

//Server URL for QR code
const networkURL = process.env.VUE_APP_SERVER_URL;

Vue.prototype.$axios = axiosInstance;
Vue.prototype.$url = baseURL;
Vue.prototype.$network = networkURL;
Vue.prototype.$pusher = pusherInstance;
Vue.prototype.$auth = auth;

Vuex.Store.prototype.$axios = axiosInstance;
Vuex.Store.prototype.$router = router;
Vuex.Store.prototype.$auth = auth;

function handleBeforeUnload(event) {
  // Check if the tab or window is being closed intentionally
  if (!event.currentTarget.performance.navigation.type === 1) {
    // If it's not a refresh (type === 1), it's an actual close event
    // Clear the token and other data here as needed
    store.dispatch("authentication/logoutAndClearToken");
  } else {
    // If it's a refresh, store a flag in sessionStorage to remember it
    sessionStorage.setItem("isRefresh", "true");
  }
}

// Attach the beforeunload event to window
window.addEventListener("beforeunload", handleBeforeUnload);

// Check if the page was refreshed
const isRefresh = sessionStorage.getItem("isRefresh") === "true";

// If it's a refresh, remove the flag from sessionStorage
if (isRefresh) {
  sessionStorage.removeItem("isRefresh");
} else {
  // If it's not a refresh, clear the token and other data on initial load
  store.dispatch("authentication/logoutAndClearToken");
}

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
