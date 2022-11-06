<template>
  <div>
  <span
      >感谢你对他们的爱心救助这是你的荣誉证书,你的所作所为会被人记住的.</span
    >
    <el-divider>
      <el-icon><star-filled /></el-icon>
    </el-divider></div>
  <div class="list">
    <div class="item" v-for="item in rr.base">
      <div class="img">

      </div>
      <p class="text">这是来自{{item.baseName}}的赠予</p>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {reqGetCertificate} from '@/api/index'
import { reactive,onBeforeMount } from "vue";
import { StarFilled } from '@element-plus/icons-vue'

let rr = reactive({
  base:[{baseName:''}]
})

let myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)userToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
onBeforeMount(async() => {
  try {
    let form={userid:myCookie}
    const {data,status} = await reqGetCertificate(form)
    if(status==200){
      rr.base = data.filter((item:any)=>item!==false)
      console.log(rr.base)
    }
  } catch (error) {
    console.log(error)
  }
})
</script>
<style lang="less" scoped>
  span{
    font-size: 20px;
  }
  .list{
    display: grid;
    grid-template-columns: repeat(3,220px);
    grid-gap: 20px;
    .item{
      height: 200px;
      background-color: rgba(14, 56, 100, 0.5);
      .img{
        width: 100%;
        height: 160px;
        background-color: pink;
      }
      .text{
        // margin: 5px 0;
        text-align: center;
        line-height: 40px;
        font-size: 14px;
      }
    }
  }
</style>