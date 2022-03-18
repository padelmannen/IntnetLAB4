import { createStore } from "vuex";

export default createStore({
  state: {
    authenticated: false,
    adminUser: "",
  },
  getters: {
    isAuthenticated(state) {
      return state.authenticated;
    },
    getAdminUser(state){
      return state.adminUser
    }
  },
  mutations: {
    setAuthenticated(state, authenticated) {
      state.authenticated = authenticated;
    },
    setAdminUser(state, admin){
      state.adminUser = admin;
    }
  },
  actions: {},
  modules: {},
});
