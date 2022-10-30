<template>
  <el-form :model="form" label-width="120px">
    <el-form-item label="宠物名字">
      <el-input v-model="form.name" />
    </el-form-item>
    <!-- <el-form-item label="Activity zone">
      <el-select v-model="form.region" placeholder="please select your zone">
        <el-option label="Zone one" value="shanghai" />
        <el-option label="Zone two" value="beijing" />
      </el-select>
    </el-form-item> -->
    <el-form-item label="日期">
      <el-col :span="15">
        <el-date-picker v-model="form.date1" type="date" placeholder="收养日期" style="width: 100%" />
      </el-col>
    </el-form-item>
    <el-form-item label="宠物照片">
      <el-upload class="avatar-uploader" action="http://127.0.0.1:5173/api/user/addjpg" :show-file-list="false"
        :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
        <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon">
          <Plus />
        </el-icon>
      </el-upload>
    </el-form-item>
    <el-form-item label="宠物简介">
      <el-input v-model="form.desc" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">新增宠物</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { onMounted, ref, reactive } from "vue";
import { reqCwAdminAddPet } from '@/api/index'
import { ElMessage } from 'element-plus'
import {open2,open4} from '@/utils/message'
import {formatDate} from '@/utils/index'
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'
const router = useRouter()

const form = reactive({
  name: '',
  region: '',
  date1: '',
  desc: '',
  imageUrl: ''
})
// const date = computed(()=>form.date1.slice(0,41))
// console.log(date.value)
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  let url = `http://127.0.0.1:3007/${response.data.path}`
  form.imageUrl = url
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  // if (rawFile.type !== 'image/jpeg') {
  //   ElMessage.error('Avatar picture must be JPG format!')
  //   return false
  // } 
  if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}
let myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)cwBaseAdminToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");

const onSubmit = async () => {
  // console.log(form)
  let date = formatDate(form.date1,true)
  let newform = {
    name: form.name,
    intro: form.desc,
    img: form.imageUrl,
    id: myCookie,
    birth:date
  }
  if(newform.name==''||newform.intro==''||newform.img==''||newform.id==''){
    open4('请输入完整内容')
    return
  }
  console.log(newform)
  try {
    let result = await reqCwAdminAddPet(newform)
    if (result.data.status == 200) {
      open2('新增成功')
      form.name = ''
      form.desc = ''
      form.imageUrl = ''
    } else {
      open4('新增失败')
    }
  } catch (error) {
    console.log(error)
  }
}

</script>
<style lang="less" scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
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