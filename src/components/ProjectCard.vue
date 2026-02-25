<template>
  <article class="project-card">
    <router-link :to="link" class="project-card__link">
      <div class="project-card__image-wrapper">
        <ProjectCard3D :imageSrc="imageSrc" />
      </div>
      <div class="project-card__info">
        <h3 class="project-card__title">{{ title }}</h3>
        <span class="project-card__category">{{ category }}</span>
        <span class="project-card__cta">EXPLORE ARCHITECTURE <span class="arrow">↗</span></span>
      </div>
    </router-link>
  </article>
</template>

<script setup lang="ts">
import ProjectCard3D from './ProjectCard3D.vue'

defineProps<{
  title: string
  category: string
  imageSrc: string
  link: string
}>()
</script>

<style lang="scss" scoped>
.project-card {
  width: 100%;
  display: block;
  
  &__link {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    text-decoration: none;
    
    // Hover states for the whole card
    &:hover {
      .project-card__category {
        color: var(--color-primary);
        opacity: 1;
        transform: translateY(0);
      }
      .project-card__cta {
        color: var(--color-primary);
        .arrow {
          transform: translate(4px, -4px);
        }
      }
    }
  }

  &__image-wrapper {
    position: relative;
    width: 100%;
    aspect-ratio: 4 / 3;
    overflow: hidden;
    background-color: var(--color-text-muted);
  }

  .noise-overlay {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 2;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    opacity: 0.15;
    mix-blend-mode: overlay;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(100%) contrast(1.2);
    transition: filter 0s; // Raw industrial feel, no smooth easing
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  &__title {
    font-size: 1.5rem;
    color: var(--color-text);
    margin: 0;
    line-height: 1.2;
  }

  &__category {
    font-family: var(--font-body);
    font-size: 0.875rem;
    color: var(--color-text-muted);
    text-transform: uppercase;
    font-weight: 500;
    transition: color 0s, opacity 0s, transform 0s; // Zero easing
  }

  &__cta {
    font-family: var(--font-body);
    font-size: 0.875rem;
    font-weight: 700;
    color: var(--color-text-muted);
    text-transform: uppercase;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.5rem;
    transition: color 0s; // Hard switch on hover
    
    .arrow {
      font-family: monospace;
      font-size: 1.25rem;
      transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }
  }
}
</style>
