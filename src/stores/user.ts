import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { UserLoginVO } from '@/types/user'

export const useUserStore = defineStore('counter', () => {
  const userinfo = ref<UserLoginVO>()

  return {
    userinfo
  }
})
