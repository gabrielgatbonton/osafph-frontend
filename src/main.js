import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import Vuelidate from 'vuelidate'

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.use(Vuelidate)

//BaseURLs
// const baseURL = 'http://200.10.77.4/';  //Network BaseURL
const baseURL = 'http://127.0.0.1:8000/'; //Local BaseURL


const axiosInstance = axios.create({
  baseURL: `${baseURL}api`  //Axios baseURL
})

Vue.prototype.$axios = axiosInstance;
Vuex.Store.prototype.$axios = axiosInstance;
Vue.prototype.$url = baseURL

axiosInstance.interceptors.request.use((config) => {
  const accessToken = store.getters["login/accessToken"];
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Function to reset local storage on tab close
function resetLocalStorage() {
  // Clear or reset the data in local storage as needed
  // localStorage.clear(); // This will clear all data in local storage
  
  // Or you can selectively remove specific items from local storage
  localStorage.removeItem("accessToken");
  // Optionally, you can also reset the Vuex store state here if needed
  store.commit("login/SET_LOGGED_OUT");
}

// Attach the beforeunload event to window
window.addEventListener("beforeunload", resetLocalStorage);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
