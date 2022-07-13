<template>
    <div>
        <div class="row">
            <MyBanner/>
        </div>
        <div class="row">
            <div class="col-xs-2 col-xs-offset-2">
                <div class="list-group">
                    <!-- 原始的html中使用a标签实现页面跳转 -->
                    <!-- <a class="list-group-item active" href="./about.html">About</a>
                    <a class="list-group-item" href="./home.html">Home</a> -->

                    <!-- vue中路由跳转使用router-link标签代替a标签实现路由切换，使用to属性代替href属性，且to属性的具体写法不同 -->
                    <!-- 使用active-class样式表示点谁谁亮 -->
                    <router-link class="list-group-item" active-class="active" to="/about">About</router-link>
                    <router-link class="list-group-item" active-class="active" to="/home">Home</router-link>
                </div>
            </div>
            <div class="col-xs-6">
                <div class="panel">
                    <div class="panel-body">
                        <!-- 指定组建的呈现位置，作用与slot相似 -->
                        <router-view></router-view>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import MyBanner from './components/MyBanner.vue'

    export default {
        name:'App',
        components: {
            MyBanner
        },
        data () {
            return {
                show:false
            }
        }
    }
</script>