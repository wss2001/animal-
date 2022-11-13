<template>
  <div class="login_container">
  <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px" class="demo-ruleForm">
    <el-form-item label="账号" prop="phone">
      <el-input v-model="ruleForm.phone" type="text" autocomplete="off" />
    </el-form-item>
    <el-form-item label="密码" prop="pass">
      <el-input v-model="ruleForm.pass" type="text" autocomplete="off" />
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPass">
      <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" />
    </el-form-item>
    <el-form-item>
      <el-checkbox v-model="radio"
        ><span @click="goread">阅读须知</span></el-checkbox
      >
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">注册</el-button>
      <el-button @click="resetForm(ruleFormRef)">重置</el-button>
    </el-form-item>
  </el-form>
  <div class="right">
    <h2>已有帐号？点击登录</h2>
    <p></p>
    <button @click="router.push({name:'userLogin'})">点击登录</button>
  </div>
</div>
  <el-dialog v-model="centerDialogVisible" title="用户名" width="30%" center>
    <el-input v-model="name"/>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="changeName">换名字</el-button>
        <el-button type="primary" @click="register">确认</el-button>
      </span>
    </template>
  </el-dialog>

</template>
<script lang="ts" setup>
import { reactive, ref, onMounted, watch } from 'vue'
import type { FormInstance } from 'element-plus'
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus'
import { reqUserRegister } from '@/api/index'
import { jiami } from '@/utils/index'
import { createRandomChinese, RandomNumBoth } from '@/utils/index'
const router = useRouter()
//确认须知
const radio = ref(false)
const goread = () => {
  router.push({ name: 'read' })
}
const open2 = () => {
  ElMessage({
    message: '注册成功请输入用户名',
    type: 'success',
  })
}
const open4 = () => {
  ElMessage.error('请确认协议')
}
const open3 = () => {
  ElMessage.error('输入验证码错误')
}
const ruleFormRef = ref<FormInstance>()
let yanzhengma = ref('')
let shuruyanzhengma = ref('')

const checkAge = (rule: any, value: any, callback: any) => {
  if (shuruyanzhengma.value == '') {
    return callback(new Error('请输入验证码'))
  }
  if (yanzhengma.value !== shuruyanzhengma.value) {
    open3()
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
  } else if (value !== ruleForm.pass) {
    callback(new Error("输入密码不正确"))
  } else {
    callback()
  }
}
const checkphone = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('输入手机号不能为空'))
  } else {
    callback()
  }
}

const ruleForm = reactive({
  pass: '',
  checkPass: '',
  phone: ''
})

const rules = reactive({
  pass: [{ validator: validatePass, trigger: 'blur' }],
  checkPass: [{ validator: validatePass2, trigger: 'blur' }],
  age: [{ validator: checkAge, trigger: 'blur' }],
  phone: [{ validator: checkphone, trigger: 'blur' }]
})
const centerDialogVisible = ref(false)
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      if (!radio.value) {
        open4()
        return
      } else {
        open2()
        centerDialogVisible.value = true
      }
    } else {
      // refreshCode()
      return false
    }
  })
}

//生成随机名字
let name = ref('123')
const changeName = () => {
  let a = RandomNumBoth(2, 5)
  let result = createRandomChinese(a)
  name.value = result
}
onMounted(() => {
  changeName()
})
const register = async () => {
  let form = {
    phoneNumber: jiami(ruleForm.phone),
    pass: jiami(ruleForm.checkPass),
    username: jiami(name.value)
  }
  centerDialogVisible.value = false
  try {
    let result = await reqUserRegister(form)
    if (result.status == 0) {
      router.push({ name: 'user', query: { id: result.data.insertedIds[0] } })
    }
  } catch (error) {
    console.log(error)
  }
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>
<style lang="less" scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
.login_container {
  // padding: 50px 0;
  // width: 100vw;
  // height: 400px;
  // position: relative;
  // left: -42px;
  // background: url('https://www.liulangla.cn/public/static/index/login-bg.jpg');
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
    text-align: right;
    height: 400px;
    width: 400px;
    h2{
      margin: 50px 0;
      color: rgb(74, 74, 211);
      font-size: 20px;
    }
    button{
      width: 200px;
      height: 50px;
      font-size: 20px;
      border: 1px solid black;
      background-color: green;
      color: white;
    }
  }

}
@media only screen and (min-width:0px) and (max-width:900px){
  .right{
    text-align: center;
  }
}
.zhuce {
  text-align: left;
}
</style>