<template>
    <div>
        <img src="./assets/logo.png" alt="logo">
        <!-- 给标签打一个ref属性，方便以后操作DOM -->
        <h2 v-text="msg" ref="title"></h2>
        <button @click="showDom" ref="btn">点我输出DOM</button>
        <MySchool ref="sch"/>
        <hr/>
        <MyStudent/>
    </div>
</template>

<script>
    import MySchool from './components/MySchool'
    import MyStudent from './components/MyStudent'

    export default {
        name:'App',
        //组件中data配置写法
        data(){
            return{
                msg:'欢迎来到长安大学'
            }
        },
        methods:{
            showDom(){
                //通过this寻找被打了标记的标签元素
                //此处的this是App组件的实例对象
                console.log('h2标签',this.$refs.title)
                console.log('button标签',this.$refs.btn)
                //给组件标签加标记的时候，返回的是组件实例对象
                console.log('MySchool组件标签',this.$refs.sch)
            }
        },
        components: {
            MySchool,
            MyStudent
        }
    }
</script>
