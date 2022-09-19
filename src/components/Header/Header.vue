<script lang="ts">
export default {
  data: () => {
    return {
      showMenu: false,
    }
  },
  methods: {
    openResponsiveMenu(): void {
      this.showMenu = !this.showMenu;
    }
  }
}
</script>

<template>
  <div class="header-container">
    <div class="logo">
      <h3 class="logo-jp">JP<span class="logo-dot">.</span></h3>
    </div>
    <div class="menu">
      <ul class="menu-list" :class="{ responsive: showMenu }">
        <img @click="openResponsiveMenu()" src="../../assets/close.png" class="close-button" alt="close">
        <li class="menu-list-item">About</li>
        <li class="menu-list-item">Work</li>
        <li class="menu-list-item">Experience</li>
        <li class="menu-list-item">Contact</li>
        <li class="menu-list-item">
          <button class="portfolio-button">Resume</button>
        </li>
      </ul>
      <div @click="openResponsiveMenu()" :class="{ responsive: showMenu }" class="overlay"></div>
      <img @click="openResponsiveMenu()" class="responsive-menu" src="../../assets/menu.png" alt="Menu">
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header-container {
  padding: 25px;
  display: flex;
  justify-content: space-between;
  background-color: $dark-gray;
  align-items: center;
  .logo {
    .logo-jp {
      color: $white;
      font-size: 30px;
      margin: 0;
      .logo-dot {
        color: $green;
      }
    }
  }
  .menu {
    .menu-list {
      display: flex;
      margin: 0;
      align-items: center;
      @include responsive(xs) {
        display: none;
      }
      &.responsive {
        width: 30%;
        height: 100vh;
        display: block;
        position: fixed;
        right: 0;
        top: 0;
        background-color: $medium-gray;
        z-index: 2;
        padding-left: 20px;
        .close-button {
          display: block;
          padding: 20px 0;
          cursor: pointer;
        }
        .menu-list-item {
          padding-bottom: 20px;
          text-align: right;
          &:first-child {
            padding-top: 20px;
          }
          &:last-child {
            padding-right: 20px;
          }
        }
      }
      .close-button {
        display: none;
      }
      .menu-list-item {
        list-style-type: none;
        padding-right: 30px;
        color: $gray;
        cursor: pointer;
        &:hover {
          color: $white;
        }
        &:last-child {
          padding-right: 0;
        }
      }
    }
    .overlay {
      display: none;
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100vh;
      background-color: $black;
      opacity: 0.5;
      z-index: 1;
      &.responsive {
        display: block;
      }
    }
    .responsive-menu {
      display: none;
      height: 30px;
      cursor: pointer;
      @include responsive(xs) {
        display: block;
      }
    }
  }
}
</style>
