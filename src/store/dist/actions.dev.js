"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _api = require("../api");

var _mutationTypes = require("./mutation-types");

/*
 * 包含多个通过发送mutation间接更新state的方法的对象
 */
var _default = {
  // 获取当前所在位置
  getAddress: function getAddress(_ref) {
    var commit, state, geohash, result;
    return regeneratorRuntime.async(function getAddress$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            commit = _ref.commit, state = _ref.state;
            geohash = state.latitude + ',' + state.longitude;
            console.log(geohash);
            _context.next = 5;
            return regeneratorRuntime.awrap((0, _api.reqAddress)(geohash));

          case 5:
            result = _context.sent;

            if (result.code === 0) {
              commit(_mutationTypes.RECEIVE_ADDRESS, result.data);
            }

          case 7:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  // 获取食品分类列表
  getTypes: function getTypes(_ref2) {
    var commit, result;
    return regeneratorRuntime.async(function getTypes$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            commit = _ref2.commit;
            _context2.next = 3;
            return regeneratorRuntime.awrap((0, _api.reqFoodTypes)());

          case 3:
            result = _context2.sent;

            if (result.code === 0) {
              commit(_mutationTypes.RECEIVE_CATEGORYS, result.data);
            }

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    });
  },
  // 获取商品列表
  getShops: function getShops(_ref3) {
    var commit, state, longitude, latitude, result;
    return regeneratorRuntime.async(function getShops$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            commit = _ref3.commit, state = _ref3.state;
            longitude = state.longitude, latitude = state.latitude;
            _context3.next = 4;
            return regeneratorRuntime.awrap((0, _api.reqShops)(longitude, latitude));

          case 4:
            result = _context3.sent;

            if (result.code === 0) {
              commit(_mutationTypes.RECEIVE_SHOPS, result.data);
            }

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    });
  }
};
exports["default"] = _default;