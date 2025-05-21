import http from '@/utils/request.ts'
import type { TreeMenuVO, MenuOptionsVO, SaveMenuDTO, EditMenuDTO, MenuVO } from '@/types/menu'
import type { RouterVO } from '@/types/global'

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

/**
 * 编辑菜单
 * @param data 菜单基本信息
 */
export const editMenuAPI = (data: EditMenuDTO) => {
  return http.put<boolean>({
    url: '/menu/edit',
    data
  })
}

/**
 * 根据id删除菜单
 * @param id 菜单id
 */
export const deleteMenuAPI = (id: string) => {
  return http.delete<boolean>({
    url: '/menu/delete/' + id
  })
}

/**
 * 根据角色id获取当前角色的菜单
 * @param roleId 角色id
 */
export const getMenuByRoleIdAPI = (roleId: string) => {
  return http.get<MenuVO[]>({
    url: '/menu/role/list?roleId=' + roleId
  })
}

/**
 * 获取当前用户的路由树
 */
export const getCurrentUserRouterTreeAPI = () => {
  return http.get<RouterVO[]>({
    url: '/menu/get/current/menu/tree'
  })
}

