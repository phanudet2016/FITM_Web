<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}

body {
  background-color: #f8f9fa;
  /* background-color: #3c40c6; rgb(255,160,0) */
}
</style>
