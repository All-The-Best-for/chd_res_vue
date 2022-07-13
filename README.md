# 笔记
    本项目为校园餐厅管理系统的线上点餐子系统。
    下载好本项目后，先npm install，再npm run serve
    本项目作者为wbs，在css样式上多有借鉴尚硅谷项目 谷粒外卖，在此表达诚挚谢意。
## ref属性
    1.用来给元素或子组件注册引用信息（id的替代者）
    2.应用在html标签上获取的是真是DOM元素，应用在组件标签上是组件实例对象vc
    3.使用方式：
        1.打标识：ref="xxx"
        2.获取：this.$refs.xxx

## 配置项props
    功能：让组件接收外部传来的数据
        1.传递数据：
            <Demo name="xxx">
        2.接收数据：
            1.简单接收：
                props:['name']
            2.类型限制：
                props:{
                    name:String
                }
            3.严格限制：
                props:{
                    name:{
                        type:String,
                        required:true,  //必要性
                        default:'老王'  //默认值
                    }
                }
    p.s: props是只读的，Vue底层会监测你对props的修改，如果进行了修改则会警
        告。若业务需求要求修改，则应该复制props到data中一份，然后进行修改


## mixin混入
    功能：可以将多个组件共享的配置提取成一个混入对象
    使用方式：
        1.定义混合对象
            {
                data(){...},
                methodes:{...},
                ....
            }
        2.使用混合
            1.全局混入：Vue.mixin(xxx)
            2.局部混入：mixins:[xxx]    

## 插件
    1.功能：增强Vue
    2.本质：包含install方法的一个对象，install的第一个参数是Vue，第二个及以后的参数是使用者传递的数据。
    3.定义插件：
        xxx.install=function(Vue,options){
            ...
        }
    4.使用插件：
        Vue.use(xxx)

## 组件化编码通用流程
    1.实现静态组件：将页面按照功能点拆分成组件，实现静态效果
    2.展示动态数据：
        1.数据的类型、名称
        2.数据保存的位置
            1.组件自身使用：放在其自身即可
            2.多个组件在用：放在共同的父组件上（状态提升）
    3.交互：从绑定事件开始
        1.props适用于
            1.父组件==>子组件
            2.子组件==>父组件：父组件先给子组件传一个函数
        2.全局事件总线等
    p.s:    使用v-model时，v-model不能绑定props传递的值

## 全局事件总线（GlobalEventBus)
    1.一种组件间通信的方式，适用于任何组件间通信
    2.安装全局事件总线：
        new Vue({
            ...
            beforeCreate(){
                Vue.prototype.$bus=this //安装全局事件总线，$bus就是当前应用的vm
            },
            ...
        })    
    3.使用事件总线：
        1.接收数据：A组件想接收数据，则在A组件中给$bus绑定自定义事件，事件的回调留在A组件中
            methods(){
                demo(data){
                    ...
                }
            },
            mounted(){
                this.$bus.$on('事件名称',this.demo)
            }
        2.提供数据：触发事件
            this.$bus.$emit('事件名称',data)
    4.最好在beforeDestroy钩子中，用$off解绑当前组件所用到的事件

## 消息订阅与发布（pubsub）
    1.一种组件间通信的方式，适用于任何组件间通信
    2.使用步骤：
        1.安装pubsub库:
            npm i pubsub-js
        2.引入:
            import pubsub from 'pubsub-js'
        3.接收数据: A组件想接收数据，则在A组件中订阅消息，订阅的回调留在A组件自身。
            methods(){
                demo(msgName,data){
                    ...
                },
                ...
            },
            mounted(){
                this.pubId=pubsub.subscribe('消息名称',this.demo)
            }
        4.提供数据：
            pubsub.publish('消息名称',data)
        5.最好在订阅消息的组件中的beforeDestroy钩子中，取消订阅
            pubsub.unsubscribe(this.pubId)

## $nextTick
    1.语法：this.$nextTick(回调函数)
    2.作用：在下一次DOM更新结束后执行其指定的回调
    3.作用场景：当改变数据后，要基于更新后的新DOM进行某种操作时，需要在$nextTick所指定的回调函数中执行

## Vue脚手架配置代理
    1.简单配置：在vue.config.js中添加。
        devServe:{
            proxy:"http://localhost:5000"
        }
        说明：
            1.优点：简单，请求资源时直接发送即可
            2.缺点：不能配置多个代理，不能灵活控制请求是否经过代理
            3.工作方式：若按照上述配置代理，当请求了前端不存在的资源时，该请求会转发给服务器（优先匹配代理服务器资源）
    2.详细配置：在vue.config.js中添加。
        module.exports = {
            devServer: {
                proxy: {
                '^/api': {          //请求前缀，使用此前缀的请求就使用代理，可以自定义
                    target: '<url>',
                    pathRewrite:{'^/serve1':''},    //重写请求，代理服务器会将请求中的请求前缀剔除后再转发给服务器
                    ws: true,            //用于支持websocket
                    changeOrigin: true//用于控制请求头中的host值，开启后，代理服务器会向最终请求服务器谎称请求来自与最终服务器相同的端口，通常开启
                },
                '^/foo': {      //另一个代理服务器配置
                    target: '<other_url>'
                }
                }
            }
        }
        说明：
            1.优点：可以配置多个代理，且可以灵活的控制请求是否经过代理
            2.缺点：配置略微繁琐，使用代理服务器时必须加请求前缀

## 插槽
    1.作用：让父组件可以向子组件指定位置插入html结构，也是一种组件间通信的方式，适用于 父组件==>子组件
    2.分类：默认插槽、具名插槽、作用域插槽
    3.使用方式：
        1.默认插槽：
            父组件中：
                <MyCategory>
                    <div>html结构</div>
                </MyCategory>
            子组件中：
                <template>
                    <div>
                        <slot>插槽默认内容</slot>
                    </div>
                </template>
        2.具名插槽
            父组件中：
                <MyCategory>
                    <template slot="center">
                        <div>html结构</div>     
                    </template>

                    <template slot="footer">
                        <div>html结构</div>
                    </template>
                </MyCategory>
            子组件中：
                <template>
                    <div>
                        <slot name="center">插槽默认内容1</slot>
                        <slot name="footer">插槽默认内容1</slot>
                    </div>
                </template>
        3.作用域插槽
            1.理解：数据在组件自身，但展示的html结构由组件的使用者决定
            2.具体编码：
                父组件中：
                    <MyCategory>
                        <template scope="scpoeData">
                            <ul>
                                <li v-for="(item,index) in scpoeData.list" :key="index">{{item}}</li>
                            </ul>
                        </template>
                    </MyCategory>

                    <MyCategory>
                        <template scope="{{list}}">
                            <ol>
                                <li v-for="(item,index) in list" :key="index">{{item}}</li>
                            </ol>
                        </template>
                    </MyCategory>
                子组件中：
                    <template>
                        <div>
                            <slot :list="list">插槽默认内容</slot>
                        </div>
                    </template>

                    <script>
                        export default {
                            name:'MyCategory',
                            data () {
                                return {
                                    list:['LOL','鬼谷八荒','太吾绘卷','修仙模拟器']
                                }
                            },
                        }
                    </script>

## Vuex插件
    1.概念：在Vue中实现集中式状态（数据）管理的一个Vue插件，对Vue应用中多个组件的共享状态进行集中式的管理，也是一种组件间通信的方式，用于在任意组件间通信。
    2.使用场景：多个组件需要共享数据时
    3.搭建Vuex环境
        1.创建文件：src/store/index.js
            //引入Vue和Vuex
            import Vue from 'vue'
            import Vuex from 'vuex'
            //准备actions--用于响应组件中的动作
            const actions={}
            //准备mutations--用于操作state中的数据
            const mutations={}
            //准备state--用于存储数据
            const state={}
            //使用vuex插件
            Vue.use(Vuex)
            //创建并暴露store
            export default new Vuex.Store({
                actions:actions,
                mutations:mutations,
                state:state,
            })
        2.在main.js中创建vm时传入store配置项
            ...
            //引入store
            import Store from './store/index.js'
            ...
            //创建vm
            new Vue({
                render: h => h(App),
                //传入vuex所需的store
                store:Store,    
            }).$mount('#app')
    4.具体使用见23_src_求和案例Vuex版
    5.四个map方法的使用
        1.mapState：用于帮助我们映射state中的数据为计算属性
                computed: {
                    ...mapState(['schoolName','subject','sum']),
                    ...mapGetters(['bigSum'])
                }
        2.mapGetters:用于帮助我们映射Getters中的数据作为计算属性，同上
        3.mapActions:用于帮助我们生成与actions对话的方法
                methods: {
                    ...mapMutations({'increment':'INCREMENT','decrement':'DECREMENT'}),
                    ...mapActions(['incrementWhenOdd','incrementWait'])
                },
        4.mapMutations:用于帮助生成与mutations对话的方法，见上