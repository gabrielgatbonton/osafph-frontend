import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import Vuelidate from 'vuelidate'

Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.use(Vuelidate);

//BaseURLs
// const baseURL = "https://osafphmabalacatcity.com/"; //Deployed BaseURL
const baseURL = "http://200.10.77.12/";
// const baseURL = 'http://127.0.0.1:8000/'; //Local BaseURL
// const baseURL = 'http://192.168.1.108:80/';

//Network URL for QR code
const networkURL = "http://192.168.1.118:8080/";

const axiosInstance = axios.create({
  baseURL: `${baseURL}api/`, //Axios baseURL
});

Vue.prototype.$axios = axiosInstance;
Vuex.Store.prototype.$axios = axiosInstance;
Vue.prototype.$url = baseURL;
Vue.prototype.$network = networkURL;

axiosInstance.interceptors.request.use((config) => {
  const accessToken = store.getters["login/accessToken"];
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

function handleBeforeUnload(event) {
  // Check if the tab or window is being closed intentionally
  if (!event.currentTarget.performance.navigation.type === 1) {
    // If it's not a refresh (type === 1), it's an actual close event
    // Clear the token and other data here as needed
    store.dispatch("login/logoutAndClearToken");
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
  store.dispatch("login/logoutAndClearToken");
}

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
