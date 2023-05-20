<template>
  <el-container>
    <!-- <el-aside width="230px"> -->
    <MyAside></MyAside>
    <!-- </el-aside> -->
    <el-main>
      <MyHome></MyHome>
    </el-main>
  </el-container>
  <el-dialog title="提示" v-model="dialogVisible" width="30%">
    <span>进入视频</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="goShipin">跳转</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import MyAside from "./MyAside.vue";
import MyHome from "./MyHome.vue";
import { onMounted,onUnmounted, ref,getCurrentInstance } from "vue";
import { useSignOut } from "@/utils/hook";
import { reqGetCwBaseInfo,reqGetCwBaseById,reqGetNews } from '@/api/index'

// import * as io from 'vue-socket.io'//引入
const dialogVisible = ref(false);

const router =useRouter()
useSignOut('cwBaseAdminToken')
const name = ref('')
let myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)cwBaseAdminToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
onMounted(async () => {
  try {
    const cwBase = await reqGetCwBaseById(myCookie)
    name.value = cwBase.data.PeopleName
  } catch (error) {
    console.log(error)
  }
})
let url = 'http://127.0.0.1:3003/'
// @ts-ignore
let socket = io.connect(url, {
  path: '/rtckeet'
})
let room = ref('')
onMounted(()=>{
  socket.emit('usersend','123')
  socket.on('usersend',(r:string,sid:string,data:any)=>{
    // 在这里接收值
    room.value = data.a
    console.log('==',r,sid,data)
    if(data){
      sendNotice()
    }
    dialogVisible.value = true;
  })
})
const goShipin = ()=>{
  router.push({name:'shipin',query:{room:room.value,userType:'cwBase',name:name.value}})
}
const sendNotice = ()=>{
  if (!("Notification" in window)) {
    // Check if the browser supports notifications
    alert("This browser does not support desktop notification");
  } else if (Notification.permission === "granted") {
    // Check whether notification permissions have already been granted;
    // if so, create a notification
    var notification = new Notification('视频连线', {
          body: '您有新的视频连线哦',
          icon: 'http://www.mengzands.com/images/zhua.png',
          vibrate:[200, 100, 200],
          requireInteraction:true
        });
  }  else if (Notification.permission !== "denied") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        var notification = new Notification('视频连线', {
          body: '您有新的视频连线哦',
          icon: 'http://www.mengzands.com/images/zhua.png',
          vibrate:[200, 100, 200],
          requireInteraction:true
        });
      }
    });
  }
}
onUnmounted(()=>{
  console.log('onUnmounted')
  // emitter.off('mittFn')
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