import { createApp } from 'vue'
import { createPinia } from "pinia";
import './style.css'
import './reset.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as echarts from 'echarts'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'
import mitt from "mitt";


import router from './router';
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// let url = 'http://127.0.0.1:3003/'
// app.config.globalProperties.$socket = io.connect(url, {
//   path: '/rtckeet'
// });
app.use(ElementPlus)
app.use(router)
app.use(createPinia())

app.mount('#app')
app.config.globalProperties.mittBus = new mitt()

//@ts-ignore
app.echarts=echarts
