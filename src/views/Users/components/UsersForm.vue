<script setup lang="ts">
import { defineEmits, defineProps, onMounted, ref, withDefaults, computed } from 'vue'
import { type FormInst, useMessage } from 'naive-ui'
import type { EditUserDTO, SaveUserDTO } from '@/types/user'
import { getRoleListAPI } from '@/apis/role.ts'
import LiuUpload from '@/components/LiuUpload/index.vue'
import type { RoleSelectVO } from '@/types/role'

const props = withDefaults(
  defineProps<{
    data?: EditUserDTO
    loading?: boolean
  }>(),
  {
    loading: false
  }
)
const emits = defineEmits(['submit'])
const message = useMessage()
const formRef = ref<FormInst | null>(null)
const formValue = ref<SaveUserDTO | EditUserDTO>(props.data || {
  account: '',
  avatar: '',
  email: '',
  name: '',
  password: '',
  phone: '',
  profile: '',
  roleIds: [],
  sex: 0,
  status: 0
})
const roleList = ref<RoleSelectVO[]>([])
const getRoleList = async () => {
  const res = await getRoleListAPI()
  roleList.value = res.data
}
const options = computed(() => {
  return roleList.value.map((item: RoleSelectVO) => {
    return {
      label: item.name,
      value: item.id
    }
  })
})

const onFinish = (url: string) => {
  formValue.value!.avatar = url
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
  getRoleList()
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
      <n-form-item-gi :span="24" label="头像" path="user.age">
        <LiuUpload :url="formValue.avatar" @finish="onFinish" />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="名称" path="user.name">
        <n-input v-model:value="formValue!.name" placeholder="输入用户名称..." />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="账号" path="user.name">
        <n-input v-model:value="formValue!.account" placeholder="输入用户账号..." />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="密码" path="user.name">
        <n-input :disabled="!(!props.data)" v-model:value="formValue!.password"
                 placeholder="输入用户密码..." />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="邮箱" path="user.name">
        <n-input v-model:value="formValue!.email" placeholder="输入用户邮箱..." />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="手机号" path="user.name">
        <n-input v-model:value="formValue!.phone" placeholder="输入用户手机号..." />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="角色">
        <n-select v-model:value="formValue.roleIds" multiple :max-tag-count="1" size="medium"
                  :options="options" />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="性别" path="user.age">
        <n-radio-group v-model:value="formValue!.sex" name="status">
          <n-space>
            <n-radio :value="0">
              男
            </n-radio>
            <n-radio :value="1">
              女
            </n-radio>
          </n-space>
        </n-radio-group>
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="状态" path="user.age">
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
      </n-form-item-gi>
      <n-form-item-gi :span="24" label="简介" path="phone">
        <n-input
          v-model:value="formValue!.profile"
          type="textarea"
          placeholder="用户简介"
          :autosize="{
          minRows: 3,
          maxRows: 3
        }"
          maxlength="32"
          show-count
        />
      </n-form-item-gi>
    </n-grid>
    <n-button type="info" :loading="props.loading" @click="handleValidateClick">
      提交
    </n-button>
  </n-form>
</template>

<style scoped lang="scss">

</style>
