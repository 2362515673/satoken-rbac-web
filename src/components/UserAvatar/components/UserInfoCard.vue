<script setup lang="ts">
import { useUserStore } from '@/stores/user.ts'

const { userinfo } = useUserStore()
</script>

<template>
  <div class="user-info-card">
    <n-thing>
      <template #avatar>
        <n-avatar
          size="large"
          :src="userinfo!.user?.avatar || ''"
        />
      </template>
      <template #header>
        {{ userinfo!.user?.name }}
      </template>
      <template #description>
        {{ userinfo!.user?.profile ? '该用户很高冷，没有留下签名' : userinfo!.user?.profile }}
      </template>
    </n-thing>
  </div>
</template>

<style scoped lang="scss">
.user-info-card {
  padding: 5px;
  width: 200px;
}
</style>
