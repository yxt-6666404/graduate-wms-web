<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data(){
    return{
      user:JSON.parse(localStorage.getItem('CurUser'))
    }
  },
  watch:{
    '$store.state.menu':{
      handler(val,old){
        console.log("handler",val,old)
        if(!old && this.user && this.user.no){
          this.$store.commit('setMenu',val)
        }
      },
      immediate:true
    }
  }
}
</script>

<style>
#app {
  height: 100%;
}
</style>
