<template>
    <div class="app">
        <router-view/>
        <MyFooterGuide v-show="$route.meta.showFooter"/>
    </div>
</template>

<script>
    import MyFooterGuide from './components/MyFooterGuide/MyFooterGuide.vue'
    import {mapActions} from 'vuex'

    export default {
        name:'App',
        components: {
            MyFooterGuide,
        },
        methods: {
          ...mapActions('myUserAbout',['getUserInfo'])  
        },
        mounted () {
            this.getUserInfo()
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    * {
        touch-action: pan-y;
    }
    .app
        width: 100%;
        height: 100%;
        background #f5f5f5

</style>