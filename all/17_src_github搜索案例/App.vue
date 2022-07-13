<template>
        <!-- <MySearch/>
        <MyList/> -->
    <div id="app">
        <div class="container">
            <MySearch/>
            <MyList/>
        </div>
    </div>
</template>

<script>
    import MyList from './components/MyList.vue'
    import MySearch from './components/MySearch.vue'

    export default {
        name:'App',
        components: {
            MyList,MySearch
        },
        data () {
            return {

            }
        }
    }
</script>