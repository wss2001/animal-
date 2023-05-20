<template>
  <h2>基地注册</h2>
  <div class="container">
    <div class="left">
      <el-form :model="form" label-width="180px">
        <el-form-item label="请输入手机号：">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="请输入密码：">
          <el-input v-model="form.pass" />
        </el-form-item>
        <el-form-item label="请输入基地用户名：">
          <el-input v-model="form.baseName" />
        </el-form-item>
        <el-form-item label="请简单描述下你的基地：">
          <el-input v-model="form.desc" type="textarea" />
        </el-form-item>
          <div class="anniu">
            <el-button type="danger" @click="onSubmit">注册</el-button>
          <el-button type="warning">取消</el-button>
          </div>
        
      </el-form>
    </div>
    <div class="right">
      <h2>注册事项</h2>
      <p><span>事项一：</span>根据《中华人民共和国动物防疫法》，规定设立从事动物诊疗活动的机构，应当向县级以上地方人民政府兽医主管部门申请动物诊疗许可证。国家实行执业兽医资格考试制度。具有兽医相关专业大学专科以上学历，经考试合格的，方可获得执业兽医资格证书。从事动物诊疗的，还应向当地县级以上地方人民政府兽医主管部门申请注册</p>
      <p><span>事项二：</span>注册宠物基地需要保持自己的初心以为了救助流浪宠物以及帮助那些善良的人们，让人们重归信任而创建，不可将捐献当成敛财的工具</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import { open2, open4 } from '@/utils/message'
import { reqRegisterCwAdmin } from '@/api/index'
// do not use same name with ref
const form = reactive({
  name: '',
  desc: '',
  pass:'',
  baseName:''
})

const onSubmit = async () => {
  if(form.name==''||form.desc==''){
    open4('请输入内容')
    return
  }
  const newform = {
    phone: form.name,
    intro: form.desc,
    pass:form.pass,
    baseName:form.baseName
  }
  try {
    const { data, status } = await reqRegisterCwAdmin(newform);
  if (status == 200) {
    open2('已经申请注册请注意查收信息')
    form.name=''
    form.pass=''
    form.desc=''
    form.baseName = ''
  } else {
    open4('注册失败')
  }
  } catch (error) {
    open4('注册失败')
    console.log(error)
  }
  
}
</script>
<style lang="less" scoped>
h2 {
    text-align: center;
    margin: 10px 0;
    font-size: 20px;
    color: #986239;
  }
.container {
  min-height: 500px;
  display: grid;
  grid-template-columns: 5fr 3fr;
  grid-gap: 15px;
  .left{
    
  }
  .right{
    border: 2px solid #986239;
    border-radius: 8px;
    h2{
      margin: 0;
      color: #d86856;
    }
    font-size: 16px;
    p{
      margin:5px 3px;
    }
    span{
      font-weight: 800;
      color: #d86856;
    }
  }

}
.anniu{
  margin-left: 170px;
  // width: 400px;
  display: flex;
  justify-content: space-between;
  .el-button{
    // margin-left: 30px;
    flex: 1;
  }
}
</style>