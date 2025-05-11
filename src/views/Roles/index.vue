<script setup lang="ts">
import { ref, defineProps, withDefaults, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMessage, NButton } from 'naive-ui'
import type { RoleVO, SaveRoleDTO, EditRoleDTO } from '@/types/role'
import { getRolePageAPI, saveRoleAPI, editRoleAPI, deleteRoleAPI } from '@/apis/role.ts'
import { handleError, handleFinish, handleStart } from '@/utils/utils.ts'
import { AddOutline, Search, ReloadOutline } from '@vicons/ionicons5'
import RolesForm from '@/views/Roles/components/RolesForm.vue'
import { roleTableColumns } from '@/utils/tableColumns.ts'

const query = withDefaults(defineProps<{
    name?: string
    page?: number
    pageSize?: number
  }>(),
  {
    name: '',
    page: 1,
    pageSize: 10
  }
)

const route = useRoute()
const router = useRouter()
const message = useMessage()
// 搜索条件
const searchValue = ref({
  name: ''
})
const onSearch = () => {
  router.push({
    query: {
      ...route.query,
      ...searchValue.value
    }
  })
  getRolePage()
}
// 重置
const onReset = () => {
  searchValue.value.name = ''
  getRolePage()
}

const tableData = ref<RoleVO[]>()
// 分页获取角色列表
const getRolePage = async () => {
  tableLoading.value = true
  const res = await getRolePageAPI({
    ...searchValue.value,
    current: pagination.value.page,
    pageSize: pagination.value.pageSize
  })
  if (res.code === 200) {
    tableData.value = res.data.list
    tableLoading.value = false
    pagination.value.pageCount = parseInt(res.data.pages.toString())
    return true
  }
  tableLoading.value = false
  return false
}

const modalLoading = ref(false)
// 添加角色
const showSaveModal = ref(false)
const saveRole = async (data: SaveRoleDTO) => {
  modalLoading.value = true
  const res = await saveRoleAPI(data)
  if (res.code === 200) {
    message.success('添加成功')
    showSaveModal.value = false
    await getRolePage()
  }
  modalLoading.value = false
}

// 唤起编辑模态框
const showEditModal = ref(false)
const editRoleDto = ref<EditRoleDTO>()
const openEditModal = (rowData: RoleVO) => {
  editRoleDto.value = {
    id: rowData.id,
    name: rowData.name,
    status: rowData.status,
    remark: rowData.remark
  }
  showEditModal.value = true
}
const editRole = async (data: EditRoleDTO) => {
  modalLoading.value = true
  const res = await editRoleAPI(data)
  if (res.code === 200) {
    message.success('修改成功')
    showEditModal.value = false
    await getRolePage()
  }
  modalLoading.value = false
}

// 删除角色
const deleteRole = async (rowData: RoleVO) => {
  try {
    await deleteRoleAPI(rowData.id)
    message.success('删除成功')
    await getRolePage()
  } finally {

  }
}

// 表头
// const createColumns = ({ updateData, deleteData }: {
//   updateData: (rowData: RoleVO) => void
//   deleteData: (rowData: RoleVO) => void
// }): DataTableColumns<RoleVO> => {
//   return [
//     {
//       title: 'ID',
//       key: 'id',
//       width: 200
//     },
//     {
//       title: '角色名称',
//       key: 'name',
//       width: 160
//     },
//     {
//       title: '备注',
//       key: 'remark',
//       width: 200,
//       ellipsis: {
//         tooltip: true
//       }
//     },
//     {
//       title: '状态',
//       key: 'status',
//       render(row) {
//         return Number(row.status) === 0 ? '禁用' : '启用'
//       },
//       className: 'status'
//     },
//     {
//       title: '更新时间',
//       key: 'updateTime',
//       width: 160
//     },
//     {
//       title: '创建时间',
//       key: 'createTime',
//       width: 160
//     },
//     {
//       title: '操作',
//       key: 'actions',
//       width: 142,
//       render(row) {
//         return h(
//           'div',
//           [
//             h(NButton,
//               {
//                 type: 'warning',
//                 style: { marginRight: '10px' },
//                 onClick: () => updateData(row)
//               },
//               { default: () => '修改' }
//             ),
//             h(
//               NButton,
//               {
//                 type: 'error',
//                 onClick: () => deleteData(row)
//               },
//               { default: () => '删除' }
//             )
//           ]
//         )
//       }
//     }
//   ]
// }
// 表自定义样式
const rowClassName = (row: RoleVO) => {
  console.log(row)
  if (row.status === 0) {
    return 'too-old'
  }
  return ''
}
// 表加载条
const tableLoading = ref(false)
// 分页
const pagination = ref({
  page: 1,
  pageCount: 1,
  pageSize: 10
})
const handlePageChange = (currentPage: number) => {
  pagination.value.page = currentPage
  router.push({
    query: {
      ...route.query,
      page: pagination.value.page,
      pageSize: pagination.value.pageSize
    }
  })
  getRolePage()
}

onMounted(async () => {
  searchValue.value.name = query.name
  pagination.value.page = query.page
  pagination.value.pageSize = query.pageSize

  handleStart()
  const res = await getRolePage()
  if (res) {
    handleFinish()
  } else {
    handleError()
  }
})
</script>

<template>
  <div class="roles">
    <n-card title="角色管理" :bordered="false">
      <header>
        <n-flex>
          <n-button type="info" @click="showSaveModal = true">
            <template #icon>
              <n-icon>
                <AddOutline />
              </n-icon>
            </template>
            添加角色
          </n-button>
          <n-input v-model:value="searchValue.name" type="text" placeholder="请输入角色名称..." />
          <n-button type="success" @click="onSearch">
            <template #icon>
              <n-icon>
                <Search />
              </n-icon>
            </template>
            搜索
          </n-button>
          <n-button type="success" @click="onReset">
            <template #icon>
              <n-icon>
                <ReloadOutline />
              </n-icon>
            </template>
            重置
          </n-button>
        </n-flex>
      </header>
      <n-data-table
        remote
        :loading="tableLoading"
        size="small"
        :columns="roleTableColumns({updateData:openEditModal,deleteData:deleteRole})"
        :data="tableData"
        :pagination="pagination"
        :row-class-name="rowClassName"
        @update:page="handlePageChange"
      />
    </n-card>

    <n-modal
      v-model:show="showSaveModal"
      class="custom-card"
      preset="card"
      title="添加角色"
      size="huge"
      :bordered="false"
      style="width: 500px"
    >
      <RolesForm :loading="modalLoading" @submit="saveRole" />
    </n-modal>
    <n-modal
      v-model:show="showEditModal"
      class="custom-card"
      preset="card"
      title="编辑角色"
      size="huge"
      :bordered="false"
      style="width: 500px"
    >
      <RolesForm :loading="modalLoading" :data="editRoleDto" @submit="editRole" />
    </n-modal>
  </div>
</template>

<style scoped lang="scss">
.roles {
  width: 100%;
  height: var(--content-height);
  margin-right: 10px;

  .n-card {
    height: 100%;

    header {
      height: 64px;

      .n-input {
        width: 200px;
      }

      .n-space {
        height: 100%;
      }
    }
  }
}

:deep(.status) {
  color: rgba(0, 128, 0, 0.75) !important;
}

:deep(.too-old .status) {
  color: rgba(255, 0, 0, 0.75) !important;
}

:deep(.n-data-table-th) {
  color: rgb(31, 34, 37) !important;
}
</style>
