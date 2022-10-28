<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span class="title">请求注册宠物基地的事项</span>
        <el-button class="button" text>Operation button</el-button>
      </div>
    </template>
    <div class="item">
      <div class="left">
        <div>
        注册账号：1212
      </div>
      <div>
        注册理由：撒大大的方式
      </div>
      </div>
      <div class="right">
        <el-button type="success" plain @click="agree('id')">同意</el-button>
      </div>
    </div>
    <div class="item">
      <div class="left">
        <div>
        注册账号：1212
      </div>
      <div class="intro">
        注册理由：撒大大的方式注册理由撒大大的方式注册理撒大大的方式注册理撒大大的方式注册理由撒大大的方式注册理撒大大的方式
      </div>
      </div>
      <div class="right">
        <el-button type="success" plain>同意</el-button>
      </div>
    </div>
  </el-card>
</template>
<script setup lang="ts">
import {reqAdminGetMessage,reqAgree  } from "@/api/index";
import { onMounted,reactive,computed } from "vue";
import {open2,open4} from '@/utils/message'
let Msg = reactive({
  registerMsg:[{phone:'',intro:''}]
})
onMounted(()=>{
  getNews()
})
const getNews = async()=>{
  try {
    let {data,status} = await reqAdminGetMessage()
    if(status==200){
      Msg.registerMsg = data;
      console.log(Msg.registerMsg)
    }
  } catch (error) {
    console.log(error)
  }
}
const agree = async (id:string)=>{
  if(id!==''){
    let form = {
      id:id
    }
    const {status} = await reqAgree(form)
    if(status==200){
      open2('操作成功')
      getNews()
    }
    else{
      open4('操作失败')
    }
  }
  
}
</script>
<style lang="less" scoped>
  .card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
  display: flex;
  height: 50px;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  border: 1px solid #465213;
  padding: 5px;
  border-radius: 5px;
  .left{
    margin-right: 15px;
  }
  .intro{
    overflow-y: scroll;
    height: 30px;
  }
}

.box-card {
  width: 680px;
  .title{
    font-size: 18px;
    color: #465213;
    font-weight: 700;
  }
}
</style>