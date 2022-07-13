import axios from 'axios'
export default{
    // 打开命名空间
    namespaced: true,
    actions:{
        updatedText(context) {
            //到一个服务器要一句随机的话
            axios.get('https://api.uixsj.cn/hitokoto/get?type=socaial').then(
                response=>{
                    context.commit('UPDATED_TEXT',response.data)
                },
                error=>{
                    console.log('请求出错了！',error)
                }
            )
        }
    },
    mutations:{
        UPDATED_TEXT(state,value) {
            state.msg=value
        }
    },
    state:{
        msg:''
    },
    getters:{

    }
}