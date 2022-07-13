"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reqRateByStall = exports.reqRate = exports.reqRecharge = exports.reqConsumeAccount = exports.reqCancelOrder = exports.reqDeleteOrder = exports.reqOrders = exports.reqPay = exports.reqOrderCreate = exports.reqPwdLogin = exports.reqRecommendation = exports.reqShops = void 0;

var _ajax = _interopRequireDefault(require("./ajax"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* 
    包含多个接口请求函数的模块,
    函数返回值：promise对象
*/
//加入代理拦截前缀
var BSAE_URL = '/api'; // 获取商铺列表

var reqShops = function reqShops() {
  return (0, _ajax["default"])(BSAE_URL + '/sms/stallInfolController/getStalls');
}; // 获取推荐商铺列表


exports.reqShops = reqShops;

var reqRecommendation = function reqRecommendation() {
  return (0, _ajax["default"])(BSAE_URL + '/sms/recommendationStallController/getRecommendation');
}; // 用户名密码登陆


exports.reqRecommendation = reqRecommendation;

var reqPwdLogin = function reqPwdLogin(_ref) {
  var name = _ref.name,
      pwd = _ref.pwd;
  return (0, _ajax["default"])(BSAE_URL + '/sms/system/userlogin', {
    name: name,
    pwd: pwd
  }, 'POST');
}; // 提交一个Order，生成订单


exports.reqPwdLogin = reqPwdLogin;

var reqOrderCreate = function reqOrderCreate(_ref2) {
  var userId = _ref2.userId,
      orderId = _ref2.orderId,
      orderAmount = _ref2.orderAmount,
      orderTime = _ref2.orderTime,
      orderDishs = _ref2.orderDishs,
      stallInfo = _ref2.stallInfo;
  return (0, _ajax["default"])(BSAE_URL + '/sms/orderUserController/createOrder', {
    userId: userId,
    orderId: orderId,
    orderAmount: orderAmount,
    orderTime: orderTime,
    orderDishs: orderDishs,
    stallInfo: stallInfo
  }, 'POST');
}; // 发送支付请求


exports.reqOrderCreate = reqOrderCreate;

var reqPay = function reqPay(_ref3) {
  var orderId = _ref3.orderId;
  return (0, _ajax["default"])(BSAE_URL + '/sms/orderUserController/pay', {
    orderId: orderId
  }, 'POST');
}; // 获取订单列表


exports.reqPay = reqPay;

var reqOrders = function reqOrders(_ref4) {
  var userId = _ref4.userId;
  return (0, _ajax["default"])(BSAE_URL + '/sms/orderUserController/getOrders', {
    userId: userId
  }, 'POST');
}; // 按照订单号删除订单


exports.reqOrders = reqOrders;

var reqDeleteOrder = function reqDeleteOrder(_ref5) {
  var orderId = _ref5.orderId;
  return (0, _ajax["default"])(BSAE_URL + '/sms/orderUserController/deleteOrder', {
    orderId: orderId
  }, 'POST');
}; // 取消订单请求


exports.reqDeleteOrder = reqDeleteOrder;

var reqCancelOrder = function reqCancelOrder(_ref6) {
  var orderId = _ref6.orderId;
  return (0, _ajax["default"])(BSAE_URL + '/sms/orderUserController/cancelOrder', {
    orderId: orderId
  }, 'POST');
}; // 发送余额扣款请求


exports.reqCancelOrder = reqCancelOrder;

var reqConsumeAccount = function reqConsumeAccount(_ref7) {
  var userId = _ref7.userId,
      orderAmount = _ref7.orderAmount;
  return (0, _ajax["default"])(BSAE_URL + '/sms/orderUserController/consumeAccount', {
    userId: userId,
    orderAmount: orderAmount
  }, 'POST');
}; // 余额充值


exports.reqConsumeAccount = reqConsumeAccount;

var reqRecharge = function reqRecharge(rechargeNum, userId) {
  return (0, _ajax["default"])(BSAE_URL + '/sms/userInfoController/recharge?rechargeNum=' + rechargeNum + '&userId=' + userId);
}; // 发送评价请求


exports.reqRecharge = reqRecharge;

var reqRate = function reqRate(_ref8, dishRate, stallRate, resRate, stallId, count) {
  var dishId = _ref8.dishId,
      userId = _ref8.userId,
      appraisalText = _ref8.appraisalText,
      agree = _ref8.agree,
      negative = _ref8.negative,
      appraisalTime = _ref8.appraisalTime;
  return (0, _ajax["default"])(BSAE_URL + '/sms/dishAppraisalController/rate?dishRate=' + dishRate + '&stallRate=' + stallRate + '&resRate=' + resRate + '&stallId=' + stallId + '&count=' + count, {
    dishId: dishId,
    userId: userId,
    appraisalText: appraisalText,
    agree: agree,
    negative: negative,
    appraisalTime: appraisalTime
  }, 'POST');
}; // 发送评价请求


exports.reqRate = reqRate;

var reqRateByStall = function reqRateByStall(stallId) {
  return (0, _ajax["default"])(BSAE_URL + '/sms/dishAppraisalController/getRateByStall?stallId=' + stallId);
};

exports.reqRateByStall = reqRateByStall;