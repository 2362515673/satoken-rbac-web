<script setup lang="ts">
import LiuUpload from '@/components/LiuUpload/index.vue'

const finish = (url: string) => {
  console.log(url)
}
</script>

<template>
  <div class="l-home">
    <n-button type="success">text</n-button>
    <LiuUpload @finish="finish" />
  </div>
</template>

<style scoped lang="scss">

</style>
