<template>
  <el-dropdown>
    <span>
      <el-avatar :src="result.userInfo.img" :size="80" />
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="changetx">修改头像</el-dropdown-item>
        <el-dropdown-item>
          <el-button type="danger" @click="fail" plain>退出</el-button>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <el-upload v-if="isShow" class="avatar-uploader" action="http://127.0.0.1:5173/api/user/addjpg"
    :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon">
      <Plus />
    </el-icon>
  </el-upload>
  <div class="mianban">
  <el-collapse accordion>
  <el-collapse-item title="消息" name="2">
    <div class="item" v-for="msg in result.userInfo.msg">
      {{msg.content}}
      <p>--{{msg.fname}}</p>
    </div>
  </el-collapse-item>
</el-collapse>
</div>
</template>

<script lang="ts" setup>
import { reqGetUserInfo, reqUploadtx } from '@/api/index'
import { onMounted, ref, reactive, nextTick } from "vue";
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'
const router = useRouter()
let myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)userToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
let result = reactive({
  userInfo: { img: '',msg:[{fname:'',content:''}] }
})
//退出登录
const fail = () => {
  let date = new Date();
  date.setTime(date.getTime() - 10000);
  //@ts-ignore
  document.cookie = 'userToken' + "=a; expires=" + date.toGMTString();
  router.push({ name: 'userLogin' })
  // console.log(document.cookie);
}
onMounted(async () => {
  //检查登陆状态
  if (!document.cookie.includes('userToken')) {
    router.push({ name: 'userLogin' })
    console.log('时间过久退出登陆状态')
  } else {
    try {
      let k = await reqGetUserInfo(myCookie)
      result.userInfo = k.data[0]
    } catch (error) {
      console.log(error)
    }
  }
})
const isShow = ref(false)
const changetx = () => {
  isShow.value = !isShow.value
}
const imageUrl = ref('')
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  isShow.value = false
  let url = `http://127.0.0.1:3007/${response.data.path}`
  imageUrl.value = url
  result.userInfo.img = url
  reqUploadtx(myCookie, url)
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  // if (rawFile.type !== 'image/jpeg') {
  //   ElMessage.error('Avatar picture must be JPG format!')
  //   return false
  // } 
  if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('头像过大超过2MB!')
    return false
  }
  return true
}

</script>
<style lang="less" scoped>
  .mianban{
    position: absolute;
    top: 30px;
    right:60px;
    .el-collapse{
      --el-collapse-header-bg-color:#f3f0e9;
      --el-collapse-content-bg-color:#f3f0e9;
    }
    .el-collapse-item__wrap{
      width: 300px;
    }
    .item{
      border-radius: 5px;
      border:1px solid black;
      margin-bottom: 2px;
      padding-left: 20px;
      padding-right: 20px;
      // height: 100px;
      width: auto;
      max-width: 200px;
    }
  }
span {
  float: left;
}

.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}

.avatar-uploader .avatar {
  width: 30px;
  height: 30px;
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
  width: 30px;
  height: 30px;
  text-align: center;
}
</style>