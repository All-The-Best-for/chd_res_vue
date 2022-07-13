<template>
  <div class="order_container">
    <ul class="order_list">
        <li class="order_li border-1px" v-for="(order,index) in showOrdersBystyle" :key="index"
        @click="goOrderInfo(order.orderId)"
        >
          <a>
            <!-- 订单标签中上方信息 -->
              <div class="order_top">
                <img class="stall_img" :src="order.stallInfo.stallIcon?ImageBasePathHeader+order.stallInfo.stallIcon:''">
                <div class="stall_name">{{order.stallInfo.stallName}}</div>
                <div class="order_state">{{stateText[order.isPay-1]}}</div>
              </div>
              <!-- 订单标签中中间详情信息 -->
              <div class="order_main">
                <div class="order_dishs">{{order.ordeDishsText}}</div>
                <div class="order_time">{{order.orderTime}}</div>
                <div class="order_amount">￥{{order.orderAmount}}</div>
              </div>
              <!-- 订单标签中下方按钮信息 -->
              <div class="order_button" >
                <button @click.stop="rateOrder(order.orderId)" v-show="order.isPay===4">去评价</button>
                <button @click.stop="payOrder(order.orderId)" v-show="order.isPay===2">去支付</button>
                <button @click.stop="cancelOrder(order.orderId)" v-show="order.isPay===2">取消订单</button>
                <button @click.stop="pickOrder(order.orderId)" v-show="order.isPay===3">取餐码</button>
                <button @click.stop="deleteOrder(order.orderId)" v-show="order.isPay===1||order.isPay===5||order.isPay===4">删除订单</button>
                <button @click.stop="orderAgain(order.orderId)" style="color:coral">再来一单</button>
              </div>
          </a>
        </li>
    </ul>
    <MyQRCode ref="myqrcode"/>
  </div>
</template>

<script>
import {Toast} from 'mint-ui'
import {mapActions,mapState} from 'vuex'
import {reqDeleteOrder,reqCancelOrder} from '../../api/index'
import MyQRCode from '../../components/MyQRCode/MyQRCode.vue'
export default {
    name:'MyOrderList',
    components: {
      MyQRCode,
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
      ...mapState('myOrderAbout',['nowOrder','orders']),
      ...mapState('myShopAbout',['goods']),
      orders(){
        var brr=this.showOrdersBystyle
        return brr.reverse()
      }
    },
    props:{
      showOrdersBystyle:Array
    },
    methods: {
      ...mapActions('myOrderAbout',['setNowOrderId','setNowOrder','getOrders','setX']),
      ...mapActions('myShopAbout',['changeNowOrderId','changeId','updateFoodCount']),
      // 跳转到订单详情页面
      goOrderInfo(nowOrderId){
        this.setNowOrderId({nowOrderId})
        this.setNowOrder()
        this.$router.push('/myorderinfo')
      },
      // 删除订单
      async deleteOrder(nowOrderId){
        let result=await reqDeleteOrder({orderId:nowOrderId})
        if(result.code===200){
          Toast('删除成功')
          this.setX();
        }else{
          Toast('删除失败')
        }
      },
      // 评价订单
      rateOrder(nowOrderId){
        // console.log('@','评价订单')
        this.setNowOrderId({nowOrderId})
        this.setNowOrder()
        this.$router.push('/myorderrate')
      },
      // 支付订单
      payOrder(nowOrderId){
        this.setNowOrderId({nowOrderId})
        this.setNowOrder()
        this.changeNowOrderId({nowOrderId})
        this.$router.push('/mypay')
      },
      // 取消订单
      async cancelOrder(nowOrderId){
        this.setNowOrderId({nowOrderId})
        this.setNowOrder()
        // 向后台发送取消订单请求，将订单状态设置为5
        let result=await reqCancelOrder({orderId:nowOrderId})
        if(result.code===200){
          this.setX();
          Toast('取消成功')
        }else{
          Toast('取消失败')
        }
      },
      // 出示取餐码
      pickOrder(nowOrderId){
        this.setNowOrderId({nowOrderId})
        this.setNowOrder()

        this.showQRCode()
      },
      // 再来一单
      orderAgain(nowOrderId){
        this.orders.forEach(order => {
          if(order.orderId===nowOrderId){
            if(order.stallInfo.isWork!==1){
              Toast('该商家尚未营业，请稍后再来')
            }else{
              this.setNowOrderId({nowOrderId})
              this.setNowOrder()
              // 更新myShopAbout中的数据
              this.changeId({stallId:this.nowOrder.stallId})
              // 跳转到对应商家页面
              this.$router.push('/myshop')
              // 将订单中的商品添加到购物车中
                // 从订单中遍历商品id，到shop中寻找对应商品信息进行添加
              this.nowOrder.orderInfo.forEach(info => {
                this.goods.forEach(goodClass => {
                  goodClass.dishInfoList.forEach( dish=> {
                    if(info.orderDish===dish.dishId){
                      for (let i = 0; i < info.count; i++) {
                        this.updateFoodCount({isAdd:true,food:dish})
                      }
                    }
                  });
                });
              });
            }
          }
        });

      },
      // 显示取餐码
      showQRCode(){
        // 显示取餐组件，在父组件中调用子组件对象的方法
        this.$refs.myqrcode.changeShowFoodDetail()
      }
    }

}
</script>

<style lang='stylus' rel='stylesheet/stylus'>
@import "../../common/stylus/mixins.styl"
.order_container
  overflow hidden
  margin-bottom 95px
  .order_list
    padding-bottom: 50px
    background-color: #f1f1f1
    width: 100%
    margin-left: 2.5%
    .order_li
      margin-top: 6px
      background-color: #fff
      bottom-border-1px(#f1f1f1)
      width 95%
      border-radius: 5px
      >a
        clearFix()
        display block
        box-sizing border-box
        padding 15px 8px
        width 100%
        .order_top
          box-sizing border-box
          width 100%
          height 25px
          padding-right 10px
          .stall_img
            display block
            width 8%
            height 100%
          .stall_name
            color: #000
            position: absolute
            top: 20px
            font-size: 15px
            left 40px
          .order_state
            position: absolute
            top: 20px
            font-size: 14px
            right 20px
        .order_main
          width 100%
          height: 50px
          border-bottom-color: #f1f1f1
          border-bottom-width: 1px
          .order_dishs
            position: absolute
            top: 55px
            font-size: 14px
            left 20px
            color: #000
            width: 250px
            height: 14px
            overflow: hidden  //溢出内容隐藏
            white-space: nowrap  //强制文本在一行内显示
            text-overflow: ellipsis //当对象内文本溢出时显示省略标记
          .order_time
            position: absolute
            top: 72px
            font-size: 12px
            left 20px
          .order_amount
            position: absolute
            top: 50px
            font-size: 23px
            right 20px
            color: #000
        .order_button
          display: flex;
          justify-content: flex-end;
          width: 100%
          height: 30px
          button
            width: 80px
            height: 25px
            background: #fff
            margin-inline: 5px
            margin-top: 7px
            border-width: 1px
            border-radius: 12px
            border-color: #f1f1f1
            box-shadow: 0 0px 0px #fff;
            font-size: 14px

</style>