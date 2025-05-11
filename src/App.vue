<script setup lang="ts">
import { dateZhCN, zhCN } from 'naive-ui'
</script>

<template>
  <n-config-provider inline-theme-disabled :locale="zhCN" :date-locale="dateZhCN">
    <n-global-style />
    <n-message-provider>
      <n-loading-bar-provider>
        <n-modal-provider>
          <router-view />
        </n-modal-provider>
      </n-loading-bar-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<style scoped lang="scss">
.n-config-provider {
  width: 100%;
  height: 100%;
}
</style>
