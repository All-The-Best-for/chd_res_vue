<template>
  <div class="my_pre_order">
      <div class="header">
        <div class="header_left">
          <button class="back" @click="$router.back()">
            <i class="iconfont icon-zuojiantou"></i>
          </button>
        </div>
        <div class="header_title">
          <h3 class="header_title_text">生成订单</h3>
        </div>
      </div>

<!-- 主体信息 -->
      <div class="content" v-if="newOrder.userId">
        <div class="stall_content">
          <!-- 店图标 -->
          <div class="stall-icon">
            <img :src="ImageBasePathHeader+newOrder.stallInfo.stallIcon">
          </div>
          <!-- 店名 -->
          <div class="stall-name">{{newOrder.stallInfo.stallName}}</div>
        </div>
        <!-- 菜品列表 -->
        <div class="dish_content">
          <ul class="dish_list">
            <li class="dish_li border-1px" v-for="(dish,index) in newOrder.orderDishs" :key="index">
              <a>
                <div class="dish_left">
                  <img class="dish_img" 
                  :src="dish.dishIcon?ImageBasePathHeader+dish.dishIcon:''">
                </div>
                <div class="dish_right">
                  <div class="dish_detail_header">
                    <h4 class="dish_title ellipsis">{{dish.dishName}}</h4>
                    <div class="dish_price">
                      ￥{{dish.dishPrice*dish.count}}
                    </div>
                  </div>
                  <div class="dish_count">
                    × {{dish.count}}
                  </div>
                </div>
              </a>
            </li>
            <!-- 小计栏 -->
            <li class="dish_li border-1px">
              <a>
                <div class="dish_right">
                  <div class="dish_detail_header">
                    <div class="dish_price">
                      小计 ￥{{newOrder.orderAmount}}
                    </div>
                  </div>
                </div>
              </a>
            </li>
          </ul>
        </div>
        <!-- 生成订单按钮 -->
        <div class="commit_order">
          <button class="commit_button" @click="commitOrder">
            提交订单
          </button>
        </div>
      </div>
  </div>
</template>

<script>
import {Toast} from 'mint-ui'
import {mapState,mapActions} from 'vuex'
import {reqOrderCreate} from '../../../../api/index'
export default {
    name:'MyPreOrder',
    components: {
    },
    data() {
      return {
        ImageBasePathHeader:this.GLOBALVAR.ImageBasePathHeader
      }
    },
    computed: {
     ...mapState('myShopAbout',['newOrder']),
     ...mapState('myUserAbout',['userInfo']), 
    },
    props:{
    },
    methods: {
      ...mapActions('myShopAbout',['reqSpringBootToCreateOrder','clearCart','changeNowOrderId']),
      ...mapActions('myOrderAbout',['getOrders']),
      // 提交订单
      async commitOrder(){
        this.result=await reqOrderCreate(
          {   userId:this.newOrder.userId,
              orderId:this.newOrder.orderId,
              orderAmount:this.newOrder.orderAmount,
              orderTime:this.newOrder.orderTime,
              orderDishs:this.newOrder.orderDishs,
              stallInfo:this.newOrder.stallInfo
          })
        if(this.result.code===200){
            Toast('提交成功')
            // 再清空购物车
            this.clearCart()
            // 最后跳转到支付页面
            //先修改当前vuex记录的订单ID
            this.changeNowOrderId({nowOrderId:this.newOrder.orderId})
            // 重新请求更新订单信息
            this.getOrders({userId:this.userInfo.userId})
            this.$router.replace('/mypay')
        }else{
            Toast('提交失败')
        }
      }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../../../common/stylus/mixins.styl"
.my_pre_order
  overflow scrollY
  width 100%
  height 100%
  background-color #F5F5F5
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
    .stall_content
      border-radius:2em
      border-style: solid
      background #F5FFFA
      margin: 10px
      width 95%
      height 60px
      .stall-icon
        position: relative
        top 15%
        left: 3%
        width 12%
        height 70%
        display: flex
        align-items: center
        justify-content: center
        img
          border-radius 50%
          width 100%
          height 100%
      .stall-name
        position: relative
        left 20%
        top -35%
        width: 30%
        height: 50%
      .arrow
        position: relative
        top -73%
        right -55%
        width 12px
        height 12px
        .icon-arrow-right
          color #000000
          font-size 25px

    .dish_content
      // margin-bottom 10px
      border-radius:1em
      border-style: solid
      background #F5FFFA
      margin: 10px
      width 95%
      .dish_list
        .dish_li
          border-radius:2em
          bottom-border-1px(#f1f1f1)
          width 100%
          >a
            clearFix()
            border-radius:2em
            display block
            box-sizing border-box
            padding 15px 8px
            width 100%
            .dish_left
              float left
              box-sizing border-box
              width 70px
              height 65px
              padding-right 10px
              .dish_img
                border-radius: 25% 
                display block
                width 100%
                height 100%
            .dish_right
              float right
              width 77%
              .dish_detail_header
                clearFix()
                width 100%
                .dish_title
                  float left
                  width 200px
                  color #333
                  font-size 16px
                  line-height 25px
                  font-weight 700
                .dish_price
                  float right
                  margin-top 3px
                  font-size 18px
                  color: #000000
                  .supports
                    float left
                    font-size 10px
                    color #999
                    border 1px solid #f1f1f1
                    padding 0 2px
                    border-radius 2px
              .dish_count
                clearFix()
                width 100%
                font-size: 14px
                margin-top 18px
                margin-bottom 8px
    .commit_order
      margin-bottom 30px
      width 100%        
      height: 50px
      .commit_button
        border-radius:1em
        margin: 10px 10px 0px 10px
        background #02a774 
        width: 95%
        height: 82%
        border: none
</style>