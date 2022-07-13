export default{
namespaced:true,//开启命名空间
state:{
    searchShops:[], //搜索得到的商家信息
    info:[],//所有商家信息
},
mutations: { 
    //接收搜索的商家信息
    RECEIVE_SEARCH_SHOPS(state,{searchShops}){
        state.searchShops=searchShops
    },
    // 接收所有商家信息
    RECEIVE_INFO(state, {info}) {
        state.info = info
    },
},
actions: { 
    //获取搜索的商家信息
    getSearchShops(context,keyword){

        // 从shops中查找信息，然后返回searchShops
        var arr = context.state.shops
        var brr = arr.filter(function (shop) {
            return shop.stallInfo.stallName.includes(keyword) == 1;  //遍历数组，返回值为true保留并复制到新数组，false则过滤掉
        })

        const searchShops=brr
        console.log(searchShops)
        context.commit('RECEIVE_SEARCH_SHOPS',{searchShops})
    },
    // 获取商家信息
    getShops({commit},{shops}) {
        // 不需要发送请求了，直接从mySiteAbout中获取
        const stallInfo=shops
        commit('RECEIVE_INFO', {info:stallInfo})
    },
},
getters: {

}
}