<template>
  <div id="ft" class="comiis_footer wp shqt">
    <div class="comiis_footertop">
      <router-link to="/userlogin">登录&amp;注册</router-link>  |
      <router-link to="/">首页</router-link>|
      <router-link to="/read">帮助中心</router-link>|
      <router-link to="/aboutme">关于我们</router-link>
    </div>
    <div class="comiis_Copyright">
      <a target="_blank" href="https://www.baidu.com">备案号：鲁ICP备18004475号-2</a> Copyright © 2015-2016 <router-link 
        to="/">宠物救助盒子</router-link>(https://www.zhenpet.com) 版权所有 All Rights Reserved.<br>
    </div>
    <p>
      <img src="public/vite.svg">
      <img src="public/vite.svg">
      <img src="public/vite.svg">
      <img src="public/vite.svg">
    </p>
  </div>
</template>
<script setup lang="ts">

</script>
<style lang="less" scoped>
img{
  width: 80px;
  height: 60px;
}
#ft {
  // position: absolute;
  // bottom: 0;
  font: 12px/1.5 Tahoma, 'Microsoft Yahei', 'Simsun';
  word-wrap: break-word;
  margin: 0 auto;
  text-align: center;
  // width: 1190px;
  color: #666;
  padding: 18px 0 10px;
  line-height: 26px;
  border-top: none;

  .comiis_footertop {
    word-wrap: break-word;
    height: 22px;
    line-height: 16px;
    overflow: hidden;
    color: #CDCDCD;
  }

  .comiis_Copyright {
    line-height: 26px;
    word-wrap: break-word;
    color: #666;
  }

  p {
    text-align: center;
    color: #666;
    line-height: 26px;
    word-wrap: break-word;
    margin: 0;
    padding: 0;
  }
}
</style>