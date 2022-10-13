<template>
  <el-table :data="result.cwArr" height="250" style="width: 100%">
    <el-table-column prop="name" label="名字" width="180" />
    <el-table-column prop="intro" label="宠物介绍" width="180" />
    <el-table-column prop="alsoFood" label="剩余食物" />
    <el-table-column prop="birth" label="收养时间" />
  </el-table>
  <!-- <div>
    {{result.cwArr}}
  </div> -->
</template>
<script setup lang="ts">
import { reqGetCwBaseInfo } from '@/api/index'
import { onMounted,reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useSignOut } from '@/utils/hook'
const router = useRouter()
//判断cookie决定是否登出
useSignOut('cwBaseAdminToken')
let myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)cwBaseAdminToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
let result = reactive({
  cwArr:[]
})
onMounted(async () => {
  if (document.cookie.includes(myCookie))
    try {
      let {data} = await reqGetCwBaseInfo(myCookie)
      result.cwArr = data
    } catch (error) {
      console.log(error)
    }
})
//退出登录
const fail = () => {
  let date = new Date();
  date.setTime(date.getTime() - 10000);
  //@ts-ignore
  document.cookie = 'cwBaseAdminToken' + "=a; expires=" + date.toGMTString();
  router.push({ name: 'cwBaseAdminLogin' })
}

</script>
<style lang="less" scoped>

</style>