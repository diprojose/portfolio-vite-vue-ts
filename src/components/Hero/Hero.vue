<script lang="ts">

export default {
  data: () => {
    return {
      countX: 0,
      countY: 0,
      directionX: '',
      directionY: '',
      movementX: 0,
      movementY: 0,
      multiplier: 0.2,
    }
  },

  methods: {
    moveBlobs(event: any) {
      console.log(event);
      if (event.pageX !== this.countX) {
        this.directionX = event.pageX < this.countX ? 'right' : 'left';
        this.movementX = event.pageX - this.countX;
        this.countX = event.pageX;
      }
      if (event.pageY !== this.countY) {
        this.directionY = event.pageY > this.countY ? 'up' : 'down';
        this.movementY = event.pageY - this.countY;
        this.countY = event.pageY;
      }
    }
  },

  computed: {
    movementStyles() {
      return {
        transform: `translate(${(this.movementX * this.multiplier)}px, ${(this.movementY * this.multiplier)}px)`
      }
    }
  }
}

</script>

<template>
  <div class="hero-container" @mousemove="moveBlobs($event)">
    <div class="hero-text-container">
      <h1>José Antonio Parejo Tovar</h1>
      <h2>Senior Software Engineer {{ count }}</h2>
    </div>
    <div class="hero-image-container">
      <svg
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        :style="movementStyles">
        <path fill="#06bcc1" d="M46.2,-50C58.8,-33.6,67.1,-16.8,65.9,-1.3C64.6,14.2,53.6,28.5,41.1,45C28.5,61.4,14.2,80.1,0.1,80C-14.1,80,-28.1,61.1,-44.5,44.6C-60.9,28.1,-79.6,14.1,-83.6,-4.1C-87.7,-22.2,-77.1,-44.3,-60.7,-60.7C-44.3,-77.1,-22.2,-87.8,-2.7,-85.1C16.8,-82.4,33.6,-66.4,46.2,-50Z" transform="translate(100 100)" />
      </svg>
      <img class="jose-photo" src="../../assets/jose.png" alt="">
    </div>
  </div>
</template>

<style lang="scss" scoped>

.hero-container {
  min-height: 600px;
  background-color: $dark-blue;
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
    svg {
      width: 100%;
      position: absolute;
      top: 0;
    }
    .jose-photo {
      width: auto;
      position: absolute;
      max-height: 600px;
    }
  }
}
</style>
