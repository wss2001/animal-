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
          <el-button class="zrbtn" type="info" @click="makeoverPet(cw._id)">转让宠物{{cw.name}}</el-button>
        </div>
      </div>
    </div>
  </suspense>
</template>
<script lang="ts" setup>
import { onMounted, ref, reactive, nextTick } from "vue";
import { reqGetUserCwInfo, reqChangepet } from '@/api/index'
import { useRouter } from 'vue-router';
const router = useRouter()
let myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)userToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
let cwArr = reactive({ data: [{ imgArr: [''], name: '', _id: '',intro:'' }] })
const goCwinfo = (id: string) => {
  router.push({ name: 'cwinfo', query: { id: id } })
}
let showEmpty = ref(false)
const handleGetCw = async () => {
  let k = await reqGetUserCwInfo(myCookie)
  cwArr.data = k.data
  if (cwArr.data.length == 0) {
    showEmpty.value = true
  }
}
onMounted(async () => {
  handleGetCw()
})
const makeoverPet = async (id: string) => {
  let form = { id: id, myId: myCookie }
  try {
    let result = await reqChangepet(form)
    console.log(result)
    if (result.status == 0) {

    }
  } catch (error) {
    console.log(error)
  }
  handleGetCw()
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