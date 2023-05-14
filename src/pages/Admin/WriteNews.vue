<template>
  <div class="container">
    <h2>新增新闻</h2>
    <div class="content">
      <el-form :model="form" label-width="60px">
    <el-form-item label="标题">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="类型">
      <el-select v-model="form.region" placeholder="请选择类型">
        <el-option label="宠物热点" value="rd" />
        <el-option label="宠物必学" value="bx" />
        <el-option label="宠物救助" value="jz" />
      </el-select>
    </el-form-item>
    <!-- <el-form-item label="类型">
      <el-radio-group v-model="form.resource">
        <el-radio label="Sponsor" />
        <el-radio label="Venue" />
      </el-radio-group>
    -->
    <el-form-item label="图片上传">
      
      <el-upload
    class="avatar-uploader"
    action="http://127.0.0.1:5173/api/user/addjpg"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
  </el-upload>
</el-form-item>
    <el-form-item label="正文内容">
      <el-input v-model="form.desc" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">生成</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive,ref } from 'vue'
import {reqAddNews} from '@/api/index'
import { open2, open4 } from '@/utils/message';
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'
import { ElMessage } from 'element-plus'
const form = reactive({
  name: '',
  region: '',
  desc: '',
})

const onSubmit = async() => {
  if(form.name==''||form.desc==''||form.region==''){
    open4('请输入内容')
    return 
  }
  let newform = {
    title:form.name,
    state:form.region,
    content:form.desc,
    img:imageUrl.value
  }
  try {
    const {status} = await reqAddNews(newform)
    if(status==200){
      open2('新增成功')
      form.desc='';
      form.name='';
      form.region='',
      imageUrl.value=''
    }
  } catch (error) {
    open4('新增失败')
    console.log(error)
  }
}
const imageUrl = ref('')
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  // imageUrl.value = URL.createObjectURL(uploadFile.raw!)
  let url = `http://127.0.0.1:3007/${response.data.path}`
  imageUrl.value = url
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.size / 1024 / 1024 > 4) {
    ElMessage.error('Avatar picture size can not exceed 4MB!')
    return false
  }
  return true
}
</script>
<style lang="less" scoped>
  h2{
    font-size: 20px;
    color: #444;
    margin-bottom: 10px;
  }
  .content{
    width: 800px;
    border: 2px solid #444;
    border-radius: 5px;
    padding: 10px 20px;
  }
  @media only screen and (min-width:0px) and (max-width:900px){
    .content{
    width: 600px;
    border: 2px solid #444;
    border-radius: 5px;
    padding: 10px 20px;
  }
}
  .el-textarea__inner{
    width: 80%;
    height: 400px;
  }
  .avatar-uploader .avatar {
  width: 100px;
  height: 100px;
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
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>