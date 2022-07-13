"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  namespaced: true,
  //开启命名空间
  state: {
    userInfo: {}
  },
  mutations: {
    //修改用户信息
    RECEIVE_USER_INFO: function RECEIVE_USER_INFO(state, _ref) {
      var userInfo = _ref.userInfo;
      state.userInfo = userInfo;
    },
    //重置用户信息
    RESET_USER_INFO: function RESET_USER_INFO(state) {
      state.userInfo = {};
    },
    // 修改用户余额信息
    CHANGE_USER_ACCOUNT: function CHANGE_USER_ACCOUNT(state, _ref2) {
      var account = _ref2.account;
      state.userInfo.userAccount = account;
      window.sessionStorage.setItem("userInfo", JSON.stringify(state.userInfo));
    }
  },
  actions: {
    //同步记录用户信息，因为这个信息是本程序自有的，所以同步记录。而之前的异步获取都是从服务器上请求得来的，需要异步
    recordUser: function recordUser(context, userInfo) {
      context.commit('RECEIVE_USER_INFO', {
        userInfo: userInfo
      });
    },
    // 获取用户信息，用于自动登录(session)
    getUserInfo: function getUserInfo(context) {
      var userInfo = JSON.parse(window.sessionStorage.getItem("userInfo"));

      if (userInfo) {
        context.commit('RECEIVE_USER_INFO', {
          userInfo: userInfo
        });
      }
    },
    //请求退出
    logout: function logout(context) {
      window.sessionStorage.removeItem("userInfo");
      context.commit('RESET_USER_INFO');
    },
    // 修改用户余额信息
    consumeAccount: function consumeAccount(context, amount) {
      var account = context.state.userInfo.userAccount - amount;
      context.commit('CHANGE_USER_ACCOUNT', {
        account: account
      });
    }
  }
};
exports["default"] = _default;