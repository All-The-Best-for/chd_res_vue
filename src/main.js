import Vue from 'vue'
import App from './App.vue'

//引入router插件，支持SAP单页面应用
import VueRouter from 'vue-router'

//引入路由配置文件
import routerOptions from './router/index'

//引入store
import Store from './store/index'

// 引入MintUI中的Button组件
import {Button} from 'mint-ui'
import 'mint-ui/lib/style.css'

// 引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
Vue.use(ElementUI, { locale })

// 引入图片懒加载lazyload
import VueLazyload from 'vue-lazyload'
import loading from './common/imgs/loading.gif'

// 引入并使用自定义的全局变量
import globalVar from './common/global/global'
Vue.prototype.GLOBALVAR=globalVar

Vue.config.productionTip = false

Vue.use(VueRouter)
// 解决报错
const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
// push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
// replace
VueRouter.prototype.replace = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
  return originalReplace.call(this, location).catch(err => err)
}

// 注册全局组件标签<mt-button>
Vue.component(Button.name,Button)

// 使用lazyload图片懒加载
Vue.use(VueLazyload,{ //内部自定义一个指令lazy
  loading:loading
})

new Vue({
  render: h => h(App),
  //传入vuex所需的store
  store:Store,    
  // 安装全局总线
  beforeCreate () {
    Vue.prototype.$bus=this
  },
  // 配置router
  router:routerOptions
}).$mount('#app')