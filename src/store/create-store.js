import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export function createStore() {
  return new Vuex.Store({
    state: {
      data: [],
      aboutData: [],
    },
    mutations: {
      SET_DATA(state, payload) {
        state.data = payload;
      },
      SET_ABOUT_DATA(state, payload) {
        state.aboutData = payload;
      }
    },
    actions: {
      fetchData({ commit }) {
        const data = [1, 2, 3];
        commit('SET_DATA', data);
        console.log('home fetch')
      },
      fetchAboutData({ commit }) {
        const data = [3, 4];
        commit('SET_ABOUT_DATA', data);
        console.log('about fetch')
      }
    },
    modules: {
    }
  });
}
 