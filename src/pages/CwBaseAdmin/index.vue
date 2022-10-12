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
let myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)cwBaseAdminToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
onMounted(()=>{
  if (!document.cookie.includes('cwBaseAdminToken')) {
    router.push({ name: 'cwBaseAdminLogin' })
    console.log('基地登录时间过久退出登陆状态')
  }else{
    router.push({name:'addpet'})
  }

})

</script>
<style lang="less" scoped>
  .el-container {
  min-height: 500px;
}
.el-main{
  position: relative;
}
</style>