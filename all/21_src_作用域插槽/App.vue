<template>
    <div>
        <div class="container">
            <MyCategory title="游戏ul">
                <!-- 从作用域插槽中传来的数据就放在gameScope中，实质是一个对象 -->
                <template scope="gameScpoe">
                    <ul>
                        <li v-for="(item,index) in gameScpoe.games" :key="index">{{item}}</li>
                    </ul>
                </template>
            </MyCategory>

            <MyCategory title="游戏ol">
                <!-- 使用结构赋值，直接将作用域中的数据赋给games -->
                <template scope="{games}">
                    <ol>
                        <li style="color:red" v-for="(item,index) in games" :key="index">{{item}}</li>
                    </ol>
                </template>
            </MyCategory>

            <MyCategory title="游戏h5">
                <!-- 另外一种写法 -->
                <template slot-scope="gameScpoe">
                    <h5 v-for="(item,index) in gameScpoe.games" :key="index">{{item}}</h5>
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