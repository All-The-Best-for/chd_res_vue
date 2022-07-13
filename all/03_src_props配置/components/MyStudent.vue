<template>
    <div class="demo">
        <h2>{{msg}}</h2> 
        <h3>学生姓名：{{name}}</h3>
        <h3>学生性别：{{sex}}</h3>
        <h3>传入年龄：{{age}}</h3>
        <h3>可修改年龄：{{myAge}}</h3>
        <button @click="myAge++">点我年龄++</button>
    </div>
</template>

<script>

    export default {
        name:'MyStudent',
        data(){
            return{
                msg:'我是长安大学的学生',
                //不会导致一起修改
                myAge:this.age
            }
        },
        //声明可以传入什么样的属性,优先被接收

        //简单接受，不做检查
        // props:['name','age','sex']

        //进行类型限制
        // props:{
        //     name:String,
        //     age:Number,
        //     sex:String
        // }
        
        //严格限制
        props:{
            name:{
                type:String,
                default:'游客'
            },
            sex:{
                type:String,
                required:true
            },
            age:{
                type:Number,
                required:true
            },
        }
    }
</script>

<style>
    .demo{
        background-color: greenyellow;
    }
</style>
