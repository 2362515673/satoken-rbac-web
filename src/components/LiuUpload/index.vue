<script setup lang="ts">
import { ref, defineProps, defineEmits, onMounted } from 'vue'
import type { UploadFileInfo } from 'naive-ui'

const props = defineProps<{
  url?: string
}>()
const emits = defineEmits(['finish'])

const fileList = ref<UploadFileInfo[]>([])
const onFinish = ({ event }: { file: UploadFileInfo, event: ProgressEvent }): void => {
  const res = JSON.parse(event.currentTarget!.response as string)
  emits('finish', res.data)
}

onMounted(() => {
  if (props.url) {
    fileList.value.push({
      id: 'c',
      name: '我是自带url的图片.png',
      status: 'finished',
      url: props.url
    })
  }
})
</script>

<template>
  <n-upload
    action="http://localhost:8101/api/file/upload/avatar"
    :default-file-list="fileList"
    list-type="image-card"
    :max="1"
    @finish="onFinish"></n-upload>
</template>

<style scoped lang="scss">

</style>
