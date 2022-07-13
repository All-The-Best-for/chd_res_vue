<template>
    <div>
        <img src="./assets/logo.png" alt="logo">
        <!-- 在组建标签中配置属性，需要配合props配置项声明可传入的属性 -->
        <!-- 想要传入int类型，需要使用v-bind表明传入的数据是表达式 -->
        <!-- 传入的数据最好不要修改，当有业务需求时将其放入data中再修改 -->
        <MyStudent name="李四" sex="女" :age="18" /><hr/>
        <MyStudent name="张三" sex="男" :age="20" /><hr/>
        <MyStudent sex="男" :age="30" /><hr/>
    </div>
</template>

<script>
    import MyStudent from './components/MyStudent'

    export default {
        name:'App',
        //组件中data配置写法
        data(){
            return{
                msg:'欢迎来到长安大学'
            }
        },
        components: {
            MyStudent
        }
    }
</script>
