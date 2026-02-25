<template>
  <main class="home-page">
    <Hero />
    <MarqueeBanner />
    <SelectedWorks />
    <TheMaker />
    <ProvenProcess />
    <Insights />
    <Footer />
  </main>
</template>

<script setup lang="ts">
import Hero from '../components/Hero.vue'
import MarqueeBanner from '../components/MarqueeBanner.vue'
import SelectedWorks from '../components/SelectedWorks.vue'
import TheMaker from '../components/TheMaker.vue'
import ProvenProcess from '../components/ProvenProcess.vue'
import Insights from '../components/Insights.vue'
import Footer from '../components/Footer.vue'
</script>

<style lang="scss" scoped>
.home-page {
  width: 100%;
  min-height: 100vh;
}
</style>
