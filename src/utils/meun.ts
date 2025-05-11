import { h, type Component } from 'vue'
import { RouterLink, type RouteRecordNormalized } from 'vue-router'
import { renderIcon } from '@/utils/utils'
import { type MenuOption } from 'naive-ui'
import type { BreadcrumbItem, Route } from '@/types/global'
import { Airplane } from '@vicons/ionicons5'

const getMenuItem = (route: Route): MenuOption => {
  return {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: route.name
          }
        },
        { default: () => route.meta?.title }
      ),
    key: route.meta?.key,
    icon: renderIcon(route.meta?.icon || Airplane)
  }
}

export const getMenuItems = (routes: Route[]): MenuOption[] => {
  return routes.map((route: Route) => {
    const menuItem = getMenuItem(route)
    if (route.children && route.meta?.group) {
      menuItem.children = getMenuItems(route.children)
    }
    return menuItem
  })
}

export const getBreadcrumbArr = (routes: RouteRecordNormalized[]): BreadcrumbItem[] => {
  return routes.filter((item, index) => index !== 0).map(({ meta }) => {
    return {
      title: meta.title as string,
      icon: meta.icon as Component
    }
  })
}
