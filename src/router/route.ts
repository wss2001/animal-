import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router";
import Home from '@/pages/Home.vue'
interface Irouter{
  path:string,
  component:any
  name:string
  meta?:any
}

export const routes:Irouter[] = [
  {
    path:'/',
    // redirect: '/dashboard'
    name:'home',
    component:Home
  }
]