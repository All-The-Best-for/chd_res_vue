import Vue from 'vue'
import dayjs from "dayjs"

export default{
    namespaced:true,//开启命名空间
    state:{
        goods: [], // 商品列表
        ratings: [], // 商家评价列表
        info: {}, // 商家信息
        stallId:0, //点击请求的档口id
        carts:[],//购物车数组，数组中存放stallId和cartFoods组成的对象
        newOrder:{}, //本次登录最近一次下订单的订单信息，
        nowOrderId:0,//当前选中的订单的Id，用于从订单列表中查找出要处理的订单
        userOrders:[],// 从后端返回的本用户的订单信息数组，
    },
    mutations: { 
        RECEIVE_INFO(state, {info}) {
            state.info = info
        },
        RECEIVE_RATINGS(state, {ratings}) {
            state.ratings = ratings
        },
        RECEIVE_GOODS(state, {goods}) {
            state.goods = goods
        },
        // 对组件中的餐品选中数量进行加减，这个数据不需要持久化记录，也不需要区分用户，不同于购物车中的数据
        ADD_FOOD_COUNT(state,{food}){
            let a=0
            state.carts.forEach(cart => {
                // 如果购物车列表中已经有了这个店铺的购物车
                if(cart.stallId===state.stallId){
                    a=1
                    let b=0
                    cart.cartFoods.forEach(aFood => {
                        if(aFood.dishId===food.dishId){
                            b=1
                            aFood.count++
                        }
                    });
                    if(b===0){
                        Vue.set(food,'count',1)
                        cart.cartFoods.push(food)
                    }
                }
            });
            if(a===0){
                // 先将要装入cartFoods的对象构造出来
                let newCart={}
                let cartFoods=[]
                Vue.set(newCart,'stallId',state.stallId)
                Vue.set(food,'count',1)
                cartFoods.push(food)
                Vue.set(newCart,'cartFoods',cartFoods)
                state.carts.push(newCart)
            }
        },
        DECREMENT_FOOD_COUNT(state,{food}){

            state.carts.forEach(cart => {
                // 如果购物车列表中已经有了这个店铺的购物车
                if(cart.stallId===state.stallId){
                    if(food.count>0){
                        food.count--
                        if(food.count===0){
                            // 用下标将food从cartFoods中移除
                            cart.cartFoods.splice(cart.cartFoods.indexOf(food),1)
                        }
                    }
                }
            });
        },
        CLEAR_SHOP_CART(state){
            state.carts.forEach(cart => {
                // 如果购物车列表中已经有了这个店铺的购物车
                if(cart.stallId===state.stallId){
                    cart.cartFoods=[]
                }
            });
        },
        // 变更点击的stallId
        CHANGE_STALL_ID(state,{stallId}){
            state.stallId=stallId;
        },
        // 变更选中的订单Id
        SET_NOW_ORDER_ID(state,{nowOrderId}){
            state.nowOrderId=nowOrderId
        }
    },
    actions: { 
        // 获取商家信息
        getShopInfo({commit,state},{shops}) {
            // 不需要发送请求了，直接从mySiteAbout中获取
            shops.forEach(shop => {
                if(shop.stallInfo.stallInfo.stallId===state.stallId){
                    const stallInfo=shop.stallInfo.stallInfo
                    commit('RECEIVE_INFO', {info:stallInfo})
                }
            });
        },
        // 获取商家评价列表
        getShopRatings({commit}) {
            // const result = await reqShopRatings()
            // if(result.code===0) {
            //     const ratings = result.data
            //     commit('RECEIVE_RATINGS', {ratings})
            // }
        },
        // 获取商家商品列表
        getShopGoods({commit,state},{shops}) {
            shops.forEach(shop => {
                if(shop.stallInfo.stallInfo.stallId===state.stallId){
                    const info=shop.dishInfo.dishInfo
                    commit('RECEIVE_GOODS', {goods:info})
                }
            });
        },
        // 同步更新food中的count值
        updateFoodCount({commit},{isAdd,food}){
            if(isAdd){
                commit('ADD_FOOD_COUNT',{food})
            }else{
                commit('DECREMENT_FOOD_COUNT',{food})
            }
        },
        // 清空购物车
        clearCart({commit}){
            commit('CLEAR_SHOP_CART')
        },
        // 修改stallId
        changeId({commit},{stallId}){
            commit('CHANGE_STALL_ID',{stallId})
        },
        changeNowOrderId({commit},{nowOrderId}){
            commit('SET_NOW_ORDER_ID',{nowOrderId})
        },
        // 购物车中的总件数
        totalCount({state},{stallId}){
            state.carts.forEach(cart => {
                if(cart.stallId===stallId){
                    return cart.cartFoods.reduce((preTotal,food)=>{
                            return preTotal+food.count
                        },0)
                }
            });
        },
        // 购物车中的总价格
        totalPrice({state},{stallId}){
            state.carts.forEach(cart => {
                if(cart.stallId===stallId){
                    return cart.cartFoods.reduce((preTotal,food)=>{
                        return preTotal+food.dishPrice*food.count
                    },0)
                }
            });
        },
        // 返回当前店铺购物车
        nowCart({state}){
            state.carts.forEach(cart => {
                if(cart.stallId===state.stallId){
                    return cart.cartFoods
                }
            });
        },
        // 先生成一个vuex存储的订单信息，再异步提交订单信息
        createOrder({state},{totalPrice,userId}){
            // 生成一个请求参数对象
            let newOrder={}
            state.carts.forEach(cart => {
                // 找到这个店铺的购物车
                if(cart.stallId===state.stallId){
                    // 生成一个orderId,以当前时间和用户id生成orderId
                    var date = Date.parse(new Date());
                    let orderId=Number(date/1000)+userId
                    let orderTime= dayjs(date).format('YYYY-MM-DD HH:mm:ss')

                    Vue.set(newOrder,'userId',userId)
                    Vue.set(newOrder,'orderId',orderId)
                    Vue.set(newOrder,'orderAmount',totalPrice)
                    Vue.set(newOrder,'orderTime',orderTime)
                    Vue.set(newOrder,'orderDishs',cart.cartFoods)
                    Vue.set(newOrder,'stallInfo',state.info)
                }
            });
            state.newOrder=newOrder
        },

    },
    getters: {
        // 满意评论的数量
        positiveSize(state){
            return state.ratings.reduce((preTotal,rating)=>preTotal+(rating.rateType===0?1:0),0)
        },

    }
}