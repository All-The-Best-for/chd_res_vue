<template>
  <div>
      <h1>当前求和为：{{sum}}</h1>
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
            sum:0,
            n:1, //用户选择的值
        }
    },
    methods: {
      increment(){
        this.sum+=this.n
      },
      decrement(){
        this.sum-=this.n
      },
      incrementWhenOdd(){
        if(this.sum%2){
          this.sum+=this.n
        }
      },
      incrementWait(){
        setTimeout(() => {
          this.sum+=this.n
        }, 500);
      },
    },
}
</script>

<style>
  button{
    margin: 5px;
  }

</style>