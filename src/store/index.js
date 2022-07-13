//该文件用于创建vuex中最为核心的store

//引入Vue和Vuex
import Vue from 'vue'
import Vuex from 'vuex'

//引入关于mysite的vuex配置
import mySiteAbout from './mySiteAbout'
import myUserAbout from './myUserAbout'
import myShopAbout from './myShopAbout'
import mySearchAbout from './mySearchAbout'
import myOrderAbout from './myOrderAbout'

//使用vuex插件
Vue.use(Vuex)

//创建并暴露store
export default new Vuex.Store({
    //引入一个mysite有关的配置，可以引入多个不同的配置
    modules: {
        mySiteAbout,
        myUserAbout,
        myShopAbout,
        mySearchAbout,
        myOrderAbout
    }
})