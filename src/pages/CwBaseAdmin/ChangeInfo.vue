<template>
  <el-form :model="form" label-width="120px">
    <el-form-item label="宠物基地名称">
      <el-input v-model="form.baseName" />
    </el-form-item>
    <el-form-item label="基地管理者">
      <el-input v-model="form.PeopleName" />
    </el-form-item>
    <el-form-item label="基地地址">
      <el-input v-model="form.address" />
    </el-form-item>
    <el-form-item label="基地封面照片">
      <el-upload class="avatar-uploader" action="http://127.0.0.1:5173/api/user/addjpg" :show-file-list="false"
        :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
        <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar" />
        <el-icon class="avatar-uploader-icon">
          <Plus />
        </el-icon>
      </el-upload>
    </el-form-item>
    <el-form-item label="基地简介">
      <el-input v-model="form.intro" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">{{ str }}</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { onMounted, ref, reactive } from "vue";
import { reqChangeInfo, reqGetCwBaseById } from '@/api/index'
import { ElMessage } from 'element-plus'
import { open2, open4 } from '@/utils/message'
import { formatDate } from '@/utils/index'
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'
const router = useRouter()
const route = useRoute()
let myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)cwBaseAdminToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");

const str = ref('修改')
onMounted(async () => {
  try {
    const res = await reqGetCwBaseById(myCookie)
    if(res.status==0){
      form.baseName = res.data.baseName
      form.PeopleName = res.data.PeopleName
      form.intro = res.data.intro
      form.address = res.data.address
      if(res.data.img!==''){
        form.imageUrl = res.data.img
      }
    }
  } catch (error) {
    
  }
  
})
const form = reactive({
  intro: '',
  imageUrl: '',
  baseName:'',
  PeopleName:'',
  address:''
})
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  let url = `http://127.0.0.1:3007/${response.data.path}`
  form.imageUrl = url
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}

const onSubmit = async () => {
  let newform = {
    intro: form.intro,
    img: form.imageUrl,
    id: myCookie,
    baseName:form.baseName,
    PeopleName:form.PeopleName,
    address:form.address
  }
  if (newform.PeopleName == '' || newform.intro == '' || newform.img == '' || newform.id == '') {
    open4('请输入完整内容')
    return
  }
    try {
      console.log(newform)
      let result = await reqChangeInfo(newform)
      if (result.status == 200) {
        open2('修改成功')
        form.PeopleName = ''
        form.baseName = ''
        form.intro = ''
        form.imageUrl = ''
        form.address = ''
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