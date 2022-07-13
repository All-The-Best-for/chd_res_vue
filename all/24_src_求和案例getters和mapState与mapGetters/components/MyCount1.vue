<template>
  <div>
      <h1>当前求和为：{{sum}}</h1>
      <h1>getter得到的结果为：{{bigSum}}</h1>
      <select v-model.number="n">
        <!-- 加：表示后面的是表达式，而不是字符串，或者用v-model.number修饰符进行转换 -->
        <option :value="1">1</option>
        <option :value="2">2</option>
        <option :value="3">3</option>
      </select>
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
      <button @click="incrementWhenOdd">当前求和为奇数才+</button>
      <button @click="incrementWait">等一等再+</button>

      <hr>
      <h2>我在{{schoolName}}学习{{subject}}</h2>

  </div>
</template>

<script>
//引入Stateh和Getters的映射代码生成器
import {mapState,mapGetters} from 'vuex'
export default {
    name:'MyCount1',
    data () {
        return {
            n:1, //用户选择的值
        }
    },
    //使用计算属性从vuex中取数据，用来放到模板中，简化模板
    computed: {
      //使用mapState生成下面的三个映射，自动生成的是计算属性，从State中读取数据

      //对象写法，完整写法
      // ...mapState({'schoolName':'SchoolName','subject':'subject','sum':'sum'}),
      
      // 数组写法，精简写法，这种生成的计算属性名和state中存储的数据名称是一样的
      ...mapState(['schoolName','subject','sum']),
      ...mapGetters(['bigSum'])

      //#region 
      /* schoolName(){
        return this.$store.state.schoolName
      },
      subject(){
        return this.$store.state.subject
      },
      sum(){
        return this.$store.state.sum
      }, 
      bigSum(){
        return this.$store.getters.bigSum
      },*/
      //#endregion
    },
    methods: {
      //加
      increment(){
        //直接调用mutations中的业务逻辑
        this.$store.commit('INCREMENT',this.n)
      },
      //减
      decrement(){
        this.$store.commit('DECREMENT',this.n)
      },
      // 当当前sum奇数的时候才加
      incrementWhenOdd(){
        //需要进行限制的操作放到actions中，需要向actions进行dispatch操作
        this.$store.dispatch('incrementWhenOdd',this.n)
      },
      //等一下再加
      incrementWait(){
        this.$store.dispatch('incrementWait',this.n)
      },
    },
}
</script>

<style>
  button{
    margin: 5px;
  }

</style>