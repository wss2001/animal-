<template>
  <el-dropdown>
    <span>
      <el-avatar :src="result.userInfo.img" :size="80" />
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="changetx">修改头像</el-dropdown-item>
        <el-dropdown-item>
          <el-button type="danger" @click="fail" plain>退出</el-button>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <el-upload v-if="isShow" class="avatar-uploader" action="http://127.0.0.1:5173/api/user/addjpg"
    :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon">
      <Plus />
    </el-icon>
  </el-upload>
  <div class="mianban">
  <el-collapse accordion>
  <el-collapse-item title="消息" name="2">
    <div class="item" v-for="msg in result.msg">
      {{msg.content}}
      <p>--{{msg.fname}}</p>--{{msg.date}}
    </div>
    <div class="item" v-for="zzmsg in result.zzMsg">
      转让宠物:{{zzmsg.cwName}}
      <p>--转让人:{{zzmsg.fname}}</p>--{{zzmsg.date}}
    </div>
  </el-collapse-item>
</el-collapse>
</div>
<div class="haoyouzhuanzeng">
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>转让消息</span>
        <!-- <el-button class="button" text>Operation button</el-button> -->
      </div>
    </template>
    <div class="text item" v-for="item in result.zzMsg">
      <div class="left">
        <div>
        转让人：{{item.fname}}
      </div>
      <div>
        转让宠物：{{item.cwName}}
      </div>
      </div>
      <div class="right" v-if="!item.issure">
        <el-button type="danger" plain @click="refuse(item._id,item.fid,item.cwid)">拒绝</el-button>
        <el-button type="success" plain @click="agree(item._id,item.fid,item.cwid)">同意</el-button>
      </div>
      <div class="right" v-if="item.issure">
        <el-button class="already">已处理{{item.yes?'收养':'拒绝'}}</el-button>
      </div>
    </div>
  </el-card>
</div>
<div class="haoyouzhuanzeng">
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>需要投喂的动物</span>
      </div>
    </template>
    <div class="text item" v-for="item in result.notFoodCwArr">
      <div class="left">
      <div class="notfood">
        待喂养宠物：{{item.name}}
      </div>
      </div>
      <div class="right">
        <el-button type="success" plain @click="touwei(item._id)">投喂</el-button>
      </div>
    </div>
  </el-card>
</div>
<div class="change">
  <h2>修改个人信息</h2>
  <div class="change_zhuti">
    <el-descriptions  :column="3" border>
    <el-descriptions-item
      label="用户名"
      label-align="right"
      align="center"
      label-class-name="my-label"
      class-name="my-content"
      width="150px"
      >{{result.userInfo.username}}</el-descriptions-item
    >
    <el-descriptions-item label="账号" label-align="right" align="center"
      >{{result.userInfo.phoneNumber}}</el-descriptions-item
    >
    <el-descriptions-item label="性别" label-align="right" align="center">
      <el-tag size="small">{{result.userInfo.sex}}</el-tag>
    </el-descriptions-item>
    <el-descriptions-item label="简介" label-align="right" align="center"
      >{{result.userInfo.desc}}</el-descriptions-item>
      <el-descriptions-item label-align="right" align="center" 
      ><span @click="dialogVisible = true" class="changepass">修改账号密码</span></el-descriptions-item>
      <el-descriptions-item label-align="right" align="center"
      >修改基本信息</el-descriptions-item>
  </el-descriptions>
  </div>
</div>

<el-dialog
    v-model="dialogVisible"
    title="找回账号"
    width="30%"
    :before-close="handleClose"
  >
    <el-input v-model="result.passForm.oldpass" placeholder="old pass"/>
    <el-input v-model="result.passForm.newpass" placeholder="new pass"/>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="changePass">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reqGetUserInfo,reqChangePass, reqUploadtx,reqGetUserMsg,reqGetFriendShare,reqGetUserCwInfo,reqPay,reqUpdateFood } from '@/api/index'
import { onMounted, ref, reactive, nextTick,computed } from "vue";
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'
import {reqAgreeZZ ,reqRefuseZZ } from "@/api/index";
import {open2,open4} from '@/utils/message'
import {jiami} from '@/utils/index'
const router = useRouter()
let myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)userToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
let result = reactive({
  userInfo: { img: '' ,username:'',phoneNumber:'',sex:'',desc:''},
  msg:[{content:'',fname:'',date:'',state:''}],
  zzMsg:[{fname:'',date:'',fid:'',_id:'',cwName:'',cwid:'',issure:false,yes:false}],
  passForm:{oldpass:'',newpass:''},
  notFoodCwArr:[{_id:'',name:''}]
})
//退出登录
const fail = () => {
  let date = new Date();
  date.setTime(date.getTime() - 10000);
  //@ts-ignore
  document.cookie = 'userToken' + "=a; expires=" + date.toGMTString();
  localStorage.removeItem('IsUserLogin')
  router.push({ name: 'userLogin' })
}
//获取用户信息
const getUser = async()=>{
//检查登陆状态
if (!document.cookie.includes('userToken')) {
    router.push({ name: 'userLogin' })
    console.log('时间过久退出登陆状态')
  } else {
    try {
      let {data} = await reqGetUserInfo(myCookie)
      result.userInfo = data[0]
    } catch (error) {
      console.log(error)
    }
  }
}
onMounted(async () => {
  getUser()
})
//获取评论信息
onMounted(async()=>{
  //检查登陆状态
  if (!document.cookie.includes('userToken')) {
    router.push({ name: 'userLogin' })
    console.log('时间过久退出登陆状态')
  } else {
    try {
      let {data,status} = await reqGetUserMsg(myCookie)
      if(status==200){
        result.msg = data
      }
    } catch (error) {
      console.log(error)
    }
  }
})
//获取转增信息
const getZZ = async ()=>{
//检查登陆状态
if (!document.cookie.includes('userToken')) {
    router.push({ name: 'userLogin' })
    localStorage.removeItem('IsUserLogin')
    console.log('时间过久退出登陆状态')
  } else {
    try {
      let {data,status} = await reqGetFriendShare(myCookie)
      if(status==200){
        result.zzMsg = data
      }
    } catch (error) {
      console.log(error)
    }
  }
}
onMounted(async()=>{
  getZZ()
})
// 获取宠物信息来决定是否进行展示以投喂
const handleGetCw = async () => {
  let {data,status} = await reqGetUserCwInfo(myCookie)
  if(status==200){
    let arr = [] 
    for(let i = 0;i<data.length;i++){
      if(data[i].alsoFoodtian==0 ||data[i].alsoFoodtian==1 ){
        arr.push(data[i])
      }
    }
    result.notFoodCwArr = arr
  }
}
onMounted(async () => {
  handleGetCw()
})
const touwei = async (cwid:string) =>{
  if(cwid==''){
    return
  }
  const obj = {
    state: 'tw',
    cwid,
    food: '7',
    userid: myCookie
  }
  let { data, status } = await reqPay(obj)
  if (status == 200) {
    window.open(data)
  }
  console.log('===')
  await reqUpdateFood(cwid)
}

const isShow = ref(false)
const changetx = () => {
  isShow.value = !isShow.value
}
const imageUrl = ref('')
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  isShow.value = false
  let url = `http://127.0.0.1:3007/${response.data.path}`
  imageUrl.value = url
  result.userInfo.img = url
  reqUploadtx(myCookie, url)
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  // if (rawFile.type !== 'image/jpeg') {
  //   ElMessage.error('Avatar picture must be JPG format!')
  //   return false
  // } 
  if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('头像过大超过2MB!')
    return false
  }
  return true
}
const agree = async (id:string,fid:string,cwid:string)=>{
  if(id!==''){
    let form = {
      _id:id,
      myid:myCookie,
      userid:fid,
      cwid
    }
    try {
      const {status} = await reqAgreeZZ(jiami(form))
      console.log(status)
    if(status==200){
      open2('操作成功')
    }
    else{
      open4('操作失败')
    }
    } catch (error) {
      open4('操作失败')
    }
    
  }
}
const refuse = async (id:string,fid:string,cwid:string)=>{
  if(id!==''){
    let form = {
      _id:id,
      myid:myCookie,
      userid:fid,
      cwid
    }
    try {
      const {status} = await reqRefuseZZ(form)
    if(status==200){
      open2('操作成功')
    }
    else{
      open4('操作失败')
    }
    } catch (error) {
      open4('操作失败')
    }
  }
}

const dialogVisible = ref(false)
const handleClose = () => {
  dialogVisible.value = false
}
const changePass = async ()=>{
  if(result.passForm.oldpass==''||result.passForm.newpass==''){
    return
  }
  const form = {
    id:myCookie,
    oldpass:result.passForm.oldpass,
    newpass:result.passForm.newpass
  }
  try {
    const {status} = await reqChangePass(jiami(JSON.stringify(form)));
  if(status==200){
    open2('修改成功')
    handleClose()
    return
  }
  if(status==403){
    handleClose()
    open4('密码错误')
    return
  }else{
    open4('修改失败')
    handleClose()
    return
  }
  } catch (error) {
    console.log(error)
  }
  
}

</script>
<style lang="less" scoped>
.dialog-footer{
  float: none;
}
.notfood{
  font-size: 18px;
}
.haoyouzhuanzeng{
  margin: 20px 0;
  margin-bottom: 0;
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
    .already{
      border: none;
      &:hover{
        cursor: none;
      }
    }
  }
  .intro{
    overflow-y: scroll;
    height: 30px;
  }
}
}
.change{
  margin-top: 50px;
  h2{
    font-size: 18px;
    color: #496421;
  }
}
.changepass{
  &:hover{
    cursor: pointer;
  }
}
  .mianban{
    position: absolute;
    top: 30px;
    right:60px;
    .el-collapse{
      --el-collapse-header-bg-color:#f3f0e9;
      --el-collapse-content-bg-color:#f3f0e9;
    }
    .el-collapse-item__wrap{
      width: 300px;
    }
    .item{
      border-radius: 5px;
      border:1px solid black;
      margin-bottom: 2px;
      padding-left: 20px;
      padding-right: 20px;
      // height: 100px;
      width: auto;
      max-width: 200px;
    }
  }
span {
  float: left;
}
.my-label {
  background: var(--el-color-success-light-9);
}
.my-content {
  background: var(--el-color-danger-light-9);
}
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}

.avatar-uploader .avatar {
  width: 30px;
  height: 30px;
  display: block;
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 30px;
  height: 30px;
  text-align: center;
}
</style>