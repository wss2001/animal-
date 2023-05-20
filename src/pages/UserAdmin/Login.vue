<template>
  <div class="login_container">
    <div class="right">
      
    </div>
    <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px" class="demo-ruleForm">
        <div class="head">
          <div><el-icon size="50px"><User /></el-icon></div>
          <h2>登录</h2>
        </div>
      <el-form-item label="账号" prop="pass">
        <el-input v-model="ruleForm.pass" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="checkPass">
        <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="验证码" prop="age">
        <el-input v-model="shuruyanzhengma" />
        <div @click="refreshCode" class="yanzhengma">
          <SIdentify :identifyCode="identifyCode" @clickChild="clickChild" />
        </div>
      </el-form-item>
      <el-form-item>
        <div class="anniu">
          <el-button type="danger" @click="submitForm(ruleFormRef)">登录</el-button>
          <el-button type="warning" @click="resetForm(ruleFormRef)">重置</el-button>
        </div>
      </el-form-item>
      <el-form-item>
        <div class="zhuce">
          <el-button @click="findPass" type="" link>找回密码</el-button>
          <el-button @click="router.push({name:'userRegister'})" type="" link>注册</el-button>
        </div>
      </el-form-item>
    </el-form>

  </div>


  <!-- <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <p>账号密码输入错误请重新输入</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="FindPass">找回密码</el-button>
      </span>
    </el-dialog> -->

</template>
<script lang="ts" setup>
import { reactive, ref, onMounted, watch } from 'vue'
import type { FormInstance } from 'element-plus'
import { useRouter } from 'vue-router';
import SIdentify from '@/components/Sidentify.vue';
import { reqUserLogin } from '@/api/index'
import { jiami } from '@/utils/index'
import { open2, open4 } from "@/utils/message";
const router = useRouter()
if (document.cookie.includes('userToken')) {
  let myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)userToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  router.push({ name: 'user', query: { _id: myCookie } })
}
// 图形验证码
let identifyCodes = "1234567890"
let identifyCode = ref('3212')
const randomNum = (min: any, max: any) => {
  return Math.floor(Math.random() * (max - min) + min)
}
const makeCode = (o: any, l: any) => {
  for (let i = 0; i < l; i++) {
    identifyCode.value += o[
      randomNum(0, o.length)
    ];
  }
}
const refreshCode = () => {
  identifyCode.value = "";
  makeCode(identifyCodes, 4);
}
onMounted(() => {
  identifyCode.value = "";
  makeCode(identifyCodes, 4);
})
// watch(identifyCode,(newvalue,oldvalue)=>{
//   console.error(identifyCode.value,newvalue)
// })

const ruleFormRef = ref<FormInstance>()
let yanzhengma = ref('')
let shuruyanzhengma = ref('')
const clickChild = (e: any) => {
  yanzhengma.value = e
}
const checkAge = (rule: any, value: any, callback: any) => {
  if (shuruyanzhengma.value == '') {
    return callback(new Error('请输入验证码'))
  }
  if (yanzhengma.value !== shuruyanzhengma.value) {
    open4('输入验证码错误')
    return callback(new Error('输入验证码错误'))
  } else {
    callback()
  }
}

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入账号'))
  } else {
    if (ruleForm.checkPass !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('checkPass', () => null)
    }
    callback()
  }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    callback()
  }
}

const ruleForm = reactive({
  pass: '',
  checkPass: '',
})

const rules = reactive({
  pass: [{ validator: validatePass, trigger: 'blur' }],
  checkPass: [{ validator: validatePass2, trigger: 'blur' }],
  age: [{ validator: checkAge, trigger: 'blur' }],
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {

      if (yanzhengma.value !== shuruyanzhengma.value) {
        return
      }
      let form = {
        phoneNumber: jiami(ruleForm.pass),
        password: jiami(ruleForm.checkPass)
      }
      let result = await reqUserLogin(form)
      if (result.status == 0) {
        open2('登录成功')
        //@ts-ignore
        localStorage.setItem("userToken",result.token)
        localStorage.setItem("IsUserLogin",'yes')
        router.push({ name: 'user', query: { id: result.data[0]._id } })
      } else {
        open4('账号密码错误')
      }
    } else {
      refreshCode()
      return false
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
const findPass = ()=>{
  router.push({name:'findPass'})
}
</script>
<style lang="less" scoped>
.anniu {
  text-align: left;
  width: 100%;
  display: flex;
  flex-wrap: nowrap;

  .el-button {
    flex: 1;
  }
}
</style>
<style lang="less" scoped>
.login_container {
  padding: 50px 0;
  width: 100%;
  height: 400px;
  position: relative;
  // left: -42px;
  // background: url('https://www.liulangla.cn/public/static/index/login-bg.jpg');
  display: flex;
  flex-wrap: nowrap;
  align-items: center;

  .el-form {
    // margin-left: -50px;

    .el-form-item {
      width: 600px;
    }
  }

  .el-form-item__label {
    color: white;
  }

  .right {
    width: 700px;
    height: 400px;
    background-image: url(https://picsum.photos/700/400);
    background-repeat: no-repeat;
    background-color: #fafafa;
    background-size: cover;
    background-position: center;
  }
  .zhuce{
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .head{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    h2{
      font-size: 24px;
      margin: 0 auto;
      // text-align: center;
      word-wrap: break-word;
      font-style: normal;
      color: #E9A400;
      margin-bottom: 30px;
    }
    div{
      background-color: purple;
      border-radius: 50%;
      width:50px;
      margin: 0 auto;
    }
  }
  
}
</style>