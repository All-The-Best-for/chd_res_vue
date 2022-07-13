//该文件专门用于创建整个应用的路由器

//引入路由器插件
import VueRouter from 'vue-router'

//引入跳转的组件
import MyHome from '../pages/MyHome.vue'
import MyAbout from '../pages/MyAbout.vue'
import MyHomeNews from '../pages/MyHomeNews.vue'
import MyHomeMessage from '../pages/MyHomeMessage.vue'
import MyDetail from '../pages/MyDetail.vue'


//创建并暴露一个路由器
export default new VueRouter({
    routes:[
        {
            //一级路由
            name:'guanyu',
            path:'/about',
            component: MyAbout
        },
        {
            name:'zhuye',
            path:'/home',
            component: MyHome,
            //多级路由
            children:[
                {
                    //多级路由不需要加/
                    name:'xinwen',
                    path:'news',
                    component:MyHomeNews
                },
                {
                    name:'xiaoxi',
                    path:'message',
                    component:MyHomeMessage,
                    children:[
                        {
                            //在多级路由中直接使用名字代替path，可以简化编码,在router-linker标签中的to属性的path也换成name
                            //只能在to的对象写法中使用
                            name:'xiangqing',
                            //传递query参数时path形式
                            // path:'detail',
                            // 传递params参数，必须声明参数
                            path:'detail/:id/:title',
                            component:MyDetail,

                            //路由props的第一种写法，值为对象，该对象中的所有的key-value都会以props的形式传递给MyDetail组件
                            //只能传递死数据，很少使用
                            // props:{a:1,b:'hello'},

                            //路由props的第二种写法，值为布尔值，若布尔值为真，
                            //就会将该路由组件收到的所有params参数以props形式传递给MyDetail组件
                            //那么在MyDetail中可以不用写$route.params.xxx了，可以直接使用props中接收到的值
                            // 只适用于params
                            // props:true,

                            //路由props的第三种写法，值为函数，返回值中的key-value会以props的方式传递给MyDetail组件
                            //适用于query和params两种方式
                            props($route){
                                return {id:$route.params.id,title:$route.params.title}
                            }
                        }
                    ]
                }
            ]
        },
    ]
})