"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/*
 * 管理整个vue可以访问到的state数据
 */
var _default = {
  longitude: 116.36867,
  // 经度
  latitude: 40.10038,
  // 纬度
  categorys: [],
  // 食品分类列表
  shops: [],
  // 商家店铺列表
  address: {} // 当前所在位置

};
exports["default"] = _default;