<template>
    <div>
        <ul >
            <li v-for="item in messageList" :key="item.id">
                <!-- 注意传递params参数时的书写格式，to的字符串写法，路由路径和参数混合在一起了，需要在路由配置中只指明 -->
                <!-- <router-link :to="`/home/message/detail/id=${item.id}/title=${item.title}`">{{item.title}}</router-link> -->

                <!-- 传递params参数时to的对象写法，可以使用name属性,不得使用path属性 -->
                <router-link :to="{
                    name:'xiangqing',
                    params:{
                        id:item.id,
                        title:item.title
                    }
                }">
                    {{item.title}}
                </router-link>
            </li>
        </ul>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name:'MyHomeMessage',
    data () {
        return {
            messageList:[
                {id:'001',title:'消息001'},
                {id:'002',title:'消息002'},
                {id:'003',title:'消息003'}
            ]
        }
    }
}
</script>

<style>

</style>