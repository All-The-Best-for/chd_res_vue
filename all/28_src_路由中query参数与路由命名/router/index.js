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
                            path:'detail',
                            component:MyDetail
                        }
                    ]
                }
            ]
        },
    ]
})