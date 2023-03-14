<template>
  <div>
    <Hero ref="hero" />
    <About ref="about" />
    <Work ref="work" />
    <Contact ref="contact" />
  </div>
</template>

<script lang="ts">
import Hero from '../components/Hero/Hero.vue';
import About from "../components/About/About.vue"
import Work from '../components/Work/Work.vue';
import Footer from '../components/Footer/Footer.vue'
import Contact from '../components/Contact/Contact.vue'

export default {
  components: {
    Hero,
    About,
    Work,
    Contact,
    Footer
  },
}
</script>

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
    url(/fonts/MrDafoe-Regular.ttf) format("truetype");
}
</style>
