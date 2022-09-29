<script lang="ts">
import Hero from './components/Hero/Hero.vue';
import Header from "./components/Header/Header.vue";
import About from "./components/About/About.vue"
import Work from './components/Work/Work.vue';

export default {
  components: {
    Hero,
    Header,
    About,
    Work
  }
}
</script>

<template>
  <div>
    <Header />
    <Hero />
    <About />
  </div>
</template>

<style>
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.dafoe {
  font-family: 'Mr Dafoe', cursive;
}

@font-face {
  font-family: "Mr Dafoe";
  src: local("Mr Dafoe"),
    url(./assets/fonts/MrDafoe-Regular.ttf) format("truetype");
}
</style>
