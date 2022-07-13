/* 
  该文件是整个项目的入口文件
  */
//  引入Vue
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false


// 创建Vue实例对象vm
new Vue({
  // el:'#app',
  //将App组件放入容器中
  render: h => h(App),

  //脚手架引入的是精简版本的Vue，不能解析模板，使用渲染函数创建元素
  // render(createElement){
  //   return createElement('h1','你好啊')
  // }

}).$mount('#app')