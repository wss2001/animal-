<template>
  <div class="header">
    <el-page-header @back="goBack">
    <!-- <template #content>
      <span class="text-large font-600 mr-3"> {{content}} </span>
    </template> -->
  </el-page-header>  
  <div class="head">
    <el-image style="width: 90px; height: 70px" :src="url" fit="contain" />
    <el-button @click="goUserLogin" type="warning" text bg>登录</el-button>
  </div> 
  
  <el-tabs
    v-model="activeName"
    type="card"
    class="demo-tabs"
    @tab-click="handleClick"
  >
  <el-tab-pane label="用户注册" name="first" @click="goUserRegister"></el-tab-pane>
    <!-- <el-tab-pane label="后台管理" name="second" @click="goAdminLogin"></el-tab-pane> -->
    <el-tab-pane label="基地管理登录" name="third" @click="goBaseUser"></el-tab-pane>
    <el-tab-pane label="首页" name="five" @click="goHome"></el-tab-pane>
    <el-tab-pane label="关于我们" name="fourth" @click="goAboutMe"></el-tab-pane>
  </el-tabs>
    
    <!-- <template>
  <el-backtop :right="100" :bottom="100" />
    </template> -->
    
</div>
</template>
<script lang="ts" setup>
  // import type { TabsPaneContext } from 'element-plus'
import { ref, computed } from "vue";
import { useRouter } from 'vue-router';
const activeName = ref('first')
const router = useRouter()
const url = ref('http://localhost:3007/public/img/cw1.jpg')
const goBack = () => {
  router.back()
}
let content = computed(() => router.currentRoute.value.meta.content)
const handleClick = (tab: any, event: any) => {
  if (tab.props.name == 'first') {
    goUserRegister()
  }
  if (tab.props.name == 'second') {
    goAdminLogin()
  }
  if (tab.props.name == 'third') {
    goBaseUser()
  }
  if (tab.props.name == 'fourth') {
    goAboutMe()
  }
  if (tab.props.name == 'five') {
    goHome()
  }
}
const goHome = () => {
  router.push({ name: 'home' })
}
const goUserRegister = () => {
  router.push({ name: 'userRegister' })
}
const goAdminLogin = () => {
  router.push({ name: 'adminLogin' })
}
const goBaseUser = () => {
  router.push({ name: 'cwBaseAdminLogin' })
}
const goAboutMe = () => {
  router.push({ name: 'aboutme' })
}
const goUserLogin = () => {
  router.push({ name: 'userLogin' })
}
</script>
<style lang="less" scoped>
.header {
  position: relative;
  margin: 10px;
  .head{
    display: flex;
    justify-content: space-between;
    .el-button{
      align-self: center;
    }
  }
}
.el-tabs__item.is-active{
  color: black;
}
.el-button.is-text:not(.is-disabled).is-has-bg{
  background-color: #197048;
}
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
.s {
  top: 30px;
  right: 30px;
  position: absolute;
}
</style>