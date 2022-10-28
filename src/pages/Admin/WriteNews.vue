<template>
  <div class="container">
    <h2>新增新闻</h2>
    <div class="content">
      <el-form :model="form" label-width="60px">
    <el-form-item label="标题">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="类型">
      <el-select v-model="form.region" placeholder="请选择类型">
        <el-option label="宠物热点" value="rd" />
        <el-option label="宠物必学" value="bx" />
        <el-option label="宠物救助" value="jz" />
      </el-select>
    </el-form-item>
    <!-- <el-form-item label="类型">
      <el-radio-group v-model="form.resource">
        <el-radio label="Sponsor" />
        <el-radio label="Venue" />
      </el-radio-group>
    </el-form-item> -->
    <el-form-item label="正文内容">
      <el-input v-model="form.desc" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">生成</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import {reqAddNews} from '@/api/index'
import { open2, open4 } from '@/utils/message';

const form = reactive({
  name: '',
  region: '',
  desc: '',
})

const onSubmit = async() => {
  if(form.name==''||form.desc==''||form.region==''){
    open4('请输入内容')
    return 
  }
  let newform = {
    title:form.name,
    state:form.region,
    content:form.desc
  }
  
  try {
    const {status} = await reqAddNews(newform)
    if(status==200){
      open2('新增成功')
    }
  } catch (error) {
    open4('新增失败')
    console.log(error)
  }
}
</script>
<style lang="less" scoped>
  h2{
    font-size: 20px;
    color: #444;
    margin-bottom: 10px;
  }
  .content{
    width: 800px;
    border: 2px solid #444;
    border-radius: 5px;
    padding: 10px 20px;
  }
  .el-textarea__inner{
    width: 80%;
    height: 400px;
  }
</style>