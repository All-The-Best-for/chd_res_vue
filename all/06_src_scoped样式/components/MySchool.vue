<template>
    <div class="SchoolBC">
        <h3>学校名称：{{name}}</h3>
        <h3 class="SchoolFS">地址：{{address}}</h3>
    </div>
</template>

<script>
export default {
    name:'MySchool',
    data () {
        return {
            name:'长安大学',
            address:'西安'
        }
    }
}
</script>

// 使用scoped属性限制样式作用域为局部，防止类名冲突
// 使用lang指定样式编写语言
<style scoped lang="less">
    .SchoolBC{
        background-color: aqua;
        .SchoolFS{
            font-size: 40px;
        }
    }
</style>