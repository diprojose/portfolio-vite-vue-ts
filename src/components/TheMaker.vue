<template>
  <section class="the-maker" id="maker">
    <div class="the-maker__bg-pattern"></div>
    <div class="the-maker__container">
      <div class="the-maker__image">
        <div class="noise-overlay"></div>
        <!-- Image of a person holding a plastic object, representing additive manufacturing/physical product design -->
        <img src="../assets/img/the-maker.jpg" alt="3D Printing and Physical Prototyping" />
      </div>
      
      <div class="the-maker__content">
        <h2 class="section-label">THE MAKER</h2>
        <h3 class="section-title">BRIDGING THE GAP BETWEEN BITS AND ATOMS.</h3>
        
        <p class="section-text">
          Software doesn't live in a vacuum. My engineering philosophy is defined by the synthesis of digital logic and physical fabrication. By merging additive manufacturing with scalable code, I transform abstract algorithms into functional, tangible realities.
        </p>
        
        <div class="stats-grid">
          <div class="stat-item">
            <span class="stat-item__value">12+</span>
            <span class="stat-item__label">PATENTS<br>FILED</span>
          </div>
          <div class="stat-item">
            <span class="stat-item__value">8yr</span>
            <span class="stat-item__label">PRODUCT<br>DESIGN</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.the-maker {
  border-top: 1px solid var(--color-bg); // Divider line implicitly created by background if sections have different bg
  border-bottom: 1px solid var(--color-bg);
  background-color: var(--color-text); // Invert background for contrast
  color: var(--color-bg);
  padding: 8rem 0;
  position: relative;
  
  &__bg-pattern {
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    // Architectural blueprint grid using the inverted text color
    background-image: 
      linear-gradient(var(--color-bg) 1px, transparent 1px),
      linear-gradient(90deg, var(--color-bg) 1px, transparent 1px);
    background-size: 50px 50px;
    opacity: 0.05; // Extremely subtle
    
    // Fade top and bottom edges
    mask-image: linear-gradient(to bottom, transparent, black 10%, black 90%, transparent);
    -webkit-mask-image: linear-gradient(to bottom, transparent, black 10%, black 90%, transparent);
  }
  
  &__container {
    position: relative;
    z-index: 1;
    max-width: 1400px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6rem;
    padding: 0 2rem;
    align-items: center;
  }
  
  &__image {
    position: relative;
    width: 100%;
    aspect-ratio: 4 / 5;
    background-color: var(--color-text-muted);
    overflow: hidden;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: grayscale(100%) contrast(1.5);
    }
  }

  .noise-overlay {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 2;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    opacity: 0.2;
    mix-blend-mode: overlay;
  }
  
  &__content {
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }
}

.section-label {
  color: var(--color-primary);
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  margin: 0;
}

.section-title {
  font-size: clamp(3rem, 6vw, 5.5rem);
  line-height: 0.9;
  letter-spacing: -0.02em;
  margin: 0;
  color: var(--color-bg);
}

.section-text {
  font-family: var(--font-body);
  font-size: 1.125rem;
  line-height: 1.6;
  max-width: 500px;
  color: var(--color-bg); // For inverted section
}

.stats-grid {
  display: flex;
  gap: 4rem;
  margin-top: 2rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  
  &__value {
    font-family: var(--font-heading);
    font-size: 4rem;
    line-height: 1;
    color: var(--color-bg);
  }
  
  &__label {
    font-family: var(--font-body);
    font-size: 0.875rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    line-height: 1.2;
    text-transform: uppercase;
  }
}

@media (max-width: 1024px) {
  .the-maker__container {
    grid-template-columns: 1fr;
    gap: 4rem;
  }
  
  .stats-grid {
    flex-wrap: wrap;
    gap: 2rem;
  }
}
</style>
