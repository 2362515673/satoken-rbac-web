<script setup lang="ts">
import LayoutHeader from '@/views/Layout/components/LayoutHeader.vue'
import LayoutMenu from '@/views/Layout/components/LayoutMenu.vue'
</script>

<template>
  <n-layout class="l-layout">
    <n-layout-header style="height: 64px" bordered>
      <LayoutHeader />
    </n-layout-header>
    <n-layout position="absolute" style="top: 64px" has-sider>
      <n-layout-sider
        content-style="padding: 24px;"
        :native-scrollbar="false"
        bordered
      >
        <LayoutMenu />
      </n-layout-sider>
      <n-layout :native-scrollbar="false">
        <RouterView></RouterView>
      </n-layout>
    </n-layout>
  </n-layout>

</template>

<style scoped lang="scss">
.l-layout {
  width: 100%;
  height: 100%;
}
</style>
