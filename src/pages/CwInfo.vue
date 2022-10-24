<template>
  <div class="banxin">
    <div class="zhuti">
      <div class="gg" v-show="showgg">
        <div>我是广告猫粮狗粮，宠物医生，我是广告猫粮狗粮，宠物医生，我是广告猫粮狗粮，宠物医生我是广告猫粮狗粮，宠物医生我是广告猫粮狗粮，宠物医生</div>
        <div @click="showgg=false" class="guanbi">X</div>
      </div>
      <h2 class="sj">
        <font color="green">[{{cw.cwInfo.state?'投喂':'领养'}}]</font>{{cw.cwInfo.name}}
      </h2>
      <div class="info">
        <div class="img left">
          <el-popover placement="top-start" title="宠物简介" :width="200" trigger="hover"
            :content="`这是${cw.cwInfo.name},${cw.cwInfo.state?'已被收养':'还未被人收养，它很可爱是吧，不忍心它挨饿吧'}`">
            <template #reference>
              <div class="demo-image__lazy">
                <el-image v-for="url in urls.arr" :key="url" :src="url" lazy />
              </div>
            </template>
          </el-popover>
        </div>
        <div class="middle">
          <p>宠物名称:<el-button type="plain" text>{{cw.cwInfo.name}}</el-button>
          </p>
          <p>宠物剩余食物: <el-button @click="addFood(cw.cwInfo.state)" type="plain" text>{{cw.handleFood()}}</el-button>
          </p>
          <p>联系人:</p>
          <p>联系电话:</p>
          <p>(^_^)联系的时候告诉我是在宠物救助盒子看到的这条消息</p>
          <p>
            <el-button type="danger" text v-if="!cw.cwInfo.state" @click="shouyang(cw.cwInfo._id)">收养它</el-button>
          </p>
          <p>
            <el-button type="danger" text @click="collect(cw.cwInfo._id)">收藏该宠物</el-button>
          </p>
          <p>
            <el-button type="primary" text @click="addFood(cw.cwInfo.state)">是否为他增加粮食</el-button>
          </p>
        </div>
        <div class="right">
          <div class="other">
            <p>作者其它信息</p>
            <p class="gengduo" @click="router.back()">更多</p>
          </div>
          <div class="findother">
            <div class="img">

            </div>
            <div class="qita">
              <p>{{brother.bb.intro}}</p>
              <p>{{brother.bb.intro}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="intro">
        <p>宠物简介: </p>
        <p>{{cw.cwInfo.intro}}</p>
      </div>
      <el-dialog title="提示" v-model="dialogVisible" width="30%">
        <p>{{cw.cwInfo.name}}已经被领养了，确定不再看看别的宠物么</p>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible=false">换一个别的宠物看看</el-button>
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

      <el-dialog title="提示" v-model="dialogSy" width="30%">
        支付二维码
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogSy = false">取 消</el-button>
            <el-button type="primary" @click="sureSy(cw.cwInfo._id)">确 定</el-button>
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
import { cwStore } from "@/store/cw";
import { reqAddFood, reqGetBrother } from '@/api/index'
import CC from '@/components/CC.vue'
const router = useRouter()
let id = router.currentRoute.value.query.id as string
const cw = cwStore()
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
let showgg = ref(true)
let brother = reactive({
  bb: {
    name: '',
    intro: ''
  }
})
onMounted(async () => {
  try {
    await cw.getCwInfo(id)
    urls.arr = cw.cwInfo.imgArr
    let { data } = await reqGetBrother(id)
    brother.bb = data
  } catch (error) {
    console.error(error)
  }
})
let dialogVisible = ref(false)
let dialogFormVisible = ref(false)
let dialogSy = ref(false)
let dialogTz = ref(false)
let formLabelWidth = '120px'
const TzLogin = () => {
  dialogTz.value = false
  router.push({ name: 'userLogin' })
}
const sureSy = async (id: string) => {
  console.log('sureSy', id)
  dialogSy.value = true
  let food = form.food
  // let id = cw.cwInfo._id
  let data = { food: food, id: id }
  let result
  try {
    result = await reqAddFood(data)
  } catch (error) {
    console.error(error)
  }
  cw.getCwInfo(id)
  form.food = 0
  console.log(cw.cwInfo.alsoFood, cw.cwInfo.alsoFoodtian)
}
let myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)userToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
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
const sureAdd = () => {
  dialogVisible.value = false
  dialogFormVisible.value = true
}
let form = reactive({ food: 0 })
const addedFood = async () => {
  dialogFormVisible.value = false
  dialogSy.value = true

}
const shouyang = (id: string) => {
  if (!myCookie) {
    dialogTz.value = true
    return
  }

}
//收藏该宠物
const collect = (id: string) => {
  if (!myCookie) {
    dialogTz.value = true
    return
  }
  console.log(id, myCookie)
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
      }
    }

    .findother {
      display: flex;
      flex-wrap: nowrap;
      height: 100px;

      .img {
        width: 30%;
        background-color: pink;
        height: 70px;
        margin-right: 10px;
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