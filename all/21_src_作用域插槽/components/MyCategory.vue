<template>
  <div class="category">
      <h3>{{title}}分类</h3>
      <!-- 加入作用域插槽，数据就传递给了作用于插槽的使用者 -->
      <!-- 适用于结构由使用者决定，数据由组件私有的场景 -->
      <slot :games="games">默认值</slot>
  </div>
</template>

<script>
export default {
    name:'MyCategory',
    data () {
        return {
            games:['LOL','鬼谷八荒','太吾绘卷','修仙模拟器']
        }
    },
    props: ['title']
}
</script>

<style>

    .category{
        background-color: skyblue;
        width: 200px;
        height: 300px;
    }

</style>