import Vue from 'vue'
import App from './App.vue'
import plugins from './plugins'

Vue.config.productionTip = false

//必须在创建vm之间应用插件
Vue.use(plugins)

new Vue({
  render: h => h(App),

}).$mount('#app')