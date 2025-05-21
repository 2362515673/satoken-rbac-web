import { h } from 'vue'
import { type DataTableColumns, NButton } from 'naive-ui'
import type { RoleVO } from '@/types/role'
import type { UserRoleVO } from '@/types/user'
import type { TreeMenuVO } from '@/types/menu'

/**
 * 角色管理数据表
 * @param updateData 修改
 * @param deleteData 添加
 */
export const roleTableColumns = ({ updateData, openMenuModal, deleteData }: {
  updateData: (rowData: RoleVO) => void
  openMenuModal: (rowData: RoleVO) => void
  deleteData: (rowData: RoleVO) => void
}): DataTableColumns<RoleVO> => {
  return [
    {
      title: 'ID',
      key: 'id',
      width: 200
    },
    {
      title: '角色名称',
      key: 'name',
      width: 160
    },
    {
      title: '备注',
      key: 'remark',
      width: 200,
      ellipsis: {
        tooltip: true
      }
    },
    {
      title: '状态',
      key: 'status',
      render(row) {
        return Number(row.status) === 0 ? '禁用' : '启用'
      },
      className: 'status'
    },
    {
      title: '更新时间',
      key: 'updateTime',
      width: 160
    },
    {
      title: '创建时间',
      key: 'createTime',
      width: 160
    },
    {
      title: '操作',
      key: 'actions',
      width: 210,
      render(row) {
        return h(
          'div',
          [
            h(NButton,
              {
                type: 'warning',
                style: { marginRight: '10px' },
                onClick: () => updateData(row)
              },
              { default: () => '修改' }
            ),
            h(NButton,
              {
                type: 'info',
                style: { marginRight: '10px' },
                onClick: () => openMenuModal(row)
              },
              { default: () => '菜单' }
            ),
            h(
              NButton,
              {
                type: 'error',
                onClick: () => deleteData(row)
              },
              { default: () => '删除' }
            )
          ]
        )
      }
    }
  ]
}

/**
 * 用户管理数据表
 * @param updateData 修改
 * @param deleteData 添加
 */
export const userTableColumns = ({ updateData, deleteData }: {
  updateData: (rowData: UserRoleVO) => void
  deleteData: (rowData: UserRoleVO) => void
}): DataTableColumns<UserRoleVO> => {
  return [
    {
      title: 'ID',
      key: 'id',
      width: 200,
      fixed: 'left'
    },
    {
      title: '名称',
      key: 'name',
      width: 160
    },
    {
      title: '账号',
      key: 'account',
      width: 160
    },
    {
      title: '性别',
      key: 'sex',
      render(row) {
        return Number(row.sex) === 0 ? '男' : '女'
      }
    },
    {
      title: '手机号',
      key: 'phone',
      width: 160
    },
    {
      title: '邮箱',
      key: 'email',
      width: 160
    },
    {
      title: '简介',
      key: 'profile',
      width: 250
    },
    {
      title: '状态',
      key: 'status',
      render(row) {
        return Number(row.status) === 0 ? '禁用' : '启用'
      },
      className: 'status'
    },
    {
      title: '更新时间',
      key: 'updateTime',
      width: 160
    },
    {
      title: '创建时间',
      key: 'createTime',
      width: 160
    },
    {
      title: '操作',
      key: 'actions',
      width: 142,
      fixed: 'right',
      render(row) {
        return h(
          'div',
          [
            h(NButton,
              {
                type: 'warning',
                style: { marginRight: '10px' },
                onClick: () => updateData(row)
              },
              { default: () => '修改' }
            ),
            h(
              NButton,
              {
                type: 'error',
                onClick: () => deleteData(row)
              },
              { default: () => '删除' }
            )
          ]
        )
      }
    }
  ]
}

/**
 * 菜单管理数据表
 * @param updateData
 * @param deleteData
 */
export const menuTableColumns = ({ updateData, deleteData }: {
  updateData: (rowData: TreeMenuVO) => void
  deleteData: (rowData: TreeMenuVO) => void
}): DataTableColumns<TreeMenuVO> => {
  return [
    {
      title: 'ID',
      key: 'id',
      render(row) {
        return row.menu.id
      },
      fixed: 'left'
    },
    {
      title: '标题',
      key: 'title',
      render(row) {
        return row.menu.title
      }
    },
    {
      title: '权限标识',
      key: 'code',
      render(row) {
        return row.menu.code
      }
    },
    {
      title: '组件名称',
      key: 'name',
      render(row) {
        return row.menu.name
      }
    },
    {
      title: '路由地址',
      key: 'path',
      render(row) {
        return row.menu.path
      }
    },
    {
      title: '组件路径',
      key: 'url',
      render(row) {
        return row.menu.url
      }
    },
    {
      title: '菜单类型',
      key: 'url',
      render(row) {
        if (row.menu.type === 0) {
          return '目录'
        } else if (row.menu.type === 1) {
          return '菜单'
        } else if (row.menu.type === 2) {
          return '按钮'
        }
        return row.menu.type
      }
    },
    {
      title: '图标',
      key: 'url',
      render(row) {
        return row.menu.icon
      }
    },
    {
      title: '序号',
      key: 'order',
      render(row) {
        return row.menu.order
      }
    },
    {
      title: '更新时间',
      key: 'updateTime',
      render(row) {
        return row.menu.updateTime
      },
      width: 160
    },
    {
      title: '创建时间',
      key: 'createTime',
      render(row) {
        return row.menu.createTime
      },
      width: 160
    },
    {
      title: '操作',
      key: 'actions',
      width: 142,
      fixed: 'right',
      render(row) {
        return h(
          'div',
          [
            h(NButton,
              {
                type: 'warning',
                style: { marginRight: '10px' },
                onClick: () => updateData(row)
              },
              { default: () => '修改' }
            ),
            h(
              NButton,
              {
                type: 'error',
                onClick: () => deleteData(row)
              },
              { default: () => '删除' }
            )
          ]
        )
      }
    }
  ]
}
