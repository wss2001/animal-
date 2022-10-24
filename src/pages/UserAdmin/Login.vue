<template>
  <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px" class="demo-ruleForm">
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
      <el-button type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
      <el-button @click="resetForm(ruleFormRef)">重置</el-button>

    </el-form-item>
    <el-form-item>
      <div class="zhuce">
        <el-button type="" link>注册</el-button>
        <el-button type="" link>找回密码</el-button>
      </div>
    </el-form-item>
  </el-form>

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
import {jiami} from '@/utils/index'
import { open2,open4 } from "@/utils/message";
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
    callback(new Error('Please input the password'))
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
    callback(new Error('Please input the password again'))
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
        phoneNumber: ruleForm.pass,
        password: ruleForm.checkPass
      }
      let handleform = jiami(JSON.stringify(form))
      let result = await reqUserLogin(handleform)
      if (result.status == 0) {
        open2('登录成功')
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
</script>
<style lang="less" scoped>
// .yanzhengma{
//   margin-top: 20px;
// }
.zhuce {
  text-align: left;
}
</style>