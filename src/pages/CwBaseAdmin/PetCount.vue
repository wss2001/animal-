<template>
  <el-table :data="result.cwArr" height="250" style="width: 100%">
    <el-table-column prop="name" label="名字" width="180" />
    <el-table-column prop="intro" label="宠物介绍" width="180" />
    <el-table-column prop="alsoFood" label="剩余食物" width="180"/>
    <el-table-column prop="birth" label="收养时间" width="180"/>
    <el-table-column label="Operations" width="180">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.row._id)"
          >Edit</el-button
        >
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.row._id,scope.row.name)"
          >Delete</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <el-dialog
    v-model="dialogVisible"
    title="Tips"
    width="30%"
    :before-close="handleClose"
  >
    <span>你确认将{{deletedName}}从你的宠物基地删除</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="sureDelete"
          >确认</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { reqGetCwBaseInfo,reqCwAdminDeletePet } from '@/api/index'
import { onMounted,reactive,ref } from 'vue'
import { useRouter } from 'vue-router'
import { useSignOut } from '@/utils/hook'
import { ElMessageBox,ElMessage } from 'element-plus'

const dialogVisible = ref(false)
const handleClose = (done: () => void) => {
  ElMessageBox.confirm('Are you sure to close this dialog?')
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}
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
const open2 = () => {
  ElMessage({
    message: '删除成功',
    type: 'success',
  })
}
const open4 = () => {
  ElMessage.error('删除失败')
}
const handleEdit = (id:string)=>{
console.log(id)
}
const deletedName = ref('')
const deletedId = ref('')
const handleDelete = (id:string,name:string)=>{
  dialogVisible.value = true
  deletedName.value = name
  deletedId.value = id
}
const sureDelete = async ()=>{
  let form ={
    cwId:deletedId.value,
    baseid:myCookie
  }
  try {
    const {data} = await reqCwAdminDeletePet(form)
    console.log(data)
    dialogVisible.value = false
    if(data.status==1){
    open2()
    }else{
      open4()
    }
    
  } catch (error) {
    console.log(error)
    dialogVisible.value = false
    open4()
  }
}

</script>
<style lang="less" scoped>

</style>