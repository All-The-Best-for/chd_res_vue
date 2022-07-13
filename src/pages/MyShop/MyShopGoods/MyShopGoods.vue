<template>
    <div>
        <div class="goods">
            <!-- 点餐界面左侧列表 -->
            <div class="menu-wrapper">
                <ul>
                    <!-- 滑动过程中使用current样式来显示当前选中分类  -->
                    <li class="menu-item" 
                      v-for="(good,index) in goods" :key="index" 
                      :class="{current:currentIndex===index}"
                      @click="selectMenuItem(index)"
                    >
                        <span class="text bottom-border-1px">
                            <img class="icon" :src="good.icon" v-if="good.icon">
                            {{good.name}}
                        </span>
                    </li>
                </ul>
            </div>
            <!-- 点餐界面右侧具体餐品 -->
            <div class="foods-wrapper">
                <!-- 第一层遍历产生右侧标题，如折扣等 -->
                <ul ref="foodUI">
                    <li class="food-list-hook" v-for="(good,index) in goods" :key="index">
                        <h1 class="title">{{good.name}}</h1>
                        <!-- 第二层遍历产生右侧每个标题下的餐品 -->
                        <ul>
                            <li 
                              class="food-item bottom-border-1px" 
                              v-for="(food,index) in good.dishInfoList" :key="index"
                              @click="showFoodDetail(food)"
                            >
                                <div class="icon">
                                    <img width="57" height="57" :src="food.dishIcon?ImageBasePathHeader+food.dishIcon:''" v-if="food.icon!=='undefined'">
                                </div>
                                <div class="content">
                                    <h2 class="name">{{food.dishName}}</h2>
                                    <p class="desc">{{food.dishText}}</p>
                                    <div class="extra">
                                        <span class="count">月售{{food.dishSales}}份</span>
                                        <span>评分{{(food.dishStar).toFixed(1)}}</span>
                                    </div>
                                    <div class="price">
                                        <!-- 现价和旧价 -->
                                        <span class="now">￥{{food.dishPrice}}</span>
                                        <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                                    </div>
                                    <div class="cartcontrol-wrapper">
                                      <keep-alive>
                                        <MyCartControl :food="food" :stallId="stallId"/>
                                      </keep-alive>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <keep-alive>
              <MyShopCart/>
            </keep-alive>
        </div>
        <keep-alive>
          <MyFood :food="food" ref="myfood"/>
        </keep-alive>
        
    </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
import BetterScroll from 'better-scroll'

import MyCartControl from '../../../components/MyCartControl/MyCartControl.vue'
import MyFood from '../../../components/MyFood/MyFood.vue'
import MyShopCart from '../../../components/MyShopCart/MyShopCart.vue'
// import MyPreOrder from '../../MyPreOrder/MyPreOrder.vue'

export default {
    name:'MyShopGoods',
    data () {
        return {
            scrollY:0,
            tops:[],
            food:{},
            isPreOrder:false,//是否显示预订单页面
            // ImageBasePathHeader:'http://192.168.43.92:8080/api/'
            ImageBasePathHeader:this.GLOBALVAR.ImageBasePathHeader
        }
    },
    components: {
      MyCartControl,
      MyFood,
      MyShopCart,
    },
    computed: {
        ...mapState('myShopAbout',['goods','stallId']),
        ...mapState('mySiteAbout',['shops']),
        /* 
            左侧边栏当前选中哪个分类使用到的数据有：
                scrollY：右侧滑动的Y轴坐标  （随着滑动时刻变化）
                tops：所有右侧分类li的top值组成的数组 （列表第一次显示初始化后就不再变化）
        */
       // 设计当前Index属性，通过其来确定左侧边栏当前选中哪个分类
        currentIndex(){
          // 得到条件数据
          const {scrollY,tops}=this
          // 根据计算条件返回一个结果
          let index=tops.findIndex((_,index)=>{
            // scrollY>=当前top && scrollY<下一个top
            return scrollY>=tops[index] && scrollY<tops[index+1]
          })
          // 返回结果
          return index
        }
    },
    methods: {
        ...mapActions('myShopAbout',['getShopGoods']),
        // 初始化列表滚动
        _initScroll(){
            // 在列表显示后创建
            this.$nextTick(()=>{
                this.menuScroll=new BetterScroll('.menu-wrapper', {
                  click:true,
                  scrollY:true,
                })
                // 将这个对象放到this上，方便其他函数调用
                this.foodScroll=new BetterScroll('.foods-wrapper', {
                  click:true,
                  scrollY:true,
                  probeType:3,  //实时触发事件，但是惯性滑动不触发
                })


                // 给右侧列表绑定scrollEnd监听，当滑动结束的时候再令左侧变化，有利于解决选择左侧导航栏时变化不及时的问题
                this.foodScroll.on('scrollEnd',(event)=>{
                  this.scrollY=Math.abs(event.y)
                })
                // 给右侧列表绑定scroll监听,使得左侧随之滑动，为了简单，使用比例进行调整，没有详细计算
                this.foodScroll.on('scroll',(event)=>{
                  this.menuScroll.scrollTo(0,event.y/30,1)
                })
            })
        },
        // 初始化tops
        _initTops(){
          // 初始化tops
          const tops=[]
          let top=0
          tops.push(top)

          // 收集tops
          // 找到所有分类的li
          const lis=this.$refs.foodUI.getElementsByClassName('food-list-hook')
          // 遍历li，将其top高度存入数组中
          Array.prototype.slice.call(lis).forEach(li => {
            top+=li.clientHeight
            tops.push(top)
          });

          // 更新数据
          this.tops=tops
          // console.log(tops)
        },
        // 点击左侧目录变化右侧列表
        selectMenuItem(index){
          // 得到index所在选项对应的右侧标题的top
          const toY=this.tops[index]
          // 使得左侧点击即变
          this.scrollY=toY
          // 三个参数为x，y，滑动过去的时间ms
          this.foodScroll.scrollTo(0,-toY,200)
        },
        // 点击变化此餐品的选择数量
        addCount(){
          this.count++
        },
        reduceCount(){
          this.count--
        },
        // 显示餐品详情
        showFoodDetail(food){
          this.food=food
          // 显示food组件，在父组件中调用子组件对象的方法
          this.$refs.myfood.changeShowFoodDetail()
        }
    },
    mounted () {
      // 加载Goods数据并初始化列表滚动
        this.getShopGoods({shops:this.shops}).then(()=>{
          // 初始化列表滚动
          this._initScroll()
          // 初始化tops
          this._initTops()
        })
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"
  .goods
    display: flex
    position: absolute
    top: 195px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        border-radius: 16px
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
          border-radius: 160px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
            width:150px
            overflow: hidden  //溢出内容隐藏
            white-space: nowrap  //强制文本在一行内显示
            text-overflow: ellipsis //当对象内文本溢出时显示省略标记
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>