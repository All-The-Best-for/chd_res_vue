<template>
  <div class="my_order">
    <div class="header">
      <div class="header_left">
        <button class="back" @click="$router.back()">
          <i class="iconfont icon-zuojiantou"></i>
        </button>
      </div>
      <div class="header_title">
        <h3 class="header_title_text">订单详情</h3>
      </div>
    </div>
    <div class="content">
      <!-- 订单状态 -->
      <div class="order_state">{{stateText[nowOrder.isPay-1]}}</div>
      <!-- 订单基础信息，包括餐厅、时间 -->
      <div class="order_base">
        <div class="base_title">订单基础信息</div>
        <div class="aline"></div>
        <!-- 餐厅地址 -->
        <div class="res_address_left">餐厅地址</div>
        <div class="res_address_right">{{nowOrder.stallInfo.resAddress}}</div>
        <div class="aline_2"></div>
        <!-- 订单时间 -->
        <div class="order_time_left">订单时间</div>
        <div class="order_time_right">{{nowOrder.orderTime}}</div>
      </div>
      <!-- 商铺以及商品信息 -->
      <div class="order_info">
        <!-- 上部分名称：商家名称 -->
        <div class="top_text">{{nowOrder.stallInfo.stallName}}</div>
        <!-- 下部分商品信息列表 -->
        <ul class="order_list" v-for="(good,index) in nowOrder.orderInfo" :key="index">
          <li class="ordergood_li">
            <a>
              <!-- 商品图片 -->
              <div class="order_main">
                <img class="goodIcon" :src="ImageBasePathHeader+good.goodIcon">
                <!-- 名称、数量、价格 -->
                <div class="nameText">{{good.goodName}}</div>
                <div class="goodCount">×{{good.count}}</div>
                <div class="goodPrice">￥{{good.goodPrice*good.count}}</div>
              </div>
            </a>
          </li>
        </ul>
        <!-- 总价 -->
        <div class="order_amount">
          <h4>总计  ￥{{nowOrder.orderAmount}}</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
export default {
    name:'MyOrderInfo',
    components: {
    },
    data () {
      return {
        stateText:['已完成','待支付','待取餐','待评价','已取消'], 
        ImageBasePathHeader:this.GLOBALVAR.ImageBasePathHeader 
      }
    },
    computed: {
      ...mapState('myUserAbout',['userInfo']),
      ...mapState('mySiteAbout',['shops']),
      ...mapState('myOrderAbout',['nowOrder']),
    },
    methods: {
    },
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../../common/stylus/mixins.styl"
.my_order
  overflow scrollY
  width 100%
  height 100%
  background-color #f1f1f1
  .header
    background-color #02a774 
    width 100%
    height 45px
    .header_left
      height 40px
      width 40px
      .back
        position: absolute
        top: 10px
        left: 0
        background-color #02a774 
        border: none
        .icon-zuojiantou
          display: block
          padding: 5px
          font-size: 20px
          color: #fff
    .header_title
      position absolute
      top 50%
      left 50%
      transform translate(-50%, -50%)
      width 50%
      text-align center
      .header_title_text
        font-size 20px
  .content
    margin-top 45px
    width: 100%
    height: 100%
    padding-top: 7px
    .order_state
      margin-left 10px
      color: #000
      font-size 30px
    .order_base
      height: 135px
      margin-top 10px
      margin-left: 2.5%
      width 95%
      background-color: #fff
      border-radius: 10px
      .aline
        padding-bottom: 6px
        border-bottom: 1px solid #f1f1f1
      .base_title
        padding-top: 20px
        font-size 15px
        color: #000
        margin-left: 3px
      .res_address_left
        position: absolute
        top: 145px
        left 15px
        font-size: 15px
        color: #7e8c8d
      .res_address_right
        position: absolute
        top: 145px
        right 15px
        font-size: 15px
        font-color: #000
      .aline_2
        padding-bottom: 38px
        border-bottom: 1px solid #f1f1f1
      .order_time_left
        position: absolute
        top: 185px
        left 15px
        font-size: 15px
        color: #7e8c8d
      .order_time_right
        position: absolute
        top: 185px
        right 15px
        font-size: 15px
        font-color: #000
    .order_info
      margin-top 20px
      margin-left: 2.5%
      width 95%
      background-color: #fff
      border-radius: 5px
      overflow hidden
      .top_text
        padding-top: 15px
        padding-left: 5px
        font-size: 14px
        color: #7e8c8d
      .order_list
        background-color: #f1f1f1
        width:100%
        margin-left: 2.5%
        .ordergood_li
          margin-top: 6px
          background-color: #fff
          bottom-border-1px(#f1f1f1)
          width 100%
          border-radius: 5px
          >a
            clearFix()
            display block
            box-sizing border-box
            padding-top 15px
            .order_main
              width 100%
              height: 80px
              border-bottom-color: #f1f1f1
              border-bottom-width: 1px
              .goodIcon
                position: absolute
                width 70px
                height 60px
                display: block
              .nameText
                color: #000
                position: absolute
                top: 20px
                font-size: 16px
                left 90px
              .goodPrice
                position: absolute
                top: 30px
                font-size: 18px
                right 20px
                color: #000
              .goodCount
                position: absolute
                top: 55px
                font-size: 14px
                left 100px
                font-color: #000
                width: 250px
                height: 14px
      .order_amount
        display: flex;
        justify-content: flex-end;
        width: 100%
        height: 30px
        margin-bottom: 10px
        h4
          margin-right: 5px
          height: 25px
          background: #fff
          margin-inline: 5px
          margin-top: 7px
          font-size: 20px

</style>