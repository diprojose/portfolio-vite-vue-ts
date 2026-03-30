<template>
  <section class="insights" id="insights">
    <div class="insights__bg-pattern"></div>
    <div class="insights__header">
      <h2 class="section-title">INSIGHTS</h2>
      <router-link to="/insights" class="view-all-link">VIEW ALL INSIGHTS ↗</router-link>
    </div>
    
    <div class="insights__grid">
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
  </section>
</template>

<script setup lang="ts">
import insightsData from '../content/insights.json'

// Take only the latest 3 for the homepage
const posts = insightsData.slice(0, 3)
</script>

<style lang="scss" scoped>
.insights {
  padding: 8rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  
  &__bg-pattern {
    position: absolute;
    inset: 0;
    z-index: -1;
    pointer-events: none;
    // Dot matrix pattern
    background-image: radial-gradient(var(--color-text-muted) 1.5px, transparent 1.5px);
    background-size: 40px 40px;
    opacity: 0.2;
    mask-image: linear-gradient(to bottom, transparent, black 10%, black 90%, transparent);
    -webkit-mask-image: linear-gradient(to bottom, transparent, black 10%, black 90%, transparent);
  }
  
  &__header {
    margin-bottom: 4rem;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 2rem;
    flex-wrap: wrap;
    
    .view-all-link {
      font-family: var(--font-body);
      font-size: 1rem;
      font-weight: 700;
      color: var(--color-text);
      text-decoration: underline;
      text-decoration-thickness: 2px;
      text-underline-offset: 4px;
      transition: color 0s;
      
      &:hover {
        color: var(--color-primary);
        text-decoration-color: var(--color-primary);
      }
    }
  }
}

.section-title {
  font-size: clamp(3rem, 6vw, 4.5rem);
  line-height: 1;
  letter-spacing: -0.02em;
}

.insights__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
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
    transition: filter 0s; // Zero easing
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
    font-size: 1.25rem;
    line-height: 1.3;
    color: var(--color-text);
    margin: 0;
    transition: color 0s; // Zero easing
  }
  
  &__date {
    color: var(--color-text-muted);
    font-family: var(--font-body);
    font-size: 0.75rem;
    text-transform: uppercase;
  }
}

@media (max-width: 1024px) {
  .insights__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .insights__grid {
    grid-template-columns: 1fr;
  }
}
</style>
