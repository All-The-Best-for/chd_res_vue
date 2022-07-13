<template>
    <div class="cartcontrol">
        <!-- 减号 -->
    <!-- <transition name="move">
      <div class="iconfont icon-minus" v-if="food.count" @click.stop="toUpdateFoodCount(false)"/>
    </transition> -->
    <!-- 选择的数量 -->
    <!-- <div class="cart-count" v-if="food.count">{{food.count}}</div> -->
    <!-- 加号 -->
    <div class="iconfont icon-add1" @click.stop="toUpdateFoodCount(true)" />
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    name:'MyCartControl',
    props: {
        food:Object,
        stallId:Number,
    },
    methods: {
        ...mapActions('myShopAbout',['updateFoodCount']),
        toUpdateFoodCount(isAdd){
            this.updateFoodCount({isAdd,food:this.food})
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
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
</style>
