<template>
  <section class="proven-process" id="process">
    <div class="proven-process__header">
      <h2 class="section-label">MY PROVEN PROCESS</h2>
      <h3 class="section-title">FROM VISION<br>TO REALITY</h3>
      <p class="section-text">
        I follow a rigorous, documentation-first process to ensure every line of <br>
        code and every physical component serves a strategic purpose in the final <br>
        product.
      </p>
    </div>
    
    <div class="process-grid">
      <div class="process-card process-card--dark">
        <div class="process-card__header">
          <span class="process-card__number">01</span>
          <span class="process-card__label">DISCOVER</span>
        </div>
        <h4 class="process-card__title">TECHNICAL AUDIT<br>&<br>SCOPING</h4>
      </div>
      
      <div class="process-card process-card--light">
        <div class="process-card__header">
          <span class="process-card__number">02</span>
          <span class="process-card__label">DESIGN</span>
        </div>
        <h4 class="process-card__title">SYSTEM ARCHITECTURE<br>&<br>UI BLUEPRINTS</h4>
      </div>
      
      <div class="process-card process-card--dark">
        <div class="process-card__header">
          <span class="process-card__number">03</span>
          <span class="process-card__label">DEVELOP</span>
        </div>
        <h4 class="process-card__title">FULLSTACK IMPLEMENTATION<br>&<br>LOGIC</h4>
      </div>
      
      <div class="process-card process-card--light">
        <div class="process-card__header">
          <span class="process-card__number">04</span>
          <span class="process-card__label">DELIVER</span>
        </div>
        <h4 class="process-card__title">QA, DEPLOYMENT<br>&<br>SCALABILITY</h4>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.proven-process {
  padding: 8rem 0;
  max-width: 1400px;
  margin: 0 auto;
  border-bottom: 2px solid var(--color-text-muted); // Section separator
  
  &__header {
    padding: 0 2rem;
    margin-bottom: 4rem;
  }
}

.section-label {
  color: var(--color-primary);
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &::before {
    content: '';
    display: inline-block;
    width: 0;
    height: 0;
    border-left: 6px solid var(--color-primary);
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
  }
}

.section-title {
  font-size: clamp(3rem, 6vw, 5.5rem);
  line-height: 0.9;
  letter-spacing: -0.02em;
  margin-bottom: 2rem;
}

.section-text {
  font-family: var(--font-body);
  font-size: 1.125rem;
  line-height: 1.6;
  color: var(--color-text-muted);
}

.process-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.process-card {
  padding: 3rem 2rem;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-right: 1px solid var(--color-text-muted);
  
  &:last-child {
    border-right: none;
  }
  
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  
  &__number {
    font-family: var(--font-heading);
    color: transparent;
    -webkit-text-stroke: 1px currentColor;
    font-size: 3rem;
    line-height: 1;
  }
  
  &__label {
    color: var(--color-primary);
    font-family: var(--font-heading);
    font-size: 1rem;
    letter-spacing: 0.05em;
  }
  
  &__title {
    font-size: clamp(1.25rem, 1.8vw, 1.6rem);
    line-height: 1.1;
    margin: 0;
    overflow-wrap: break-word;
    hyphens: auto;
  }
  
  &--dark {
    background-color: var(--color-bg);
    color: var(--color-text);
  }
  
  &--light {
    background-color: var(--color-text);
    color: var(--color-bg);
  }
}

@media (max-width: 1024px) {
  .process-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .process-card:nth-child(2) {
    border-right: none;
  }
}

@media (max-width: 600px) {
  .process-grid {
    grid-template-columns: 1fr;
  }
  
  .process-card {
    border-right: none;
    border-bottom: 1px solid var(--color-text-muted);
    min-height: 300px;
    
    &:last-child {
      border-bottom: none;
    }
  }
}
</style>
