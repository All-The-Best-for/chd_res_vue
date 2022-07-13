<template>
    <div class="SchoolBC">
        <!-- 使用一下插件中定义的全局过滤器 -->
        <h3>学校名称：{{name|mySlice}}</h3>
        <h3>地址：{{address}}</h3>
        <button @click="test">点我测试插件中的Vue原型方法</button>
    </div>
</template>

<script>
export default {
    name:'MySchool',
    data () {
        return {
            name:'长安大学12345566',
            address:'西安'
        }
    },
    methods:{
        test(){
            this.demo()
        }
    }
}
</script>

<style>
    .SchoolBC{
        background-color: aqua;
    }
</style>