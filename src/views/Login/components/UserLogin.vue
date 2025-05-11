<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { type FormInst, useMessage } from 'naive-ui'
import { useUserStore } from '@/stores/user'
import { doLoginAPI } from '@/apis/user'
import { PersonOutline, LockClosedOutline } from '@vicons/ionicons5'


const router = useRouter()
const userStore = useUserStore()
const message = useMessage()
const formRef = ref<FormInst | null>(null)
const formValue = ref({
  user: {
    account: '',
    password: ''
  },
  checkedValue: true,
  isDisabled: false
})

const doLogin = async () => {
  formValue.value.isDisabled = true
  try {
    const res = await doLoginAPI(formValue.value.user)
    if (res.code === 200) {
      message.success('登录成功')
      userStore.userinfo = res.data
      await router.push('/')
    }
  } finally {
    formValue.value.isDisabled = false
  }
}

const handleValidateClick = (e) => {
  e.preventDefault()
  formRef.value?.validate((errors) => {
    if (!errors) {
      doLogin()
    } else {
      message.error(errors[0][0].message)
    }
  })
}
</script>

<template>
  <n-form
    ref="formRef"
    :model="formValue"
    :size="'medium'"
    :disabled="formValue.isDisabled"
  >
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
    <n-form-item :show-label="false">
      <div class="item">
        <n-checkbox v-model:checked="formValue.checkedValue">
          自动登录
        </n-checkbox>
        <n-gradient-text type="info">
          忘记密码？
        </n-gradient-text>
      </div>
    </n-form-item>
    <n-form-item :show-label="false">
      <n-button type="success" block :loading="formValue.isDisabled" @click="handleValidateClick">
        登录
      </n-button>
    </n-form-item>
  </n-form>
</template>

<style scoped lang="scss">
.n-form {
  margin-top: 10px;
  padding: 0 20px;

  .item {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
}
</style>
