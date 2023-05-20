<template>
  <div class="login_container">

  
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
  </el-form>
  <div class="right">
    <h2>基地准则</h2>
    <p><span>事项一：</span>根据《中华人民共和国动物防疫法》，规定设立从事动物诊疗活动的机构，应当向县级以上地方人民政府兽医主管部门申请动物诊疗许可证。国家实行执业兽医资格考试制度。具有兽医相关专业大学专科以上学历，经考试合格的，方可获得执业兽医资格证书。从事动物诊疗的，还应向当地县级以上地方人民政府兽医主管部门申请注册</p>
      <p><span>事项二：</span>注册宠物基地需要保持自己的初心以为了救助流浪宠物以及帮助那些善良的人们，让人们重归信任而创建，不可将捐献当成敛财的工具</p>
  </div>
</div>

</template>
<script lang="ts" setup>
import { reactive, ref, onMounted, watch, inject } from 'vue'
import type { FormInstance } from 'element-plus'
import { useRouter } from 'vue-router';
// import { ElMessage } from 'element-plus'
import {open2,open4} from '@/utils/message'
import SIdentify from '@/components/Sidentify.vue';
import { reqCwAdminLogin } from '@/api/index'
import {jiami} from '@/utils/index'
const router = useRouter()

if (document.cookie.includes('cwBaseAdminToken')) {
  let myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)cwBaseAdminToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  router.push({ name: 'cwBaseAdmin', query: { id: myCookie } })
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
        open4('输入验证码错误')
        return
      }
      let form = {
        phoneNumber: ruleForm.pass,
        password: ruleForm.checkPass
      }
      try {
        let handleform = jiami(JSON.stringify(form))
      let result = await reqCwAdminLogin(handleform)
        router.push({ name: 'cwBaseAdmin', query: { id: result.data[0]._id } })
        if (result.status == 0) {
          open2('登陆成功')
        } else {
          open4('账号密码错误')
        }
      } catch (error) {
        console.log(error)
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
.login_container {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;

  .el-form {
    margin-left: -50px;

    .el-form-item {
      width: 600px;
    }
  }

  .el-form-item__label {
    color: white;
  }

  .right {
    margin-left: 50px;
    // background-color: pink;
    border: 2px solid #986239;
    border-radius: 8px;
    text-align: right;
    height: 400px;
    width: 400px;
    h2{
      margin: 0 auto;
      text-align: center;
      color: #d86856;
    }
    font-size: 16px;
    p{
      text-align: left;
      margin:5px 3px;
    }
    span{
      font-weight: 800;
      color: #d86856;
    }
  }
}
.zhuce {
  text-align: left;
}
</style>