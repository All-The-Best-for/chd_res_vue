import Vue from 'vue'
import {reqOrders} from '../api/index'

export default{
    namespaced:true,//开启命名空间
    state:{
        orders:[], //当前用户的订单列表
        nowOrderId:0,//当前选中的订单id
        nowOrder:null,//当前选中的order
        updateX:1,//组件更新标志
    },
    mutations: { 
        RECEIVE_INFO(state, {orders}) {
            state.orders = orders
        },
        SET_NOW_ORDER_ID(state,{nowOrderId}){
            state.nowOrderId=nowOrderId
        },
        SET_NOW_ORDER(state,{nowOrder}){
            state.nowOrder=nowOrder
        },
        SET_X(state,{x}){
            state.updateX=x
        }
    },
    actions: { 
        // 获取订单信息列表
        async getOrders({commit},{userId}) {
            console.log('请求orders',userId)
            const result=await reqOrders({userId:userId})
            if(result.code===200){
                console.log('请求成功了',result.data.orders)
                let orders=result.data.orders
                orders.reverse()
                commit('RECEIVE_INFO', {orders})
              }else{
                  console.log('请求订单信息失败了')
              }
        },
        // 修改当前订单id
        setNowOrderId({commit},{nowOrderId}){
            commit('SET_NOW_ORDER_ID', {nowOrderId})
        },
        // 设置当前选中的order
        setNowOrder({commit,state}){
            state.orders.forEach(order => {
                if(order.orderId===state.nowOrderId){
                    commit('SET_NOW_ORDER',{nowOrder:order})
                }
            });
        },
        // 更新标志X
        setX({commit,state}){
            let x=state.updateX
            x++
            commit('SET_X', {x})
        },
    },
    getters: {
        nowOrder_fuben(state){
            return state.nowOrder
        }
    }
}