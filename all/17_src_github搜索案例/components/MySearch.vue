<template>
    <section class="jumbotron">
        <h3 class="jumbotron-heading">Search Github Users</h3>
        <div>
            <input 
                type="text" 
                placeholder="enter the name you search"
                v-model="keyWord"
            />
            &nbsp;
            <button @click="searchUsers">Search</button>
        </div>
    </section>
</template>

<script>
import axios from 'axios'
export default {
    name:'MySearch',
    data () {
        return {
            keyWord:''
        }
    },
    methods: {
        searchUsers(){
            //第一次触发事件，进入加载中提示界面
            this.$bus.$emit('updateData',{isFirst:false,isLoading:true,errMsg:'',users:[]})
            // 使用模板引号以及${}拼接请求
            axios.get(`https://api.github.com/search/users?q=${this.keyWord}`).then(
                response=>{
                    //查询到数据
                    this.$bus.$emit('updateData',{isFirst:false,isLoading:false,errMsg:'',users:response.data.items})
                },
                error=>{
                    // 出现错误，传递错误信息,同时必须清空users信息，防止显示出上次残余用户信息
                    this.$bus.$emit('updateData',{isFirst:false,isLoading:false,errMsg:error.message,users:[]})
                }
            )
        }
    }
}
</script>