<template>
  <section class="selected-works" id="works">
    <div class="selected-works__bg-pattern"></div>
    <div class="selected-works__header">
      <h2 class="section-title">ARCHITECTING SCALABLE DIGITAL ECOSYSTEMS</h2>
      <p class="section-desc">A selection of production-grade applications focused on performance, scalability, and seamless user experiences.</p>
    </div>
    
    <div class="selected-works__grid">
      <div 
        v-for="(project, index) in projects" 
        :key="project.id"
        class="grid-item"
      >
        <ProjectCard 
          :title="project.title"
          :category="project.category"
          :imageSrc="project.imageSrc"
          :link="project.link"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import ProjectCard from './ProjectCard.vue'
import projectsData from '../content/projects.json'

// Map ALL projects to the display format
const projects = projectsData.map(p => {
  const thumbUrl = p.thumb ? new URL(`../assets/portfolio/${p.thumb}`, import.meta.url).href : 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800&h=600'
  return {
    id: p.id,
    title: p.name,
    category: p.stack.join(' / '), // Display tech stack as category for cool factor
    imageSrc: thumbUrl,
    link: `/project/${p.id}`
  }
})
</script>

<style lang="scss" scoped>
.selected-works {
  padding: 8rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
  position: relative; // Added for absolute background
  
  &__bg-pattern {
    position: absolute;
    inset: 0;
    z-index: -1;
    pointer-events: none;
    // Combine a dot grid with a raw diagonal "scratch" pattern
    background-image: 
      radial-gradient(var(--color-text-muted) 1px, transparent 1px),
      url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.83-54.627 54.627-.83-.83L54.627 0zM29.172 0l.83.83-29.172 29.172-.83-.83L29.172 0zM89.172 60l.83.83-29.172 29.172-.83-.83L89.172 60zM0 29.172l.83.83L60 89.172l-.83.83L0 29.172z' fill='%23ffffff' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E");
    background-size: 40px 40px, 120px 120px;
    opacity: 0.15; // Subtle integration
    
    // Fade out edges so it blends cleanly with sections above and below
    mask-image: linear-gradient(to bottom, transparent, black 10%, black 90%, transparent);
    -webkit-mask-image: linear-gradient(to bottom, transparent, black 10%, black 90%, transparent);
  }
  
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 6rem;
    gap: 2rem;
    flex-wrap: wrap;
  }
}

.section-title {
  font-size: clamp(3rem, 6vw, 5rem);
  max-width: 800px;
  line-height: 1;
}

.section-desc {
  font-family: var(--font-body);
  color: var(--color-text-muted);
  max-width: 300px;
  text-align: right;
  font-size: 1rem;
  line-height: 1.5;
}

/* Scalable Graphic Grid Layout */
.selected-works__grid {
  display: grid;
  // Scalable grid: Creates as many columns as fit that are at least 450px wide, up to 1fr.
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 6rem 4rem; // Large vertical gap to give the stagger room to breathe
}

.grid-item {
  width: 100%;
  
  // Create an architectural/masonry staggering effect purely with CSS based on order
  &:nth-child(even) {
    margin-top: 8rem;
  }
  
  // Consistent 4:3 aspect ratio for all cards as requested
  :deep(.project-card__image-wrapper) {
    aspect-ratio: 4 / 3;
  }
}

@media (max-width: 1024px) {
  .section-desc {
    text-align: left;
  }
  
  .selected-works__grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 4rem 2rem;
  }
  
  .grid-item {
    &:nth-child(even) {
      margin-top: 0; // Disable staggering on tablets/mobile where there might only be 1 or 2 columns
    }
  }
}
</style>
