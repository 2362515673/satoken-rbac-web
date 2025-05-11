<script setup lang="ts">
import { ref } from 'vue'
import { type FormInst, useMessage } from 'naive-ui'
import { doRegisterAPI } from '@/apis/user.js'
import { LockClosedOutline, PersonOutline } from '@vicons/ionicons5'

const message = useMessage()
const formRef = ref<FormInst | null>(null)
const formValue = ref({
  user: {
    name: '且听风吟',
    account: 'liuning',
    password: '123456'
  },
  isDisabled: false
})

const doRegister = async () => {
  formValue.value.isDisabled = true
  try {
    await doRegisterAPI(formValue.value.user).then(res => {
      formValue.value.isDisabled = false
      if (res.code === 200) {
        message.success('注册成功')
      } else {
        message.error(res.msg)
      }
    })
  } finally {
    formValue.value.isDisabled = false
  }
}

const handleValidateClick = (e: MouseEvent) => {
  e.preventDefault()
  formRef.value?.validate((errors) => {
    if (!errors) {
      doRegister()
    } else {
      message.error(errors[0][0].message as string)
    }
  })
}
</script>

<template>
  <n-form
    ref="formRef"
    :model="formValue"
    :size="'medium'"
    :disabled="formValue.isDisabled">
    <n-form-item :show-label="false" path="user.userAccount">
      <n-input type="text" placeholder="请输入名称..." v-model:value="formValue.user.name">
        <template #prefix>
          <n-icon :component="PersonOutline" />
        </template>
      </n-input>
    </n-form-item>
    <n-form-item :show-label="false" path="user.userAccount">
      <n-input type="text" placeholder="请输入账号..." v-model:value="formValue.user.account">
        <template #prefix>
          <n-icon :component="PersonOutline" />
        </template>
      </n-input>
    </n-form-item>
    <n-form-item :show-label="false" path="user.userPassword">
      <n-input
        type="password"
        show-password-on="mousedown"
        placeholder="请输入密码..."
        v-model:value="formValue.user.password"
      >
        <template #prefix>
          <n-icon :component="LockClosedOutline" />
        </template>
      </n-input>
    </n-form-item>
    <n-form-item>
      <n-button @click="handleValidateClick" :loading="formValue.isDisabled" type="success" block
                strong>
        注册
      </n-button>
    </n-form-item>
  </n-form>

</template>

<style scoped lang="scss">
.n-form {
  margin-top: 10px;
  padding: 0 20px;
}
</style>
