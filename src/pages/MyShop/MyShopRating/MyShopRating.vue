<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="ratingselect">
        <div class="rating-type border-1px">
          <span class="block positive" @click="showRateType=2;rates=rates_fuben" :class="{active:showRateType===2}">
            全部
            <span class="count">{{rates?rates.length:0}}</span>
          </span>
          <span class="block positive" @click="showRateType=0;rates=positiveRates" :class="{active:showRateType===0}">
            满意
            <span class="count">{{rates?positiveRates.length:0}}</span>
          </span>
          <span class="block negative" @click="showRateType=1;rates=negativeRates" :class="{active:showRateType===1}">
            不满意
            <span class="count">{{rates?rates.length-positiveRates.length:0}}</span>
          </span>
        </div>
      </div>
      <div class="rating-wrapper">
        <ul>
          <li class="rating-item" v-for="(rating,index) in rates" :key="index">
            <div class="avatar">
              <img width="28" height="28" src="https://tva2.sinaimg.cn/large/0072Vf1pgy1foxkg1c0bbj31kw0w04oe.jpg">
            </div>
            <div class="content">
              <h1 class="name">{{rating.userId}}</h1>
              <div class="star-wrapper">
                <MyStar :score="rating.agree" :size="24" />
              </div>
              <p class="text">{{rating.appraisalText}}</p>
              <div class="time">{{rating.appraisalTime}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>


<script>
import {mapState} from 'vuex'
import MyStar from '../../../components/MyStar/MyStar.vue'
import {reqRateByStall} from '../../../api/index'

export default {
    name:'MyShopRating',
    data () {
      return {
        // 对应全部2、只看满意0、只看不满意1三种状态
        showRateType:2 ,
        rates:null,
        rates_fuben:null,
      }
    },
    components: {
      MyStar,
    },
    computed: {
      ...mapState('myShopAbout',['info']),
      positiveRates(){
        var brr=[]
        if(this.rates_fuben!==null){
          this.rates_fuben.forEach(rate => {
            if(rate.agree>=3){
              brr.push(rate)
            }
          });
        }
        return brr
      },
      negativeRates(){
        var brr=[]
        if(this.rates_fuben!==null){
          this.rates_fuben.forEach(rate => {
            if(rate.agree<3){
              brr.push(rate)
            }
          });
        }
        return brr
      }
    },
    methods: {
      async pushReqRateByStall(){
        let result=await reqRateByStall(this.info.stallId)
        if(result.code===200){
          console.log('请求评论信息成功',result.data)
          this.rates=result.data
          this.rates_fuben=this.rates
        }
      }
    },
    mounted () {
      this.pushReqRateByStall()
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"

  .ratings
    position: absolute
    top: 195px
    bottom: 0
    left: 0
    width: 100%
    background: #fff
    .overview
      display: flex
      padding: 18px 0
      .overview-left
        flex: 0 0 137px
        padding: 6px 0
        width: 137px
        border-right: 1px solid rgba(7, 17, 27, 0.1)
        text-align: center
        @media only screen and (max-width: 320px)
          flex: 0 0 120px
          width: 120px
        .score
          margin-bottom: 6px
          line-height: 28px
          font-size: 24px
          color: rgb(255, 153, 0)
        .title
          margin-bottom: 8px
          line-height: 12px
          font-size: 12px
          color: rgb(7, 17, 27)
        .rank
          line-height: 10px
          font-size: 10px
          color: rgb(147, 153, 159)
      .overview-right
        flex: 1
        padding: 6px 0 6px 24px
        @media only screen and (max-width: 320px)
          padding-left: 6px
        .score-wrapper
          margin-bottom: 8px
          font-size: 0
          .title
            display: inline-block
            line-height: 18px
            vertical-align: top
            font-size: 12px
            color: rgb(7, 17, 27)
          .star
            display: inline-block
            margin: 0 12px
            vertical-align: top
          .score
            display: inline-block
            line-height: 18px
            vertical-align: top
            font-size: 12px
            color: rgb(255, 153, 0)
        .delivery-wrapper
          font-size: 0
          .title
            line-height: 18px
            font-size: 12px
            color: rgb(7, 17, 27)
          .delivery
            margin-left: 12px
            font-size: 12px
            color: rgb(147, 153, 159)
    .split
      width: 100%
      height: 16px
      border-top: 1px solid rgba(7, 17, 27, 0.1)
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      background: #f3f5f7
    .ratingselect
      .rating-type
        padding: 18px 0
        margin: 0 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        font-size: 0
        .block
          display: inline-block
          padding: 8px 12px
          margin-right: 8px
          line-height: 16px
          border-radius: 1px
          font-size: 12px
          color: rgb(77, 85, 93)
          background: rgba(77, 85, 93, 0.2)
          &.active
            background: $green
            color: #fff
          .count
            margin-left: 2px
            font-size: 8px
      .switch
        padding: 12px 18px
        line-height: 24px
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        color: rgb(147, 153, 159)
        font-size: 0
        &.on
          .icon-check
            color: $green
          .text
            color: $green
        .icon-check
          display: inline-block
          vertical-align: top
          margin-right: 4px
          font-size: 24px
        .text
          display: inline-block
          vertical-align: top
          font-size: 12px
    .rating-wrapper
      padding: 0 18px
      .rating-item
        display: flex
        padding: 18px 0
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        .avatar
          flex: 0 0 28px
          width: 28px
          margin-right: 12px
          img
            border-radius: 50%
        .content
          position: relative
          flex: 1
          .name
            margin-bottom: 4px
            line-height: 12px
            font-size: 10px
            color: rgb(7, 17, 27)
          .star-wrapper
            margin-bottom: 6px
            font-size: 0
            .star
              display: inline-block
              margin-right: 6px
              vertical-align: top
            .delivery
              display: inline-block
              vertical-align: top
              line-height: 12px
              font-size: 10px
              color: rgb(147, 153, 159)
          .text
            margin-bottom: 8px
            line-height: 18px
            color: rgb(7, 17, 27)
            font-size: 12px
          .recommend
            line-height: 16px
            font-size: 0
            .icon-thumb-up, .icon-thumb-down, .item
              display: inline-block
              margin: 0 8px 4px 0
              font-size: 9px
            .icon-thumb-up
              color: $yellow
            .icon-thumb-down
              color: rgb(147, 153, 159)

            .item
              padding: 0 6px
              border: 1px solid rgba(7, 17, 27, 0.1)
              border-radius: 1px
              color: rgb(147, 153, 159)
              background: #fff
          .time
            position: absolute
            top: 0
            right: 0
            line-height: 12px
            font-size: 10px
            color: rgb(147, 153, 159)
</style>
