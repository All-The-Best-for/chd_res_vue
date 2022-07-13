<template>
   <div class="my_pay">
       <!-- 头部 -->
      <div class="header">
        <div class="header_left">
          <button class="back" @click="$router.back()">
            <i class="iconfont icon-zuojiantou"></i>
          </button>
        </div>
        <div class="header_title">
          <h3 class="header_title_text">支付订单</h3>
        </div>
      </div>
      <!-- 内容 -->
      <div class="mycontent" v-if="nowOrder.userId">
          <div class="my_price_content">
              <div class="pay_text">
                ￥{{nowOrder.orderAmount}}
              </div>
          </div>
          <div class="pay_tool_content">
            <div class="tool_list">
              <div class="tool_li">
                <a>
                  <div class="tool_left">
                    <i class="iconfont icon-qianbao"></i>
                  </div>
                  <div class="tool_right">
                    <div class="tool_header">
                      <div class="tool_title">
                        余额支付
                      </div>
                      <div class="tool_button">
                        <input type="radio" name="tool" @click="tool=true" checked>
                      </div>
                    </div>
                    <div class="yue_count">
                      钱包余额 ￥{{userInfo.userAccount}}
                    </div>
                  </div>
                </a>
              </div>
              <div class="tool_li">
                <a>
                  <div class="tool_left">
                    <i class="iconfont icon-weixin"></i>
                  </div>
                  <div class="tool_right">
                    <div class="tool_header">
                      <div class="tool_title">
                        微信支付
                      </div>
                      <div class="tool_button">
                        <input type="radio" name="tool"  @click="tool=false">
                      </div>
                    </div>
                  </div>
                </a>
              </div>

            </div>
          </div>
          <!-- 立即支付按钮 -->
          <div class="commit_pay">
            <button class="pay_button" @click="toPay">
              立即支付
            </button>
          </div>
      </div>

  </div>
</template>

<script>
import {Toast} from 'mint-ui'
import {mapState,mapActions,mapGetters} from 'vuex'
import {reqPay,reqConsumeAccount} from '../../../../api/index'
export default {
    name:'MyPay',
    data () {
        return {
            nowOrder:{},
            tool:true,//true标识选中余额,false标识选中微信
        }
    },
    computed: {
        ...mapState('myShopAbout',['nowOrderId','newOrder','userOrders']),
        ...mapState('myUserAbout',['userInfo']),
        ...mapGetters('myOrderAbout',['nowOrder_fuben']),
    },
    methods: {
      ...mapActions('myUserAbout',['consumeAccount']),
        async toPay(){
          // 后期可以加一个微信支付的接口

          // 现阶段认为点击就完成了支付
          // 先判断选择的是什么工具
          if(this.tool===true){
            // 余额支付则判断账户余额是否足够支付
            if(this.userInfo.userAccount<this.nowOrder.orderAmount){
              // 不足够支付则提示
              Toast('余额不足，请选择其他支付方式')
            }else{
              // 足够支付则发送支付请求并扣款
              const result= await reqPay({orderId:this.nowOrder.orderId})
              if(result.code===200){
                Toast('支付成功')
                // 前端扣款
                this.consumeAccount(this.nowOrder.orderAmount)
                // 发送余额扣款请求
                await reqConsumeAccount({userId:this.userInfo.userId,orderAmount:this.nowOrder.orderAmount})
                this.$router.back()
              }else{
                Toast('支付失败')
              }
            }
          }else{
            // 微信支付则直接完成支付
            const result=await reqPay({orderId:this.nowOrder.orderId})
            if(result.code===200){
              Toast('支付成功')
              this.$router.back()
            }else{
              Toast('支付失败')
            }
          }
        }
    },
    watch: {
      'nowOrderId':{
        immediate:true,
        handler(){
          // 监视这个值
          // 先跟neworder中订单Id进行比较，若相等则直接使用这个订单信息进行支付操作
          if(this.nowOrderId===this.newOrder.orderId){
            this.nowOrder=this.newOrder
          }else{
            // 如果不同，则使用myOrderAbout中的nowOrder
            this.nowOrder=this.nowOrder_fuben
          }
        }
      }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../../../common/stylus/mixins.styl"
.my_pay
  overflow hidden
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
  .mycontent
    margin-top 45px
    width: 100%
    height: 100%
    padding-top: 7px
    .my_price_content
      width 100%
      height 100px
      .pay_text
        width: 100%
        height: 50%
        font-size:25px
        display: flex; //使容器变成伸缩盒子
        justify-content: center;//项目位于容器中心
        align-items: center;
    .pay_tool_content
      border-radius:1em
      border-style: solid
      background #F5FFFA
      margin: 10px
      width 95%
      .tool_list
        .tool_li
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
            .tool_left
              float left
              box-sizing border-box
              width 70px
              height 65px
              padding-right 10px
              .icon-qianbao
                display: flex; //使容器变成伸缩盒子
                justify-content: center;//项目位于容器中心
                align-items: center;
                color: red
                width 100%
                height 100%
              .icon-weixin
                display: flex; //使容器变成伸缩盒子
                justify-content: center;//项目位于容器中心
                align-items: center;
                color: green
                width 100%
                height 100%
            .tool_right
              float right
              width 77%
              .tool_header
                clearFix()
                width 100%
                .tool_title
                  float left
                  width 200px
                  color #333
                  font-size 16px
                  line-height 25px
                  font-weight 700
                .tool_button
                  float right
                  margin-top 3px
                  font-size 18px
                  color: #000000
              .yue_count
                clearFix()
                width 100%
                font-size: 14px
                margin-top 18px
                margin-bottom 8px
    .commit_pay
      margin-bottom 30px
      width 100%        
      height: 50px
      .pay_button
        border-radius:1em
        margin: 10px 10px 0px 10px
        background #02a774 
        width: 95%
        height: 82%
        border: none
</style>