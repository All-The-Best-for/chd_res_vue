export default{
    namespaced:true,//开启命名空间
    state:{
        userInfo:{},
    },
    mutations: { 
        //修改用户信息
        RECEIVE_USER_INFO(state,{userInfo}){
            state.userInfo=userInfo
        },
        //重置用户信息
        RESET_USER_INFO(state){
            state.userInfo={}
        },
        // 修改用户余额信息
        CHANGE_USER_ACCOUNT(state,{account}){
            state.userInfo.userAccount=account
            window.sessionStorage.setItem("userInfo",JSON.stringify(state.userInfo));
        }
    },
    actions: { 
        //同步记录用户信息，因为这个信息是本程序自有的，所以同步记录。而之前的异步获取都是从服务器上请求得来的，需要异步
        recordUser(context,userInfo){
            context.commit('RECEIVE_USER_INFO',{userInfo})
        },
        // 获取用户信息，用于自动登录(session)
        getUserInfo(context){
            const userInfo= JSON.parse(window.sessionStorage.getItem("userInfo"))
            if(userInfo){
                context.commit('RECEIVE_USER_INFO',{userInfo})
            }
        },
        //请求退出
        logout(context){
            window.sessionStorage.removeItem("userInfo")
            context.commit('RESET_USER_INFO')
        },
        // 修改用户余额信息
        consumeAccount(context,amount){
            const account=context.state.userInfo.userAccount-amount
            context.commit('CHANGE_USER_ACCOUNT',{account})
        }
    }
}