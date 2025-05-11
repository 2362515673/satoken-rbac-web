import { type Component, h } from 'vue'
import { NIcon, createDiscreteApi } from 'naive-ui'

const { loadingBar } = createDiscreteApi(['loadingBar'])

export const renderIcon = (icon: Component) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon)
    })
  }
}

export const handleStart = () => {
  loadingBar.start()
}
export const handleFinish = () => {
  loadingBar.finish()
}
export const handleError = () => {
  loadingBar.error()
}
