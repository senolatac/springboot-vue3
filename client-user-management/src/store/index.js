import { createStore } from "vuex";

const TYPES = {
    UPDATE_USER: 'UPDATE_USER',
};

export default createStore({
  state: {
    currentUser: JSON.parse(localStorage.getItem("currentUser"))
  },
  getters: {
    currentUser: s => s.currentUser
  },
  mutations: {
    [TYPES.UPDATE_USER](s, user) {
      s.currentUser = user;
    }
  },
  actions: {
    updateUser({ commit }, user) {
      commit(TYPES.UPDATE_USER, user);
    }
  },
  modules: {}
});
