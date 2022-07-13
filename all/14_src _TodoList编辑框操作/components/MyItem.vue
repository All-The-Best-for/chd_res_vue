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
            <span v-show="!todo.isEdit">{{todo.title}}</span>

            <!-- 此编辑框与上面的span标签互斥显示，数据绑定为Todo名称，还绑定一个失去焦点事件 -->
            <input 
                type="text" 
                v-show="todo.isEdit" 
                :value="todo.title" 
                @blur="handleBlur(todo,$event)"
                ref="inputTitle"
            >
        </label>
        <button class="btn btn-danger" @click="toDeleteTodo(todo.id)" >删除</button>
        <button class="btn btn-edit" @click="toChangeTodo(todo)" v-show="!todo.isEdit" >编辑</button>
    </li>
</template>

<script>
import pubsub from 'pubsub-js'
export default {
    name:'MyItem',
    props: ['todo'],
    methods:{
        handleCheck(id){
            //通知App组件将对应的todo对象的done取反
            // this.$bus.$emit('checkTodo',id)

            pubsub.publish('checkTodo',id)
        },
        toDeleteTodo(id){
            //通知App组件将对应的todo对象删除
            //confirm会根据用户的选择返回true或者false
            if(confirm('确定删除吗？')){
                // this.$bus.$emit('deleteTodo',id)
                pubsub.publish('deleteTodo',id)
            }
        },
        // 编辑Todo名称
        toChangeTodo(todo){
            todo.isEdit=true
            //使得输入框获得焦点，便于修改以及便于后续的失去焦点事件触发，
            //直接写获取焦点的操作会使得DOM还没有变成真实DOM时，此操作就执行完了，此时无法获得焦点
            
            // 但是由于Vue重新解析模板的流程问题导致需要加一个定时器或者使用$nextTick解决
            // setTimeout(() => {
            //     this.$refs.inputTitle.focus()
            // }, 200);

            //Vue提供了$nextTick使得此函数中的操作会等到下一轮跟新DOM后再进行
            //完成修改并将DOM转化为真实DOM放入页面之后再执行其中的代码
            this.$nextTick(function () {
                this.$refs.inputTitle.focus()
            })
        },
        //实现失去焦点即完成修改
        handleBlur(todo,event){
            todo.isEdit=false
            if(!event.target.value.trim()){
                alert('输入不能为空')
                return
            }
            this.$bus.$emit('changeTodoTitle',todo.id,event.target.value)
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