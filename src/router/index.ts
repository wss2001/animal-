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
    component: Home,
    meta: { showFooter: true, showHeader: true, content: '用户首页' },
  },
  {
    path: '/cwBaseInfo',
    name: 'cwBaseInfo',
    component: () => import('@/pages/CwBaseInfo.vue'),
    meta: { showFooter: false, showHeader: true, content: '用户首页' },
  },
  {
    path: '/map',
    name: 'map',
    component: () => import("@/pages/Map.vue")
  },
  {
    path: '/cwinfo',
    name: 'cwinfo',
    component: () => import('@/pages/CwInfo.vue'),
    meta: { showFooter: false, showHeader: true, content: '用户首页' },
  },
  {
    path: '/read',
    name: 'read',
    component: () => import('@/components/MyProtocol.vue'),
    meta: { showFooter: false, showHeader: false, content: '用户首页' },
  },
  {
    path: '/peopleZhuYe',
    name: 'peopleZhuYe',
    component: () => import('@/components/PeopleZhuYe.vue'),
    meta: { showFooter: false, showHeader: true, content: '用户' },
  },
  {
    path: '/newhome',
    name: 'newhome',
    component: () => import('@/components/NewHome.vue'),
    meta: { showFooter: false, showHeader: false, content: '用户' },
  },
  {
    path: '/aboutme',
    name: 'aboutme',
    component: () => import('@/components/AboutMe.vue'),
    meta: { showFooter: true, showHeader: false, content: '用户' },
  },
  {
    path: '/registerCwAdmin',
    name: 'registerCwAdmin',
    component: () => import('@/components/RegisterCwAdmin.vue'),
    meta: { showFooter: true, showHeader: false, content: '用户' },
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
        path: 'myFriend',
        name: 'myFriend',
        component: () => import("@/pages/UserAdmin/MyFriend.vue"),
        meta: { showFooter: false, showHeader: true, content: '用户宠物' }
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
  {
      path:'/adminLogin',
      name:'adminLogin',
      component:() => import("@/pages/Admin/Login.vue"),
      meta:{showFooter:false,showHeader:true,content:'后台登录'}
  },
  {
      path:'/admin',
      name:'admin',
      component:() => import("@/pages/Admin/index.vue"),
      meta:{showFooter:false,showHeader:true,content:'后台管理'},
      children: [
        {
          path: 'incomes',
          name: 'incomes',
          component: () => import("@/pages/Admin/Incomes.vue"),
          meta: { showFooter: false, showHeader: true, content: '收益信息' }
        },
        {
          path: 'cwBase',
          name: 'cwBase',
          component: () => import("@/pages/Admin/CwBase.vue"),
          meta: { showFooter: false, showHeader: true, content: '宠物信息' }
        },
        {
          path: 'adminMessage',
          name: 'adminMessage',
          component: () => import("@/pages/Admin/Message.vue"),
          meta: { showFooter: false, showHeader: true, content: '宠物信息' }
        },
        {
          path: 'writeNews',
          name: 'writeNews',
          component: () => import("@/pages/Admin/WriteNews.vue"),
          meta: { showFooter: false, showHeader: true, content: '宠物信息' }
        },
        
      ]
  },
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
    meta:{showFooter:false,showHeader:false,content:'基地管理后台'},
    children: [
      {
        path: 'message',
        name: 'baseMessage',
        component: () => import("@/pages/CwBaseAdmin/MyMessage.vue"),
        meta: { showFooter: false, showHeader: true, content: '管理人员信息' }
      },
      {
        path: 'basepet',
        name: 'basepet',
        component: () => import("@/pages/CwBaseAdmin/PetCount.vue"),
        meta: { showFooter: false, showHeader: true, content: '宠物信息' }
      },
      {
        path: 'addpet',
        name: 'addpet',
        component: () => import("@/pages/CwBaseAdmin/AddPet.vue"),
        meta: { showFooter: false, showHeader: true, content: '宠物信息' }
      },
    ]
},
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
});
export default router;