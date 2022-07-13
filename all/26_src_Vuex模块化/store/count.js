// 这个文件中的配置都是针对count的，如果需要为其他功能模块配置vuex，需要再写一个文件。
export default{
    // 打开命名空间
    namespaced: true,
    actions:{
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
    },
    mutations:{
        INCREMENT:function(state,value) {
            state.sum+=value
        },
        DECREMENT(state,value){
            state.sum-=value
        }
    },
    state:{
        sum:0,//当前和
        schoolName:'长安大学',
        subject:'Vue'
    },
    getters:{
        bigSum(state){
            return state.sum*10
        }
    }
}