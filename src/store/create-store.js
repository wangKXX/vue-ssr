import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export function createStore() {
  return new Vuex.Store({
    state: {
      data: [],
    },
    mutations: {
      setData(state, payload) {
        state.data = payload;
      }
    },
    actions: {
      fetchData({ commit }) {
        const data = [1, 2, 3];
        commit('setData', data);
      }
    },
    modules: {
    }
  });
}
 