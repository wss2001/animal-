<template>
  <div class="find_header">
    <div class="find_left">
      <p>宠物救助安全中心</p>
    </div>
    <div class="find_right">
      <router-link to="/aboutme" class="line">反馈问题</router-link>
      <router-link to="/userlogin">登录</router-link>
    </div>
  </div>
  <div class="find_content">
    <h2>找回密码</h2>
    <p>请输入邮箱</p>
    <el-input v-model="email"/>
    <el-button type="primary" @click="nextFind">下一步</el-button>
    <span>使用邮箱找回密码</span>
  </div>

  <el-dialog
    v-model="dialogVisible"
    title="找回账号"
    width="30%"
    :before-close="handleClose"
  >
    <!-- <span>This is a message</span> -->
    验证码：<el-input v-model="checkCode"/>
    新密码：<el-input v-model="newPass"/>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submit">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { ref,reactive } from "vue";
import { useRoute,useRouter } from 'vue-router'
import { reqSendEmail,reqFindPass } from '@/api/index'
import { jiami } from '@/utils/index'


const route = useRoute()
const router = useRouter()
let email = ref('')
let newPass = ref('');
let checkCode = ref('')
const dialogVisible = ref(false)

const handleClose = () => {
  dialogVisible.value = false
}
const nextFind = async ()=>{
  try {
    const obj = {email:email.value}
    const res = await reqSendEmail(obj)
    if(res.status==200){
      dialogVisible.value = true
    }
    
  } catch (error) {
    console.log(error)
  }
}
const submit = async ()=>{
  try {
    const obj = {
    email:jiami(email.value),
    code:jiami(checkCode.value),
    newPass:jiami(newPass.value)
  }
  const res = await reqFindPass(obj)
  if(res.status==200){
    dialogVisible.value = false
  }
  } catch (error) {
    console.log(error)
  }
 
}
</script>
<style lang="less" scoped>
.find_header {
  padding: 10px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  flex-wrap: nowrap;
  background-color: rgb(43, 43, 197);
  color: white;

  .find_right {
    display: flex;
    flex-wrap: nowrap;
    a {
      display: block;
      color: white;
      font-size: 16px;
      text-decoration: none;
    }
    .line{
      border-right: 2px solid white;
      margin-right: 30px;
      padding-right: 30px;
    }
  }
}
.find_content{
  margin: 20px auto;
  width: 260px;
  height: 130px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.4);
  padding: 60px 80px;
  margin-bottom: 140px;
  h2{
    font-weight: normal;
    padding-left: 5px;
    border-left: 3px solid blue;
    margin-bottom: 20px;
  }
  p{
    color: #333;
    font-size: 15px;
    margin: 5px 5px 9px 0;
  }
  .el-input{
    margin-bottom: 15px;
  }
  .el-button{
    width: 100%;
    font-size: 16px;
    margin-bottom: 10px;
  }
  span{
    display: block;
    color:grey;
    font-weight: normal;
    text-align: center;
    &:hover{
      cursor: pointer;
    }
  }
}
</style>