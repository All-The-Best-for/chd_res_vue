<template>
  <div>
      <button @click="updatedText">点击得到一句话</button>
      <h2>{{msg}}</h2>
  </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
export default {
    name:'MyText',
    computed: {
        ...mapState('textOptions',['msg'])
    },
    methods: {
        ...mapActions('textOptions',['updatedText'])
    }
}
</script>

<style>

</style>