"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vueRouter = _interopRequireDefault(require("vue-router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

//引入跳转的组件
// import MySite from '../pages/MySite/MySite.vue'
// import MyOrder from '../pages/MyOrder/MyOrder.vue'
// import MyProfile from '../pages/MyProfile/MyProfile.vue'
// import MySearch from '../pages/MySearch/MySearch.vue'
// import MyLogin from '../pages/MyLogin/MyLogin.vue'
// import MyShop from '../pages/MyShop/MyShop.vue'
// import MyShopGoods from '../pages/MyShop/MyShopGoods/MyShopGoods.vue'
// import MyShopRating from '../pages/MyShop/MyShopRating/MyShopRating.vue'
// import MyShopInfo from '../pages/MyShop/MyShopInfo/MyShopInfo.vue'
// 路由组件懒加载
var MySite = function MySite() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('../pages/MySite/MySite.vue'));
  });
};

var MyOrder = function MyOrder() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('../pages/MyOrder/MyOrder.vue'));
  });
};

var MyProfile = function MyProfile() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('../pages/MyProfile/MyProfile.vue'));
  });
};

var MySearch = function MySearch() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('../pages/MySearch/MySearch.vue'));
  });
};

var MyLogin = function MyLogin() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('../pages/MyLogin/MyLogin.vue'));
  });
};

var MyShop = function MyShop() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('../pages/MyShop/MyShop.vue'));
  });
};

var MyShopGoods = function MyShopGoods() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('../pages/MyShop/MyShopGoods/MyShopGoods.vue'));
  });
};

var MyShopRating = function MyShopRating() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('../pages/MyShop/MyShopRating/MyShopRating.vue'));
  });
};

var MyShopInfo = function MyShopInfo() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('../pages/MyShop/MyShopInfo/MyShopInfo.vue'));
  });
};

var MyPreOrder = function MyPreOrder() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('../pages/MyShop/MyShopGoods//MyPreOrder/MyPreOrder.vue'));
  });
};

var MyPay = function MyPay() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('../pages/MyShop/MyShopGoods//MyPay/MyPay.vue'));
  });
};

var MyOrderInfo = function MyOrderInfo() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('../pages/MyOrder/MyOrderInfo/MyOrderInfo.vue'));
  });
};

var MyOrderRate = function MyOrderRate() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('../pages/MyOrder/MyOrderRate.vue'));
  });
}; //创建并暴露一个路由器


var _default = new _vueRouter["default"]({
  routes: [{
    name: 'MySite',
    path: '/mysite',
    component: MySite,
    meta: {
      showFooter: true
    }
  }, {
    name: 'MyOrder',
    path: '/myorder',
    component: MyOrder,
    meta: {
      showFooter: true
    }
  }, {
    name: 'MyProfile',
    path: '/myprofile',
    component: MyProfile,
    meta: {
      showFooter: true
    }
  }, {
    name: 'MySearch',
    path: '/mysearch',
    component: MySearch,
    meta: {
      showFooter: true
    }
  }, {
    name: 'MyLogin',
    path: '/mylogin',
    component: MyLogin
  }, {
    name: 'MyShop',
    path: '/myshop',
    component: MyShop,
    children: [{
      name: 'MyShopGoods',
      path: '/myshop/myshopgoods',
      component: MyShopGoods
    }, {
      name: 'MyShopInfo',
      path: '/myshop/myshopinfo',
      component: MyShopInfo
    }, {
      name: 'MyShopRating',
      path: '/myshop/myshoprating',
      component: MyShopRating
    }, {
      path: '/',
      redirect: '/myshop/myshopgoods'
    }]
  }, {
    name: 'MyPreOrder',
    path: '/mypreorder',
    component: MyPreOrder
  }, {
    name: 'MyPay',
    path: '/mypay',
    component: MyPay
  }, {
    name: 'MyOrderInfo',
    path: '/myorderinfo',
    component: MyOrderInfo
  }, {
    name: 'MyOrderRate',
    path: '/myorderrate',
    component: MyOrderRate
  }, // 加一个默认显示
  {
    path: '/',
    redirect: '/mysite'
  }]
});

exports["default"] = _default;