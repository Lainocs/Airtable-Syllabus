import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ModuleView from '@/views/ModuleView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/modules/:id',
    name: 'module',
    component: ModuleView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
