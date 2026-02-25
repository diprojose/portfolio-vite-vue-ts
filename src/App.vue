<template>
  <div class="grain-overlay"></div>
  <div id="noise-root">
    <Header />
    <router-view/>
  </div>
</template>

<script lang="ts" setup>
import Header from './components/Header.vue'
</script>

<style lang="scss">
@use './styles/index.scss' as *;

:root {
  /* Default Dark Mode */
  --color-bg: #000000;
  --color-primary: #FF4D00;
  --color-text: #FFFFFF;
  --color-text-muted: #A0A0A0;
  --particle-colors: #ffffff, #FF4D00, #A0A0A0;
  
  --font-heading: 'Archivo Black', sans-serif;
  --font-body: 'Roboto Mono', monospace;
}

[data-theme="light"] {
  --color-bg: #F0F0F0;
  --color-primary: #FF4D00;
  --color-text: #050505;
  --color-text-muted: #555555;
  --particle-colors: #000000, #FF4D00, #555555;
}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-body);
  /* Hide scrollbar for cleaner look if desired, or style it */
}

/* Subtle grain overlay */
.grain-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 9999;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  opacity: 0.04; 
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  text-transform: uppercase;
  font-weight: 400; /* Archivo Black is already bold */
  margin: 0;
}

a {
  color: inherit;
  text-decoration: none;
}
</style>
