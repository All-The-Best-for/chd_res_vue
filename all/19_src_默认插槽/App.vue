<template>
        <!-- <MySearch/>
        <MyList/> -->
    <div>
        <div class="container">
            <MyCategory title="美食" :listData="foods">
                <img src="./assets/logo.png" alt="">
            </MyCategory>

            <MyCategory title="游戏" :listData="games">
                <ul>
                    <li v-for="(item,index) in games" :key="index">{{item}}</li>
                </ul>
            </MyCategory>

            <MyCategory title="电影" :listData="films">
                <!-- controls属性控制视频播放 -->
                <video controls src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"></video>
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
    .container{
        display: flex;
        justify-content: space-around;
    }
    h3{
        text-align: center;
        background-color: orange;
    }
    img{
        width: 100%;
    }
    video{
        width: 100%;
    }
</style>