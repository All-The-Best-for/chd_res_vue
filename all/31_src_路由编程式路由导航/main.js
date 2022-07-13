import Vue from 'vue'
import App from './App.vue'

//引入router插件，支持SAP单页面应用
import VueRouter from 'vue-router'

//引入路由配置文件
import routerOptions from './router/index'

//引入store
// import Store from './store/index'

Vue.config.productionTip = false

Vue.use(VueRouter)

new Vue({
  render: h => h(App),
  //传入vuex所需的store
  // store:Store,    
  // 安装全局总线
  beforeCreate () {
    Vue.prototype.$bus=this
  },
  // 配置router
  router:routerOptions
}).$mount('#app')