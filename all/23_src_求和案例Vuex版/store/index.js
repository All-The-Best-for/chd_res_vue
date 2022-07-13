//该文件用于创建vuex中最为核心的store

//引入Vue和Vuex
import Vue from 'vue'
import Vuex from 'vuex'

//准备actions--用于响应组件中的动作,对行为可以进行限制
const actions={
    //两个参数，第一个时context上下文，第二个是传入的值。  上下文中包含commit和state以及dispatch
    // 当某些业务逻辑不需要actions限制时，可以令组件直接commit
/*     increment:function (context,value) {
        context.commit('INCREMENT',value)
    },
    decrement(context,value){
        context.commit('DECREMENT',value)
    }, */

    incrementWhenOdd(context,value) {
        if(context.state.sum%2){
            context.commit('INCREMENT',value)
          }
    },
    incrementWait(context,value) {
        setTimeout(() => {
            context.commit('INCREMENT',value)
          }, 500);
    },
}
//准备mutations--用于操作state中的数据，真正的业务逻辑
const mutations={
    // Key值常为大写，两个参数，第一个是state，第二个是传入的值
    m:function(state,value) {
        state.sum+=value
    },
    DECREMENT(state,value){
        state.sum-=value
    }
}
//准备state--用于存储数据
const state={
    sum:0,//当前和
}

//使用vuex插件
Vue.use(Vuex)

//创建并暴露store
export default new Vuex.Store({
    actions:actions,
    mutations:mutations,
    state:state,
})