export interface MenuVO {
  id: string
  title: string
  parentId: string
  code: string
  name: string
  path: string
  url: string
  type: number
  icon: string
  order: number
  createTime: string
  updateTime: string
}

export interface TreeMenuVO {
  menu: MenuVO
  children: TreeMenuVO[]
}

export interface MenuOptionsVO {
  value: string
  key: string
  label: string
  children: MenuOptionsVO[]
}

export interface SaveMenuDTO {
  title: string
  parentId?: string
  code: string
  name?: string
  path?: string
  url?: string
  type: number
  icon?: string
  order?: number
}

export interface EditMenuDTO extends SaveMenuDTO {
  id: string
  code?: string
}

