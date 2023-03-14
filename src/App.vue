<template>
  <div>
    <Header />
    <router-view/>
    <Footer ref="footer" />
  </div>
</template>

<script lang="ts">
import Header from "./components/Header/Header.vue";
import Footer from "./components/Footer/Footer.vue";

export default {
  components: {
    Header,
    Footer
  }
}
</script>

<style>
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

@font-face {
  font-family: "Mr Dafoe";
  src: local("Mr Dafoe"),
    url(/fonts/MrDafoe-Regular.ttf) format("truetype");
}

.dafoe {
  font-family: 'Mr Dafoe', cursive;
}

</style>
