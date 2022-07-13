<template>
  <div class="search">
    <MyHeader title="搜索"/>
    <form class="search_form">
      <input type="search" placeholder="请输入商家名称" class="search_input" v-model="keyword">
      <span @click="search">
        <i class="iconfont icon-search" ></i>
      </span>
    </form>
    <div class="list" v-show="!emptyResult">
      <ul class="list_container">
        <li @click="$router.push({name:'MyShop',params:{stallId:shop.stallInfo.stallInfo.stallId}})"
          v-for="(shop,index) in searchShops" :key="index" 
          class="list_li"
          v-show="shop.stallInfo.stallInfo.isWork"
        >
          <section class="item_left">
          <img :src="ImageBasePathHeader+shop.stallInfo.stallInfo.stallIcon" class="restaurant_img">
          </section>
          <section class="item_right">
          <div class="item_right_text">
          <p>
          <span>{{shop.stallInfo.stallInfo.stallName}}</span>
          </p>
          <p>月售 {{shop.stallInfo.stallInfo.amount}} 单</p>
          <p>{{shop.stallInfo.stallInfo.stallText}}</p>
          </div>
          </section>
        </li>
      </ul>
    </div>
    <div class="search_none" v-show="emptyResult">很抱歉！无此商家</div>
  </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
import MyHeader from '../../components/MyHeader/MyHeader.vue'

export default {
    name:'MySearch',
    components: {
      MyHeader
    },
    data () {
      return {
        keyword: '',
        emptyResult: false,
        searchShops:[],
        ImageBasePathHeader:this.GLOBALVAR.ImageBasePathHeader
      }
    },
    mounted () {
      this.$nextTick(()=>{
        this.getShops({shops:this.shops})
      })
    },
    computed: {
      ...mapState('mySiteAbout',['shops']),
    },
    methods: {
      ...mapActions('mySearchAbout',['getSearchShops','getShops']),
      search(){
        // 得到搜索关键字
        const keyword=this.keyword.trim()
        // 进行搜索
        if(keyword){
          this.emptyResult = false
          var arr = this.shops
          var brr = arr.filter(function (shop) {
            return shop.stallInfo.stallInfo.stallName.includes(keyword)  //遍历数组，返回值为true保留并复制到新数组，false则过滤掉
          })
          this.searchShops=brr
        }
      },

    },
    watch: {
      'searchShops'(val) {
        if (!val.length) {
          this.emptyResult = true
        }else{
          this.emptyResult = false
        }
        // new BScroll('.list',{
        //   click:true,
        //   scrollY:true
        // })
      }
    },
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "../../common/stylus/mixins.styl"
        .search 
          width 100%
          height 100%
          overflow hidden
          .search_form
            clearFix()
            margin-top 45px
            background-color #fff
            padding 12px 8px
            input
              height 35px
              padding 0 4px
              border-radius 2px
              font-weight bold
              outline none
              &.search_input
                float left
                width 79%
                border 4px solid #f2f2f2
                font-size 14px
                color #333
                background-color #f2f2f2
            >span
              display flex
              margin-left 290px
              padding-left 20px
              margin-right 14px
              border-radius 12px
              border-style solid
              align-items center
              width 38px
              height 35px
              background-color #02a774
              >.iconfont
              width 100%
              height 100%
              display flex
              .icon-search
                color #006400
          .list
            overflow: auto
            height: 1000px
            .list_container
              background-color: #fff;
              .list_li
                display: flex
                justify-content: center
                padding 10px
                border-bottom: 1px solid $bc;
                .item_left
                  margin-right: 10px
                  .restaurant_img
                    width: 50px
                    height: 50px
                    display: block
                .item_right
                  font-size 12px
                  flex: 1
                  .item_right_text
                    p
                      line-height: 12px
                      margin-bottom: 6px
                      &:last-child 
                        margin-bottom: 0
          .list::-webkit-scrollbar{
            display: none
          }
          .search_none
            margin: 0 auto
            color: #333
            background-color: #fff
            text-align: center
            margin-top: 0.125rem

</style>