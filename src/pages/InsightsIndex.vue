<template>
  <div class="insights-index">
    <header class="insights-index__header">
      <router-link to="/" class="back-link">
        <span class="icon">←</span> BACK HOME
      </router-link>
      <h1 class="page-title">ALL INSIGHTS</h1>
      <p class="page-desc">Essays on engineering, design, and digital manufacturing.</p>
    </header>

    <div class="insights-index__grid">
      <article v-for="post in posts" :key="post.id" class="post-card">
        <router-link :to="`/insight/${post.id}`" class="post-card__link">
          <div class="post-card__image-wrapper">
             <div class="noise-overlay"></div>
             <img :src="post.imageSrc" :alt="post.title" class="post-card__image" />
          </div>
          <div class="post-card__content">
            <span class="post-card__category">{{ post.category }}</span>
            <h3 class="post-card__title">{{ post.title }}</h3>
            <span class="post-card__date">{{ post.date }}</span>
          </div>
        </router-link>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import insightsData from '../content/insights.json'

const posts = ref(insightsData)
</script>

<style lang="scss" scoped>
.insights-index {
  padding: 8rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
  min-height: 100vh;
  
  &__header {
    margin-bottom: 6rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    
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
      align-self: flex-start;
      margin-bottom: 2rem;
      
      &:hover {
        color: var(--color-primary);
      }
    }
  }
}

.page-title {
  font-size: clamp(4rem, 8vw, 6rem);
  line-height: 1;
  margin: 0;
}

.page-desc {
  font-family: var(--font-body);
  font-size: 1.25rem;
  color: var(--color-text-muted);
  max-width: 500px;
}

.insights-index__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4rem 2rem;
}

.post-card {
  &__link {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    text-decoration: none;
    
    &:hover {
      .post-card__image {
        filter: grayscale(0) contrast(1.1);
      }
      .post-card__title {
        color: var(--color-primary);
      }
    }
  }

  &__image-wrapper {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 10;
    overflow: hidden;
    background-color: var(--color-text-muted);
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

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(100%) contrast(1.2);
    transition: filter 0s;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
  &__category {
    color: var(--color-primary);
    font-family: var(--font-body);
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.05em;
  }

  &__title {
    font-size: 1.5rem;
    line-height: 1.2;
    color: var(--color-text);
    margin: 0;
    transition: color 0s;
  }
  
  &__date {
    color: var(--color-text-muted);
    font-family: var(--font-body);
    font-size: 0.75rem;
    text-transform: uppercase;
  }
}

@media (max-width: 1024px) {
  .insights-index__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .insights-index__grid {
    grid-template-columns: 1fr;
  }
}
</style>
