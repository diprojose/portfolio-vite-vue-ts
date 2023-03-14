<template>
  <div class="work-section" id="work">
    <h2 class="work-title">Recent Projects</h2>
    <p class="work-description">Here's the most recent projects I've worked on as a Freelancer, with clients from Colombia and US</p>
    <div class="projects-container">
      <div class="gallery">
        <div class="gallery-item" v-for="(project, index) in projects" :key="'project' + index" @click="openPortfolio(project)">
          <div class="project-image-container">
            <img class="web-image" :src="getImgUrl(project.thumb)" :alt="project.name">
          </div>
          <div class="project-information-container">
            <p class="project-name">{{ project.name }}</p>
            <div class="techs">
              <p class="tech-title">Stack:</p>
              <img class="tech-image" :src="getTechImg(tech)" v-for="(tech, i) in project.stack" :key="tech + i" :alt="tech">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import projects from "../../content/projects.json";

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
      portfolio: {} as Project,
      openModal: false as Boolean
    }
  },
  methods: {
    getImgUrl(pic: string) {
      return new URL(`../../assets/works/${pic}`, import.meta.url).href
    },
    getTechImg(pic: string) {
      return new URL(`../../assets/techs/${pic}.png`, import.meta.url).href
    },
    openPortfolio(portfolio: Project) {
      this.$router.push(`/portfolio/${portfolio.id}`);
    },
    closePortfolio(event: Boolean) {
      this.openModal = event;
    }
  },
}
</script>

<style lang="scss" scoped>
.work-section {
  background-color: $dark-gray;
  padding: 50px 25px 100px;
  .work-title {
    color: $green;
    font-size: 3rem;
    line-height: 3rem;
    margin: 0;
    text-transform: uppercase;
    text-align: center;
    padding-bottom: 1rem;
  }
  .work-description {
    color: $gray;
    margin: 0;
    text-align: center;
    padding-bottom: 30px;
    font-size: 1.2rem;
  }
  .projects-container {
    .gallery {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      column-gap: 25px;
      @include responsive(sm) {
        grid-template-columns: 1fr 1fr;
      }
      @include responsive(xs) {
        grid-template-columns: 1fr;
      }
      .gallery-item {
        position: relative;
        display: grid;
        cursor: pointer;
        .project-image-container {
          border-radius: 5px;
          .web-image {
            width: 100%;
            border-radius: 5px;
          }
        }
        .project-information-container {
          padding-top: 10px;
          .project-name {
            margin: 0;
            color: $white;
            font-weight: bold;
            font-size: 2rem;
            text-align: center;
          }
          .project-description {
            color: $gray;
            white-space: pre-line;
          }
          .project-link {
            background: $green;
            border: 1px solid $green;
            color: $dark-gray;
            padding: 10px 15px;
            border-radius: 20px;
            font-weight: bold;
            cursor: pointer;
            &:hover {
              background: $light-green;
              border: 1px solid $light-green;
              color: $dark-gray;
            }
          }
          .techs {
            display: flex;
            justify-content: center;
            align-items: center;
            padding-bottom: 1rem;
            .tech-title {
              color: $white;
              margin: 0;
              padding-right: 10px;
            }
            .tech-image {
              width: 30px;
              height: 30px;
            }
          }
        }
      }
    }
  }
}
</style>