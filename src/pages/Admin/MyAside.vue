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
        <el-menu-item index="2">
          <el-icon><icon-menu /></el-icon>
          <span @click="handleGomypet">基地</span>
        </el-menu-item>
        <el-menu-item index="3" >
          <el-icon><document /></el-icon>
          <span @click="handleGopmes">信息</span>
        </el-menu-item>
        <el-menu-item index="5" >
          <el-icon><Setting /></el-icon>
          <span @click="handleGopet">收益</span>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon><Edit /></el-icon>
          <span @click="handleWrite">写作</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>
<script setup lang="ts">
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
  Edit
} from '@element-plus/icons-vue'
import { useRouter } from "vue-router";
const router = useRouter()

const handleGomypet = ()=>{
  router.push({name:'cwBase'})
}
const handleGopmes = ()=>{
  router.push({name:'adminMessage'})
}
const handleGopet = ()=>{
  router.push({name:'incomes'})
}
const handleWrite = ()=>{
  router.push({name:'writeNews'})
}

</script>
<style lang="less" scoped>
  .el-menu{
    height: 100%;
    width: 150px;
    text-align: center;
  }
</style>