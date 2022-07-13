<template>
  <div>
      <button @click="isShow=!isShow">显示/隐藏</button>
      <!-- vue能够识别transition标签，并在合适的时候为标签内的内容加上特定名称的动画 -->
      <transition name="hello" :appear="true">
        <h1 v-show="isShow">你好啊!</h1>
      </transition>
  </div>
</template>

<script>
export default {
    name:'MyTest',
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

    /* 入场动画，名称是固定的，需要和transition标签的名字配合,如果transition没有name属性，则使用默认的v-enter/leave-acyive */
    .hello-enter-active{
        /* 使用demo动画，1s完成，匀速播放 */
        animation: demo 1s linear;
    }

    /* 离场动画 */
    .hello-leave-active{
        /* 使用demo动画，1s完成，倒序播放 */
        animation: demo 1s reverse;
    }

    /* 定义一个从远方来的动画 */
    @keyframes demo{
        from{
            transform: translateX(-100%);
        }
        to{
            transform: translateX(0px);
        }
    }
</style>