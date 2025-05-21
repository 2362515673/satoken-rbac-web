<script setup lang="ts">
import UserAvatar from '@/components/UserAvatar/index.vue'
</script>

<template>
  <div class="layout-header">
    颐和园路
    <UserAvatar />
  </div>
</template>

<style scoped lang="scss">
.layout-header {
  padding: 0 var(--content-padding);
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
