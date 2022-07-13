<template>
    <div class="StudentBC">
        <h3>学生姓名：{{name}}</h3>
        <h3>学生性别：{{sex}}</h3>
        <button @click="sendName">点击给School组件传递学生名</button>
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
            sendName(){
                // 触发全局事件总线的绑定事件，并传递信息。触发事件对应的回调函数
                this.$bus.$emit('MyStuentSendNameToMySchool',this.name)
            }
        }
    }
</script>

<style>
    .StudentBC{
        background-color: greenyellow;
    }
</style>
