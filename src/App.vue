<script lang="ts">
import Hero from './components/Hero/Hero.vue';
import Header from "./components/Header/Header.vue";

export default {
  components: {
    Hero,
    Header
  }
}
</script>

<template>
  <div>
    <Header />
    <Hero />
  </div>
</template>

<style>
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
</style>
