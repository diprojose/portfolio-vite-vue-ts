<template>
  <div class="hero-container" id="hero" :class="{ light: colorMode === 'light' }">
    <div class="hero-text-container">
      <p class="hero-text dafoe">Welcome, I'm</p>
      <h1 class="hero-name">JOSE PAREJO</h1>
      <h2 class="hero-position">Software Engineer</h2>
      <p class="hero-text">I love to bring people ideas to life or online if you prefer. I'm a developer with {{yearsOfExperience}} years of experience in web development, SEO and business.</p>
      <div class="call-to-action">
        <button class="about-button" @click="moveTo('contact')">Contact me</button>
        <button class="work-button" @click="moveTo('work')">Work</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

export default {
  data: () => {
    return {
      yearsOfExperience: 0
    }
  },

  created() {
    this.yearsOfExperience = this.calculateYear(2014);
  },
  computed: {
    colorMode() {
      return localStorage.getItem('colorMode');
    }
  },
  methods: {
    calculateYear(year: number) {
      return new Date().getFullYear() - year;
    },
    moveTo(section: string): void {
      const div = document.getElementById(section);
      if (div !== null) {
        div.scrollIntoView({behavior: "smooth"});
      }
    }
  }
}

</script>

<style lang="scss" scoped>

.hero-container {
  background-color: $dark-gray;
  min-height: 560px;
  display: flex;
  justify-content: center;
  padding-top: 87px;
  &.light {
    background-color: $gray;
    .hero-text {
      color: $dark-gray;
      &.dafoe {
        color: $light-green;
      }
    }
    .hero-name {
      color: $dark-gray !important;
    }
    .hero-position {
      color: $light-green !important;
    }
  }
  .hero-text-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 50px 25px;
    max-width: 700px;
    text-align: center;
    .hero-text {
      font-size: 1.3rem;
      &.dafoe {
        font-size: 2.5rem;
      }
    }
    .hero-name {
      font-size: 5rem;
      color: $white;
      @include responsive(xs) {
        font-size: 3rem;
      }
    }
    .hero-position {
      font-size: 3.4rem;
      font-weight: bold;
      padding-bottom: 10px;
      color: $green;
      text-transform: uppercase;
      @include responsive(xs) {
        font-size: 2rem;
      }
    }
    h1, h2, p {
      margin: 0;
      padding: 0;
      color: $gray;
    }
    .call-to-action {
      padding-top: 20px;
      .about-button {
        background: transparent;
        border: 1px solid $white;
        color: $white;
        padding: 10px 15px;
        border-radius: 20px;
        font-weight: bold;
        cursor: pointer;
        &:hover {
          background: $green;
          color: $dark-gray;
          border: 1px solid $green;
        }
      }
      .work-button {
        background: $green;
        border: 1px solid $green;
        color: $dark-gray;
        padding: 10px 15px;
        margin-left: 20px;
        border-radius: 20px;
        font-weight: bold;
        cursor: pointer;
        &:hover {
          background: $green;
          color: $dark-gray;
        }
      }
    }
  }
}

@keyframes bigSmall {
  from {
    background-size: 50%;
  }
  to {
    background-size: 100%;
  }
}
</style>
