"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _api = require("../api");

var _default = {
  namespaced: true,
  //开启命名空间
  state: {
    shops: [],
    //商家数组
    recommendations: [] //推荐列表

  },
  mutations: {
    //接收食品分类信息
    RECEIVE_FOODTYPES: function RECEIVE_FOODTYPES(state, _ref) {
      var foodTypes = _ref.foodTypes;
      state.foodTypes = foodTypes;
    },
    //接收商家信息
    RECEIVE_SHOPS: function RECEIVE_SHOPS(state, _ref2) {
      var shops = _ref2.shops;
      state.shops = shops;
    },
    // 接收推荐信息
    RECEIVE_RECOMMENDATIONS: function RECEIVE_RECOMMENDATIONS(state, _ref3) {
      var recommendations = _ref3.recommendations;
      state.recommendations = recommendations;
    }
  },
  actions: {
    //异步获取商家信息
    getShops: function getShops(context) {
      var result, shops;
      return regeneratorRuntime.async(function getShops$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap((0, _api.reqShops)());

            case 2:
              result = _context.sent;

              //根据结果提交mutation
              if (result.code === 200) {
                shops = result.data.stall;
                context.commit('RECEIVE_SHOPS', {
                  shops: shops
                });
              }

            case 4:
            case "end":
              return _context.stop();
          }
        }
      });
    },
    //异步获取食品分类地址
    getRecommendations: function getRecommendations(context) {
      var result, recommendations;
      return regeneratorRuntime.async(function getRecommendations$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap((0, _api.reqRecommendation)());

            case 2:
              result = _context2.sent;

              //根据结果提交mutation
              if (result.code === 200) {
                recommendations = result.data.stalls;
                context.commit('RECEIVE_RECOMMENDATIONS', {
                  recommendations: recommendations
                });
              }

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      });
    }
  },
  getters: {}
};
exports["default"] = _default;