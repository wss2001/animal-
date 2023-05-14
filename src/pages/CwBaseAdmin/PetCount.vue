<template>
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="宠物姓名">
      <el-input v-model="formInline.name" placeholder="宠物姓名" />
    </el-form-item>
    <el-form-item label="收养状态">
      <el-select v-model="formInline.state" placeholder="收养状态">
        <el-option label="已收养" :value="true" />
        <el-option label="未收养" :value="false" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">搜索</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="getCw">重置</el-button>
    </el-form-item>
  </el-form>
  <el-table :data="result.cwArr" height="250" style="width: 100%">
    <el-table-column prop="name" label="名字" width="180" />
    <el-table-column prop="intro" label="宠物介绍" width="180" />
    <el-table-column prop="alsoFood" label="剩余食物" width="180"/>
    <el-table-column prop="birth" label="收养时间" width="180"/>
    <el-table-column label="Operations" width="180">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.row._id)"
          >编辑</el-button
        >
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.row._id,scope.row.name)"
          >删除</el-button
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
import { reqGetCwBaseInfo,reqPostCwBaseInfo,reqCwAdminDeletePet,reqCwAdminEditPet } from '@/api/index'
import { onMounted,reactive,ref } from 'vue'
import { useRouter } from 'vue-router'
import { useSignOut } from '@/utils/hook'
import { ElMessageBox,ElMessage } from 'element-plus'
const formInline = reactive({
  name: '',
  state: '',
})
//查询
const onSubmit = async () => {
  try {
    const {data,status} = await reqPostCwBaseInfo(myCookie,formInline)
    if(status==0){
      ElMessage({
        message: '搜索成功',
        type: 'success',
      })
      result.cwArr = data
    }
  } catch (error) {
    ElMessage({
      message:'搜索失败',
      type: 'error',
    })
  }
  
}
const dialogVisible = ref(false)
const handleClose = (done: () => void) => {
  ElMessageBox.confirm('确定关闭这个窗口么')
    .then(() => {
      done()
    })
}
const router = useRouter()
//判断cookie决定是否登出
useSignOut('cwBaseAdminToken')
let myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)cwBaseAdminToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
let result = reactive({
  cwArr:[]
})
const getCw = async ()=>{
  try {
    let {data} = await reqGetCwBaseInfo(myCookie)
    result.cwArr = data
    formInline.name=''
    formInline.state=''
  } catch (error) {
    console.log(error)
  }
}
onMounted(async () => {
  if (document.cookie.includes(myCookie)){
    getCw()
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
  router.push({name:'addpet',query:{id,type:'edit'}})
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
    const {data,status} = await reqCwAdminDeletePet(form)
    dialogVisible.value = false
    if(status==200){
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