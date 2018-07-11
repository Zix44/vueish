<template>
  <div id="app">
    <top-nav></top-nav>
    <router-view/>
  </div>
</template>

<script>
// @ is an alias to /src
import TopNav from '@/components/TopNav.vue'

export default {
  components: {
    TopNav
  }
}
</script>

<style>
  html, body {
    height: 100%;
    width: 100%;
    background-color: #343434;
    background-size: cover;
  }
</style>
