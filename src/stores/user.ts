import { ref } from 'vue'
import { defineStore } from 'pinia'
import { doLogoutAPI } from '@/apis/user.ts'
import type { UserLoginVO } from '@/types/user'

export const useUserStore = defineStore('user', () => {
  const userinfo = ref<UserLoginVO>({
    token: '',
    user: null
  })
  const logout = async () => {
    await doLogoutAPI()
    userinfo.value!.user = null
    userinfo.value!.token = ''
  }

  return {
    userinfo,
    logout
  }
}, {
  persist: true
})
