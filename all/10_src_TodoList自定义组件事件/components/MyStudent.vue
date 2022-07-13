<template>
    <div class="StudentBC">
        <h3>学生姓名：{{name}}</h3>
        <h3>学生性别：{{sex}}</h3>
        <button @click="sendStudentName">将学生名交给App组件</button>
        <button @click="unbind">解绑bindEvent事件</button>
    </div>
</template>

<script>
    export default {
        name:'MyStudent',
        data(){
            return{
                name:'张三',
                sex:'男'
            }
        },
        methods: {
            sendStudentName(){
                //使用此函数触发事件来调用getStudentName方法，给谁绑定事件就要在谁中触发事件
                this.$emit('bindEvent',this.name)
            },
            unbind(){
                //解绑一个自定义事件，当解绑多个事件时需要使用数组
                this.$off('bindEvent')
                //不传递参数时解绑所有自定义事件
                this.$off()
            }
        }
    }
</script>

<style>
    .StudentBC{
        background-color: greenyellow;
    }
</style>
