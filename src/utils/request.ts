import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
  type AxiosResponse,
  type AxiosError,
  type AxiosRequestConfig
} from 'axios'
import eventEmitter from '@/utils/eventEmitter.ts'
import { createDiscreteApi } from 'naive-ui'
import { useUserStore } from '@/stores/user.ts'

// 返回值类型
interface Result<T> {
  code: number
  msg: string
  data: T
}

const { message } = createDiscreteApi(['message'])

class Http {
  // axios 的实例
  private instance: AxiosInstance

  // 构造器(初始化)
  constructor() {
    // axios 配置项
    this.instance = axios.create({
      baseURL: 'http://localhost:8101/api',
      timeout: 10000
    })
    // 初始化拦截器
    this.interceptors()
  }

  // 拦截器
  private interceptors() {
    // 配置请求拦截器
    this.instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      const userStore = useUserStore()
      if (userStore.userinfo!.token) {
        config.headers['satoken'] = 'Bearer ' + userStore.userinfo!.token
      }
      return config
    })
    // 配置响应拦截器
    this.instance.interceptors.response.use((res: AxiosResponse) => {
      // 响应状态码大于 300 表示请求报错
      if (res.data.code >= 300) {
        message.error(res.data.msg)
      }
      // 发布订阅
      switch (res.data.code) {
        case 40101:
          eventEmitter.emit('API:UN_AUTH')
          break
      }
      return res.data
    }, (error: AxiosError) => {
      return Promise.reject(error)
    })
  }

  // 请求封装
  get<T>(config: AxiosRequestConfig): Promise<Result<T>> {
    return this.instance.request({
      ...config,
      method: 'GET'
    })
  }

  post<T>(config: AxiosRequestConfig): Promise<Result<T>> {
    return this.instance.request({
      ...config,
      method: 'POST'
    })
  }

  put<T>(config: AxiosRequestConfig): Promise<Result<T>> {
    return this.instance.request({
      ...config,
      method: 'PUT'
    })
  }

  delete<T>(config: AxiosRequestConfig): Promise<Result<T>> {
    return this.instance.request({
      ...config,
      method: 'DELETE'
    })
  }

  // 文件上传
  upload<T>(url: string, params?: object): Promise<Result<T>> {
    return this.instance.post(url, params, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}

export default new Http()
