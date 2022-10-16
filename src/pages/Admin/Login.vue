<template>
  <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px" class="demo-ruleForm">
    <el-form-item label="账号" prop="pass">
      <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
    </el-form-item>
    <el-form-item label="密码" prop="checkPass">
      <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
      <el-button @click="resetForm(ruleFormRef)">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormInstance } from 'element-plus'
import {reqAdminLogin} from '@/api/index'
const router = useRouter()
const ruleFormRef = ref<FormInstance>()
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
})
const open4 = () => {
  ElMessage.error('账号密码错误')
}

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      let form = {
        user:ruleForm.pass,
        pass:ruleForm.checkPass
      }
      let result = await reqAdminLogin(form)
      console.log(result)
      if(result.status==0){
        router.push({name:'admin'})
      }else{
        console.log('登陆失败')
        open4()
      }
    } else {
      console.log('登陆失败!')
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

</style>