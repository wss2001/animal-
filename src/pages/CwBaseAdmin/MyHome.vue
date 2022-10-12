<template>
  <div>
    <router-view></router-view>
  </div>
  
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter()
</script>
<style lang="less" scoped>
  div{
    float: left;
    margin-left: 20px;
  }
</style>