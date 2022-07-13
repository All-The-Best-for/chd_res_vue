// 使用mixin配置引入共享配置,Vue会将组件原配置和添加的进行混合
//同名data、methods以mixin配置中的为主，但是mounted都要保留
//使用分别暴露
export const mixin={
    methods: {
        showName(){
            alert(this.name)
        }
    },
    data () {
        return {
            x:100,
            y:200
        }
    }
}

export const mixin2={
    data () {
        return {
            qqq:100
        }
    }
}