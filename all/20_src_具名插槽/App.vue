<template>
        <!-- <MySearch/>
        <MyList/> -->
    <div>
        <div class="container">
            <MyCategory title="美食" :listData="foods">
                <img src="./assets/logo.png" alt="" slot="center">
                <a href="https://cn.bing.com/" slot="footer">更多美食</a>
            </MyCategory>

            <MyCategory title="游戏" :listData="games">
                <ul slot="center">
                    <li v-for="(item,index) in games" :key="index">{{item}}</li>
                </ul>
                <div slot="footer" class="foot">
                    <a href="https://cn.bing.com/">单机游戏</a>
                    <a href="https://cn.bing.com/">网络游戏</a>
                </div>
            </MyCategory>

            <MyCategory title="电影" :listData="films">
                <!-- controls属性控制视频播放 -->
                <video controls src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" slot="center"></video>
                <!-- v-slot只能用在template上 -->
                <template v-slot:footer>
                    <div class="foot">
                        <a href="https://cn.bing.com/">经典</a>
                        <a href="https://cn.bing.com/">热门</a>
                        <a href="https://cn.bing.com/">推荐</a>
                    </div>
                    <h4>欢迎前来观影</h4>
                </template>
            </MyCategory>
        </div>
    </div>
</template>

<script>
    import MyCategory from './components/MyCategory.vue'

    export default {
        name:'App',
        components: {
            MyCategory
        },
        data () {
            return {
                foods:['火锅','烧烤','小龙虾','海鲜'],
                games:['LOL','鬼谷八荒','太吾绘卷','修仙模拟器'],
                films:['你好，李焕英','拆弹专家','无问西东','泰坦尼克号'],
            }
        }
    }
</script>

<style>
    /* 控制标签元素伸缩排列且间隔均匀 */
    .container,.foot{
        display: flex;
        justify-content: space-around;
    }
    h3,h4{
        text-align: center;
        background-color: orange;
    }
    img{
        width: 100%;
        height: 50%;
    }
    video{
        width: 100%;
    }
</style>