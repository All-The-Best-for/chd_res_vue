<template>
    <div class="SchoolBC">
        <h3>学校名称：{{name}}</h3>
        <h3 class="SchoolFS">地址：{{address}}</h3>
    </div>
</template>

<script>
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
        this.$bus.$on('MyStuentSendNameToMySchool',(data)=>{
            console.log('MySchool',data)
        })
    },
    beforeDestroy(){
        // 在回调函数所在组件销毁之前注销绑定事件
        this.$bus.$off('MyStuentSendNameToMySchool')
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