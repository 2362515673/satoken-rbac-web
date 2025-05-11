import http from '@/utils/request.ts'
import type { EditRoleDTO, QueryRoleDTO, RoleSelectVO, RoleVO, SaveRoleDTO } from '@/types/role'
import type { ResultPage } from '@/types/global'

/**
 * 分页查询角色
 * @param params 搜索条件和分页条件
 */
export const getRolePageAPI = (params: QueryRoleDTO) => {
  return http.get<ResultPage<RoleVO>>({
    url: '/role/page',
    params
  })
}

/**
 * 添加角色
 * @param data 角色基本信息
 */
export const saveRoleAPI = (data: SaveRoleDTO) => {
  return http.post<number>({
    url: '/role/add',
    data
  })
}

/**
 * 编辑角色
 * @param data 角色基本信息
 */
export const editRoleAPI = (data: EditRoleDTO) => {
  return http.put<boolean>({
    url: '/role/edit',
    data
  })
}

/**
 * 根据id删除角色
 * @param id 角色id
 */
export const deleteRoleAPI = (id: string) => {
  return http.delete<void>({
    url: '/role/delete/' + id
  })
}

/**
 * 获取所有角色id和名称列表
 */
export const getRoleListAPI = () => {
  return http.get<RoleSelectVO[]>({
    url: '/role/list',
  })
}
