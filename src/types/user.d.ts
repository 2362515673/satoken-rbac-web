import type { PageRequest } from '@/types/global'

export interface UserVO {
  id: string          // id
  name: string        // 名称
  sex: number         // 性别
  account: string     // 账号
  profile: string     // 简介
  avatar: string      // 头像
  status: number      // 用户状态 0：禁用 1：启用
  updateTime: string  // 更新时间
  createTime: string  // 创建时间
}

export interface UserLoginVO {
  user: UserVO
  token: string
}

export interface UserRoleVO extends UserVO {
  roleIds: string[]
}

export interface UserLoginDTO {
  account: string
  password: string
}

// 用户注册 dto
export interface UserRegisterDTO {
  name: string
  account: string
  password: string
}

// 添加用户 dto
export interface SaveUserDTO {
  name: string
  account: string
  password: string
  sex?: number
  avatar?: string
  profile?: string
  email?: string
  phone?: string
  status?: number
  roleIds?: string[]
}

// 分页查询用户 dto
export interface QueryUserDTO extends PageRequest {
  name?: string
  status?: number
}

// 编辑用户dto
export interface EditUserDTO extends SaveUserDTO {
  id: string
  name?: string
  account?: string
  password?: string
}
