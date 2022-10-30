<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span class="title">请求注册宠物基地的事项</span>
        <el-button class="button" text>Operation button</el-button>
      </div>
    </template>
    <div class="item" v-for="item in Msg.registerMsg">
      <div class="left">
        <div>
        注册账号：{{item.phone}}
      </div>
      <div>
        注册理由：{{item.intro}}
      </div>
      </div>
      <div class="right">
        <el-button type="danger" plain @click="refuse(item._id)">拒绝</el-button>
        <el-button type="success" plain @click="agree(item._id)">同意</el-button>
      </div>
    </div>
  </el-card>
</template>
<script setup lang="ts">
import {reqAdminGetMessage,reqAgree ,reqRefuse } from "@/api/index";
import { onMounted,reactive,computed } from "vue";
import {open2,open4} from '@/utils/message'
let Msg = reactive({
  registerMsg:[{phone:'',intro:'',_id:'',pass:""}]
})
onMounted(()=>{
  getNews()
})
const getNews = async()=>{
  try {
    let {data,status} = await reqAdminGetMessage()
    if(status==200){
      Msg.registerMsg = data;
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
    try {
      const {status} = await reqAgree(form)
    if(status==200){
      open2('操作成功')
      getNews()
    }
    else{
      open4('操作失败')
    }
    } catch (error) {
      open4('操作失败')
    }
    
  }
}
const refuse = async (id:string)=>{
  if(id!==''){
    let form = {
      id:id
    }
    try {
      const {status} = await reqRefuse(form)
    if(status==200){
      open2('操作成功')
      getNews()
    }
    else{
      open4('操作失败')
    }
    } catch (error) {
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
  .right{
    display: flex;
    flex-wrap: nowrap;
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