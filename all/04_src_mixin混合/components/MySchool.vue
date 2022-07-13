<template>
    <div class="SchoolBC">
        <h3 @click="showName">学校名称：{{name}}</h3>
        <h3>地址：{{address}}</h3>
    </div>
</template>

<script>
// 引入mixin配置对象，局部混合
import {mixin,mixin2} from '../mixin'
//使用默认暴露
export default {
    name:'MySchool',
    data () {
        return {
            name:'长安大学',
            address:'西安'
        }
    },
    // 使用mixin引入共享配置
    // methods: {
    //     showName(){
    //         alert(this.name)
    //     }
    // }
    mixins: [mixin,mixin2]
}
</script>

<style>
    .SchoolBC{
        background-color: aqua;
    }
</style>