<template>
  <div>
      <h1>当前求和为：{{$store.state.sum}}</h1>
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
  </div>
</template>

<script>
export default {
    name:'MyCount1',
    data () {
        return {
            n:1, //用户选择的值
        }
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