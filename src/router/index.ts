import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'

// Lazy loaded routes for better performance
const ProjectDetail = () => import('../pages/ProjectDetail.vue')
const InsightsIndex = () => import('../pages/InsightsIndex.vue')
const InsightDetail = () => import('../pages/InsightDetail.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Jose Parejo - Software Engineer',
      description: 'Jose Parejo - Engineering Digital Products & Physical Realities'
    }
  },
  {
    path: '/project/:id',
    name: 'ProjectDetail',
    component: ProjectDetail,
    props: true
    // Meta added dynamically in the component
  },
  {
    path: '/insights',
    name: 'Insights',
    component: InsightsIndex,
    meta: {
      title: 'Insights | Jose Parejo',
      description: 'Articles, thoughts, and technical deep dives into software engineering and design.'
    }
  },
  {
    path: '/insight/:id',
    name: 'InsightDetail',
    component: InsightDetail,
    props: true
    // Meta added dynamically in the component
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0 }
  }
})

// Update document title and meta description on route change
router.beforeEach((to, from, next) => {
  // Update Title
  const defaultTitle = 'Jose Parejo - Software Engineer'
  document.title = (to.meta.title as string) || defaultTitle

  // Update Description
  const defaultDesc = 'Jose Parejo - Engineering Digital Products & Physical Realities'
  const description = to.meta.description as string || defaultDesc

  let metaDesc = document.querySelector('meta[name="description"]')
  if (metaDesc) {
    metaDesc.setAttribute('content', description)
  } else {
    // Fallback if missing from index.html
    const meta = document.createElement('meta')
    meta.name = 'description'
    meta.content = description
    document.head.appendChild(meta)
  }

  next()
})

export default router
