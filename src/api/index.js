/* 
    包含多个接口请求函数的模块,
    函数返回值：promise对象
*/
import ajax from "./ajax";
//加入代理拦截前缀
const BSAE_URL='/api'

// 获取商铺列表
export const reqShops=()=>ajax(BSAE_URL+'/sms/stallInfolController/getStalls')

// 获取推荐商铺列表
export const reqRecommendation=()=>ajax(BSAE_URL+'/sms/recommendationStallController/getRecommendation')

// 用户名密码登陆
export const reqPwdLogin=({name,pwd})=>ajax(BSAE_URL+'/sms/system/userlogin',{name,pwd},'POST')

// 提交一个Order，生成订单
export const reqOrderCreate=({userId,orderId,orderAmount,orderTime,orderDishs,stallInfo})=>ajax(BSAE_URL+'/sms/orderUserController/createOrder',{userId,orderId,orderAmount,orderTime,orderDishs,stallInfo},'POST')

// 发送支付请求
export const reqPay=({orderId})=>ajax(BSAE_URL+'/sms/orderUserController/pay',{orderId},'POST')

// 获取订单列表
export const reqOrders=({userId})=>ajax(BSAE_URL+'/sms/orderUserController/getOrders',{userId},'POST')

// 按照订单号删除订单
export const reqDeleteOrder=({orderId})=>ajax(BSAE_URL+'/sms/orderUserController/deleteOrder',{orderId},'POST')

// 取消订单请求
export const reqCancelOrder=({orderId})=>ajax(BSAE_URL+'/sms/orderUserController/cancelOrder',{orderId},'POST')

// 发送余额扣款请求
export const reqConsumeAccount=({userId,orderAmount})=>ajax(BSAE_URL+'/sms/orderUserController/consumeAccount',{userId,orderAmount},'POST')

// 余额充值
export const reqRecharge=(rechargeNum,userId)=>ajax(BSAE_URL+'/sms/userInfoController/recharge?rechargeNum='+rechargeNum+'&userId='+userId)

// 发送评价请求
export const reqRate=({dishId,userId,appraisalText,agree,negative,appraisalTime},dishRate,stallRate,resRate,stallId,count)=>ajax(BSAE_URL+'/sms/dishAppraisalController/rate?dishRate='+dishRate+'&stallRate='+stallRate+'&resRate='+resRate+'&stallId='+stallId+'&count='+count,{dishId,userId,appraisalText,agree,negative,appraisalTime},'POST')

// 发送评价请求
export const reqRateByStall=(stallId)=>ajax(BSAE_URL+'/sms/dishAppraisalController/getRateByStall?stallId='+stallId)

