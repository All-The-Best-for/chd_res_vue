<template>
    <li>
        <label>
            <!-- 根据对象的某个属性决定初始化是否勾选，
                使用change或者click事件处理勾选和取消 -->
            <input 
                type="checkbox" 
                :checked="todo.done" 
                @change="handleCheck(todo.id)"
            />
            <span>{{todo.title}}</span>
        </label>
        <button class="btn btn-danger" @click="toDeleteTodo(todo.id)" >删除</button>
    </li>
</template>

<script>
export default {
    name:'MyItem',
    props: ['todo'],
    methods:{
        handleCheck(id){
            //通知App组件将对应的todo对象的done取反
            this.$bus.$emit('checkTodo',id)
        },
        toDeleteTodo(id){
            //通知App组件将对应的todo对象删除
            //confirm会根据用户的选择返回true或者false
            if(confirm('确定删除吗？')){
                this.$bus.$emit('deleteTodo',id)
            }
        }
    }
}
</script>

<style scoped>
    /* item */
    li{
        list-style: none;
        height: 36px;
        line-height: 36px;
        padding: 0 5px;
        border-bottom: 1px solid #ddd;
    }

    li label{
        float: left;
        cursor: pointer;
    }

    li label li input{
        vertical-align: middle;
        margin-right: 6px;
        position: relative;
        top: -1px;
    }

    li button{
        float: right;
        display: none;
        margin-top: 3px;
    }

    li:before{
        content: initial;
    }

    li:last-child{
        border-bottom: none;
    }

    /* 鼠标悬浮高亮特效 */
    li:hover{
        background-color: gray;
    }

    /* 鼠标悬浮时显示按钮 */
    li:hover button{
        display: block;
    }
</style>