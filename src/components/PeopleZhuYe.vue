<template>
  <div class="container">
    <div class="message">
      <el-dropdown>
        <span>
          <el-avatar :src="result.userInfo.img" :size="80" />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="dialogVisible=true">添加好友</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <div class="username">{{result.userInfo.username}}-----</div>
      <div class="username">
        <span>简介:{{result.userInfo.desc}}，</span>
        <span>性别:{{result.userInfo.sex}}</span>
      </div>
    </div>
    <h2>已经收养的宠物</h2>
    <div class="cw">
      <div class="swipar" v-for="cw in result.cwArr">
          <el-popover placement="top-start" :title="cw.name" :width="200" trigger="hover"
            :content="cw.intro">
            <template #reference>
              <el-carousel height="150px">
                <el-carousel-item v-for="img in cw.imgArr" :key="img">
                  <el-image style="width: 100%; height: 150px" :src="img" fit="cover" />
                </el-carousel-item>
              </el-carousel>
            </template>
          </el-popover>
          <el-button class="zrbtn" type="info" @click="goPet(cw._id)">查看宠物{{cw.name}}</el-button>
        </div>
    </div>
    <div class="comment">
      <el-form>
        <p class="liuyan">留言</p>
        <el-form-item prop="desc">
          <el-input v-model="content" type="textarea" />
        </el-form-item>
        <el-form-item>
          <el-button type="plain" @click="submit">评论</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
  <el-dialog
    v-model="dialogVisible"
    title="添加好友信息"
    width="30%"
    :before-close="handleClose"
  >
  <el-form>
        <el-form-item prop="desc">
          <el-input v-model="addFriendDesc" type="textarea" />
        </el-form-item>
      </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addFriend">
          发送
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { deCode } from '@/utils/index'
import { open2, open4 } from '@/utils/message'
import { ElMessageBox } from 'element-plus'
import { reqGetUserInfo, reqGetUserCwInfo, reqLeaveMessage, reqAddFriend } from '@/api/index'
let route = useRoute()
let myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)userToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
let jiamiid = route.query.id as string
let id = deCode(jiamiid) as string
let result = reactive({
  userInfo: { img: '', msg: [] ,username:""},
  cwArr: [{intro:'',name:'',imgArr:'',_id:''}]
})
onMounted(async () => {
  try {
    if (!!id) {
      let { data, status } = await reqGetUserInfo(id)
      if (status == 200) {
        result.userInfo = data[0]
      }
      let cw = await reqGetUserCwInfo(id)
      if (cw.status == 200) {
        result.cwArr = cw.data
      }
    }
  } catch (error) {
    console.log(error)
  }

})
const addFriendDesc =  ref('')
const addFriend = async () => {
  //已经为好友直接默认
  if(myCookie==id){
    return 
  }
  if (myCookie) {
    let form = {
      myid:myCookie,
      userid:id,
      content:addFriendDesc.value
    }
    let { data, status } = await reqAddFriend(form)
    if (status == 200) {
      open2('已成功发送请求')
    }else{
      open4('发送请求失败')
    }
  }
  dialogVisible.value=false

}
let content = ref('')
const submit = async () => {
  if (myCookie == '') {
    open4('账号未登录,请点击右上角登录')
    return
  }
  if (content.value == '') {
    open4('请输入内容')
    return
  }
  let form = {
    content: content.value,
    id: myCookie,
    fid: id
  }
  let result = await reqLeaveMessage(form)
  console.log(result)
  if (result.status == 200) {
    open2('留言成功')
    content.value=''
  } else {
    open4('留言发生错误，检查网络')
  }
  
}
const goPet = (id:string)=>{
  console.log('id')
}
const dialogVisible = ref(false)

const handleClose = (done: () => void) => {
  ElMessageBox.confirm('是否关闭请求')
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}
</script>
<style lang="less" scoped>
.container {
  margin: 20px auto;
  min-height: 500px;
  width: 80%;
  .el-dropdown{
    margin-right: 20px;
  }
  .message{
    margin-bottom: 30px;
    display: flex;
    .username{
      font-size: 16px;
      align-self: center;
    }
  }
}
h2{
  font-size: 20px;
  margin: 10px 0px ;
  color: #564532;
}
.cw {
  display: grid;
  grid-template-columns: repeat(4, 230px);
  // grid-template-rows: repeat(3, 200px);
  gap: 20px;

  .zrbtn {
    width: 100%;
  }
}
.comment{
margin-top: 10px;
margin-bottom: 5px;
p{
  font-size: 15px;
}
}
</style>