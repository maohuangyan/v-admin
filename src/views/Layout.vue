<template>
  <div class="app">
    <Sidebar></Sidebar>
    <div class="body"><router-view></router-view></div>
  </div>
</template>

<script>
  import Sidebar from "../components/Sidebar.vue"
  export default {
    components:{
      Sidebar
    }
  }
</script>

<style scoped>
  .app{
    display: flex;
  }
</style>