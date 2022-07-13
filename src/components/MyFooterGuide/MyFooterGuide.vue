<template>
  <div class="footer_guide border-1px">
    <router-link class="guide_item" :class="{on:'/mysite'===$route.path}" to="/mysite">
      <span class="item_icon">
        <i class="iconfont icon-canyin"></i>
      </span>
      <span>餐品</span>
    </router-link>
    <router-link class="guide_item" :class="{on:'/mysearch'===$route.path}" to="/mysearch">
      <span class="item_icon">
        <i class="iconfont icon-search"></i>
      </span>
      <span>搜索</span>
    </router-link>
    <router-link class="guide_item" :class="{on:'/myorder'===$route.path}" to="/myorder"
      @click="updateOrderInfo">
      <span class="item_icon">
        <i class="iconfont icon-cart-full"></i>
      </span>
      <span>订单</span>
    </router-link>
    <router-link class="guide_item" :class="{on:'/myprofile'===$route.path}" to="/myprofile">
      <span class="item_icon">
        <i class="iconfont icon-zhongjianren"></i>
      </span>
      <span>我的</span>
    </router-link>
  </div>
</template>

<script>
import {mapActions,mapState} from 'vuex'
export default {
    name:'MyFooterGuide',
    computed: {
      ...mapState('myUserAbout',['userInfo'])
    },
    methods: {
      ...mapActions('myOrderAbout',['getOrders']),
      updateOrderInfo(){
        // 强制更新订单列表组件
        this.getOrders({userId:this.userInfo.userId})
        this.$refs.orderCom.$forceUpdate();
      }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixins.styl"
  .footer_guide
    top-border-1px(#e4e4e4)
    position fixed
    z-index 100
    left 0
    right 0
    bottom 0
    background-color #fff
    width 100%
    height 50px
    display flex
    .guide_item
      display flex
      flex 1
      text-align center
      flex-direction column
      align-items center
      margin 5px
      color #999999
      &.on
        color #02a774
      span
        font-size 12px
        margin-top 2px
        margin-bottom 2px
        .iconfont
          font-size 22px
</style>