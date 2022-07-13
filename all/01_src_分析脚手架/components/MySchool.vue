<template>
    <div class="demo">
        <!-- 组件结构 -->
        <h3>学校名称：{{name}}</h3>
        <h3>学校地址：{{address}}</h3>
        <button @click="showName">点我提示学校名称</button>
    </div>
</template>

<script>
    // 组件交互相关的代码（数据、方法等）
    //进行组件暴露，使用这种方式暴露有利于后期引入
    export default {
        name:'MySchool',
        data(){
            return{
                name:'长安大学',
                address:'西安'
            }
        },
        methods: {
            showName(){
                alert(this.name)
            }
        }
    }
</script>

<style>
    /* 组件的样式 */
    .demo{
        background-attachment: orange;
    }
</style>
