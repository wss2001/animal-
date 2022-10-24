<template>
  <div class="container">
    <div class="message">
      <el-dropdown>
        <span>
          <el-avatar :src="result.userInfo.img" :size="80" />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="addFriend">添加好友</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <div class="">

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
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { deCode } from '@/utils/index'
import { open2, open4 } from '@/utils/message'
import { reqGetUserInfo, reqGetUserCwInfo, reqLeaveMessage, reqAddFriend } from '@/api/index'
let route = useRoute()
let myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)userToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
let jiamiid = route.query.id as string
let id = deCode(jiamiid) as string
let result = reactive({
  userInfo: { img: '', msg: [] },
  cwArr: [{}]
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
const addFriend = async () => {
  if(myCookie==id){
    return 
  }
  if (myCookie) {
    let form = {
      myid:myCookie,
      userid:id
    }
    let { data, status } = await reqAddFriend(form)
    if (status == 200) {
      open2('已发送请求')
    }
  }

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
  } else {
    open4('留言发生错误，检查网络')
  }
}
</script>
<style lang="less" scoped>
.container {
  margin: 20px auto;
  min-height: 500px;
  width: 80%;
}
</style>