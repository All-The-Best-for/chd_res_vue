<template>
    <div>
        <!-- 使用动画实现 -->
        <MyTest/>
        <!-- 使用过度实现 -->
        <MyTest2/>
        <hr/>
        <MyTest3/>
    </div>
</template>

<script>
    import MyTest from './components/MyTest.vue'
    import MyTest2 from './components/MyTest2.vue'
    import MyTest3 from './components/MyTest3.vue'


    export default {
        name:'App',
        components: {
            MyTest,MyTest2,MyTest3
        },
        data () {
            return {

            }
        },
    }
</script>

<style>
   
</style>
