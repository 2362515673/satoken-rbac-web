// 全局初始化样式
import '@/assets/css/main.scss'
// 通用字体
import 'vfonts/Lato.css'
// 等宽字体
import 'vfonts/FiraCode.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
// pinia 持久化插件
import piniaPluginPersist from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'


const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersist)

app.use(pinia)
app.use(router)

app.mount('#app')
