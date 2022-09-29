<script lang="ts">
export default {
  
}
</script>

<template>
  <div class="about">
    <div class="about-container">
      <div class="col center">
        <img class="jose-image" src="../../assets/img/joseparejo.png" alt="">
      </div>
      <div class="col text">
        <h3 class="about-title">About me</h3>
        <p class="about-text">Hi! I'm Jose Parejo and I enjoy creating web solutions for people and brands. I developed my first website in 2014 and ever since then I couldn't stop, I started my own company in Venezuela named Dipro and I got a lot of clients national and international, this experience gave me background not only in web development but also in design, project management and negotiation.
        </p>
        <p class="about-text">After that I came to Colombia and here I been working for amazing companies as a Software Developer. I had the great opportunity to lead a team of Frontend Developers, this enforced the soft skills and also learned about giving interviews to find the best talent for the team.</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.about {
  background-color: $dark-gray;
  .about-container {
    padding: 50px 25px 100px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    .col {
      position: relative;
      &.center {
        text-align: center;
      }
      .about-title {
        color: $green;
        font-size: 3rem;
        margin: 0;
        text-transform: uppercase;
        line-height: 3rem;
        padding-bottom: 1rem;
      }
      .about-title-minor {
        color: $green;
        text-transform: uppercase;
        font-size: 1.2rem;
        margin-top: 0;
      }
      .about-text {
        color: $gray;
        font-size: 1.2rem;
        margin-top: 0;
        max-width: 500px;
      }
      .jose-image {
        max-height: 500px;
      }
    }
  }
}

.custom-shape-divider {
  svg {
    position: relative;
    display: block;
    width: calc(100% + 1.3px);
    height: 150px;
  }
  .shape-fill {
    fill: $medium-gray;
  }
}

@keyframes bigSmall {
  from {
    background-size: 65%;
  }
  to {
    background-size: 50%;
  }
}
</style>