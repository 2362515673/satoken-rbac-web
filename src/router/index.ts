import { createRouter, createWebHistory } from 'vue-router'
import eventEmitter from '@/utils/eventEmitter.ts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: () => import('@/views/Layout/index.vue'),
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('@/views/Home/index.vue')
        },
        {
          path: 'users',
          name: 'Users',
          component: () => import('@/views/Users/index.vue'),
          props: true
        },
        {
          path: 'roles',
          name: 'Roles',
          component: () => import('@/views/Roles/index.vue'),
          props: true
        },
        {
          path: 'menus',
          name: 'Menus',
          component: () => import('@/views/Menus/index.vue'),
          props: true
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login/index.vue')
    }
  ]
})

eventEmitter.on('API:UN_AUTH', async () => {
  await router.push('/login')
})

export default router
