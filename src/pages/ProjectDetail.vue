<template>
  <div class="project-detail" v-if="project">
    <!-- Header with Back Button -->
    <header class="project-detail__header">
      <router-link to="/#works" class="back-link">
        <span class="icon">←</span> BACK TO WORKS
      </router-link>
    </header>

    <!-- Project Hero Title -->
    <section class="project-detail__hero">
      <h1 class="project-title">{{ project.name }}</h1>
      <div class="project-meta">
        <div class="meta-item">
          <span class="meta-label">TECH STACK</span>
          <ul class="meta-stack-list">
            <li v-for="tech in project.stack" :key="tech" class="meta-stack-item">{{ tech }}</li>
          </ul>
        </div>
        <div class="meta-item" v-if="project.link">
          <span class="meta-label">LIVE SITE</span>
          <a :href="project.link" target="_blank" rel="noopener noreferrer" class="meta-link">VIEW PROJECT ↗</a>
        </div>
      </div>
    </section>

    <!-- Main Body: Image Left, Text Right -->
    <section class="project-detail__body">
      <div class="project-layout">
        <!-- Visuals Column (Sticky) -->
        <div class="project-visuals">
          <div class="visual-card">
            <!-- Use the first image if array exists, else use thumbnail -->
            <img :src="getBannerImage(project)" :alt="project.name" class="visual-img" />
            <div class="noise-overlay"></div>
            <div class="color-reveal-hint">HOVER TO REVEAL</div>
          </div>
        </div>

        <!-- Text Column -->
        <div class="content-wrapper" v-if="project.problem">
          <div class="content-section">
            <h2 class="content-heading">THE PROBLEM</h2>
            <p class="content-text">{{ project.problem }}</p>
          </div>
          
          <div class="content-section">
            <h2 class="content-heading">THE SOLUTION</h2>
            <p class="content-text">{{ project.solution }}</p>
          </div>
          
          <div class="content-section">
            <h2 class="content-heading">THE RESULT</h2>
            <p class="content-text">{{ project.result }}</p>
          </div>
        </div>
      </div>

      <!-- Additional Images Grid if available -->
      <div class="project-detail__gallery" v-if="project.images && project.images.length > 1">
        <div 
          v-for="(img, index) in project.images.slice(1)" 
          :key="index"
          class="gallery-item"
        >
          <img :src="resolveImagePath(img)" :alt="`${project.name} screenshot ${Number(index) + 2}`" />
          <div class="noise-overlay"></div>
        </div>
      </div>
    </section>
  </div>
  <div class="project-not-found" v-else>
    <h2>PROJECT NOT FOUND</h2>
    <router-link to="/" class="btn btn--outline">RETURN HOME</router-link>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
// Using dynamic import or direct import if JSON is local
import projectsData from '../content/projects.json'

const route = useRoute()
const projectId = Number(route.params.id)

const project = ref<any | null>(null)

onMounted(() => {
  project.value = projectsData.find(p => p.id === projectId) || null
  
  if (project.value) {
    document.title = `${project.value.name} | Jose Parejo`
    
    let metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      const descContent = project.value.problem ? project.value.problem.substring(0, 150) + '...' : `Engineering case study: ${project.value.name}`
      metaDesc.setAttribute('content', descContent)
    }
  }
})

// Helper to resolve images if they are local or external
const resolveImagePath = (path: string) => {
  if (path.startsWith('http')) return path
  // Resolve local assets dynamically so Vite bundles them correctly
  return new URL(`../assets/portfolio/${path}`, import.meta.url).href
}

const getBannerImage = (proj: any) => {
  if (proj.thumb) {
    return resolveImagePath(proj.thumb)
  }
  return 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200&h=800'
}
</script>

<style lang="scss" scoped>
.project-detail {
  padding-top: 5rem; // Account for fixed header if any
  padding-bottom: 8rem;
  background-color: var(--color-bg);
  min-height: 100vh;
}

.project-detail__header {
  padding: 2rem;
  border-bottom: 1px solid var(--color-text-muted);
}

.back-link {
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 700;
  text-decoration: none;
  color: var(--color-text-muted);
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0s;
  
  &:hover {
    color: var(--color-primary);
  }
}

.project-detail__hero {
  padding: 6rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

.project-title {
  font-size: clamp(4rem, 8vw, 8rem);
  line-height: 0.9;
  margin: 0;
  text-transform: uppercase;
}

.project-meta {
  display: flex;
  gap: 4rem;
  flex-wrap: wrap;
}

.meta-item {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.meta-label {
  font-family: var(--font-body);
  font-size: 0.75rem;
  color: var(--color-primary);
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.1em;
}

.meta-stack-list {
  display: flex;
  gap: 1rem;
  list-style: none;
  padding: 0;
  margin: 0;
  flex-wrap: wrap;
}

.meta-stack-item {
  font-family: var(--font-body);
  font-size: 1rem;
  color: var(--color-bg);
  background: var(--color-text);
  padding: 0.25rem 1rem;
  text-transform: uppercase;
  font-weight: 700;
}

.meta-link {
  font-family: var(--font-body);
  font-size: 1rem;
  color: var(--color-text);
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-underline-offset: 4px;
  font-weight: 700;
  
  &:hover {
    color: var(--color-primary);
    text-decoration-color: var(--color-primary);
  }
}

.project-detail__body {
  padding: 0 2rem 6rem;
  max-width: 1400px;
  margin: 0 auto;
}

.project-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6rem;
  align-items: start;
}

.visual-card {
  position: sticky;
  top: 120px; /* Stay visible while reading */
  width: 100%;
  aspect-ratio: 4/3;
  overflow: hidden;
  background-color: var(--color-text-muted);
  cursor: crosshair;
  
  .visual-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(100%) contrast(1.1);
    transform: scale(1);
    transition: filter 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  &:hover .visual-img {
    filter: grayscale(0%) contrast(1);
    transform: scale(1.05);
  }
  
  &:hover .color-reveal-hint {
    opacity: 0;
  }
}

.color-reveal-hint {
  position: absolute;
  bottom: 0;
  right: 0;
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-bg);
  background: var(--color-text);
  padding: 0.5rem 1rem;
  pointer-events: none;
  opacity: 1;
  transition: opacity 0.3s;
  z-index: 3;
}

.noise-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 2;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  opacity: 0.15;
  mix-blend-mode: overlay;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

.content-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.content-heading {
  font-family: var(--font-heading);
  font-size: 2rem;
  color: var(--color-primary);
  margin: 0;
}

.content-text {
  font-family: var(--font-body);
  font-size: 1.25rem;
  line-height: 1.8;
  color: var(--color-text);
  opacity: 0.9;
  margin: 0;
}

.project-detail__gallery {
  margin-top: 6rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  .gallery-item {
    position: relative;
    aspect-ratio: 4/3;
    overflow: hidden;
    background: var(--color-text-muted);
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: grayscale(100%);
    }
  }
}

.project-not-found {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  text-align: center;
  
  h2 {
    font-size: 3rem;
  }
}

@media (max-width: 1024px) {
  .project-detail__hero {
    gap: 2rem;
  }
  .project-meta {
    flex-direction: column;
    gap: 2rem;
  }
  .project-layout {
    grid-template-columns: 1fr;
    gap: 4rem;
  }
  .visual-card {
    position: relative;
    top: 0;
  }
  .project-detail__gallery {
    grid-template-columns: 1fr;
  }
}
</style>
