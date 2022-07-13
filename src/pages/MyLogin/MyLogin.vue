<template>
    <section class="loginContainer">
      <div class="loginInner">
        <div class="login_header">
          <h2 class="login_logo">长大餐厅</h2>
        </div>
        <div class="login_content">
          <form @submit.prevent="login">
            <div :class="{on:!loginWay}">
              <section>
                <section class="login_message">
                  <input type="text" maxlength="11" placeholder="用户名" v-model="name">
                </section>
                <section class="login_verification">
                  <input type="password" maxlength="8" placeholder="密码" v-model="pwd" v-if="!showPwd">
                  <input type="text" maxlength="8" placeholder="密码" v-model="pwd" v-else>
                  <div class="switch_button" :class="showPwd?'on':'off'" @click="showPwd=!showPwd">
                    <i class="iconfont icon-yanjing_xianshi" v-show="showPwd"></i>
                    <i class="iconfont icon-yanjing_yincang" v-show="!showPwd"></i>
                  </div>
                </section>
              </section>
            </div>
            <button class="login_submit" @click="login">登录</button>
          </form>
          <a href="javascript:;" class="about_us">关于我们</a>
        </div>
        <a href="javascript:" class="go_back" @click="$router.back()">
          <i class="iconfont icon-arrow-left"></i>
        </a>
      </div>

      <MyAlertTip :alertText="alertText" v-show="isAlert"/>
    </section>
</template>

<script>
import MyAlertTip from '../../components/MyAlertTip/MyAlertTip.vue'
import {reqPwdLogin} from '../../api/index'
import {mapActions} from 'vuex'
export default {
    name:'MyLogin',
    components: {
      MyAlertTip,
    },
    data () {
      return {
        loginWay:false,  //true代表短信登录，false代表密码登录
        showPwd:false, //是否显示密码
        name:'',  //密码登录时的账号
        pwd:'', //密码
        alertText:'xxx', //提示信息
        isAlert:false, //决定是否进行提示
      }
    },
    mounted () {
      this.$bus.$on('closeTip',()=>{
        this.isAlert=false
        this.alertText=''
      })
    },
    beforeDestroy(){
      this.$bus.$off('closeTip')
    },
    methods: {
      ...mapActions('myUserAbout',['recordUser']),
      //提交登陆表单
      async login(){
        //前台表单验证
        const{name,pwd}=this
        if (!name) {  //如果账号为空
          this.alertText='请输入账号'
          this.isAlert=true
          return
        }else if(!pwd){  //如果密码为空
          this.alertText='请输入密码'
          this.isAlert=true
          return
        }else{
          //发送ajax请求进行密码登录
          this.result=await reqPwdLogin({name,pwd})
        }

        if(this.result.code!==200){
          //登录失败
          // 显示警告提示
          const msg=this.result.msg
          this.alertText=msg
          this.isAlert=true
        }else{
          //登陆成功
          const user=this.result.data.info
          //将user保存到vuex的state
          this.recordUser(user)
          // 返回上一个界面
          this.$router.back()
          // 将信息保存到session中
          window.sessionStorage.setItem("userInfo",JSON.stringify(user));
        }
      },
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixins.styl"
.loginContainer
  width 100%
  height 100%
  background #fff
  .loginInner
    padding-top 60px
    width 80%
    margin 0 auto
    .login_header
      .login_logo
        font-size 40px
        font-weight bold
        color #02a774
        text-align center
      .login_header_title
        padding-top 40px
        text-align center
        >a
          color #333
          font-size 14px
          padding-bottom 4px
          &:first-child
            margin-right 40px
          &.on
            color #02a774
            font-weight 700
            border-bottom 2px solid #02a774
    .login_content
      >form
        >div
          display none
          &.on
            display block
          input
            width 100%
            height 100%
            padding-left 10px
            box-sizing border-box
            border 1px solid #ddd
            border-radius 4px
            outline 0
            font 400 14px Arial
            &:focus
              border 1px solid #02a774
          .login_message
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .get_verification
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              border 0
              color #ccc
              font-size 14px
              background transparent
              &.right_phone
                color black
          .login_verification
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .switch_button
              position absolute
              top 50%
              right 20px
              transform translateY(-50%)
              &.off
                // background #ddd
              &.on
                // background #02a774
          .login_hint
            margin-top 12px
            color #999
            font-size 14px
            line-height 20px
            >a
              color #02a774
        .login_submit
          display block
          width 100%
          height 42px
          margin-top 30px
          border-radius 4px
          background #4cd96f
          color #fff
          text-align center
          font-size 16px
          line-height 42px
          border 0
      .about_us
        display block
        font-size 12px
        margin-top 20px
        text-align center
        color #999
    .go_back
      position absolute
      top 15px
      left 15px
      width 30px
      height 30px
      >.iconfont
        font-size 30px
        color #999
</style>