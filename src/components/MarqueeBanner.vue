<template>
  <div class="marquee-wrapper">
    <div class="marquee-banner">
      <div class="marquee-banner__content">
        <span class="marquee-banner__text" v-for="i in 10" :key="i">
          SCALING IDEAS INTO ROBUST SOLUTIONS —
        </span>
      </div>
      <div class="marquee-banner__overlay">
        <a href="mailto:parejojose77@gmail.com" class="btn btn--solid">START A PROJECT</a>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.marquee-wrapper {
  width: 100%;
  overflow: hidden;
  background-color: var(--color-primary);
  position: relative;
  padding: 4rem 0;
  border-top: 1px solid var(--color-bg); // Visual separation if needed
  border-bottom: 1px solid var(--color-bg);
}

.marquee-banner {
  position: relative;
  display: flex;
  align-items: center;

  &__content {
    display: flex;
    white-space: nowrap;
    /* Reverse Marquee: Translate from left to right */
    animation: marquee-reverse 40s linear infinite;
  }

  &__text {
    font-family: var(--font-heading);
    font-size: clamp(4rem, 8vw, 6rem);
    color: var(--color-bg);
    text-transform: uppercase;
    padding-right: 2rem;
    line-height: 1;
  }

  &__overlay {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
  }
}

.btn {
  font-family: var(--font-body);
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: 0.05em;
  padding: 1.5rem 3rem;
  background: var(--color-text);
  color: var(--color-bg);
  border: none;
  cursor: pointer;
  text-transform: uppercase;
  transition: background 0s, color 0s; // Zero easing
  border-radius: 0; // Zero border-radius
  white-space: nowrap;
  text-decoration: none;
  display: inline-block;
  
  &:hover {
    background: var(--color-bg);
    color: var(--color-text);
  }
}

@keyframes marquee-reverse {
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
