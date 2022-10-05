<template>
  <el-container>
    <!-- <el-aside width="150px"> -->
      <MyAside></MyAside>
    <!-- </el-aside> -->
    <el-main>
      <MyHome></MyHome>
    </el-main>
  </el-container>
</template>
<script lang="ts" setup>
import MyAside from "./MyAside.vue";
import MyHome from "./MyHome.vue";
</script>
<style lang="less" scoped>
  
</style>