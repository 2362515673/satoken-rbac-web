import http from '@/utils/request.ts'
import type { TreeMenuVO, MenuOptionsVO, SaveMenuDTO } from '@/types/menu'

/**
 * 获取菜单树结构
 */
export const getTreeMenuAPI = () => {
  return http.get<TreeMenuVO[]>({
    url: '/menu/tree'
  })
}

/**
 * 添加菜单
 * @param data 菜单信息
 */
export const saveMenuAPI = (data: SaveMenuDTO) => {
  return http.post<boolean>({
    url: '/menu/save',
    data
  })
}

/**
 * 获取菜单id和标题树结构
 */
export const getTreeMenuOptionsAPI = () => {
  return http.get<MenuOptionsVO[]>({
    url: '/menu/options'
  })
}
