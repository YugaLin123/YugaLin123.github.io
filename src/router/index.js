import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home/index.vue'), // 必須包含 import 關鍵字
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
