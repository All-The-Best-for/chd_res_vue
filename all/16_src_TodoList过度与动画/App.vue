<template>
    <div>
        <div class="todo-container">
            <div class="todo-wrap">
                <!-- 使用props方法将App组件的方法传递给MyHeader组件，子组件调用此方法向父组件传递数据 -->
                <!-- 使用自定义事件传递数据，giveTodo是事件名称，receiveTodo是回调函数名称 -->
                <MyHeader @giveTodo="receiveTodo"/>
                <MyList :todos="todos" />
                <MyFooter 
                    :todos="todos" 
                    @checkAllTodo="checkAllTodo"
                    @clearAllCheckedTodo="clearAllCheckedTodo"
                />
            </div>
        </div>
    </div>
</template>

<script>

    // 引入路径使用./
    import MyHeader from './components/MyHeader.vue'
    import MyFooter from './components/MyFooter.vue'
    import MyList from './components/MyList.vue'

    //引入pubsub-js
    import pubsub from 'pubsub-js'

    export default {
        name:'App',
        components: {
            MyHeader,MyFooter,MyList
        },
        data () {
            return {
                //从本地存储中读取数据，如果本地没有数据，那么初始化为空数组，防止后续出错
                todos:JSON.parse(localStorage.getItem('todos'))||[]
                // todos:[]
            }
        },
        methods: {
            //接收一个todo对象
            receiveTodo(todo){
                this.todos.unshift(todo)
            },
            //勾选或取消勾选一个todo对象
            //在消息订阅中，第一个参数是消息名称，不使用的话需要用_进行占位
            checkTodo(_,id){
                this.todos.forEach((todo)=>{
                    if(todo.id===id) todo.done=!todo.done
                })
            },
            //删除一个todo对象
            deleteTodo(_,id){
                //错误的删除方法，这是移除顶端元素
                // this.todos.shift(id)
                // 使用过滤器来删除
                this.todos=this.todos.filter((todo)=>{
                    // 返回id不符合的元素
                    return todo.id!==id     
                })
            },
            //全选或全不选
            checkAllTodo(done){
                this.todos.forEach((todo)=>{
                    if(done){
                        todo.done=true;
                    }else{
                        todo.done=false;
                    }
                })
            },
            //删除所有已经选择的任务
            clearAllCheckedTodo(){
                    this.todos=this.todos.filter((todo)=>{
                    // 返回未完成的任务
                    return !todo.done    
                })
            },
            //修改Todo名称
            changeTodoTitle(id,newTitle){
                this.todos.forEach((todo)=>{
                    if(todo.id===id) todo.title=newTitle
                })
            }
        },
        watch: {
            //监视todos属性,必须进行深度监视才能监视到数组中对象的改变
            todos:{
                deep:true,
                handler(newvalue){
                    localStorage.setItem('todos',JSON.stringify(newvalue))
                }
            }
        },
        mounted () {
            // 在全局事件总线上绑定两个事件,并设置回调函数
            // this.$bus.$on('checkTodo',this.checkTodo)
            // this.$bus.$on('deleteTodo',this.deleteTodo)
            this.$bus.$on('changeTodoTitle',this.changeTodoTitle)

            //订阅消息，设置回调函数
            this.pubId_CheckTodo=pubsub.subscribe('checkTodo',this.checkTodo)
            this.pubId_DeleteTodo=pubsub.subscribe('deleteTodo',this.deleteTodo)
        },
        beforeDestroy () {
            // this.$bus.$off('checkTodo')
            // this.$bus.$off('deleteTodo') 
            this.$bus.$off('changeTodoTitle')
            
            pubsub.unsubscribe(this.pubId_CheckTodo)
            pubsub.unsubscribe(this.pubId_DeleteTodo)

        }
    }
</script>

<style>
    /* base 通用 */
    body{
        background-color: #fff;
    }
    .btn{
        display: inline-block;
        padding: 4px 12px;
        margin-bottom: 0;
        font-size: 14px;
        line-height: 20px;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
        border-radius: 4px;
    }

    .btn-danger{
        color: #fff;
        background-color: #da4f49;
        border: 1px solid #bd362f;
    }

    .btn-edit{
        color: #fff;
        background-color: skyblue;
        border: 1px solid rgb(43, 166, 214);
        margin-right: 5px;
    }
    
    .btn-danger:hover{
        color:#fff;
        background-color: #bd362f;
    }
    
    .btn:focus{
        outline: none;
    }

    .todo-container{
        width:600px;
        margin: 0 auto;
    }

    .todo-container .todo-wrap{
        padding: 10px;
        border:1px solid #ddd;
        border-radius: 5px;
    }
</style>
