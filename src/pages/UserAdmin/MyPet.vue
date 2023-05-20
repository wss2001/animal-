<template>
  <suspense>
    <div class="block text-center container">
      <div class="other">
        <div class="left">
          <div class="left_left">
            <h2>去领养救助动物吧!</h2>
            <p>世界上每天有很多动物上升每天有很多动物上升</p>
            <button @click="gohome">gonow</button>
          </div>
          <div class="left_right">
            <img style="width: 100%; height: 100%" src="../../assets/sn.png"  />
          </div>
        </div>
        <div class="right">
          <!-- <div class="swipar"> -->
          <el-popover placement="top-start" title="宠物基地" :width="200" trigger="hover"
            content="">
            <template #reference>
              <el-carousel height="150px">
                <el-carousel-item v-for="item in ff.cwBase" :key="item._id">
                  <img @click="gobase(item._id)" style="width: 100%; height: 150px" :src="item.img"  />
                  <!-- <el-button class="zrbtn" type="info" @click="showFriend(item._id)">转让宠物{{item.baseName}}</el-button> -->
                </el-carousel-item>
              </el-carousel>
            </template>
          </el-popover>
          
        
        </div>
      </div>
      <span class="demonstration">宠物集训营</span>
      <el-empty v-if="showEmpty">
        <el-button type="primary" @click="gohome">去首页逛逛</el-button>
      </el-empty>
      <div class="list" v-if="!showEmpty">
        <div class="swipar" v-for="cw in cwArr.data">
          <el-popover placement="top-start" :title="cw.name" :width="200" trigger="hover"
            :content="cw.intro">
            <template #reference>
              <el-carousel height="150px">
                <el-carousel-item v-for="img in cw.imgArr" :key="img">
                  <el-image @click="goCwinfo(cw._id)" style="width: 100%; height: 150px" :src="img" fit="contain" />
                </el-carousel-item>
              </el-carousel>
            </template>
          </el-popover>
          <el-button class="zrbtn" type="info" @click="showFriend(cw._id)">转让宠物--{{cw.name}}</el-button>
        </div>
      </div>
      <span>收藏宠物</span>
      <!--  -->
      <div class="list" >
        <div class="swipar" v-for="cw in cwCollectArr.data">
          <el-popover placement="top-start" :title="cw.name" :width="200" trigger="hover"
            :content="cw.intro">
            <template #reference>
              <el-carousel height="150px">
                <el-carousel-item v-for="img in cw.imgArr" :key="img">
                  <el-image @click="goCwinfo(cw._id)" style="width: 100%; height: 150px" :src="img" fit="contain" />
                </el-carousel-item>
              </el-carousel>
            </template>
          </el-popover>
          <el-button class="zrbtn" type="info" @click="goCwinfo(cw._id)">宠物--{{cw.name}}</el-button>
        </div>
      </div>
    </div>
  </suspense>
  <el-dialog
    v-model="dialogVisible"
    title="转让宠物"
    width="30%"
  >
    <span>选择一个好友</span>
    <el-form :model="form" label-width="60px">
    <el-form-item>
      <el-radio-group v-model="form.resource">
        <el-radio v-for="item in ff.friends" :key="item._id" :label="item.username" @click="getRadio(item._id)"/>
      </el-radio-group>
    </el-form-item>
  </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="makeoverPet">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { onMounted, ref, reactive, nextTick } from "vue";
import { reqGetUserCwInfo, reqFindFriendToShare,reqGetFriendList,reqGetCwBase } from '@/api/index'
import { ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router';
import { open2, open4 } from "@/utils/message";
const router = useRouter()
let myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)userToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
let cwArr = reactive({ data: [{ imgArr: [''], name: '', _id: '',intro:'' }] })
let cwCollectArr = reactive({ data: [{ imgArr: [''], name: '', _id: '',intro:'' }] })

const goCwinfo = (id: string) => {
  router.push({ name: 'cwinfo', query: { id: id } })
}
let ff = reactive({
  friends:[{username:'',img:'',cw:[],_id:''}],
  cwBase:[{_id:'',img:'',baseName:''}]
})
let showEmpty = ref(false)
// 获取已领养宠物
const handleGetCw = async () => {
  let {data,status} = await reqGetUserCwInfo(myCookie)
  if(status==200){
    cwArr.data = data
  }
  if (cwArr.data.length == 0) {
    showEmpty.value = true
  }
}
// 获取收藏
const handleGetShouCw = async () => {
  let {data,status} = await reqGetUserCwInfo(myCookie,'sc')
  if(status==200){
    cwCollectArr.data = data
  }
  // if (cwArr.data.length == 0) {
  //   showEmpty.value = true
  // }
}
onMounted(async () => {
  handleGetCw()
  handleGetShouCw()
})
//获取好友列表
onMounted(async ()=>{
  try {
    let {data,status} = await reqGetFriendList(myCookie);
    if(status==200){
      ff.friends = data;
    }
  } catch (error) {
    console.log(error)
  }
})
onMounted(async () => {
  try {
    let {data,status} = await reqGetCwBase()
    if(status==0){
      ff.cwBase = data.slice(0,4)
    }
  } catch (error) {
    console.log(error)
  }
})
const gobase = (id:string)=>{
	router.push({ name: 'cwBaseInfo', query: { id: id } })
}
const dialogVisible = ref(false)
let cwid = ref('')
let userid = ref('')
let form = reactive({
  resource:''
})
const getRadio = (id:string)=>{
  userid.value = id
}
const showFriend = (id:string)=>{
  cwid.value=id;
  dialogVisible.value = true
}
//发送转让请求
const makeoverPet = async () => {
  dialogVisible.value=false
  if(userid.value==''||myCookie==''||cwid.value==''){
    open4('转让失败')
    return
  }
  let newform = {
    userid:userid.value,
    myid:myCookie,
    cwid:cwid.value
  }
  try {
    let result = await reqFindFriendToShare(newform)
    if (result.status == 200) {
      open2('已发送请求')
    }
  } catch (error) {
    console.log(error)
    open4('发送请求失败')
  }
}
const gohome = () => {
  router.push({ name: 'home' })
}

</script>
<style lang="less" scoped>
.other{
  margin-bottom:10px;
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-column-gap: 30px;
  width: 800px;
  grid-template-rows: 200px;
  &>div{
    border-radius: 10px;
  }
  .left{
    // background-color: #475669;
    padding:20px;
    border: 1px solid black;
    display: flex;
    justify-content: space-between;
    background: linear-gradient(0.25turn, rgba(206, 231, 200, 0.7), rgba(221, 241, 218, 0.8));
    .left_left{
      width: 200px;
      h2{
        padding: 5px;
        margin-bottom: 10px;
        font-size: 18px;
        color: rgb(11, 66, 11);
      }
      p{
        color: rgb(39, 114, 39);
      }
      button{
        display: block;
        width: 70px;
        height: 30px;
        margin: 0 auto;
        margin-top: 20px;
        background-color: rgba(9, 66, 9,0.8);
        color: white;
        font-size: 16px;
        font-weight: normal;
      }
    }
    .left_right{
      width: 150px;
      // border: 1px solid black;
      
    }
  }
  .right{
    // background-color: pink;
    height: 200px;
    div{
      height: 200px;
      img{
        height: 200px;
      }
    }
  }
}
.list {
  display: grid;
  grid-template-columns: repeat(4, 230px);
  grid-template-rows: repeat(3, 200px);
  gap: 20px;

  .zrbtn {
    width: 100%;
  }
}

.el-empty {
  width: 800px;
}

.demonstration {
  color: var(--el-text-color-secondary);
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>