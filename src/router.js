import { createRouter, createWebHistory } from 'vue-router'
import Main from './components/Main.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Main
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
