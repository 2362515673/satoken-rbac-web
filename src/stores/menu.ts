import { onMounted, ref } from 'vue'
import { defineStore } from 'pinia'
import { type RouteRecordRaw, useRouter } from 'vue-router'
import type { RouterVO } from '@/types/global'
import { getCurrentUserRouterTreeAPI } from '@/apis/menu.ts'

const modules = import.meta.glob('@/views/**/*.vue')

export const useMenuStore = defineStore('menu', () => {
  const router = useRouter()
  const routerTree = ref<RouterVO[]>([])

  const getCurrentUserRouterTree = async () => {
    const res = await getCurrentUserRouterTreeAPI()
    if (res.code === 200) {
      routerTree.value = res.data
      // console.log(routerTree.value)
    }
  }

  const getRouters = (routerTree: RouterVO[]) => {
    routerTree.forEach(item => {
      router.addRoute('Layout', getRouteRecordRawItem(item))
    })

    console.log(router.getRoutes())
  }

  const getRouteRecordRawItem = (route: RouterVO): RouteRecordRaw => {
    // console.log({
    //   path: route.path,
    //   name: route.name,
    //   component: modules['/src/views' + route.component],
    //   children: route.children ? route.children.map(item => getRouteRecordRawItem(item)) : []
    // })
    return {
      path: route.path,
      name: route.name,
      component: modules['/src/views' + route.component],
      children: route.children ? route.children.map(item => getRouteRecordRawItem(item)) : []
    }
  }

  onMounted(async () => {
    if (routerTree.value.length <= 0) {
      await getCurrentUserRouterTree()
      getRouters(routerTree.value)
    }
  })

  return { routerTree }
})
