import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$http = axios

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api' //Localhost API endpoint
  // baseURL: 'http://200.10.77.4/api'  //Network API endpoint
})

Vue.prototype.$axios = axiosInstance;
Vuex.Store.prototype.$axios = axiosInstance;

axiosInstance.interceptors.request.use((config) => {
  const accessToken = store.getters["login/accessToken"];
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
