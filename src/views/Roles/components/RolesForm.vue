<script setup lang="ts">
import { ref, defineProps, defineEmits, withDefaults, onMounted } from 'vue'
import { useMessage } from 'naive-ui'
import type { FormInst } from 'naive-ui'
import type { EditRoleDTO, SaveRoleDTO } from '@/types/role'

const props = withDefaults(
  defineProps<{
    data?: EditRoleDTO | SaveRoleDTO
    loading: boolean
  }>(),
  {
    data: () => {
      return {
        name: '',
        status: 1,
        remark: ''
      }
    }
  }
)
const emits = defineEmits(['submit'])
const message = useMessage()
const formRef = ref<FormInst | null>(null)
const formValue = ref<SaveRoleDTO | EditRoleDTO>({
  name: '',
  status: 1,
  remark: ''
})
const onSubmit = () => {
  emits('submit', formValue.value)
}
const handleValidateClick = (e: MouseEvent) => {
  e.preventDefault()
  formRef.value?.validate( (errors) => {
    if (!errors) {
      onSubmit()
    } else {
      console.log(errors[0][0])
      message.error(errors[0][0] as string)
    }
  })
}

onMounted(() => {
  formValue.value = props.data
})
</script>

<template>
  <n-form
    ref="formRef"
    :label-width="80"
    :model="formValue"
    :disabled="props.loading"
  >
    <n-form-item label="角色名称" path="user.name">
      <n-input v-model:value="formValue!.name" placeholder="输入角色名称..." />
    </n-form-item>
    <n-form-item label="角色状态" path="user.age">
      <n-radio-group v-model:value="formValue!.status" name="status">
        <n-space>
          <n-radio :value="1">
            启用
          </n-radio>
          <n-radio :value="0">
            禁用
          </n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>
    <n-form-item label="备注" path="phone">
      <n-input
        v-model:value="formValue!.remark"
        type="textarea"
        placeholder="备注"
        :autosize="{
          minRows: 3,
          maxRows: 3
        }"
        maxlength="32"
        show-count
      />
    </n-form-item>
    <n-button type="info" :loading="props.loading" @click="handleValidateClick">
      提交
    </n-button>
  </n-form>
</template>

<style scoped lang="scss">

</style>
