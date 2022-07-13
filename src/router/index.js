//该文件专门用于创建整个应用的路由器

//引入路由器插件
import VueRouter from 'vue-router'

//引入跳转的组件
// import MySite from '../pages/MySite/MySite.vue'
// import MyOrder from '../pages/MyOrder/MyOrder.vue'
// import MyProfile from '../pages/MyProfile/MyProfile.vue'
// import MySearch from '../pages/MySearch/MySearch.vue'
// import MyLogin from '../pages/MyLogin/MyLogin.vue'
// import MyShop from '../pages/MyShop/MyShop.vue'
// import MyShopGoods from '../pages/MyShop/MyShopGoods/MyShopGoods.vue'
// import MyShopRating from '../pages/MyShop/MyShopRating/MyShopRating.vue'
// import MyShopInfo from '../pages/MyShop/MyShopInfo/MyShopInfo.vue'

// 路由组件懒加载
const MySite =()=>import('../pages/MySite/MySite.vue')
const MyOrder =()=>import('../pages/MyOrder/MyOrder.vue')
const MyProfile =()=>import('../pages/MyProfile/MyProfile.vue')
const MySearch =()=>import('../pages/MySearch/MySearch.vue')
const MyLogin =()=>import('../pages/MyLogin/MyLogin.vue')
const MyShop =()=>import('../pages/MyShop/MyShop.vue')
const MyShopGoods =()=>import('../pages/MyShop/MyShopGoods/MyShopGoods.vue')
const MyShopRating =()=>import('../pages/MyShop/MyShopRating/MyShopRating.vue')
const MyShopInfo =()=>import('../pages/MyShop/MyShopInfo/MyShopInfo.vue')
const MyPreOrder =()=>import('../pages/MyShop/MyShopGoods//MyPreOrder/MyPreOrder.vue')
const MyPay =()=>import('../pages/MyShop/MyShopGoods//MyPay/MyPay.vue')
const MyOrderInfo =()=>import('../pages/MyOrder/MyOrderInfo/MyOrderInfo.vue')
const MyOrderRate =()=>import('../pages/MyOrder/MyOrderRate.vue')


//创建并暴露一个路由器
export default new VueRouter({
    routes:[  
        {
            name:'MySite',
            path:'/mysite',
            component:MySite,
            meta: { 
                showFooter:true,
             },
        },
        {
            name:'MyOrder',
            path:'/myorder',
            component:MyOrder,
            meta: { 
                showFooter:true,
             },
        },
        {
            name:'MyProfile',
            path:'/myprofile',
            component:MyProfile,
            meta: { 
                showFooter:true,
             },
        },
        {
            name:'MySearch',
            path:'/mysearch',
            component:MySearch,
            meta: { 
                showFooter:true,
             },
        },
        {
            name:'MyLogin',
            path:'/mylogin',
            component:MyLogin,
        },
        {
            name:'MyShop',
            path:'/myshop',
            component:MyShop,
            children:[
                {
                    name:'MyShopGoods',
                    path:'/myshop/myshopgoods',
                    component:MyShopGoods,
                },
                {
                    name:'MyShopInfo',
                    path:'/myshop/myshopinfo',
                    component:MyShopInfo,
                },
                {
                    name:'MyShopRating',
                    path:'/myshop/myshoprating',
                    component:MyShopRating,
                },
                {
                    path:'/',
                    redirect: '/myshop/myshopgoods'
                }
            ]
        },
        {
            name:'MyPreOrder',
            path:'/mypreorder',
            component:MyPreOrder,
        },
        {
            name:'MyPay',
            path:'/mypay',
            component:MyPay,
        },
        {
            name:'MyOrderInfo',
            path:'/myorderinfo',
            component:MyOrderInfo,
        },
        {
            name:'MyOrderRate',
            path:'/myorderrate',
            component:MyOrderRate,
        },
        // 加一个默认显示
        {
            path:'/',
            redirect: '/mysite'
        }
    ]
})