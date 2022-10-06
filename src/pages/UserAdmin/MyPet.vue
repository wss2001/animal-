<template>
  <suspense>
  <div class="block text-center">
    <span class="demonstration">宠物集训营</span>\
    <div class="list">
    <div class="swipar" v-for="cw in cwArr.data">
        <el-carousel height="150px">
          <el-carousel-item v-for="img in cw.imgArr" :key="img">
            <el-image @click="goCwinfo(cw._id)" style="width: 100%; height: 150px" :src="img" fit="contain" />
          </el-carousel-item>
        </el-carousel>
        <el-button class="zrbtn" type="info" @click="makeoverPet">转让该宠物</el-button>
      </div>
    </div>
  </div>
</suspense>
</template>
<script lang="ts" setup>
import { onMounted, ref, reactive,nextTick  } from "vue";
import {reqGetUserCwInfo} from '@/api/index'
import { useRouter } from 'vue-router';
const router = useRouter()
let myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)userToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
let cwArr = reactive({data:[{imgArr:[{}],name:'',_id:''}]})
const goCwinfo = (id:string)=>{
  router.push({name:'cwinfo',query:{id:id}})
}
onMounted(async ()=>{
  let k = await reqGetUserCwInfo(myCookie)
  cwArr.data = k.data
})
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
const makeoverPet =()=>{
  console.log('++=')
}
</script>
<style lang="less" scoped>
.list {
  display: grid;
  grid-template-columns: repeat(4,230px);
  grid-template-rows: repeat(3,200px);
  gap: 20px;
  .zrbtn{
    width: 100%;
  }
  // .swipar {
  //   width: 20px;
  // }
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