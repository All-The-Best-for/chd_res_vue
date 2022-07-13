"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  namespaced: true,
  //开启命名空间
  state: {
    searchShops: [],
    //搜索得到的商家信息
    info: [] //所有商家信息

  },
  mutations: {
    //接收搜索的商家信息
    RECEIVE_SEARCH_SHOPS: function RECEIVE_SEARCH_SHOPS(state, _ref) {
      var searchShops = _ref.searchShops;
      state.searchShops = searchShops;
    },
    // 接收所有商家信息
    RECEIVE_INFO: function RECEIVE_INFO(state, _ref2) {
      var info = _ref2.info;
      state.info = info;
    }
  },
  actions: {
    //获取搜索的商家信息
    getSearchShops: function getSearchShops(context, keyword) {
      // 从shops中查找信息，然后返回searchShops
      var arr = context.state.shops;
      var brr = arr.filter(function (shop) {
        return shop.stallInfo.stallName.includes(keyword) == 1; //遍历数组，返回值为true保留并复制到新数组，false则过滤掉
      });
      var searchShops = brr;
      console.log(searchShops);
      context.commit('RECEIVE_SEARCH_SHOPS', {
        searchShops: searchShops
      });
    },
    // 获取商家信息
    getShops: function getShops(_ref3, _ref4) {
      var commit = _ref3.commit;
      var shops = _ref4.shops;
      // 不需要发送请求了，直接从mySiteAbout中获取
      var stallInfo = shops;
      commit('RECEIVE_INFO', {
        info: stallInfo
      });
    }
  },
  getters: {}
};
exports["default"] = _default;