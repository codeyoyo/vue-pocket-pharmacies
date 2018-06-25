import Vue from 'vue';
import Router from 'vue-router';
import store from '../store/index.js';
Vue.use(Router);

// 首页
const home = r => require.ensure([], () => r(require('../views/home.vue')), 'Home');
const search = r => require.ensure([], () => r(require('../views/product/search.vue')), 'search');
const login = r => require.ensure([], () => r(require('../views/user/login.vue')), 'login');
const register = r => require.ensure([], () => r(require('../views/user/register.vue')), 'register');
const searchResult = r => require.ensure([], () => r(require('../views/product/searchResult.vue')), 'searchResult');
const productDetil = r => require.ensure([], () => r(require('../views/product/productDetil.vue')), 'productDetil');
const shopingCart = r => require.ensure([], () => r(require('../views/shop/shopingCart.vue')), 'shopingCart');
const order = r => require.ensure([], () => r(require('../views/order/order.vue')), 'order');
const addressManage = r => require.ensure([], () => r(require('../views/shop/addressManage.vue')), 'addressManage');
const setaddress = r => require.ensure([], () => r(require('../views/shop/setaddress.vue')), 'setaddress');
const classify = r => require.ensure([], () => r(require('../views/product/classify.vue')), 'classify');
const user = r => require.ensure([], () => r(require('../views/user/user.vue')), 'user');
const userOrder = r => require.ensure([], () => r(require('../views/user/userOrder.vue')), 'userOrder');
const orderPay = r => require.ensure([], () => r(require('../views/order/orderPay.vue')), 'orderPay.vue');
const clause = r => require.ensure([], () => r(require('../views/user/clause.vue')), 'clause');
const account = r => require.ensure([], () => r(require('../views/user/account.vue')), 'account');
const invoice = r => require.ensure([], () => r(require('../views/order/invoice.vue')), 'invoice');
const setpwd = r => require.ensure([], () => r(require('../views/user/setpwd.vue')), 'setpwd');
const userOrderItem = r => require.ensure([], () => r(require('../views/user/userOrderItem.vue')), 'userOrderItem');
const tracking = r => require.ensure([], () => r(require('../views/order/tracking.vue')), 'tracking');
const drawback = r => require.ensure([], () => r(require('../views/order/drawback.vue')), 'drawback');
const checkRefund = r => require.ensure([], () => r(require('../views/order/checkRefund.vue')), 'checkRefund');
const evaluate = r => require.ensure([], () => r(require('../views/order/evaluate.vue')), 'evaluate');
const orderEnd = r => require.ensure([], () => r(require('../views/order/orderEnd.vue')), 'orderEnd');

const router = new Router({
  mode: 'hash',
  routes: [{
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/clause',
      name: 'clause',
      component: clause
    },
    {
      path: '/searchResult/:keyword',
      name: 'searchResult',
      component: searchResult
    },
    {
      path: '/productDetil/:productId/:merchantId?',
      name: 'productDetil',
      component: productDetil
    }, {
      path: '/shopingCart',
      name: 'shopingCart',
      component: shopingCart
    }, {
      path: '/order',
      name: 'order',
      component: order
    }, {
      path: '/addressManage',
      name: 'addressManage',
      component: addressManage
    }, {
      path: '/setaddress/:addressId?',
      name: 'setaddress',
      component: setaddress
    }, {
      path: '/classify',
      name: 'classify',
      component: classify
    }, {
      path: '/user',
      name: 'user',
      component: user
    },
    {
      path: '/userOrder/:type?',
      name: 'userOrder',
      component: userOrder
    },
    {
      path: '/orderPay',
      name: 'orderPay',
      component: orderPay
    },
    {
      path: '/account',
      name: 'account',
      component: account
    },
    {
      path: '/invoice',
      name: 'invoice',
      component: invoice
    },
    {
      path: '/setpwd/:type',
      name: 'setpwd',
      component: setpwd
    }, {
      path: '/userOrderItem/:ordersCode',
      name: 'userOrderItem',
      component: userOrderItem
    }, {
      path: "/tracking/:ordersCode",
      name: "tracking",
      component: tracking
    }, {
      path: "/drawback",
      name: 'drawback',
      component: drawback
    }, {
      path: "/checkRefund",
      name: 'checkRefund',
      component: checkRefund
    },
    {
      path: "/evaluate",
      name: 'evaluate',
      component: evaluate
    }, {
      path: '/orderEnd',
      name: 'orderEnd',
      component: orderEnd
    }
  ]
})

router.beforeEach((to, from, next) => {
  // 重置fetchCount.这样其他页面的请求不会被本页面的请求所影响而导致数据已经加载完成，但还在Loading
  store.dispatch('set_fetch_zero');

  // 允许通过
  next();
});

export default router
