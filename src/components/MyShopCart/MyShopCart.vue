<template>
  <div>
    <div class="shopcart" >
        <div class="content" @click="changeIsListShow">
            <div class="content-left">
                <div class="logo-wrapper">
                    <div class="logo" :class="{highlight:totalCount}">
                        <i class="iconfont icon-cart-full" :class="{highlight:totalCount}"></i>
                    </div>
                    <div class="num" v-if="totalCount">{{totalCount}}</div>
                </div>
                <div class="price" :class="{highlight:totalCount}">￥{{totalPrice}}</div>
            </div>
            <!-- 右侧，去结算 文本 -->
            <div class="content-right" @click.stop="toPay">
                <div class="pay" :class="payClass">
                    去结算
                </div>
            </div>
        </div>
        <transition name="move">
            <div class="shopcart-list" v-show="listShow">
                <div class="list-header">
                    <h1 class="title">购物车</h1>
                    <span class="empty" @click="clearShopCart">清空</span>
                </div>
                <div class="list-content">
                    <ul>
                        <li class="food" v-for="(food,index) in nowStallCart" :key="index">
                            <span class="name">{{food.dishName}}</span>
                            <div class="price"><span>￥{{food.dishPrice}}</span></div>
                            <div class="cartcontrol-wrapper">
                              <div class="cartcontrol">
                                  <!-- 减号 -->
                                <transition name="move">
                                  <div class="iconfont icon-minus" v-if="food.count" @click.stop="toUpdateFoodCount(false,food)"/>
                                </transition>
                                <!-- 选择的数量 -->
                                <div class="cart-count" v-if="food.count">{{food.count}}</div>
                                <!-- 加号 -->
                                <div class="iconfont icon-add1" @click.stop="toUpdateFoodCount(true,food)" />
                              </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </transition>
    </div>
    <div class="list-mask" v-show="listShow" @click="changeIsListShow"></div>
  </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
import BScroll from 'better-scroll'
import {MessageBox} from 'mint-ui'

import MyCartControl from '../MyCartControl/MyCartControl.vue'
export default {
    name:'MyShopCart',
    components: {
      MyCartControl,  
    },
    data () {
        return {
            isListShow:false,
            nowStallCart:[],
            totalPrice:0,
            totalCount:0,
        }
    },
    watch:{
      'carts':{
        immediate:true,
        deep:true,
        handler(){
          this.carts.forEach(cart => {
            if(cart.stallId===this.stallId){
              // 更新购物车信息
                this.nowStallCart= cart.cartFoods
              // 更新totalCount信息
              // 更新totalPrice信息
                let count=0
                let price=0
                cart.cartFoods.forEach(food => {
                  count+=food.count
                  price=price+food.count*food.dishPrice
                });
                this.totalCount=count
                this.totalPrice=price
            }
          });
        }
      }
    },
    computed: {
        ...mapState('myShopAbout',['carts','info','stallId']),
        ...mapState('myUserAbout',['userInfo']),
        payClass(){
            const {totalPrice}=this
            return totalPrice>0?'enough':'not-enough'
        },
        // 根据数量控制购物车列表是否显示
        listShow(){
            // 如果数量为0，则不显示，否则根据isListShow控制显示与否
            if(this.totalCount===0){
                this.isListShow=false
                return false
            }
            // 创建列表滚动
            if(this.isListShow){
                this.$nextTick(()=>{
                    // 判断是否为单例
                    if(!this.scroll){
                        this.scroll=new BScroll('.list-content',{
                            click:true
                        })
                    }
                })
            }
            return this.isListShow
        }
    },
    methods: {
        ...mapActions('myShopAbout',['clearCart','updateFoodCount','createOrder']),
        toUpdateFoodCount(isAdd,food){
            this.updateFoodCount({isAdd,food})
        },
        toPay(){
          // 发送订单请求信息之前先判断是否登录
          if(this.userInfo.userId){
            // 登录则进行下一步操作
            // 先向vuex发送生成订单请求，生成一个临时订单信息
            this.createOrder({totalPrice:this.totalPrice,userId:this.userInfo.userId})
            // 再跳转到预订单页面
            this.$router.push('/mypreorder')
          }else{
            // 未登录跳转到登陆界面
            this.$router.push('/mylogin')
          }
        },
        clearShopCart(){
            MessageBox.confirm('', { 
                message: '确定清空购物车？', 
                title: '警告', 
            }).then(action => { 
                    if (action == 'confirm') {     //确认的回调
                        this.clearCart()
                    }
                    }).catch(err => { 
                    if (err == 'cancel') {     //取消的回调
                        return
                    } 
                }
            )
        },
        changeIsListShow(){
            if(this.totalCount>0){
                this.isListShow=!this.isListShow
            }
        },
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"

  .shopcart
    position fixed
    left 0
    bottom 0
    z-index 50
    width 100%
    height 48px
    .content
      display flex
      background #141d27
      font-size 0
      color rgba(255, 255, 255, 0.4)
      .content-left
        flex 1
        .logo-wrapper
          display inline-block
          vertical-align top
          position relative
          top -10px
          margin 0 12px
          padding 6px
          width 56px
          height 56px
          box-sizing border-box
          border-radius 50%
          background #141d27
          .logo
            width 100%
            height 100%
            border-radius 50%
            text-align center
            background #2b343c
            &.highlight
              background $green
            .icon-cart-full
              line-height 44px
              font-size 24px
              color #80858a
              &.highlight
                color #fff
          .num
            position absolute
            top 0
            right 0
            width 24px
            height 16px
            line-height 16px
            text-align center
            border-radius 16px
            font-size 9px
            font-weight 700
            color #ffffff
            background rgb(240, 20, 20)
            box-shadow 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .price
          display inline-block
          vertical-align top
          margin-top 5px
          line-height 24px
          padding-right 12px
          box-sizing border-box
          font-size 16px
          font-weight 700
          color #fff
          &.highlight
            color #fff
        .desc
          display inline-block
          vertical-align bottom
          margin-bottom 15px
          margin-left -45px
          font-size 10px
      .content-right
        flex 0 0 105px
        width 105px
        .pay
          height 48px
          line-height 48px
          text-align center
          font-size 12px
          font-weight 700
          color #fff
          &.not-enough
            background #2b333b
          &.enough
            background #00b43c
            color #fff
    .ball-container
      .ball
        position fixed
        left 32px
        bottom 22px
        z-index 200
        transition all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
        .inner
          width 16px
          height 16px
          border-radius 50%
          background $green
          transition all 0.4s linear
    .shopcart-list
      position absolute
      left 0
      top 0
      z-index -1
      width 100%
      transform translateY(-100%)
      &.move-enter-active , &.move-leave-active
        transition transform 0.3s
      &.move-enter, &.move-leave-to
        transform translateY(0)
      .list-header
        height 40px
        line-height 40px
        padding 0 18px
        background #f3f5f7
        border-bottom 1px solid rgba(7, 17, 27, 0.1)
        .title
          float left
          font-size 14px
          color rgb(7, 17, 27)
        .empty
          float right
          font-size 12px
          color rgb(0, 160, 220)

      .list-content
        padding 0 18px
        max-height 217px
        overflow hidden
        background #fff
        .food
          position relative
          padding 12px 0
          box-sizing border-box
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          .name
            line-height 24px
            font-size 14px
            color rgb(7, 17, 27)
          .price
            position absolute
            right 90px
            bottom 12px
            line-height 24px
            font-size 14px
            font-weight 700
            color rgb(240, 20, 20)
          .cartcontrol-wrapper
            position absolute
            right 0
            bottom 6px
            .cartcontrol
              font-size: 0
              .cart-decrease
                display: inline-block
                padding: 6px
                line-height: 24px
                font-size: 24px
                color: rgb(0, 160, 220)

              .icon-minus
                display: inline-block
                padding 6px
                line-height 24px
                font-size 24px
                color $green
                &.move-enter-active,&.move-leave-active
                  transition all 0.5s
                &.move-enter,&.move-leave-to
                  transform translateX(15px) rotate(360deg)
                  opacity 0
              .cart-count
                display: inline-block
                vertical-align: top
                width: 12px
                padding-top: 6px
                line-height: 24px
                text-align: center
                font-size: 15px
                color: rgb(147, 153, 159)
              .icon-add1
                display: inline-block
                padding: 6px
                line-height: 24px
                font-size: 24px
                color $green

  .list-mask
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    z-index 40
    backdrop-filter blur(10px)
    opacity 1
    background rgba(7, 17, 27, 0.6)
    &.fade-enter-active , &.fade-leave-active
      transition opacity 0.3s
    &.fade-enter , &.fade-leave-to
      opacity 0
      /*background rgba(7, 17, 27, 0)*/
</style>
