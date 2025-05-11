import type { Component } from 'vue'

// 路由里的 meta
interface Meta {
  title: string,
  key: string,
  group?: boolean,
  icon: Component
}

// 路由 应该可以被替换
export interface Route {
  path: string,
  name: string,
  component?: () => Component,
  children?: Route[],
  meta?: Meta
}

// 面包屑
export interface BreadcrumbItem {
  title: string,
  icon: Component
}

// 分页查询
export interface PageRequest {
  current?: number     // 当前页
  pageSize?: number    // 一页显示多少条
  sortField?: string   // 排序字段
}

// 分页Result
export interface ResultPage<T> {
  total: number       // 总条数
  pages: number       // 总页数
  list: T[]             // 数据
}
