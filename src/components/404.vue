<template>
  <div class="not-found">
    <!-- <img src="../assets/404.gif" alt="" /> -->
    <div class="img">
    </div>
    <div class="text" @click="gohome">跳转到首页</div>
  </div>
</template>
<script setup lang="ts">
import {useRouter} from 'vue-router'
const router = useRouter()
const gohome = ()=>{
  router.push({name:'home'})
}
</script>
<style scoped lang="less">
.not-found {
  position: absolute;
  top: 0;
  left: -27px;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  .text{
    position: absolute;
    top: 150px;
    left: 50px;
    color: white;
    font-size: 25px;
    &:hover{
      cursor: pointer;
      text-decoration: underline;
      color: rgb(172, 36, 36);
    }
  }
}
.not-found .img {
  width: 100vw;
  height: 100vh;
  background: url('../assets/404.gif') repeat-x;
}
</style>>