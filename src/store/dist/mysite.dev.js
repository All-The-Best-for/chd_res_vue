"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _api = require("../api");

// import axios from 'axios'
var _default = {
  namespaced: true,
  //开启命名空间
  state: {
    latitued: 40.10038,
    //纬度
    longitude: 116.36867,
    //经度
    address: {},
    //地址信息对象
    foodTypes: [],
    //食品分类数组
    shops: [] //商家数组

  },
  mutations: {
    //接收地址信息
    RECEIVE_ADDRESS: function RECEIVE_ADDRESS(state, _ref) {
      var address = _ref.address;
      state.address = address;
    },
    //接收食品分类信息
    RECEIVE_FOODTYPES: function RECEIVE_FOODTYPES(state, _ref2) {
      var foodTypes = _ref2.foodTypes;
      state.foodTypes = foodTypes;
    },
    //接收商家信息
    RECEIVE_SHOPS: function RECEIVE_SHOPS(state, _ref3) {
      var shops = _ref3.shops;
      state.shops = shops;
    }
  },
  actions: {
    //异步获取地址
    getAddress: function getAddress(context) {
      //发送异步axjos请求
      console.log('getAddress执行了');
      var geohash = context.state.latitued + context.state.longitude;
      var result = (0, _api.reqAddress)(geohash); //根据结果提交mutation

      if (result.code === 0) {
        var address = result.data;
        context.commit('RECEIVE_ADDRESS', {
          address: address
        });
      }
    },
    //异步获取食品分类地址
    getFoodTypes: function getFoodTypes(context) {
      //发送异步axjos请求
      var result = (0, _api.reqFoodTypes)(); //根据结果提交mutation

      if (result.code === 0) {
        var footTypes = result.data;
        context.commit('RECEIVE_FOODTYPES', {
          footTypes: footTypes
        });
      }
    },
    //异步获取商家信息
    getShops: function getShops(context) {
      //发送异步axjos请求
      var _context$state = context.state,
          longitude = _context$state.longitude,
          latitued = _context$state.latitued;
      var result = (0, _api.reqShops)(longitude, latitued); //根据结果提交mutation

      if (result.code === 0) {
        var shops = result.data;
        context.commit('RECEIVE_SHOPS', {
          shops: shops
        });
      }
    }
  },
  getters: {}
};
exports["default"] = _default;