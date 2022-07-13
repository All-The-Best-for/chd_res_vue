<template>
  <transition name="fade">
      <div class="food" v-if="isShowFoodDetail">
          <div class="food-content">
              <div class="image-header">
                <qrcode-vue class="qrcode_img" :value="value" :size="size" level="H"></qrcode-vue>
              </div>
              <div class="content">
                  <h1 class="title">{{nowOrder.ordeDishsText}}</h1>
                  <div class="detail">
                      <span class="sell-count">时间  {{nowOrder.orderTime}}</span>
                  </div>
              </div>
          </div>
          <div class="food-cover" @click="changeShowFoodDetail"></div>
      </div>
  </transition>
</template>

<script>
import QrcodeVue from 'qrcode.vue'
import {mapState,mapActions} from 'vuex'
export default {
    name:'MyQRCode',
    components: {
        QrcodeVue
    },
    data() {
        return {
            isShowFoodDetail:false,
            size:286,
        }
    },
    computed: {
      ...mapState('myOrderAbout',['nowOrder']),
      value(){
          // return `http://192.168.3.190:9001/sms/orderUserController/pick?id=${this.nowOrder.orderId}` //寝室局域网
          return `http://192.168.43.92:9001/sms/orderUserController/pick?id=${this.nowOrder.orderId}` //个人热点局域网
      }
    },
    methods: {
        ...mapActions('myOrderAbout',['setX']),
        changeShowFoodDetail(){
            this.isShowFoodDetail=!this.isShowFoodDetail
            if(this.isShowFoodDetail===false){
                this.setX()
            }
        },
    },
    mounted () {
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"
  .food
    position: fixed
    left: 0
    top: 0
    bottom: 48px
    z-index: 101
    width: 100%
    border-radius: 12px
    &.fade-enter-active, &.fade-leave-active
      transition opacity .5s
    &.fade-enter, &.fade-leave-to
      opacity 0
    .food-content
      position absolute
      left 50%
      top 50%
      transform translate(-50%, -50%)
      width 80%
      height 70%
      z-index 66
      background #fff
      border-radius 5px
      .image-header
        position: relative
        width: 100%
        height: 0
        padding-top: 100%
        box-sizing: border-box
        border-radius: 6px
        .qrcode_img
          position: absolute
          top: 0
          left: 0
          width: 100%
          height: 100%
          border-radius: 6px
      .content
        position: relative
        padding: 18px
        .title
          line-height: 14px
          margin-bottom: 8px
          font-size: 14px
          font-weight: 700
          color: rgb(7, 17, 27)
        .detail
          margin-bottom: 18px
          line-height: 10px
          height: 10px
          font-size: 0
          .sell-count, .rating
            font-size: 10px
            color: rgb(147, 153, 159)
          .sell-count
            margin-right: 12px
    // 设置外框透明
    .food-cover
      position absolute
      top 0
      right 0
      bottom -48px
      left 0
      z-index 55
      background-color rgba(0, 0, 0, 0.5)

</style>