<template>
  <div>
    <div class="gobase" @click="goBase"><h2>查看其基地</h2></div>
    <ul class="cwBaseLi">
      <li v-for="item in cwBase.cwArr" :key="item._id" @click="goCwInfo(item._id)">
        <p v-if="item.state" class="lingyangzhe">领养者：{{item.lovePeople}}</p>
        <div class="img">
          <img :src="item.img" alt="">
        </div>
        <div class="intro">
          <p>宠物名称：<span>{{item.name}}</span></p>
          <p>{{item.state?'已领养':'未领养'}}</p>
          <p>剩余口粮<span>{{item.alsoFoodtian}}</span>天</p>
        </div>
      </li>
    </ul>
  </div>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>留言</span>
        </div>
      </template>
      <template v-if="!isEmpty">
        <div v-for="item in cc.comment" :key="item._id" class="text item">
          <el-divider>
            <el-icon>
              <star-filled />
            </el-icon>{{item.date}}
          </el-divider>
          <span>{{item.content}}</span>
          <el-divider content-position="right" @click="lookOther(item.userid)">{{item.name}}</el-divider>
        </div>
      </template>
    </el-card>
    <el-empty v-if="isEmpty" description="没有评论" :image-size="200" />
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
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { useRouter } from 'vue-router';
import { cwBaseStore } from "@/store/cwbase";
import { StarFilled } from '@element-plus/icons-vue'
import { open2,open4 } from '@/utils/message'
import { reqGetComment, reqSubmitComment,reqUpdateHot } from '@/api/index';
import { jiami } from "@/utils/index";
const router = useRouter()
const cwBase = cwBaseStore()
const id = router.currentRoute.value.query.id as string
const myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)userToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
let cc = reactive({
  comment: [{
    name: '',
    date: '1970-09-01',
    content: '',
    _id: '',
    userid:''
  }]
})
onMounted(async () => {
  try {
    await reqUpdateHot(id)
  } catch (error) {
    console.log(error)
  }
})
onMounted(async () => {
  await cwBase.getCwBaseInfo(id)
})
let isEmpty = ref(false)
const getComment = async (id: string) => {
  try {
    let { data, status } = await reqGetComment(id)
    if (status == 0 && data.length !== 0) {
      cc.comment = data.reverse()
    }
    else {
      isEmpty.value = true
    }
  } catch (error) {
    console.log(error)
  }
}
onMounted(async () => {
  getComment(id)
})
const goCwInfo = (id: string) => {
  if(id==''||id==undefined){
    return
  }
  router.push({ name: 'cwinfo', query: { id: id } })
}
//进入他人界面
const lookOther = (otherid: string) => {
  if(otherid==''||otherid==undefined){
    return
  }
  let jiamiid = jiami(otherid) as string
  router.push({path:'/peopleZhuYe',query:{id:jiamiid}})
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
    baseid: id
  }
  let result = await reqSubmitComment(form)
  if (result.status == 0) {
    open2('留言成功')
    getComment(id)
  } else {
    open4('留言发生错误，检查网络')
  }
}
//跳转基地详情页面
const goBase = ()=>{
  console.log(id)
  router.push({name:'cwbasehome',query:{id:id}})
}
</script>
<style lang="less" scoped>
.gobase{
  h2{
    font-size: 20px;
    // font-size: 24px;
      // margin: 0 auto;
      // text-align: center;
      word-wrap: break-word;
      font-style: normal;
      color: #E9A400;
      margin-bottom: 10px;
      &:hover{
        cursor: pointer;
        text-decoration: underline;
      }
  }
}
.el-card {
  background-color: rgba(255, 255, 255, 0.03);
  max-height: 385px;
  overflow: scroll;
}

.el-divider__text {
  background-color: rgba(238, 151, 151, 0.5);
}

.el-divider__text.is-right:hover {
  cursor: pointer;
}

.card-header {
  font-size: 16px;
}

::-webkit-scrollbar {
  display: none;
  /* Chrome Safari */
}

.liuyan {
  font-size: 16px;
  margin: 5px;
}

.el-form-item__content {
  justify-content: flex-end;
}

.lingyangzhe {
  font-size: 16px;
  position: absolute;
  top: 5px;
}

.cwBaseLi {
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

li {
  margin-bottom: 15px;
  position: relative;
}

.img {
  width: 250px;
  height: 250px;
  overflow: hidden;
}

img {
  cursor: pointer;
  width: 250px;
  height: 250px;
  //加载hover中移出没有效果
  transition: all .4s;
  &:hover{
    transform: scale(1.5);
  }
}

.intro {
  width: 250px;
  position: absolute;
  background-color: rgba(255, 255, 255, 0.3);
  bottom: 0;
}

.intro p {
  font-size: 18px;
  margin-top: 5px;
}

.intro p span {
  color: brown;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 100%;
}
</style>