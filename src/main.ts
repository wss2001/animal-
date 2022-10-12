import { createApp } from 'vue'
import { createPinia } from "pinia";
import './style.css'
import './reset.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as echarts from 'echarts'
import App from './App.vue'

import router from './router';
const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.use(createPinia())
app.mount('#app')
//@ts-ignore
app.echarts=echarts
