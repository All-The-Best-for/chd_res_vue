"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vuex = _interopRequireDefault(require("vuex"));

var _mySiteAbout = _interopRequireDefault(require("./mySiteAbout"));

var _myUserAbout = _interopRequireDefault(require("./myUserAbout"));

var _myShopAbout = _interopRequireDefault(require("./myShopAbout"));

var _mySearchAbout = _interopRequireDefault(require("./mySearchAbout"));

var _myOrderAbout = _interopRequireDefault(require("./myOrderAbout"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//该文件用于创建vuex中最为核心的store
//引入Vue和Vuex
//引入关于mysite的vuex配置
//使用vuex插件
_vue["default"].use(_vuex["default"]); //创建并暴露store


var _default = new _vuex["default"].Store({
  //引入一个mysite有关的配置，可以引入多个不同的配置
  modules: {
    mySiteAbout: _mySiteAbout["default"],
    myUserAbout: _myUserAbout["default"],
    myShopAbout: _myShopAbout["default"],
    mySearchAbout: _mySearchAbout["default"],
    myOrderAbout: _myOrderAbout["default"]
  }
});

exports["default"] = _default;