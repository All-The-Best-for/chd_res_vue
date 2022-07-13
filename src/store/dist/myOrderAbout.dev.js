"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _index = require("../api/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  namespaced: true,
  //开启命名空间
  state: {
    orders: [],
    //当前用户的订单列表
    nowOrderId: 0,
    //当前选中的订单id
    nowOrder: null,
    //当前选中的order
    updateX: 1 //组件更新标志

  },
  mutations: {
    RECEIVE_INFO: function RECEIVE_INFO(state, _ref) {
      var orders = _ref.orders;
      state.orders = orders;
    },
    SET_NOW_ORDER_ID: function SET_NOW_ORDER_ID(state, _ref2) {
      var nowOrderId = _ref2.nowOrderId;
      state.nowOrderId = nowOrderId;
    },
    SET_NOW_ORDER: function SET_NOW_ORDER(state, _ref3) {
      var nowOrder = _ref3.nowOrder;
      state.nowOrder = nowOrder;
    },
    SET_X: function SET_X(state, _ref4) {
      var x = _ref4.x;
      state.updateX = x;
    }
  },
  actions: {
    // 获取订单信息列表
    getOrders: function getOrders(_ref5, _ref6) {
      var commit, userId, result, orders;
      return regeneratorRuntime.async(function getOrders$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              commit = _ref5.commit;
              userId = _ref6.userId;
              console.log('请求orders', userId);
              _context.next = 5;
              return regeneratorRuntime.awrap((0, _index.reqOrders)({
                userId: userId
              }));

            case 5:
              result = _context.sent;

              if (result.code === 200) {
                console.log('请求成功了', result.data.orders);
                orders = result.data.orders;
                orders.reverse();
                commit('RECEIVE_INFO', {
                  orders: orders
                });
              } else {
                console.log('请求订单信息失败了');
              }

            case 7:
            case "end":
              return _context.stop();
          }
        }
      });
    },
    // 修改当前订单id
    setNowOrderId: function setNowOrderId(_ref7, _ref8) {
      var commit = _ref7.commit;
      var nowOrderId = _ref8.nowOrderId;
      commit('SET_NOW_ORDER_ID', {
        nowOrderId: nowOrderId
      });
    },
    // 设置当前选中的order
    setNowOrder: function setNowOrder(_ref9) {
      var commit = _ref9.commit,
          state = _ref9.state;
      state.orders.forEach(function (order) {
        if (order.orderId === state.nowOrderId) {
          commit('SET_NOW_ORDER', {
            nowOrder: order
          });
        }
      });
    },
    // 更新标志X
    setX: function setX(_ref10) {
      var commit = _ref10.commit,
          state = _ref10.state;
      var x = state.updateX;
      x++;
      commit('SET_X', {
        x: x
      });
    }
  },
  getters: {
    nowOrder_fuben: function nowOrder_fuben(state) {
      return state.nowOrder;
    }
  }
};
exports["default"] = _default;