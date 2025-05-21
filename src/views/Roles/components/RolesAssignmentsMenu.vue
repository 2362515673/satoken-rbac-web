<script setup lang="ts">
import { ref, useTemplateRef, onMounted, defineProps, computed } from 'vue'
import { useMessage } from 'naive-ui'
import { addRoleMenuAPI } from '@/apis/role.ts'
import { getMenuByRoleIdAPI, getTreeMenuOptionsAPI } from '@/apis/menu.ts'
import type { TreeInst } from 'naive-ui'
import type { MenuOptionsVO, MenuVO } from '@/types/menu'

const props = defineProps<{
  roleId: string
}>()

const message = useMessage()
const treeRef = useTemplateRef<TreeInst>('tree')
const isShow = ref(false)
const data = ref<MenuOptionsVO[]>([])
const getTreeMenuOptions = async () => {
  const res = await getTreeMenuOptionsAPI()
  if (res.code === 200) {
    data.value = res.data
  }
}
const menuList = ref<MenuVO[]>([])
const getMenuByRoleId = async () => {
  const res = await getMenuByRoleIdAPI(props.roleId)
  if (res.code === 200) {
    menuList.value = res.data
  }
  isShow.value = true
}

const menuIds = computed(() => {
  return menuList.value.map((item: MenuVO) => item.id)
})

const onSubmit = async () => {
  const { keys } = treeRef.value!.getCheckedData()
  const res = await addRoleMenuAPI({
    roleId: props.roleId,
    menuIds: keys as string[]
  })
  if (res.code === 200) {
    message.success('操作成功')
  } else {
    message.error('操作失败')
  }
}

onMounted(async () => {
  await getMenuByRoleId()
  await getTreeMenuOptions()
})
</script>

<template>
  <n-tree
    ref="tree"
    v-if="isShow"
    block-line
    :data="data"
    :default-checked-keys="menuIds"
    expand-on-click
    checkable
  />
  <n-button type="info" @click="onSubmit">提交</n-button>
</template>

<style scoped lang="scss">
.n-tree :deep(.n-tree-node-content) {
  line-height: initial !important;
}

.n-button {
  margin-top: 20px;
}
</style>
