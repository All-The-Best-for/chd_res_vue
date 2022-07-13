"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ajax;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* ajax请求函数模块，
返回值：prosmise对象（异步返回的数据是response.data）
 */
function ajax(url) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'GET';
  return new Promise(function (resovle, reject) {
    //执行异步ajax请求
    var promise;

    if (type === 'GET') {
      //准备url query参数
      var dataStr = ''; //数据拼接字符串

      Object.keys(data).forEach(function (key) {
        dataStr += key + '=' + data[key] + '&';
      });

      if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'));
        url += '?' + dataStr;
      } //发送get请求


      promise = _axios["default"].get(url);
    } else {
      //发送post请求
      promise = _axios["default"].post(url, data);
    }

    promise.then(function (response) {
      //成功则调用resolve()
      resovle(response.data);
    })["catch"](function (error) {
      //失败则调用reject()
      reject(error);
    });
  });
}