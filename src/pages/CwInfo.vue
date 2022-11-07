<template>
  <div class="banxin">
    <div class="zhuti">
      <div class="gg" v-show="showgg">
        <div>我是广告猫粮狗粮，宠物医生，我是广告猫粮狗粮，宠物医生，我是广告猫粮狗粮，宠物医生我是广告猫粮狗粮，宠物医生我是广告猫粮狗粮，宠物医生</div>
        <div @click="guanbigg" class="guanbi">X</div>
      </div>
      <h2 class="sj">
        <font color="green">[{{ result.cw.state ? '投喂' : '领养' }}]</font>{{ result.cw.name }}
      </h2>
      <div class="info">
        <div class="img left">
          <el-popover placement="top-start" title="宠物简介" :width="200" trigger="hover"
            :content="`这是${result.cw.name},${result.cw.state ? '已被收养' : '还未被人收养，它很可爱是吧，不忍心它挨饿吧'}`">
            <template #reference>
              <div class="demo-image__lazy">
                <el-image v-for="url in urls.arr" :key="url" :src="url" lazy />
              </div>
            </template>
          </el-popover>
        </div>
        <div class="middle">
          <p>宠物名称:<el-button plain text>{{ result.cw.name }}</el-button>
          </p>
          <p>宠物剩余食物: <el-button @click="addFood(result.cw.state)" type="plain" text>{{result.cw.alsoFoodtian}}天</el-button>
          </p>
          <p>联系人:</p>
          <p>联系电话:</p>
          <p>(^_^)联系的时候告诉我是在宠物救助盒子看到的这条消息</p>
          <p>
            <el-button type="danger" text v-if="!result.cw.state" @click="shouyang">收养它</el-button>
          </p>
          <p>
            <el-button type="danger" text @click="collect(id)">收藏该宠物</el-button>
          </p>
          <p>
            <el-button type="primary" text @click="addFood(result.cw.state)">是否为他增加粮食</el-button>
          </p>
        </div>
        <div class="right">
          <div class="other">
            <p>作者其它信息</p>
            <p class="gengduo" @click="router.back()">更多</p>
          </div>
          <div class="findother" @click="goBrother(brother.bb._id)">
            <div class="img">
              <img :src="brother.bb.img" alt="">
            </div>
            <div class="qita">
              <p>{{ brother.bb.name }}</p>
              <p>{{ brother.bb.intro }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="intro">
        <p>宠物简介: </p>
        <p>{{ result.cw.intro }}</p>
      </div>
      <el-dialog title="提示" v-model="dialogVisible" width="30%">
        <p>{{ result.cw.name }}已经被领养了，确定不再看看别的宠物么</p>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">换一个别的宠物看看</el-button>
            <el-button type="primary" @click="sureAdd">还是打算给他口粮</el-button>
          </span>
        </template>
      </el-dialog>
      <el-dialog title="为小动物增加食物" v-model="dialogFormVisible" width="30%">
        <el-form :model="form">
          <div class="block">
            <span class="demonstration">奢侈点直接给它拉到100</span>
            <el-slider v-model="form.food"></el-slider>
          </div>
          <el-form-item label="添加多少食物" :label-width="formLabelWidth">
            <el-input v-model="form.food" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addedFood">确 定</el-button>
          </span>
        </template>
      </el-dialog>
      <el-dialog title="提示" v-model="dialogTz" width="30%">
        <span>您还未登录,请跳转到登录页面</span>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogTz = false">取 消</el-button>
            <el-button type="primary" @click="TzLogin">跳转到登录页面</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
    <CC></CC>
  </div>

</template>
<script lang="ts" setup>
import { onMounted, ref, reactive } from "vue";
import { useRouter } from 'vue-router';
import { reqGetBrother, reqCollect, reqPay,reqUpdateFood,reqGetCwInfo } from '@/api/index'
import { open2, open4 } from '@/utils/message'
import CC from '@/components/CC.vue'
const router = useRouter()
let id = router.currentRoute.value.query.id as string
let urls = reactive({
  arr: [
    'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
    'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
    'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
    'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
    'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
    'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
    'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
  ]
})
let result = reactive({
  cw:{name:'',state:false,intro:'',alsoFoodtian:''}
})
let showgg = ref(true)
let brother = reactive({
  bb: {
    name: '网络出差了',
    intro: '网络出差了',
    _id:'',
    img:''
  }
})
let loading = ref(true)
//更新宠物的剩余食物天数
onMounted(async()=>{
  try {
    const {data,status} = await reqUpdateFood(id)
  } catch (error) {
    console.log(error)
  }
})
//获取宠物详细数据
onMounted(async () => {
  try {
    const cw = await reqGetCwInfo(id)
    if(cw.status==200){
      result.cw = cw.data
    }
    let { data, status } = await reqGetBrother(id)
    if (status == 200) {
      console.log(data,status)
      brother.bb = data
    }
  } catch (error) {
    console.log(error)
  }
})
const goBrother = (id:string)=>{
  if(id==''||undefined){
    return
  }else{
    //不更新页面
    // router.push({ name: 'cwinfo', query: { id: id } })
    window.open(`http://127.0.0.1:5173/#/cwinfo?id=${id}`)
  }
}
let dialogVisible = ref(false)
let dialogFormVisible = ref(false)
let dialogTz = ref(false)
let formLabelWidth = '120px'
const TzLogin = () => {
  dialogTz.value = false
  router.push({ name: 'userLogin' })
}

let myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)userToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
//判断是否登录打开对应页面
const addFood = (state: boolean) => {
  if (!myCookie) {
    dialogTz.value = true
    return
  }
  if (state) {
    dialogVisible.value = true
  } else {
    dialogFormVisible.value = true
  }
}
//已经被领养依旧要投喂
const sureAdd = () => {
  dialogVisible.value = false
  dialogFormVisible.value = true
}
let form = reactive({ food: 1 })
//确认喂养选择多少并且跳转支付页面
const addedFood = async () => {
  const obj = {
    state: 'tw',
    cwid: id,
    food: form.food.toString(),
    userid: myCookie
  }
  dialogFormVisible.value = false
  pay(obj)
  form.food = 1
}
//收养宠物
const shouyang = () => {
  if (!myCookie) {
    dialogTz.value = true
    return
  } else {
    const obj = {
      state: 'sy',
      cwid: id,
      food: '7',
      userid: myCookie
    }
    pay(obj)
  }
}
//跳转支付页面
const pay = async (obj: any) => {
  let { data, status } = await reqPay(obj)
  if (status == 200) {
    window.open(data)
  }
}
//收藏该宠物
const collect = async (id: string) => {
  if (!myCookie) {
    dialogTz.value = true
    return
  }
  const form = {
    cwid: id,
    myid: myCookie
  }
  const { status } = await reqCollect(form)
  if (status == 200) {
    open2('收藏成功')
  } else {
    open4('收藏失败')
  }
}
//关闭广告
const guanbigg = () => {
  showgg.value = false
}
</script>
<style lang="less" scoped>
.gg {
  width: 150px;
  height: 350px;
  background-color: aquamarine;
  position: fixed;
  top: 200px;
  right: 0;
}

.guanbi {
  cursor: pointer;
  font-size: 30px;
  position: absolute;
  z-index: 100;
  right: 0;
  top: 0;
}

p {
  font-size: 16px;
  text-align: left;
}

.el-button {
  text-align: left;
}

.lingyangzhe {
  font-size: 16px;
  position: absolute;
  top: 5px;
}



img {
  cursor: pointer;
  width: 250px;
  height: 250px;
}

.zhuti {
  margin-bottom: 20px;

  .sj {

    font-size: 24px;
    font-weight: bold;
    line-height: 50px;
    margin-bottom: 10px;
  }
}

.info {
  height: 350px;
  display: flex;
  flex-wrap: nowrap;
  margin-bottom: 10px;
  background-color: rgba(0, 0, 0, 0.02);

  .left {
    width: 35%;
  }

  .middle {
    width: 35%;
    margin-right: 10px;
    background-color: rgba(0, 0, 0, 0.02);

    p {
      text-align: left;
      padding: 5px;

      .el-button {
        font-size: 16px;
      }
    }
  }

  .right {
    flex: 1;

    .other {
      display: flex;
      justify-content: space-between;

      .gengduo:hover {
        text-decoration: underline;
        color: brown;
        cursor: pointer;
      }
    }

    .findother {
      display: flex;
      flex-wrap: nowrap;
      height: 100px;
      &:hover{
        cursor: pointer;
      }

      .img {
        width: 30%;
        height: 70px;
        margin-right: 10px;
        img{
          width: 100%;
          height: 100%;
        }
      }

      .qita {
        text-align: left;
        flex: 1;
        line-height: 30px;
      }
    }
  }
}

.intro {
  margin-bottom: 20px;
}

.demo-image__lazy {
  height: 300px;
  overflow-y: auto;
}

.demo-image__lazy .el-image {
  display: block;
  min-height: 100px;
  margin-bottom: 10px;
}

.demo-image__lazy .el-image:last-child {
  margin-bottom: 0;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>