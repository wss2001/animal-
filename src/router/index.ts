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
    path: '/read',
    name: 'read',
    component: () => import('@/components/MyProtocol.vue')
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
      component:() => import("@/pages/UserAdmin/UserRegister.vue"),
      meta:{showFooter:false,showHeader:true,content:'用户注册'}
  },
  // {
  //     path:'/adminLogin',
  //     name:'adminLogin',
  //     component:() => import("@/pages/CwBaseAdmin/Login.vue"),
  //     meta:{showFooter:false,showHeader:true,content:'后台登录'}
  // },
  // {
  //     path:'/admin',
  //     name:'admin',
  //     component:Admin,
  //     meta:{showFooter:false,showHeader:true,content:'后台管理'}
  // },
  {
      path:'/cwBaseAdminLogin',
      name:'cwBaseAdminLogin',
      component:() => import("@/pages/CwBaseAdmin/Login.vue"),
      meta:{showFooter:false,showHeader:true,content:'基地管理人员登录'}
  },
  {
    path:'/cwBaseAdmin',
    name:'cwBaseAdmin',
    component:() => import("@/pages/CwBaseAdmin/index.vue"),
    meta:{showFooter:false,showHeader:false,content:'基地管理后台'}
},
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
});
export default router;