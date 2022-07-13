<template>
  <div class="category">
      <h3>{{title}}分类</h3>
      <!-- <ul>
          <li v-for="(item,index) in listData" :key="index">{{item}}</li>
      </ul> -->
      <!-- 加入具名插槽，等待组件使用者进行填充 -->
      <slot name="center">默认值1</slot>
      <slot name="footer">默认值2</slot>
  </div>
</template>

<script>
export default {
    name:'MyCategory',
    data () {
        return {
            
        }
    },
    // props: ['listData','title']
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