//定义一个插件对象
const obj ={
    // 插件对象必须拥有install函数,参数是vm构造函数
    install(Vue){
        
        //全局过滤器
        Vue.filter('mySlice',function(value){
            return value.slice(0,4)
        })

        //全局自定义指令
        Vue.directive('fbind',{
            //指令与元素成功绑定时调用（一上来）
            bind(element,binding){
                element.value=binding.value
            },
            //指令所在元素被插入页面时
            inserted(element){
                element.focus()
            },
            updete(element,binding){
                element.value=binding.value
                element.focus()
            }
        })

        //定义混入
        Vue.mixin({
            data(){
                return{
                    x:100
                } 
            }
        })

        //在Vue原型上放一个Demo方法，所有组件和vm都可以调用此方法
        Vue.prototype.demo=()=>{
            alert('你好啊！')
        }
    }
}

//默认暴露
export default obj