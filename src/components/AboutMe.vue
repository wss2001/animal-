<template>
  <div class="container">
    <div class="intro">
      <h2>网站简介 <button @click="registerCwAdmin" class="title">申请成为宠物基地</button></h2>
      <p>珍宠网是青岛珍宠信息技术有限公司于2018年8月1日正式推出的主打产品，为城市动物而生，以救助城市流浪动物为核心业务的宠物类综合网站，本网站将会一直以让城市动物生活的更好为目的坚定不移的发展下去！</p>
      <p>我们的宣言：为城市动物而生</p>
    </div>
    <div class="history">
      <h2>网站历史</h2>
      <p>1、2015年9月，珍宠网正式立项；</p>
      <p>1、2015年9月，珍宠网正式立项；</p>
      <p>1、2015年9月，珍宠网正式立项；</p>
    </div>
    <div class="contact">
      <h2>联系我们</h2>
      <h4>意见建议反馈：</h4>
      <p>邮箱：service@zhenpet.com</p>
      <h4>商务合作：</h4>
      <p> 邮箱：service@zhenpet.com</p>
      <p>工作时间：周一至周五 8:30—17:30</p>
    </div>
    <div class="recruit">
      <h2>诚聘英才</h2>
      <p>岗位职责：网站程序员</p>
      <p>任职要求：精通php+JavaScript， 学历大学本科及以上</p>
      <p>人数：2名</p>
    </div>
    <div class="history">
      <h2>合作伙伴</h2>
      <p>哈尔滨理工大学七公渔723</p>
      <p>1、2015年9月，珍宠网正式立项；</p>
      <p>1、2015年9月，珍宠网正式立项；</p>
    </div>
    
  </div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter()
const registerCwAdmin = ()=>{
  router.push({name:'registerCwAdmin'})
}
</script>
<style lang="less" scoped>

.title{
  background-color: rgb(185, 164, 164);
  padding: 5px;
  font-size: 16px;
  // float: right;
  &:hover{
    cursor: pointer;
  }
  
}
h2{
    color: #334F67;
    // float: left;
    font: 400 20px 黑体;
    margin: 10px;
    border-bottom: 3px solid #334F67;
    }
    p{
      text-indent: 36px;
      font-size: 18px;
    }
    h4{
      font-size: 18px;
      text-indent: 30px;
      font-weight: 400;
    }
  .recruit{
    p{
      margin: 20px 0px 20px 0px;
    }
  }
  .intro{
    h2{
      display: flex;
      justify-content: space-between;
    }
  }
</style>