import Vue from 'vue'
import App from './App.vue'
// 引入vuex
// import Vuex from 'vuex'
//引入store
import Store from './store/index'

Vue.config.productionTip = false

//引入和应用Vuex插件都放在./store/index.js中进行
//使用vuex插件,之后创建vm时就可以传入一个store了
// Vue.use(Vuex)

new Vue({
  render: h => h(App),
  //传入vuex所需的store
  store:Store,    
  // 安装全局总线
  beforeCreate () {
    Vue.prototype.$bus=this
  }
}).$mount('#app')