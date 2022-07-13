<template>
    <div class="msite">
        <!--首页头部-->
        <MyHeader title="长大餐厅">
          <router-link class="header_search" slot="left" to="/mysearch">
            <i class="iconfont icon-search"></i>
          </router-link>
          <a class="header_login" slot="right"  @click="userInfo.userId?$router.push('/myprofile'):$router.push('/mylogin')">
            <span class="header_login_text" v-if="!userInfo.userId">{{'登录|注册'}}</span>
            <i class="iconfont icon-morentouxiang" v-else></i>
          </a>
        </MyHeader>
        <!--首页导航--轮播-->
        <nav class="msite_nav">
          <div class="swiper-container" v-if="recommendations.length">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(recommendation,index) in recommendations" :key="index">
                <img 
                  :src="recommendation.stallPicture1?ImageBasePathHeader+recommendation.stallPicture1:''"
                  @click="goStall(recommendation.stallId)"
                  v-show="recommendation.isWork"
                >
              </div>
            </div>
              <div class="swiper-pagination"></div>
          </div>
          <img src="./images/mysite_back.svg" alt="back" v-else>
        </nav>
        <!--首页校园各餐厅商家-->
        <div class="msite_shop_list">
            <div class="shop_header">
            <i class="iconfont icon-xuanxiang"></i>
            <span class="shop_header_title">本校商家</span>
            </div>
            <keep-alive>
              <MyShopList/>
            </keep-alive>
        </div>
    </div>
</template>

<script>
//引入轮播图第三方库
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
import {mapActions,mapState} from 'vuex'

import MyHeader from '../../components/MyHeader/MyHeader.vue'
import MyShopList from '../../components/MyShopList/MyShopList.vue'


export default {
    name:'MySite',
    components: {
      MyHeader,
      MyShopList,
    },
    data () {
      return {
        ImageBasePathHeader:this.GLOBALVAR.ImageBasePathHeader
      }
    },
    mounted () {
      this.getRecommendations()
    },
    methods: {
      ...mapActions('mySiteAbout',['getRecommendations']),
      ...mapActions('myShopAbout',['changeId']),
      goStall(stallId){
        this.changeId({stallId:stallId})
        this.$router.push('/myshop')
      }
    },
    computed: {
      ...mapState('mySiteAbout',['recommendations']),
      ...mapState('myUserAbout',['userInfo']),
    },
    watch: {
      //通过监视创建一个swiper对象来实现轮播
      recommendations:{
        // immediate:true,
        deep:true,
        handler(){
          this.$nextTick(()=>{    
            new Swiper('.swiper-container',{
              loop: true, // 循环模式选项
              // 如果需要分页器
              pagination: {
                el: '.swiper-pagination',
              }
            })
          })
        }
      }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./mixins.styl"
        .msite  //首页
          width 100%
          .msite_nav
            bottom-border-1px(#e4e4e4)
            margin-top 45px
            width 375px
            height 208px
            background #fff
            .swiper-container
              width 375px
              height 208px
              .swiper-wrapper
                width 375px
                height 208px
                .swiper-slide
                  box-sizing border-box
                  width 375px
                  height 208px
                  img
                    display: block
                    width 375px
                    height 200px
              .swiper-pagination
                >span.swiper-pagination-bullet-active
                  background #02a774
          .msite_shop_list
            top-border-1px(#e4e4e4)
            margin-top 10px
            background #fff
            .shop_header
              padding 10px 10px 0
              .shop_icon
                margin-left 5px
                color #999
              .shop_header_title
                color #999
                font-size 14px
                line-height 20px
</style>