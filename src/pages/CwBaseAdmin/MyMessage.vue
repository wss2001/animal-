<template>
  <h2 style="cursor:pointer;color:orange" class="change" @click="goChange">修改信息</h2>
  <h2>我的消息</h2>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>喂养消息</span>
      </div>
    </template>
    <div v-for="item in result.msg" :key="item._id" class="text item">{{ item.date }}有人给<span style="color:orange">{{cwidToName(item.cwid)}}</span>捐献了{{ item.food }}元</div>
  </el-card>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>留言消息</span>
      </div>
    </template>
    <div v-for="item in result.comment" :key="item._id" class="text item">{{ item.name }}评论了--{{ item.content }}</div>
  </el-card>

</template>
<script setup lang="ts">
import {ref,reactive,onMounted} from 'vue'
import {reqGetMsgMoney,reqGetComment,reqGetCwBaseInfo} from '@/api/index'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()

let myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)cwBaseAdminToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
let result = reactive({
  cwArr:[{cwid:'',money:0,name:''}],
  msg:[{food:'',cwid:'',date:''}],
  comment:[{_id:'',name:'',content:''}],
  baseCwArr:[]
})
onMounted(async () => {
  const {data,status} = await reqGetCwBaseInfo(myCookie)
  if(status==0){
    result.baseCwArr = data
  }
})
const cwidToName = (cwid:string)=>{
  let res = result.baseCwArr.filter(item=>item._id==cwid)
  let name = res[0]?.name||''
  return name
}
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
      const comment = await reqGetComment(myCookie)
      if(msg.status==200){
        result.msg = msg.data
      }
      if(comment.status==0){
        result.comment = comment.data
      }
      
    } catch (error) {
      console.log(error)
    }
})
const cwFilter = (id:string)=>{
  
}
</script>
<style lang="less" scoped>
.el-card{
  height: 350px;
  overflow: scroll;
}
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