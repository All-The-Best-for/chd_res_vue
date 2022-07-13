<template>
  <div>
    <h2>Home组件内容</h2>
    <div>
      <ul class="nav nav-tabs">
        <li>
          <router-link class="list-group-item " active-class="active" to="/home/news">News</router-link>
        </li>
        <li>
          <router-link class="list-group-item " active-class="active" to="/home/message">Message</router-link>
        </li>
      </ul>
      <!-- keep-alive标签中的组件在被替换时不会销毁，会保留原来的信息，
          用于缓存，如果只想缓存其中的MyHomeNews组件，可以使用include属性标识要缓存的组件名，多个可以用数组形式，:include="['xx','yy']"
          不使用include则都保活 -->
      <keep-alive include="MyHomeNews">
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
export default {
    name:'MyHome',
}
</script>

<style>

</style>