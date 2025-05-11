import http from '@/utils/request.ts'
import type {
  EditUserDTO,
  QueryUserDTO,
  SaveUserDTO,
  UserLoginDTO,
  UserLoginVO,
  UserRegisterDTO,
  UserRoleVO
} from '@/types/user'
import type { ResultPage } from '@/types/global'

/**
 * 用户登录
 * @param data 账号密码
 */
export const doLoginAPI = (data: UserLoginDTO) => {
  return http.post<UserLoginVO>({
    url: '/user/login',
    data
  })
}

/**
 * 用户注册
 * @param data 名称 | 账号 | 密码
 */
export const doRegisterAPI = (data: UserRegisterDTO) => {
  return http.post<boolean>({
    url: '/user/register',
    data
  })
}

/**
 * 添加用户
 * @param data 用户基本信息
 */
export const saveUserAPI = (data: SaveUserDTO) => {
  return http.post<void>({
    url: '/user/save',
    data
  })
}

/**
 * 分页获取用户信息
 * @param data 查询条件和分页条件
 */
export const getUserPageAPI = (data: QueryUserDTO) => {
  return http.get<ResultPage<UserRoleVO>>({
    url: '/user/page',
    params: data
  })
}

/**
 * 编辑用户
 * @param data 用户基本信息
 */
export const editUserAPI = (data: EditUserDTO) => {
  return http.put<boolean>({
    url: '/user/edit',
    data
  })
}

/**
 * 根据id删除用户
 * @param id 用户id
 */
export const deleteUserByIdAPI = (id: string) => {
  return http.delete<boolean>({
    url: '/user/delete/' + id
  })
}
