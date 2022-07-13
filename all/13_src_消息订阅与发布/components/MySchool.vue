<template>
    <div class="SchoolBC">
        <h3>学校名称：{{name}}</h3>
        <h3 class="SchoolFS">地址：{{address}}</h3>
    </div>
</template>

<script>
import pubsub from 'pubsub-js'

export default {
    name:'MySchool',
    data () {
        return {
            name:'长安大学',
            address:'西安'
        }
    },
    mounted () {
        // 在全局事件总$bus上绑定事件，但是回调函数定义在MySchool组件中，所以事件触发时会将信息带回到MySchool组件中
        // this.$bus.$on('MyStuentSendNameToMySchool',(data)=>{
        //     console.log('MySchool',data)
        // })


        // 进行消息订阅，并设置回调函数,接收消息订阅后返回的消息Id用于后续取消订阅
        //此处的回调函数有两个参数，第一个是参数名称，第二个是消息发布时携带的数据
        this.pubId=pubsub.subscribe('hello',function (msgName,data) {
            console.log('消息订阅成功，我是回调函数',msgName,data)
        })
    },
    beforeDestroy(){
        // 在回调函数所在组件销毁之前注销绑定事件
        // this.$bus.$off('MyStuentSendNameToMySchool')

        //使用消息Id取消消息订阅
        pubsub.unsubscribe(this.pubId)
    }
}
</script>

// 使用scoped属性限制样式作用域为局部，防止类名冲突
// 使用lang指定样式编写语言
<style scoped lang="less">
    .SchoolBC{
        background-color: aqua;
        .SchoolFS{
            font-size: 30px;
        }
    }
</style>