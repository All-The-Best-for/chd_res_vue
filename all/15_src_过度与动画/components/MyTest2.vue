<template>
  <div>
      <button @click="isShow=!isShow">显示/隐藏</button>
      <!-- vue能够识别transition标签，并在合适的时候为标签内的内容加上特定名称的动画, -->
      <!-- transition-group能够包含多个标签，除非使用一个div进行包含，且此标签需要使用key值标识。transition只能包含一个标签， -->
      <transition-group name="hello" :appear="true">
        <h1 v-show="isShow" key="1">你好啊!</h1>
        <h1 v-show="isShow" key="2">xxxx</h1>
      </transition-group>
  </div>
</template>

<script>
export default {
    name:'MyTest2',
    data () {
        return {
            isShow:true
        }
    }
}
</script>

<style scoped>
    h1{
        background-color: orange;
    }


    /* 进入的起点 离开的终点*/
    .hello-enter,.hello-leave-to{
        transform: translateX(-100%);
    }

    /* 使用过度样式实现动画效果 */
    .hello-enter-active,.hello-leave-active{
        transition: 0.5s linear;
    }

    /* 进入的终点，离开的起点 */
    .hello-enter-to,.hello-leave{
        transform: translateX(0);
    }

</style>