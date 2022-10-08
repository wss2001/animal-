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
<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router';
import MyAside from "./MyAside.vue";
import MyHome from "./MyHome.vue";
import { onMounted, ref, reactive } from "vue";
import {userStore} from '@/store/user'
let user = userStore()
const router =useRouter()
let myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)userToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
user.getCwInfo(myCookie)
onMounted(()=>{
  if (!document.cookie.includes('userToken')) {
    router.push({ name: 'userLogin' })
    console.log('时间过久退出登陆状态')
  }else{
    router.push({name:'MyMessage'})
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