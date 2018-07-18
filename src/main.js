import Vue from 'vue';
import App from './App';
import router from './router';
import MintUI from 'mint-ui';
import {
  sync
} from 'vuex-router-sync';
import Fastclick from 'fastclick';
import store from "./store";
import api from "@/fetch/index";
import './sass/common.scss';
import 'mint-ui/lib/style.css';
import "babel-polyfill";
require('./sass/swiper-4.1.0.min.css');

// var fundebug = require("fundebug-javascript");
// fundebug.apikey = "c1fcf6048e66b37597f3d57e444b13933edc4ea64a19fa620e0aca1f6ffcfc8f";

Vue.config.productionTip = false;
Vue.use(MintUI);
Vue.use(api);

// 加载第三方【快速点击】插件
Fastclick.attach(document.body)
// 融合 router 和 vuex，这样在 vuex的 state 中就可以获取 route 并且动态改变路由
sync(store, router)

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  store,
  components: {
    App
  }
})

function formatComponentName(vm) {
  if (vm.$root === vm) return 'root';

  var name = vm._isVue ? (vm.$options && vm.$options.name) || (vm.$options && vm.$options._componentTag) : vm.name;
  return (name ? 'component <' + name + '>' : 'anonymous component') + (vm._isVue && vm.$options && vm.$options.__file ? ' at ' + (vm.$options && vm.$options.__file) : '');

}

// Vue.config.errorHandler = function (err, vm, info) {
//   var componentName = formatComponentName(vm);
//   var propsData = vm.$options && vm.$options.propsData;

//   fundebug.notifyError(err, {
//     metaData: {
//       componentName: componentName,
//       propsData: propsData,
//       info: info
//     }
//   });
// };
