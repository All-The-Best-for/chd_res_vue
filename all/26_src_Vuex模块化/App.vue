<template>
    <div>
        <div>
            <MyCount1/>
            <hr/>
            <MyText/>          
        </div>
    </div>
</template>

<script>
    import MyCount1 from './components/MyCount1.vue'
    import MyText from './components/MyText.vue'

    export default {
        name:'App',
        components: {
            MyCount1,MyText
        }
    }
</script>

<style>

</style>