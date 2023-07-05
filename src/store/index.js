import Vue from 'vue'
import Vuex from 'vuex'
import registrants from './modules/registrants'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    registrants
  }
})
