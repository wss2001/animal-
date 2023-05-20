<template>
  <el-row class="tac">
    <el-col :span="24">
      <h2 class="mb-2">欢迎回家</h2>
      <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        default-active="3"
        text-color="#fff"
      >
        <!-- <el-sub-menu index="1">
          <template #title>
            <el-icon><location /></el-icon>
            <span>Navigator One</span>
          </template>
          <el-menu-item-group title="Group One">
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item two</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group Two">
            <el-menu-item index="1-3">item three</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="1-4">
            <template #title>item four</template>
            <el-menu-item index="1-4-1">item one</el-menu-item>
          </el-sub-menu>
        </el-sub-menu> -->
        <el-menu-item index="2">
          <el-icon><icon-menu /></el-icon>
          <span @click="handleGozs">我的救助证书</span>
        </el-menu-item>
        <el-menu-item index="3" >
          <el-icon><document /></el-icon>
          <span @click="handleGopmes">我的信息</span>
        </el-menu-item>
        <el-menu-item index="5" >
          <el-icon><Chicken /></el-icon>
          <span @click="handleGopet">我的宠物</span>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon><User /></el-icon>
          <span @click="handleGoFriend">我的好友</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import {
  Document,
  Menu as IconMenu,
  ChatDotRound,
  Chicken,
  User
} from '@element-plus/icons-vue'
import {onMounted,watch} from 'vue'
import {useRouter,useRoute} from 'vue-router'
const router = useRouter()
let myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)userToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
onMounted(()=>{
  router.push({name:'MyMessage'})
})
const handleOpen = (key: string, keyPath: string[]) => {
  // console.log('000000',key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath)
}
const handleGoFriend = ()=>{
  router.push({name:'myFriend'})
}
const handleGozs = ()=>{
  router.push({name:'MyCertificate'})
}
const handleGopmes = ()=>{
  router.push({name:'MyMessage'})
}
const handleGopet = ()=>{
  router.push({name:'MyPet'})
}
</script>
<style scoped>
  /* .el-cow{
    min-height: 400px;
  } */
  .el-menu{
    height: 100%;
    width: 150px;
    text-align: center;
  }
</style>
