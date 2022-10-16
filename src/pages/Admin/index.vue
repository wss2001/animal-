<template>
  <el-container>
    <!-- <el-aside width="230px"> -->
    <MyAside></MyAside>
    <!-- </el-aside> -->
    <el-main>
      <MyHome></MyHome>
    </el-main>
  </el-container>
</template>
<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import MyAside from "./MyAside.vue";
import MyHome from "./MyHome.vue";
import { onMounted, ref } from "vue";
const router =useRouter()
onMounted(()=>{
  if (!document.cookie.includes('admin')) {
    router.push({ name: 'home' })
    console.log('退出登陆状态')
  }
  
})

</script>
<style lang="less" scoped>
  
</style>