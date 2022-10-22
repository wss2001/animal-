<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>请求注册宠物基地的事项</span>
        <el-button class="button" text>Operation button</el-button>
      </div>
    </template>
    <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
  </el-card>
</template>
<script setup lang="ts">
import {reqAdminGetMessage  } from "@/api/index";
import { onMounted } from "vue";
onMounted(async ()=>{
  let result = await reqAdminGetMessage()
})
</script>
<style lang="less" scoped>
  .card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 480px;
}
</style>