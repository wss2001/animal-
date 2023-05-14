<template>
  <h2>我的消息</h2>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>Card name</span>
        <el-button class="button" text>Operation button</el-button>
      </div>
    </template>
    <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
  </el-card>
  <h2 style="cursor:pointer" class="change" @click="goChange">修改信息</h2>

</template>
<script setup lang="ts">
import {ref,reactive,onMounted} from 'vue'
import {reqGetMsgMoney} from '@/api/index'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()

let myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)cwBaseAdminToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
let result = reactive({
  cwArr:[{cwid:'',money:0,name:''}],
  msg:[{food:'',cwid:'',date:''}]
})
const goChange = ()=>{
  router.push({name:'changeBase'})
}
onMounted(async () => {
  if (document.cookie.includes(myCookie))
    try {
      const form ={
        baseid:myCookie
      }
      let msg = await reqGetMsgMoney(form)
      if(msg.status==200){
        result.msg = msg.data
      }
      
    } catch (error) {
      console.log(error)
    }
})

</script>
<style lang="less" scoped>
  .card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.change{
  margin-top: 10px;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 480px;
}
</style>