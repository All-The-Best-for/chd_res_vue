<template>
  <ul>
      <!-- <li>消息编号：{{$route.query.id}}</li>
      <li>消息标题：{{$route.query.title}}</li> -->


      <!-- 传递params参数时取得参数的方式，以及使用第一种路由props的接收方法 -->
      <!-- <li>消息编号：{{$route.params.id}}</li>
      <li>消息标题：{{$route.params.title}}</li>
      <li>a:{{a}}</li>
      <li>b:{{b}}</li> -->


      <!-- 第二种路由props参数传递方式可以直接接收，但是这种方式不适用于query参数 -->
      <!-- 当路由使用第三种props方式时，也以这种方式展示 -->
      <li>消息编号：{{id}}</li>
      <li>消息标题：{{title}}</li>
  </ul>
</template>

<script>
export default {
    name:'MyDetail',
    //第一种路由props参数的接受方法
    // props: ['a','b'],
    props:['id','title']
}
</script>

<style>

</style>