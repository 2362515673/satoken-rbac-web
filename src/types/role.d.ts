import type { PageRequest } from '@/types/global'

// 角色查询
export interface QueryRoleDTO extends PageRequest {
  name?: string    // 角色名称
  status?: number  // 角色状态
}

// 添加角色
export interface SaveRoleDTO {
  name: string
  remark: string
  status?: number
}

// 编辑角色
export interface EditRoleDTO {
  id: string
  name?: string
  remark?: string
  status?: number
}

// 角色VO
export interface RoleVO {
  id: string
  name: string
  remark: string
  status: number
  updateTime: string  // 更新时间
  createTime: string  // 创建时间
}

// 角色id名称vo
export interface RoleSelectVO {
  id: string
  name: string
}
