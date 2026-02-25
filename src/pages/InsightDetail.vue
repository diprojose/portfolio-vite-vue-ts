<template>
  <div class="insight-detail" v-if="post">
    <!-- Header with Back Button -->
    <header class="insight-detail__header">
      <router-link to="/insights" class="back-link">
        <span class="icon">←</span> ALL INSIGHTS
      </router-link>
    </header>

    <!-- Main Content Area -->
    <article class="insight-article">
      <header class="insight-article__hero">
        <div class="meta-row">
          <span class="category">{{ post.category }}</span>
          <span class="date">{{ post.date }}</span>
        </div>
        <h1 class="title">{{ post.title }}</h1>
      </header>
      
      <div class="insight-article__banner">
        <img :src="post.imageSrc" :alt="post.title" class="banner-img" />
        <div class="noise-overlay"></div>
      </div>

      <div class="insight-article__body">
        <div class="content-block">
          <p v-for="(paragraph, index) in formattedContent" :key="index" :class="{'h3-placeholder': paragraph.startsWith('### ')}">
            {{ formatText(paragraph) }}
          </p>
        </div>
      </div>
    </article>
  </div>
  <div class="insight-not-found" v-else>
    <h2>ARTICLE NOT FOUND</h2>
    <router-link to="/insights" class="btn btn--outline">RETURN TO INSIGHTS</router-link>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import insightsData from '../content/insights.json'

const route = useRoute()
const insightId = Number(route.params.id)

const post = ref<any | null>(null)

onMounted(() => {
  post.value = insightsData.find(p => p.id === insightId) || null
  
  if (post.value) {
    document.title = `${post.value.title} | Jose Parejo`
    
    let metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      const descContent = post.value.content ? post.value.content.split('\n\n')[0].replace('### ', '').substring(0, 150) + '...' : `Article: ${post.value.title}`
      metaDesc.setAttribute('content', descContent)
    }
  }
})

const formattedContent = computed(() => {
  if (!post.value || !post.value.content) return []
  return post.value.content.split('\n\n').filter((p: string) => p.trim() !== '')
})

// Super basic markdown-ish formatter just for '### ' headers
const formatText = (text: string) => {
  if (text.startsWith('### ')) {
    return text.replace('### ', '')
  }
  return text
}
</script>

<style lang="scss" scoped>
.insight-detail {
  padding-top: 5rem;
  padding-bottom: 8rem;
  background-color: var(--color-bg);
  min-height: 100vh;
}

.insight-detail__header {
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

.insight-article {
  max-width: 1000px;
  margin: 0 auto;
  
  &__hero {
    padding: 6rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    
    .meta-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid var(--color-text);
      padding-bottom: 1rem;
      
      .category {
        font-family: var(--font-body);
        font-size: 1rem;
        color: var(--color-primary);
        font-weight: 700;
      }
      .date {
        font-family: var(--font-body);
        font-size: 0.875rem;
        color: var(--color-text-muted);
      }
    }
    
    .title {
      font-size: clamp(3rem, 6vw, 5rem);
      line-height: 1;
      margin: 0;
      text-transform: uppercase;
    }
  }
  
  &__banner {
    width: 100%;
    aspect-ratio: 21 / 9;
    position: relative;
    overflow: hidden;
    background-color: var(--color-text-muted);
    
    .banner-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: grayscale(100%);
    }
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
  
  &__body {
    padding: 6rem 2rem;
    max-width: 800px;
    margin: 0 auto;
    
    .content-block {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      
      p {
        font-family: var(--font-body);
        font-size: 1.25rem;
        line-height: 1.8;
        color: var(--color-text);
        opacity: 0.9;
        
        &.h3-placeholder {
          font-family: var(--font-heading);
          font-size: 2rem;
          opacity: 1;
          margin-top: 2rem;
          color: var(--color-primary);
          text-transform: uppercase;
        }
      }
    }
  }
}

.insight-not-found {
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
</style>
