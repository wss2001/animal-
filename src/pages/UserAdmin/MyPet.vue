<template>
  <suspense>
    <div class="block text-center container">
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
          <el-button class="zrbtn" type="info" @click="showFriend(cw._id)">转让宠物{{cw.name}}</el-button>
        </div>
      </div>
    </div>
  </suspense>
  <el-dialog
    v-model="dialogVisible"
    title="Tips"
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
import { reqGetUserCwInfo, reqFindFriendToShare,reqGetFriendList } from '@/api/index'
import { ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router';
import { open2, open4 } from "@/utils/message";
const router = useRouter()
let myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)userToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
let cwArr = reactive({ data: [{ imgArr: [''], name: '', _id: '',intro:'' }] })
const goCwinfo = (id: string) => {
  router.push({ name: 'cwinfo', query: { id: id } })
}
let ff = reactive({
  friends:[{username:'',img:'',cw:[],_id:''}]
})
let showEmpty = ref(false)
const handleGetCw = async () => {
  let {data,status} = await reqGetUserCwInfo(myCookie)
  if(status==200){
    cwArr.data = data
  }
  if (cwArr.data.length == 0) {
    showEmpty.value = true
  }
}
onMounted(async () => {
  handleGetCw()
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