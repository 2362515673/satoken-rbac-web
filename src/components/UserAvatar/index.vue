<script setup lang="ts">
import { h } from 'vue'
import { useUserStore } from '@/stores/user.ts'
import {
  Pencil as EditIcon,
  LogOutOutline as LogoutIcon,
  PersonCircleOutline as UserIcon
} from '@vicons/ionicons5'
import { renderIcon } from '@/utils/utils.ts'
import UserInfoCard from '@/components/UserAvatar/components/UserInfoCard.vue'

const userStore = useUserStore()
const options = [
  {
    key: 'header',
    type: 'render',
    render: () => h(UserInfoCard)
  },
  {
    key: 'header-divider',
    type: 'divider'
  },
  {
    label: '用户资料',
    key: 'profile',
    icon: renderIcon(UserIcon)
  },
  {
    label: '编辑用户资料',
    key: 'editProfile',
    icon: renderIcon(EditIcon)
  },
  {
    label: '退出登录',
    key: 'logout',
    icon: renderIcon(LogoutIcon)
  }
]
const handleSelect = (key: string | number) => {
  switch (key) {
    case 'logout':
      userStore.logout()
      break
  }
}
</script>

<template>
  <div class="user-avatar">
    <div class="login" v-if="userStore.userinfo.token !== ''">
      <n-dropdown trigger="hover" :options="options" @select="handleSelect">
        <n-avatar
          size="large"
          :src="userStore.userinfo!.user?.avatar || ''"
        />
      </n-dropdown>
    </div>
    <n-avatar v-else size="large">未登录</n-avatar>
  </div>
</template>

<style scoped lang="scss">
</style>
