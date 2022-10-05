import { createRouter, createWebHashHistory } from "vue-router";
// import routes from "./route";

import Home from '@/pages/Home.vue'
interface Irouter {
  path: string
  component: any
  name: string
  children?:any
  meta?: any
}

export const routes: Irouter[] = [
  {
    path: '/',
    // redirect: '/dashboard'
    name: 'home',
    component: Home
  },
  {
    path: '/cwBaseInfo',
    name: 'cwBaseInfo',
    component: () => import('@/pages/CwBaseInfo.vue')
  },
  {
    path: '/map',
    name: 'map',
    component: () => import("@/pages/Map.vue")
  },
  {
    path: '/cwinfo',
    name: 'cwinfo',
    component: () => import('@/pages/CwInfo.vue')
  },
  {
    path: '/shipin',
    name: 'shipin',
    component: () => import("@/pages/Shipin.vue")
  },
  {
    path: '/user',
    name: 'user',
    component: () => import("@/pages/UserAdmin/index.vue"),
    meta: { showFooter: false, showHeader: true, content: '用户首页' },
    children: [
      {
        path: 'message',
        name: 'MyMessage',
        component: () => import("@/pages/UserAdmin/MyMessage.vue"),
        meta: { showFooter: false, showHeader: true, content: '用户信息' }
      },
      {
        path: 'myCertificate',
        name: 'MyCertificate',
        component: () => import("@/pages/UserAdmin/MyCertificate.vue"),
        meta: { showFooter: false, showHeader: true, content: '用户证书' }
      },
      {
        path: 'myPet',
        name: 'MyPet',
        component: () => import("@/pages/UserAdmin/MyPet.vue"),
        meta: { showFooter: false, showHeader: true, content: '用户宠物' }
      },
    ]
  },
  {
    path: '/userLogin',
    name: 'userLogin',
    component: () => import("@/pages/UserAdmin/Login.vue"),
    meta: { showFooter: false, showHeader: true, content: '用户登录' }
  },
  {
      path:'/userRegister',
      name:'userRegister',
      component:() => import("@/pages/UserAdmin/Login.vue"),
      meta:{showFooter:false,showHeader:true,content:'用户注册'}
  },
  // {
  //     path:'/adminLogin',
  //     name:'adminLogin',
  //     component:AdminLogin,
  //     meta:{showFooter:false,showHeader:true,content:'后台登录'}
  // },
  // {
  //     path:'/admin',
  //     name:'admin',
  //     component:Admin,
  //     meta:{showFooter:false,showHeader:true,content:'后台管理'}
  // },
  // {
  //     path:'/cwBaseAdminLogin',
  //     name:'cwBaseAdminLogin',
  //     component:CwBaseAdminLogin,
  //     meta:{showFooter:false,showHeader:true,content:'基地管理人员登录'}
  // },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
});
export default router;