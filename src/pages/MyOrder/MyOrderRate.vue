<template>
  <div class="my_order">
    <div class="header">
      <div class="header_left">
        <button class="back" @click="$router.back()">
          <i class="iconfont icon-zuojiantou"></i>
        </button>
      </div>
      <div class="header_title">
        <h3 class="header_title_text">订单评价</h3>
      </div>
    </div>
    <div class="content">
        <!-- 评分模块 -->
        <div>
            <div style="margin-left:17%;width: 80%;margin-top: 20%;">
                <span style="width:20%;float: left;font-size: 18px;margin-top: 3px;">餐品</span>
                <div style="width:80%;float: right;">
                    <el-rate
                        v-model="valueDish"
                        show-text
                        >
                    </el-rate>
                </div>
            </div>
            <div style="margin-left:17%;width: 80%;padding-top: 40px;">
                <span style="width:20%;float: left;font-size: 18px;margin-top: 3px;">商家</span>
                <div style="width:80%;float: right;">
                    <el-rate
                        v-model="valueStall"
                        show-text
                        >
                    </el-rate>
                </div>
    
            </div>
            <div style="margin-left:17%;width: 80%;padding-top: 40px;">
                <span style="width:20%;float: left;font-size: 18px;margin-top: 3px;">餐厅</span>
                <div style="width:80%;float: right;">
                    <el-rate
                        v-model="valueRes"
                        show-text
                        >
                    </el-rate>
                </div>
    
            </div>
        </div>
        <!-- 评语模块 -->
        <div style="margin-top:150px;width:90%;height:150px;margin-left:5%;background-color: white;border-radius: 5%;padding: 3px;">
            <span style="font-size: 18px;margin-left: 8px;">评语</span>
            <div style="width:95%;height:70%;margin-left:2.5%">
                <el-input
                    type="textarea"
                    :rows="4"
                    placeholder="请输入评语"
                    v-model="rateText"
                    size="max"
                    maxlength="100"
                    show-word-limit
                    style="padding-top:10px;">
                </el-input>
            </div>
        </div>
        <!-- 提交按钮 -->
         <el-button type="success" round style="background-color:#02a774;margin-left: 36%;" @click="pushRate">提交评价</el-button>
    </div>
  </div>
</template>

<script>
import {reqRate} from '../../api/index'
import {mapActions,mapState} from 'vuex'
import {Toast} from 'mint-ui'
import dayjs from "dayjs"

export default {
    name:'MyOrderRate',
    data () {
        return {
            valueDish:4,
            valueStall:4,
            valueRes:4,
            rateText:'',
        }
    },
    computed: {
      ...mapState('myOrderAbout',['nowOrder']),
      ...mapState('myUserAbout',['userInfo'])    
    },
    methods: {
        async pushRate(){
            var date = Date.parse(new Date());
            let orderTime= dayjs(date).format('YYYY-MM-DD HH:mm:ss')
            // 计算本订单商品个数
            let count=0
            this.nowOrder.orderInfo.forEach(aolder => {
                count+=aolder.count
            });
            let result=await reqRate({
                dishId:this.nowOrder.orderId,
                userId:this.userInfo.userId,
                appraisalText:this.rateText,
                agree:this.valueStall,
                negative:0,
                appraisalTime:orderTime
            },this.valueDish,this.valueStall,this.valueRes,this.nowOrder.stallId,this.valueRes,count)
            if(result.code===200){
                Toast('评价成功')
                this.$router.back()
            }
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../common/stylus/mixins.styl"
.my_order
  overflow scrollY
  width 100%
  height 100%
  background-color #ffffff
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
    /deep/ .el-rate__icon
        font-size: 25px
    

</style>