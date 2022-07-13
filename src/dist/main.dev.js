"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _App = _interopRequireDefault(require("./App.vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _index = _interopRequireDefault(require("./router/index"));

var _index2 = _interopRequireDefault(require("./store/index"));

var _mintUi = require("mint-ui");

require("mint-ui/lib/style.css");

var _elementUi = _interopRequireDefault(require("element-ui"));

require("element-ui/lib/theme-chalk/index.css");

var _zhCN = _interopRequireDefault(require("element-ui/lib/locale/lang/zh-CN"));

var _vueLazyload = _interopRequireDefault(require("vue-lazyload"));

var _loading = _interopRequireDefault(require("./common/imgs/loading.gif"));

var _global = _interopRequireDefault(require("./common/global/global"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//引入router插件，支持SAP单页面应用
//引入路由配置文件
//引入store
// 引入MintUI中的Button组件
// 引入element-ui
// lang i18n
_vue["default"].use(_elementUi["default"], {
  locale: _zhCN["default"]
}); // 引入图片懒加载lazyload


_vue["default"].prototype.GLOBALVAR = _global["default"];
_vue["default"].config.productionTip = false;

_vue["default"].use(_vueRouter["default"]); // 解决报错


var originalPush = _vueRouter["default"].prototype.push;
var originalReplace = _vueRouter["default"].prototype.replace; // push

_vueRouter["default"].prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location)["catch"](function (err) {
    return err;
  });
}; // replace


_vueRouter["default"].prototype.replace = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject);
  return originalReplace.call(this, location)["catch"](function (err) {
    return err;
  });
}; // 注册全局组件标签<mt-button>


_vue["default"].component(_mintUi.Button.name, _mintUi.Button); // 使用lazyload图片懒加载


_vue["default"].use(_vueLazyload["default"], {
  //内部自定义一个指令lazy
  loading: _loading["default"]
});

new _vue["default"]({
  render: function render(h) {
    return h(_App["default"]);
  },
  //传入vuex所需的store
  store: _index2["default"],
  // 安装全局总线
  beforeCreate: function beforeCreate() {
    _vue["default"].prototype.$bus = this;
  },
  // 配置router
  router: _index["default"]
}).$mount('#app');