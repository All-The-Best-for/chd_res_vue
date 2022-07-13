<template>
  <ul>
      <!-- <li>消息编号：{{$route.query.id}}</li>
      <li>消息标题：{{$route.query.title}}</li> -->
      <!-- 传递params参数时取得参数的方式 -->
      <li>消息编号：{{$route.params.id}}</li>
      <li>消息标题：{{$route.params.title}}</li>
  </ul>
</template>

<script>
export default {
    name:'MyDetail',
}
</script>

<style>

</style>