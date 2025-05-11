<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useMessage } from 'naive-ui'
import { getTreeMenuAPI, saveMenuAPI } from '@/apis/menu.ts'
import type { SaveMenuDTO, TreeMenuVO } from '@/types/menu'
import { AddOutline } from '@vicons/ionicons5'
import MenusForm from '@/views/Menus/components/MenusForm.vue'
import { menuTableColumns } from '@/utils/tableColumns.ts'

const message = useMessage()
const tree = ref<TreeMenuVO[]>([])
const getTreeMenu = async () => {
  const res = await getTreeMenuAPI()
  if (res.code === 200) {
    tree.value = res.data
  }
}

const loading = ref<boolean>(false)
const showSaveModal = ref(false)
const saveMenus = async (data: SaveMenuDTO) => {
  showSaveModal.value = true
  loading.value = true
  try {
    const res = await saveMenuAPI(data)
    if (res.code === 200 && res.data) {
      message.success('创建成功')
      showSaveModal.value = false
      await getTreeMenu()
    }
  } finally {
    loading.value = false
  }
}


onMounted(() => {
  getTreeMenu()
})
</script>

<template>
  <div class="menus">
    <n-card title="菜单管理" :bordered="false">
      <header>
        <n-flex>
          <n-button type="info" @click="showSaveModal = true">
            <template #icon>
              <n-icon>
                <AddOutline />
              </n-icon>
            </template>
            添加菜单
          </n-button>
        </n-flex>
      </header>
      <n-data-table
        remote
        default-expand-all
        size="small"
        :scroll-x="1600"
        :columns="menuTableColumns({updateData:()=>{},deleteData:()=>{}})"
        :data="tree"
      />
    </n-card>

    <n-modal
      v-model:show="showSaveModal"
      class="custom-card"
      preset="card"
      title="添加菜单"
      size="huge"
      :bordered="false"
      style="width: 660px"
    >
      <MenusForm :loading="loading" @submit="saveMenus" />
    </n-modal>
  </div>
</template>

<style scoped lang="scss">
.menus {
  width: 100%;
  height: var(--content-height);
  margin-right: 10px;
}
</style>
