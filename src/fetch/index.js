import Vue from 'vue';
import home from "./home.js";
import user from "./user";
import shopCart from "./shopcart";
import order from "./order";
import goods from "./goods";
import orderServer from "./orderServer";

const api = {
  home,
  user,
  shopCart,
  order,
  goods,
  orderServer
}

export default {
  api,
  install(Vue) {
    Vue.prototype.api = api
  }
}
