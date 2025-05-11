<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { NButton, useMessage } from 'naive-ui'
import type { EditUserDTO, SaveUserDTO, UserRoleVO } from '@/types/user'
import { getUserPageAPI, saveUserAPI, editUserAPI, deleteUserByIdAPI } from '@/apis/user.ts'
import { AddOutline, ReloadOutline, Search } from '@vicons/ionicons5'
import { handleError, handleFinish, handleStart } from '@/utils/utils.ts'
import { userTableColumns } from '@/utils/tableColumns.ts'
import UsersForm from '@/views/Users/components/UsersForm.vue'

const message = useMessage()
const showSaveModal = ref(false)
const showEditModal = ref(false)
const formLoading = ref(false)
const search = ref('')
const tableData = ref<UserRoleVO[]>([])
const tableLoading = ref(false)
const pagination = ref({
  page: 1,
  pageCount: 1,
  pageSize: 10
})
const editUserDTO = ref<EditUserDTO>()
/**
 * 搜索
 */
const onSearch = () => {
  getUserPage()
}
/**
 * 重置
 */
const onReset = () => {
  search.value = ''
  getUserPage()
}
/**
 * 分页获取用户信息
 */
const getUserPage = async () => {
  try {
    const res = await getUserPageAPI({
      name: search.value
    })
    if (res.code === 200) {
      tableData.value = res.data?.list
      return true
    }
    return false
  } finally {

  }
}
/**
 * 添加用户
 * @param data
 */
const saveUser = async (data: SaveUserDTO) => {
  formLoading.value = true
  try {
    const res = await saveUserAPI(data)
    if (res.code === 200) {
      message.success('添加成功')
      showSaveModal.value = false
    }
  } finally {
    formLoading.value = false
  }
}
/**
 * 打开修改模态框
 */
const openEditModal = (user: UserRoleVO) => {
  showEditModal.value = true
  editUserDTO.value = Object.assign({}, user)
  console.log(user)
}
/**
 * 修改用户
 * @param data
 */
const editUser = async (data: EditUserDTO) => {
  formLoading.value = true
  try {
    const res = await editUserAPI(data)
    if (res.code === 200) {
      message.success('修改成功')
      showEditModal.value = false
      await getUserPage()
    }
  } finally {
    formLoading.value = false
  }
}

/**
 * 删除用户
 */
const deleteUserById = async (user: UserRoleVO) => {
  const res = await deleteUserByIdAPI(user.id)
  if (res.code === 200) {
    message.success('操作成功')
    await getUserPage()
  } else {
    message.error('操作失败')
  }
}

/**
 * 分页发送变化
 */
const handlePageChange = (currentPage: number) => {
  pagination.value.page = currentPage
  getUserPage()
}

onMounted(async () => {
  handleStart()
  const res = await getUserPage()
  if (res) {
    handleFinish()
  } else {
    handleError()
  }
})
</script>

<template>
  <div class="users">
    <n-card title="用户管理" :bordered="false">
      <header>
        <n-flex>
          <n-button type="info" @click="showSaveModal = true">
            <template #icon>
              <n-icon>
                <AddOutline />
              </n-icon>
            </template>
            添加用户
          </n-button>
          <n-input v-model:value="search" type="text" placeholder="请输入角色名称..." />
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
        :scroll-x="1800"
        :loading="tableLoading"
        size="small"
        :columns="userTableColumns({updateData:openEditModal,deleteData:deleteUserById})"
        :data="tableData"
        :pagination="pagination"
        @update:page="handlePageChange"
      />
    </n-card>

    <n-modal
      v-model:show="showSaveModal"
      class="custom-card"
      preset="card"
      title="添加用户"
      size="huge"
      :bordered="false"
      style="width: 660px"
    >
      <UsersForm :loading="formLoading" @submit="saveUser" />
    </n-modal>
    <n-modal
      v-model:show="showEditModal"
      class="custom-card"
      preset="card"
      title="修改用户"
      size="huge"
      :bordered="false"
      style="width: 660px"
    >
      <UsersForm :loading="formLoading" :data="editUserDTO" @submit="editUser" />
    </n-modal>
  </div>
</template>

<style scoped lang="scss">
.users {
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
</style>
