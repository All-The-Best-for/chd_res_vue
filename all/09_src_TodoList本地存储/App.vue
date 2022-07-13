<template>
    <div>
        <div class="todo-container">
            <div class="todo-wrap">
                <!-- 将App组件的方法传递给MyHeader组件，子组件调用此方法向父组件传递数据 -->
                <!-- :后紧跟的是形参名，""中的是实参，接收者根据形参名接收 -->
                <MyHeader :giveTodo="receiveTodo"/>
                <MyList 
                    :todos="todos" 
                    :checkTodo="checkTodo"
                    :deleteTodo="deleteTodo"
                />
                <MyFooter 
                    :todos="todos" 
                    :checkAllTodo="checkAllTodo"
                    :clearAllCheckedTodo="clearAllCheckedTodo"
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
            checkTodo(id){
                this.todos.forEach((todo)=>{
                    if(todo.id===id) todo.done=!todo.done
                })
            },
            //删除一个todo对象
            deleteTodo(id){
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
