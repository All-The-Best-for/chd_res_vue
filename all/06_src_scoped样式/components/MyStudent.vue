<template>
    <div class="StudentBC">
        <h3>学生姓名：{{name}}</h3>
        <h3>学生性别：{{sex}}</h3>
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
    }
</script>

<style>
    .StudentBC{
        background-color: greenyellow;
    }
</style>
