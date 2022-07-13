<template>
    <div class="row">
        <div v-show="users.length" class="card" v-for="user in users" :key="user.id" >
            <a :href="user.html_url" target="_blank">
            <img :src="user.avatar_url" style='width: 100px'/>
            </a>
            <p class="card-text">{{user.login}}</p>
        </div>
        <h1 v-show="isFirst">欢迎使用！</h1>
        <h1 v-show="isLoading">加载中，请稍后...</h1>
        <h1 v-show="errMsg">出错了！{{errMsg}}</h1>
    </div>
</template>

<script>
export default {
    name:'MyList',
    data () {
        return {
            users:[],
            isFirst:true,
            isLoading:false,
            errMsg:''
        }
    },
    mounted () {
        //一次性将数据传递进来
        this.$bus.$on('updateData',(data)=>{
            this.users=data.users,
            this.isFirst=data.isFirst
            this.isLoading=data.isLoading
            this.errMsg=data.errMsg
        })

        //太麻烦，不完善，不用
/*         //接收数据事件
        this.$bus.$on('deliverUsers',(data)=>{
            this.users=data
        }),
        //开始搜索事件
        this.$bus.$on('beginSearch',()=>{
            this.isLoading=true
            this.isFirst=false
        }),
        //搜索完成事件
        this.$bus.$on('doneSearch',()=>{
            this.isLoading=false
        }),
        //出现错误，传递并展示错误信息
        this.$bus.$on('showError',(data)=>{
            this.errMsg=data
        }),
        //展示完要清空错误信息，就是在重新搜索时清空错误信息
        this.$bus.$on('clearError',()=>{
            this.errMsg=''
        }) */
    },
    beforeDestroy(){
        this.$bus.$off('deliverUsers')
    }
}
</script>

<style scoped>

    .album {
    min-height: 50rem; /* Can be removed; just added for demo purposes */
    padding-top: 3rem;
    padding-bottom: 3rem;
    background-color: #f7f7f7;
    }

    .card {
    float: left;
    width: 33.333%;
    padding: .75rem;
    margin-bottom: 2rem;
    border: 1px solid #efefef;
    text-align: center;
    }

    .card > img {
    margin-bottom: .75rem;
    border-radius: 100px;
    }

    .card-text {
    font-size: 85%;
    }
</style>