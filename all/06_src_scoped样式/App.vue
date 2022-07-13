<template>
    <div>
        <img src="./assets/logo.png" alt="logo">
        <MyStudent/>
        <MySchool/>
    </div>
</template>

<script>
    import MyStudent from './components/MyStudent'
    import MySchool from './components/MySchool.vue'

    export default {
        name:'App',
        //组件中data配置写法
        data(){
            return{
                msg:'欢迎来到长安大学'
            }
        },
        components: {
            MyStudent,
            MySchool
        }
    }
</script>
