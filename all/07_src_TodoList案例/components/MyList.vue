<template>
    <ul class="todo-main">
        <!-- v-for遍历数组，指定id为key，传递遍历得到的元素，
            传递App组件传递来的方法 -->
        <MyItem 
            v-for="item in todos" 
            :key="item.id" 
            :todo="item" 
            :checkTodo="checkTodo"
            :deleteTodo="deleteTodo"
        />
    </ul>
</template>

<script>
// 引入路径使用../
import MyItem from '../components/MyItem.vue'

export default {
    name:'MyList',
    components:{
        MyItem
    },
    props:['todos','checkTodo','deleteTodo']
}
</script>

<style scoped>
    /* list */
    .todo-main{
        margin-left: 0px;
        border: 1px solid #ddd;
        border-radius: 2px;
        padding: 0px;
    }

    .todo-empty{
        height: 40px;
        line-height: 40px;
        border: 1px solid #ddd;
        border-radius: 2px;
        padding-left: 5px;
        margin-top: 10px;
    }
</style>