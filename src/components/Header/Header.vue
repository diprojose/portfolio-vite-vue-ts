<template>
  <div class="header-container" :class="{ light: mode === 'light' }">
    <div class="logo" @click="moveHome()">
      <h3 class="logo-jp">JP<span class="logo-dot">.</span></h3>
    </div>
    <div class="menu">
      <ul class="menu-list" :class="{ responsive: showMenu }">
        <img @click="openResponsiveMenu()" src="../../assets/img/close.png" class="close-button" alt="close">
        <li class="menu-list-item" @click="moveTo('about')">About</li>
        <li class="menu-list-item" @click="moveTo('work')">Work</li>
        <li class="menu-list-item" @click="moveTo('')">Experience</li>
        <li class="menu-list-item" @click="moveTo('contact')">Contact</li>
        <li class="menu-list-item">
          <button class="portfolio-button" :class="{ 'light-button': mode === 'light' }">Resume</button>
        </li>
        <!-- <li class="menu-list-item">
          <img v-if="mode === 'dark'" class="color-mode" src="../../assets/img/media-luna-green.png" alt="dark" @click="changeColorMode('light')">
          <img v-if="mode === 'light'" class="color-mode" src="../../assets/img/sol-black.png" alt="light" @click="changeColorMode('dark')">
        </li> -->
      </ul>
      <div @click="openResponsiveMenu()" :class="{ responsive: showMenu }" class="overlay"></div>
      <img @click="openResponsiveMenu()" class="responsive-menu" src="../../assets/img/menu.png" alt="Menu">
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data: () => {
    return {
      showMenu: false,
      mode: 'dark' as String | null
    }
  },
  created() {
    const colorMode: string | null = localStorage.getItem('colorMode');
    if (colorMode) {
      this.mode = colorMode;
    } else {
      localStorage.setItem('colorMode', 'dark');
    }
  },
  methods: {
    openResponsiveMenu(): void {
      this.showMenu = !this.showMenu;
    },
    moveHome() {
      this.$router.push('/');
    },
    changeColorMode(color: string): void {
      this.mode = color;
      localStorage.setItem('colorMode', color);
    },
    moveTo(section: string): void {
      const div = document.getElementById(section);
      if (div !== null) {
        div.scrollIntoView({behavior: "smooth"});
      } else {
        this.$router.push('/');
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.header-container {
  padding: 25px;
  display: flex;
  justify-content: space-between;
  background-color: $dark-gray;
  align-items: center;
  position: fixed;
  width: 100%;
  overflow: hidden;
  top: 0;
  left: 0;
  z-index: 9;
  box-sizing: border-box;
  &.light {
    background-color: $gray;
    .logo {
      .logo-jp {
        color: $dark-gray;
      }
    }
    .menu-list-item {
      color: $dark-gray !important;
    }
  }
  .logo {
    cursor: pointer;
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
        width: 40%;
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
          a {
            text-decoration: none;
            color: $gray;
            cursor: pointer;
            &:hover {
              color: $white;
            }
          }
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
        &:last-child {
          padding-right: 0;
        }
        &:hover {
          color: $white;
        }
        .color-mode {
          width: 100%;
          max-width: 35px;
          height: auto;
        }
        a {
          text-decoration: none;
          color: $gray;
          cursor: pointer;
          &:hover {
            color: $white;
          }
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
