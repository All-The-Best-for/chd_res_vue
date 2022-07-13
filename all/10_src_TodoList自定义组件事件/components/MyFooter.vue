<template>
  <div class="todo-footer">
      <label>
          <!-- 初始时根据是否全部完成进行勾选，后续可以通过此处进行全选操作 -->
            <input 
                type="checkbox" 
                :checked="isAllDone" 
                @click="checkAll"
                v-show="todos.length"
            />
      </label>
      <span>
          <span>已完成{{doneTotal}}</span> / 全部{{todos.length}}
      </span>
      <!-- 当没有任务完成时，隐藏按钮 -->
      <button 
        class="btn btn-danger" 
        v-show="doneTotal"
        @click="clearAllChecked"
        >清除已完成任务</button>
  </div>
</template>

<script>
export default {
    name:'MyFooter',
    props: ['todos','checkAllTodo','clearAllCheckedTodo'],
    computed: {
        doneTotal(){
            //使用reduce条件统计获取已完成的任务数
            const x=this.todos.reduce((pre,current)=>{
                return pre+(current.done?1:0)
            },0)
            return x 
        },
        isAllDone(){
            //当全部任务为0时不进行勾选
            return this.doneTotal===this.todos.length && this.todos.length>0
        }
    },
    methods: {
        // 全选或取消全选,向App组件传递是否全选
        checkAll(event){
            //询问是否全选
            if(confirm('确定要全选或者取消全选？'))
                this.$emit('checkAllTodo',event.target.checked)
            else{
                event.target.checked=!event.target.checked
            }
        },
        //删除所有选择的元素
        clearAllChecked(){
            if(confirm('确定要删除所有已完成的任务？'))
                this.$emit('clearAllCheckedTodo')
        }
    }
}
</script>

<style scoped>
/* footer */
    .todo-footer{
        height: 40px;
        line-height: 40px;
        padding-left: 6px;
        margin-top: 5px;
    }

    .todo-footer label{
        display: inline-block;
        margin-right: 20px;
        cursor: pointer;
    }

    .todo-footer label input{
        position: relative;
        top:-1px;
        vertical-align: middle;
        margin-right: 5px;
    }

    .todo-footer button{
        float: right;
        margin-top: 5px;
    }
</style>