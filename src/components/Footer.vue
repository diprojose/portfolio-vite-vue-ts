<template>
  <footer class="footer" id="contact">
    <div class="footer__container">
      <div class="footer__main">
        <h2 class="footer__title">GOT AN IDEA?</h2>
        <a href="mailto:parejojose77@gmail.com" class="footer__email">PAREJOJOSE77@GMAIL.COM</a>
      </div>
      
      <div class="footer__meta">
        <nav class="footer__links">
          <a href="https://www.linkedin.com/in/jose-parejo-643a5ba9/">LINKEDIN</a>
          <a href="https://github.com/diprojose">GITHUB</a>
        </nav>
        <div class="footer__credits">
          <p>© 2026 JOSE PAREJO.</p>
          <p>DESIGNED AND ENGINEERED IN THE DIGITAL REALM.</p>
        </div>
      </div>
    </div>
    
    <div class="footer__bottom">
      <span>BASED IN EARTH AND ONLINE</span>
      <button class="scroll-top" @click="scrollToTop" aria-label="Scroll to top">
        ↑
      </button>
    </div>
  </footer>
</template>

<script setup lang="ts">
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>

<style lang="scss" scoped>
.footer {
  border-top: 1px solid var(--color-text-muted);
  padding: 6rem 2rem 2rem;
  
  &__container {
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 6rem;
    flex-wrap: wrap;
    gap: 4rem;
  }
  
  &__main {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  &__title {
    font-size: clamp(3rem, 6vw, 6rem);
    line-height: 1;
    margin: 0;
  }
  
  &__email {
    font-family: var(--font-heading);
    font-size: clamp(1.5rem, 3vw, 2.5rem);
    color: var(--color-primary);
    text-decoration: none;
    transition: color 0s;
    
    &:hover {
      color: var(--color-text);
    }
  }
  
  &__meta {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    text-align: right;
    gap: 2rem;
  }
  
  &__links {
    display: flex;
    gap: 2rem;
    
    a {
      font-family: var(--font-body);
      font-size: 0.875rem;
      font-weight: 700;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      transition: color 0s;
      
      &:hover {
        color: var(--color-primary);
      }
    }
  }
  
  &__credits {
    font-family: var(--font-body);
    font-size: 0.75rem;
    color: var(--color-text-muted);
    
    p {
      margin: 0.25rem 0;
    }
  }
  
  &__bottom {
    max-width: 1400px;
    margin: 0 auto;
    border-top: 1px solid var(--color-text-muted);
    padding-top: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: var(--font-body);
    font-size: 0.75rem;
    color: var(--color-text-muted);
    text-transform: uppercase;
  }
}

.scroll-top {
  background: transparent;
  border: 1px solid var(--color-primary);
  color: var(--color-primary);
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0s, color 0s;
  
  &:hover {
    background: var(--color-primary);
    color: var(--color-bg);
  }
}

@media (max-width: 768px) {
  .footer__container {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .footer__meta {
    align-items: flex-start;
    text-align: left;
  }
  
  .footer__links {
    flex-wrap: wrap;
  }
}
</style>
