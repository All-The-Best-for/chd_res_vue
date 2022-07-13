<template>
    <div class="demo">
        <h3>学生姓名：{{name}}</h3>
        <h3>学生地址：{{address}}</h3>
    </div>
</template>

<script>

    export default {
        name:'MyStudent',
        data(){
            return{
                name:'WBS',
                address:'山东'
            }
        }
    }
</script>

<style>
    .demo{
        background-attachment: red;
    }
</style>
