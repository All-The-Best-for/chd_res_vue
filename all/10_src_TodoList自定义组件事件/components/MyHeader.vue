<template>
  <div class="todo-header">
      <!-- 给输入框设定回车抬起时调用add方法,使用双向绑定传递数据 -->
        <input 
            type="text" 
            @keyup.enter="add" 
            v-model="title" 
            placeholder="输入任务名称，回车确认"
        >
  </div>
</template>

<script>
import {nanoid} from 'nanoid'

export default {
    name:'MyHeader',
    methods: {
        add(){
            //去掉前后空格后校验数据
            if (!this.title.trim()){
                alert('输入不能为空！')
                return
            }
            //将用户的输入包装成为一个todo对象
            //使用nanoid方法作为唯一id

            // 使用双向数据绑定传递数据
            const todo={id:nanoid(),title:this.title,done:false}
            
            //通过触发事件通知App组件添加一个todo对象
            this.$emit('giveTodo',todo)

            //清空输入
            this.title=''
        }
    },
    data () {
        return {
            title:''      
        }
    },
    //获取到APP组件传递的函数
    props:['giveTodo']
}
</script>

<style scoped>
/* header */
    .todo-header input{
        width: 560px;
        height: 28px;
        font-size: 14px;
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 4px 7px;
    }

    .todo-header input:focus{
        outline: none;
        border-color: rgba(82, 168, 236, 0.8);
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);
    }
</style>