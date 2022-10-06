<template>
  <div class="banxin">
    <div>
      <!-- <div class="gg" v-show="this.show">
        <div>我是广告猫粮狗粮，宠物医生，我是广告猫粮狗粮，宠物医生，我是广告猫粮狗粮，宠物医生我是广告猫粮狗粮，宠物医生我是广告猫粮狗粮，宠物医生</div>
        <div @click="guanbi" class="guanbi">X</div>
      </div> -->
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
        <div class="right">
          <p>宠物名称: <el-button type="warning">{{cw.cwInfo.name}}</el-button>
          </p>
          <p>宠物简介: <el-button type="primary">{{cw.cwInfo.intro}}</el-button>
          </p>
          <p>宠物剩余食物: <el-button @click="addFood(cw.cwInfo.state)" type="warning">{{cw.handleFood()}}</el-button><i
              class="el-icon-chicken"></i></p>
          <el-button v-if="!cw.cwInfo.state" @click="shouyang(cw.cwInfo._id)">收养它</el-button>
        </div>
      </div>
      <el-button primary @click="addFood(cw.cwInfo.state)">是否为他增加粮食</el-button>
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

      <el-dialog title="提示" :visible.sync="dialogSy" width="30%">
        支付二维码
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogSy = false">取 消</el-button>
          <el-button type="primary" @click="sureSy(cw.cwInfo._id)">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog title="提示" :visible.sync="dialogTz" width="30%">
        <span>您还未登录,请跳转到登录页面</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogTz = false">取 消</el-button>
          <el-button type="primary" @click="TzLogin">跳转到登录页面</el-button>
        </span>
      </el-dialog>
    </div>
    <CC></CC>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, reactive } from "vue";
import { useRouter } from 'vue-router';
import { cwStore } from "@/store/cw";
import { reqAddFood } from '@/api/index'
const router = useRouter()
let id = router.currentRoute.value.query.id as string
const cw = cwStore()
let urls = reactive({
  arr:[
  'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
  'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
  'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
  'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
  'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
  'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
  'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
]})
onMounted(async () => {
  try {
    await cw.getCwInfo(id)
    urls.arr = cw.cwInfo.imgArr
  } catch (error) {
    console.error(error)
  }
})
let show = ref(true)
let dialogVisible = ref(false)
let dialogFormVisible = ref(false)
let dialogSy = ref(false)
let dialogTz = ref(false)

let user = ref('')
let formLabelWidth = '120px'
let srcList = reactive([])
const TzLogin = () => {
  console.log('TzLogin')
}
const sureSy = (id: string) => {
  console.log('sureSy', id)
}
const addFood = (state: boolean) => {
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
  console.log('addedFood')
  dialogFormVisible.value = false
  let food = form.food
  let id = cw.cwInfo._id
  let data = { food: food, id: id }
  let result
  try {
    result = await reqAddFood(data)
  } catch (error) {
    console.error(error)
  }
  cw.getCwInfo(id)
  console.log(cw.cwInfo.alsoFood, cw.cwInfo.alsoFoodtian)
}

const shouyang = (id: string) => { }




</script>
<style lang="less">
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
}

img {
  cursor: pointer;
  width: 250px;
  height: 250px;
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
</style>