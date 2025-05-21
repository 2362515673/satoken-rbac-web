<script setup lang="ts">
import { defineEmits, defineProps, ref, useTemplateRef, onMounted } from 'vue'
import { useMessage } from 'naive-ui'
import type { FormInst } from 'naive-ui'
import type { EditMenuDTO, MenuOptionsVO, SaveMenuDTO } from '@/types/menu'
import { getTreeMenuOptionsAPI } from '@/apis/menu.ts'

const props = withDefaults(
  defineProps<{
    loading: boolean
    editMenuDTO?: EditMenuDTO
  }>(),
  {
    loading: false
  }
)
const emits = defineEmits(['submit'])

const message = useMessage()
const formRef = useTemplateRef<FormInst>('formRef')
const formValue = ref<SaveMenuDTO | EditMenuDTO>(props.editMenuDTO || {
  code: '',
  icon: '',
  name: '',
  order: 0,
  parentId: '',
  path: '',
  title: '',
  type: 0,
  url: ''
})
const options = ref<MenuOptionsVO[]>([])
const getTreeMenuOptions = async () => {
  const res = await getTreeMenuOptionsAPI()
  if (res.code === 200) {
    options.value = res.data
  }
}

const handleUpdateValue = (
  value: string | number | Array<string | number> | null
) => {
  if (formValue.value.parentId === value) {
    formValue.value.parentId = ''
  } else {
    formValue.value.parentId = (value as Array<string>)[0]
  }
}

const onSubmit = () => {
  emits('submit', formValue.value)
}
const handleValidateClick = (e: MouseEvent) => {
  e.preventDefault()
  formRef.value?.validate((errors) => {
    if (!errors) {
      onSubmit()
    } else {
      console.log(errors[0][0])
      message.error(errors[0][0] as string)
    }
  })
}

onMounted(() => {
  getTreeMenuOptions()
})
</script>

<template>
  <n-form
    ref="formRef"
    :label-width="80"
    :model="formValue"
    :disabled="props.loading"
  >
    <n-grid :cols="24" :x-gap="24">
      <n-form-item-gi :span="24" label="菜单类型" path="user.age">
        <n-radio-group v-model:value="formValue!.type" name="status">
          <n-space>
            <n-radio :value="0">
              目录
            </n-radio>
            <n-radio :value="1">
              菜单
            </n-radio>
            <n-radio :value="2">
              按钮
            </n-radio>
          </n-space>
        </n-radio-group>
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="菜单标题" path="user.name">
        <n-input v-model:value="formValue!.title" placeholder="输入菜单名称..." />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="父级菜单">
        <n-tree-select
          multiple
          cascade
          checkable
          :options="options"
          @update:value="handleUpdateValue"
        />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="菜单编码" path="user.name">
        <n-input v-model:value="formValue!.code"
                 placeholder="输入菜单编码..." />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="组件名称" path="user.name">
        <n-input v-model:value="formValue!.name" placeholder="输入组件名称..." />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="组件路由" path="user.name">
        <n-input v-model:value="formValue!.path" placeholder="输入菜单路由..." />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="组件路径" path="user.name">
        <n-input v-model:value="formValue!.url" placeholder="输入菜单路径..." />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="排序" path="user.name">
        <n-input-number v-model:value="formValue!.order" :min="0" clearable />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="菜单图标" path="user.name">
        <n-input v-model:value="formValue!.icon" placeholder="输入菜单图标..." />
      </n-form-item-gi>
    </n-grid>
    <n-button type="info" :loading="props.loading" @click="handleValidateClick">
      提交
    </n-button>
  </n-form>
</template>

<style scoped lang="scss">
.n-input-number {
  width: 100%;
}
</style>
