<template>
  <div>
      <h1>当前求和为：{{sum}}</h1>
      <h1>getter得到的结果为：{{bigSum}}</h1>
      <select v-model.number="n">
        <option :value="1">1</option>
        <option :value="2">2</option>
        <option :value="3">3</option>
      </select>
      <!-- 使用map映射，必须进行传参，否则会自动将鼠标点击事件传递过去 -->
      <button @click="increment(n)">+</button>
      <button @click="decrement(n)">-</button>
      <button @click="incrementWhenOdd(n)">当前求和为奇数才+</button>
      <button @click="incrementWait(n)">等一等再+</button>

      <hr>
      <h2>我在{{schoolName}}学习{{subject}}</h2>

  </div>
</template>

<script>
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
export default {
    name:'MyCount1',
    data () {
        return {
            n:1, //用户选择的值
        }
    },
    computed: {
      ...mapState('countOptions',['schoolName','subject','sum']),
      ...mapGetters('countOptions',['bigSum'])
    },
    methods: {
      //使用这种方法生成映射函数，必须在模板中调用生成的函数时进行传参
      ...mapMutations('countOptions',{'increment':'INCREMENT','decrement':'DECREMENT'}),
      ...mapActions('countOptions',['incrementWhenOdd','incrementWait'])
    
    },
}
</script>

<style>
  button{
    margin: 5px;
  }

</style>