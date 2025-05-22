<script setup lang="ts">
import { useRouter } from 'vue-router'
import LiuUpload from '@/components/LiuUpload/index.vue'

const router = useRouter()
const finish = (url: string) => {
  console.log(url)
}
</script>

<template>
  <div class="l-home">
    <n-button type="success" @click="router.push({path:'/test/one'})">text</n-button>
    <LiuUpload @finish="finish" />
  </div>
</template>

<style scoped lang="scss">

</style>
