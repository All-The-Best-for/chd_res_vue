<template>
    <div>
        <ul >
            <li v-for="item in messageList" :key="item.id">
                <!-- 注意传参时的书写格式，to的字符串写法 -->
                <!-- <router-link :to="`/home/message/detail?id=${item.id}&title=${item.title}`">{{item.title}}</router-link> -->

                <!-- 传递query参数时to的对象写法，可以使用name属性 -->
                <router-link :to="{
                    name:'xiangqing',
                    query:{
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