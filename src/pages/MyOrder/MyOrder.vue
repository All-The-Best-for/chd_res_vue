<template>
    <div>
      <section class="order">
        <MyHeader title="订单列表"></MyHeader>
        <section class="order_no_login" v-show="!userInfo.userId">
          <img src="./images/person.png">
          <h3>登录后查看订单</h3>
          <router-link to="/mylogin" class="login_button">立即登陆</router-link>
        </section>
        <div class="orders_top" v-show="orders.length">
        <!-- 标签卡 -->
          <div class="tab">
            <div class="tab-item" @click="ordersStyle=0">
              <h4>所有</h4>
            </div>
            <div class="tab-item" @click="ordersStyle=1">
              <h4>已完成</h4>
            </div>
            <div class="tab-item" @click="ordersStyle=2">
              <h4>待支付</h4>
            </div>
            <div class="tab-item" @click="ordersStyle=3">
              <h4>待取餐</h4>
            </div>
            <div class="tab-item" @click="ordersStyle=4">
              <h4>待评价</h4>
            </div>
            <div class="tab-item" @click="ordersStyle=5">
              <h4>已取消</h4>
            </div>
          </div>
        </div>
        <div class="orders" v-show="orders.length">
          <MyOrderList ref="orderCom" :showOrdersBystyle="ordersByStyle"/>
        </div>
      </section>
    </div>
</template>

<script>
import Vue from 'vue'
import MyHeader from '../../components/MyHeader/MyHeader.vue'
import MyOrderList from '../../components/MyOrderList/MyOrderList.vue'
import {mapState,mapActions} from 'vuex'

export default {
  name:'MyOrder',
  components: {
    MyHeader,
    MyOrderList
  },
  data () {
    return {
      ordersStyle:0,  
    }
  },
  computed: {
    ...mapState('myUserAbout',['userInfo']),
    ...mapState('myOrderAbout',['orders','updateX']),
    ...mapState('mySiteAbout',['shops']),
    ordersByStyle(){
      var brr=[]
      // 由标签生成不同的订单列表
      if(this.ordersStyle===0){
        // 生成所有列表
        brr=this.orders
      }else{
        let thestyle=this.ordersStyle
        // 生成其他各种列表
        brr = this.orders.filter(function (order) {
          return order.isPay===thestyle
        })
      }
      // 为订单增加新的信息
      brr.forEach(order => {
        // 为订单信息增加商家信息
        this.shops.forEach(stall => {
          if(stall.stallInfo.stallInfo.stallId===order.stallId){
            Vue.set(order,'stallInfo',stall.stallInfo.stallInfo)
          }
        });
        // 为订单信息增加详细信息以及详情文本
        let orderDishText=''
          // 遍历订单详情中的orderInfo
        order.orderInfo.forEach(info => {
          // 根据orderInfo找出shop中的菜品名称组成字符串
          this.shops.forEach(shop => {
            shop.dishInfo.dishInfo.forEach(dishClass => {
              dishClass.dishInfoList.forEach( dish=> {
                if(dish.dishId===info.orderDish){
                  if(orderDishText===''){
                    orderDishText=orderDishText+dish.dishName+'×'+info.count
                  }else{
                    orderDishText=orderDishText+'+'+dish.dishName+'×'+info.count
                  }
                  // 增加订单中商品详情
                  Vue.set(info,'goodName',dish.dishName)
                  Vue.set(info,'goodIcon',dish.dishIcon)
                  Vue.set(info,'goodPrice',dish.dishPrice)
                }
              });
            });
          });
          Vue.set(order,'ordeDishsText',orderDishText)
        });
      });
      return brr;
    }
  },
  methods: {
    ...mapActions('myOrderAbout',['getOrders']),
  },
  mounted () {
    // 获取订单列表
    this.$nextTick(()=>{
      this.getOrders({userId:this.userInfo.userId})
    })
  },
  watch: {
    'ordersByStyle':{
      deep:true,
      handler(){
        // 强制更新订单列表组件
        this.$refs.orderCom.$forceUpdate();
      }
    },
    'updateX':{
      handler(){
        // 强制更新订单列表组件
        this.getOrders({userId:this.userInfo.userId})
        this.$refs.orderCom.$forceUpdate();
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixins.styl"
.order
  width 100%
  .order_no_login
    padding-top 140px
    width 60%
    margin 0 auto
    text-align center
    >img
      display block
      width 100%
      height 30%
    >h3
      padding 10px 0
      font-size 17px
      color #6a6a6a
    .login_button
      display inline-block
      background #02a774
      font-size 14px
      color #fff
      border 0
      outline none
      border-radius 5px
      padding 10px 20px
  .orders_top
    height: 30px 
    position: fixed
    top: 45px
    width 100%
    z-index 1
    .tab
      position: fixed
      width 100%
      height 40px
      line-height 40px
      background #fff
      bottom-border-1px(rgba(7, 17, 27, 0.1))
      .tab-item
        float left
        width: 16.66666%
        text-align center
        font-size 14px
        color rgb(77, 85, 93)
        a
          display block
          position relative
          &.router-link-active
            color #02a774
            &::after
              content ''
              position absolute
              left 50%
              bottom 1px
              width 35px
              height 2px
              transform translateX(-50%)
              background #02a774
  .orders
    margin-top: 80px
    width: 100%
</style>