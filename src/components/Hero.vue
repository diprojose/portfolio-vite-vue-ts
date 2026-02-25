<template>
  <section class="hero">
    <ParticleRing3D />
    <div class="hero__content">
      <h1 class="hero__title">
        <span class="reveal-up">ARCHITECTING</span>
        <span class="reveal-up">DIGITAL</span>
        <span class="reveal-up">
          <span class="text-stroke">SYSTEMS</span> &
        </span>
        <span class="reveal-up">TANGIBLE</span>
        <span class="reveal-up text-orange">INNOVATIONS</span>
      </h1>
      
      <div class="hero__action reveal-up">
        <router-link to="/#works" class="btn btn--outline">
          <span class="icon">↓</span> EXPLORE WORKS
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import ParticleRing3D from './ParticleRing3D.vue'

onMounted(() => {
  // Simple intersection observer or class toggle for the reveal
  setTimeout(() => {
    document.querySelectorAll('.hero__title .reveal-up').forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('is-visible')
      }, index * 200)
    })
    setTimeout(() => {
      document.querySelector('.hero__action')?.classList.add('is-visible')
    }, 1000)
  }, 100)
})
</script>

<style lang="scss" scoped>
.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  padding-top: 10vh;
  text-align: center;
  position: relative;
  overflow: hidden; // Prevent particles bleeding out of hero bounds
  
  &__content {
    max-width: 1400px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    z-index: 10;
    pointer-events: none; // Let mouse events pass through to particle canvas
  }
  
  &__title {
    font-size: clamp(3rem, 10vw, 9rem);
    line-height: 0.9;
    letter-spacing: -0.02em;
    display: flex;
    flex-direction: column;
    
    span.reveal-up {
      display: inline-block;
      overflow: hidden;
      transform: translateY(100%);
      opacity: 0;
      transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease;
      
      &.is-visible {
        transform: translateY(0);
        opacity: 1;
      }
    }
  }
  
  .text-stroke {
    color: transparent;
    -webkit-text-stroke: 1px var(--color-text-muted);
  }
  
  .text-orange {
    color: var(--color-primary);
  }
  
  &__action {
    margin-top: 4rem;
    overflow: hidden;
    transform: translateY(50%);
    opacity: 0;
    transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease;
    pointer-events: auto; // Re-enable pointer events for the button
    
    &.is-visible {
      transform: translateY(0);
      opacity: 1;
    }
  }
}

.btn {
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 0.875rem;
  letter-spacing: 0.05em;
  padding: 1rem 2rem;
  background: transparent;
  color: var(--color-text);
  border: 1px solid var(--color-text);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  text-transform: uppercase;
  text-decoration: none;
  transition: background 0s, color 0s; // Zero easing
  border-radius: 0; // Zero border-radius
  
  &:hover {
    background: var(--color-text);
    color: var(--color-bg);
  }
  
  &--outline {
    border-color: var(--color-text-muted);
    color: var(--color-text);
    
    &:hover {
      background: var(--color-text);
      color: var(--color-bg);
      border-color: var(--color-text);
    }
  }
  
  .icon {
    font-size: 1.2em;
  }
}
</style>
