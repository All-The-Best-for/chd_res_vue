import {reqShops,
        reqRecommendation,
    } from '../api'

export default{
    namespaced:true,//开启命名空间
    state:{
        shops:[],  //商家数组
        recommendations:[], //推荐列表
    },
    mutations: { 
        //接收食品分类信息
        RECEIVE_FOODTYPES(state,{foodTypes}){
            state.foodTypes=foodTypes
        },
        //接收商家信息
        RECEIVE_SHOPS(state,{shops}){
            state.shops=shops
        },
        // 接收推荐信息
        RECEIVE_RECOMMENDATIONS(state,{recommendations}){
            state.recommendations=recommendations
        },
    },
    actions: { 
        //异步获取商家信息
        async getShops(context){
            //发送异步axjos请求
            const result = await reqShops()
            //根据结果提交mutation
            if(result.code===200){
                const shops=result.data.stall
                context.commit('RECEIVE_SHOPS',{shops})
            }
        },

        //异步获取食品分类地址
        async getRecommendations(context){
            //发送异步axjos请求
            const result = await reqRecommendation()
            //根据结果提交mutation
            if(result.code===200){
                const recommendations=result.data.stalls
                context.commit('RECEIVE_RECOMMENDATIONS',{recommendations})
            }
        },
    },
    getters: {

    }
  }