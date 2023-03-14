<template>
  <div class="portfolio-container" v-if="data">
    <div class="header">
      <h1 class="project-name"><span class="white">Project:</span> {{ data.name }}</h1>
      <p class="short">{{ data.shortDescription }}</p>
    </div>
    <div class="body">
      <div class="image-container">
        <img class="project-photo" :src="getImgUrl(data.thumb)" :alt="data.name">
      </div>
      <div class="content-container">
        <h2 class="about-title">About The Project</h2>
        <div class="content-body-container">
          <p class="long">{{ data.description }}</p>
          <div class="tech-table">
            <div class="table">
              <div class="row">
                <div class="col">CLIENT</div>
                <div class="col">{{ data.name }}</div>
              </div>
              <div class="row">
                <div class="col">SKILLS</div>
                <div class="col">
                  <img class="tech-image" :src="getTechImg(tech)" v-for="(tech, i) in data.stack" :key="tech + i" :alt="tech">
                </div>
              </div>
              <div class="row">
                <div class="col">WEBSITE</div>
                <div class="col"><a class="link" :href="data.link" target="_blank">{{ data.link }}</a></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import projects from "../content/projects.json";

type Project = {
  id: number,
  name: string,
  stack: Array<string>,
  thumb: string,
  shortDescription: string,
  description: string,
  link: string
}

export default {
  data() {
    return {
      projects: projects as Array<Project>,
      data: {} as Project | undefined
    }
  },
  created() {
    const id = this.$route.params.id;
    this.data = this.projects.find((res: Project) => res.id === Number(id));
  },
  methods: {
    getImgUrl(pic: string) {
      return new URL(`../assets/works/${pic}`, import.meta.url).href
    },
    getPortfolioImgUrl(pic: string) {
      return new URL(`../assets/portfolio/${pic}`, import.meta.url).href
    },
    getTechImg(pic: string) {
      return new URL(`../assets/techs/${pic}.png`, import.meta.url).href
    },
  },
}
</script>
<style lang="scss" scoped>
.portfolio-container {
  background-color: $dark-gray;
  min-height: 100vh;
  padding-bottom: 40px;
  .header {
    padding: 20px;
    .project-name {
      font-size: 3rem;
      line-height: 3rem;
      margin: 0;
      color: $green;
      text-align: center;
    }
    .short {
      color: $gray;
    }
  }
  .body {
    display: grid;
    grid-template-columns: 1fr;
    padding: 20px;
    .image-container {
      border-radius: 10px;
      text-align: center;
      .project-photo {
        width: 100%;
        max-width: 800px;
        border-radius: 10px;
      }
    }
    .content-container {
      .about-title {
        color: $green;
        font-size: 3rem;
        line-height: 3rem;
      }
      .short, .long {
        white-space: pre-line;
        margin: 0;
        color: $gray;
      }
      .content-body-container {
        display: grid;
        grid-template-columns: 2fr 1fr;
        column-gap: 20px;
        @include responsive(xs) {
          grid-template-columns: 1fr;
        }
        .tech-table {
          @include responsive(xs) {
            padding-top: 30px;
          }
          .table {
            .row {
              display: grid;
              grid-template-columns: 1fr 1fr;
              border-bottom: 1px solid $gray;
              padding-bottom: 15px;
              padding-top: 15px;
              &:first-child {
                padding-top: 0;
              }
              &:last-child {
                border-bottom: none;
              }
              .col {
                color: $gray;
                &:first-child {
                  font-weight: bold;
                }
                .tech-image {
                  width: 30px;
                  height: auto;
                  padding-right: 10px;
                }
                .link {
                  color: $green;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>