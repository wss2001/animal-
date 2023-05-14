<template>
  <el-form :model="form" label-width="120px">
    <el-form-item label="宠物名字">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="日期">
      <el-col :span="15">
        <el-date-picker v-model="form.date1" type="date" placeholder="收养日期" style="width: 100%" />
      </el-col>
    </el-form-item>
    <el-form-item label="宠物照片">
      <el-upload class="avatar-uploader" action="http://127.0.0.1:5173/api/user/addjpg" :show-file-list="false"
        :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
        <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar" />
        <el-icon v-if="!form.imageUrl||type=='edit'" class="avatar-uploader-icon">
          <Plus />
        </el-icon>
      </el-upload>
    </el-form-item>
    <el-form-item label="宠物简介">
      <el-input v-model="form.desc" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">{{ str }}</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
  <el-form v-if="type=='edit'" label-width="120px">
    <el-form-item label="宠物照片">
      <el-upload class="avatar-uploader" action="http://127.0.0.1:5173/api/user/addjpg" :show-file-list="false"
        :on-success="handleImgAvatarSuccess" :before-upload="beforeAvatarUpload">
        <img v-if="newImageUrl" :src="newImageUrl" class="avatar" />
        <el-icon class="avatar-uploader-icon">
          <Plus />
        </el-icon>
      </el-upload>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleImg">新增图片</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { onMounted, ref, reactive } from "vue";
import { reqCwAdminAddImgPet,reqCwAdminAddPet, reqCwAdminEditPet,reqGetCwInfo,reqGetCwBaseById } from '@/api/index'
import { ElMessage } from 'element-plus'
import { open2, open4 } from '@/utils/message'
import { formatDate } from '@/utils/index'
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'
const router = useRouter()
const route = useRoute()
const type = route.query.type
const cwid = route.query.id||''
const str = ref('新增宠物')
const newImageUrl = ref('')
const handleImg = async ()=>{
  if(newImageUrl.value!==''){
    const {status,data} = await reqCwAdminAddImgPet({id:cwid,imgUrl:newImageUrl.value})
    if(status==200){
      open2('添加图片成功')
    }
  }
}
let myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)cwBaseAdminToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");

onMounted(async () => {
  const res = await reqGetCwBaseById(myCookie)
  form.baseName = res.data.baseName
  if (type == 'edit') {
    str.value = '修改宠物'
    const {data} = await reqGetCwInfo(cwid)
    form.name=data.name
    form.desc=data.intro
    form.imageUrl=data.img
    form.date1=data.birth
  }
})
const form = reactive({
  name: '',
  region: '',
  date1: '',
  desc: '',
  imageUrl: '',
  baseName:''
})
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  let url = `http://127.0.0.1:3007/${response.data.path}`
  form.imageUrl = url
}
const handleImgAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  let url = `http://127.0.0.1:3007/${response.data.path}`
  newImageUrl.value = url
}


const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}

const onSubmit = async () => {
  // console.log(form)
  let date = formatDate(form.date1, true)
  let newform = {
    name: form.name,
    intro: form.desc,
    img: form.imageUrl,
    id: myCookie,
    birth: date
  }
  if (newform.name == '' || newform.intro == '' || newform.img == '' || newform.id == '') {
    open4('请输入完整内容')
    return
  }
  if (type == 'edit') {
    newform.id = cwid
    console.log(newform)
    try {
      let result = await reqCwAdminEditPet(newform)
      if (result.status == 200) {
        open2('修改成功')
        form.name = ''
        form.desc = ''
        form.imageUrl = ''
      } else {
        open4('修改失败')
      }
    } catch (error) {
      console.log(error)
    }
  } else {
    try {
      console.log(newform)
      newform.baseName = form.baseName
      let result = await reqCwAdminAddPet(newform)
      if (result.status == 200) {
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