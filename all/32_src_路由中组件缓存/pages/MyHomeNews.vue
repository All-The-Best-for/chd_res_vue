<template>
    <ul>
        <!-- 如果想保证此页中的输入框在被切走时不消失，需要在MyHome组件中对此组件进行保活 -->
        <li>news001:<input> </li>
        <li>news002:<input> </li>
        <li>news003:<input> </li>
    </ul>
</template>

<script>
export default {
    name:'MyHomeNews',
}
</script>

<style>

</style>