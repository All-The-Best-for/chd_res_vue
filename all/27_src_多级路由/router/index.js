//该文件专门用于创建整个应用的路由器

//引入路由器插件
import VueRouter from 'vue-router'

//引入跳转的组件
import MyHome from '../pages/MyHome.vue'
import MyAbout from '../pages/MyAbout.vue'
import MyHomeNews from '../pages/MyHomeNews.vue'
import MyHomeMessage from '../pages/MyHomeMessage.vue'


//创建并暴露一个路由器
export default new VueRouter({
    routes:[
        {
            //一级路由
            path:'/about',
            component: MyAbout
        },
        {
            path:'/home',
            component: MyHome,
            //多级路由
            children:[
                {
                    //多级路由不需要加/
                    path:'news',
                    component:MyHomeNews
                },
                {
                    path:'message',
                    component:MyHomeMessage
                }
            ]
        },
    ]
})