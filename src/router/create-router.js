import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './index';

Vue.use(VueRouter);

export function createRouter() {
  const router = new VueRouter({
    mode: "history",
    base: "/",
    routes
  });

  return router
}