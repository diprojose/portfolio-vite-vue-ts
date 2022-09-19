<script lang="ts">

export default {
  data: () => {
    return {
    }
  },

  methods: {
  },

  computed: {
  }
}

</script>

<template>
  <div class="hero-container">
    <div class="hero-text-container">
      <h2 class="name">José Antonio Parejo Tovar</h2>
      <h1 class="position">Senior Software Engineer</h1>
    </div>
    <div class="hero-image-container">
    </div>
  </div>
</template>

<style lang="scss" scoped>

.hero-container {
  min-height: 400px;
  background-color: $dark-gray;
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 25px;
  .hero-text-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    h1, h2 {
      margin: 0;
      padding: 0;
      color: $gray;
    }
  }
  .hero-image-container {
    position: relative;
    .jose-photo {
      width: auto;
      position: absolute;
      max-height: 400px;
    }
  }
}
</style>
