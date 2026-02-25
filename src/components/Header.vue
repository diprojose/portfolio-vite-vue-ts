<template>
  <header class="header" :class="{ 'header--visible': isVisible }">
    <div class="header__container">
      <div class="header__logo" @click="scrollTo('top')">
        JOSÉ PAREJO
      </div>
      
      <nav class="header__nav">
        <button class="nav-link" @click="scrollTo('works')">WORKS</button>
        <button class="nav-link" @click="scrollTo('maker')">THE MAKER</button>
        <button class="nav-link" @click="scrollTo('process')">PROCESS</button>
        <button class="nav-link" @click="scrollTo('insights')">INSIGHTS</button>
        <button class="theme-toggle" @click="toggleTheme" :aria-label="isLightMode ? 'Switch to Dark Mode' : 'Switch to Light Mode'">
          <span v-if="isLightMode">DARK</span>
          <span v-else>LIGHT</span>
        </button>
      </nav>
      
      <a :href="resumePdf" download="Jose_Parejo_Resume.pdf" class="btn btn--outline">
        RESUME
      </a>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import resumePdf from '../assets/resume/Jose Parejo - Resume - Senior Software Developer.pdf'

const isVisible = ref(false)
const isLightMode = ref(false)

const toggleTheme = () => {
  isLightMode.value = !isLightMode.value
  const newTheme = isLightMode.value ? 'light' : 'dark'
  document.documentElement.setAttribute('data-theme', newTheme)
  localStorage.setItem('portfolio-theme', newTheme)
  
  // Custom event to tell tsParticles or other components to update if needed
  window.dispatchEvent(new CustomEvent('theme-changed', { detail: { theme: newTheme } }))
}

const checkScroll = () => {
  // Ideally we would measure the exact height of Hero + Marquee, 
  // but roughly 100vh + a bit of padding is a safe threshold
  const threshold = window.innerHeight * 1.1; 
  isVisible.value = window.scrollY > threshold
}

onMounted(() => {
  window.addEventListener('scroll', checkScroll)
  // Initial check in case user reloads halfway down
  checkScroll()
  
  // Theme Setup
  const savedTheme = localStorage.getItem('portfolio-theme')
  if (savedTheme === 'light') {
    isLightMode.value = true
    document.documentElement.setAttribute('data-theme', 'light')
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll)
})

const scrollTo = (sectionId: string) => {
  let targetElement: HTMLElement | null = null;
  
  // Map IDs to specific sections we created
  switch (sectionId) {
    case 'top':
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    case 'works':
      targetElement = document.querySelector('.selected-works');
      break;
    case 'maker':
      targetElement = document.querySelector('.the-maker');
      break;
    case 'process':
      targetElement = document.querySelector('.proven-process');
      break;
    case 'insights':
      targetElement = document.querySelector('.insights');
      break;
    case 'contact':
      targetElement = document.querySelector('.footer');
      break;
  }
  
  if (targetElement) {
    targetElement.scrollIntoView({ behavior: 'smooth' });
  }
}
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: var(--color-bg);
  border-bottom: 1px solid var(--color-text-muted);
  transform: translateY(-100%);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1); // Only easing allowed here for the dropdown effect
  z-index: 9999;
  padding: 1rem 0;
  
  &--visible {
    transform: translateY(0);
  }
  
  &__container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  &__logo {
    font-family: var(--font-heading);
    font-size: 1.5rem;
    color: var(--color-text);
    cursor: pointer;
    text-transform: uppercase;
    transition: color 0s;
    
    &:hover {
      color: var(--color-primary);
    }
  }
  
  &__nav {
    display: flex;
    gap: 2rem;
  }
}

.nav-link {
  background: transparent;
  border: none;
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: var(--color-text);
  cursor: pointer;
  text-transform: uppercase;
  transition: color 0s;
  padding: 0;
  
  &:hover {
    color: var(--color-primary);
  }
}

.theme-toggle {
  background: var(--color-text);
  color: var(--color-bg);
  border: none;
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  padding: 0.25rem 0.75rem;
  margin-left: 1rem;
  cursor: pointer;
  text-transform: uppercase;
  transition: background 0s, color 0s;
  
  &:hover {
    background: var(--color-primary);
    color: var(--color-bg);
  }
}

.btn {
  font-family: var(--font-body);
  font-weight: 700;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  padding: 0.75rem 1.5rem;
  background: transparent;
  color: var(--color-primary);
  border: 1px solid var(--color-primary);
  cursor: pointer;
  text-transform: uppercase;
  text-decoration: none;
  display: inline-block;
  transition: background 0s, color 0s;
  border-radius: 0;
  
  &:hover {
    background: var(--color-primary);
    color: var(--color-bg);
  }
}

@media (max-width: 768px) {
  .header__nav {
    display: none; // Hide links on mobile for now, could add hamburger later
  }
}
</style>
