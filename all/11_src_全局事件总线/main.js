import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 向Vue原型上加入一个全局事件总线使用的vm或vc，保证所有组件都可以互相传递消息
new Vue({
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus=this
  }

}).$mount('#app')