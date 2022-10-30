<template>
  <div class="all">
    <div class="container">
      <div class="head">
        <h2>{{ rr.article.title }}</h2>
        <p></p>
        <p class="xg1">
          {{ rr.article.date }}<span class="pipe">|</span>
          发布者: <span>王守帅</span></p>
      </div>
      <div class="content">
        <p>{{ rr.article.content }}</p>
        <img v-show="rr.article.img!==''" :src="rr.article.img" alt="">
      </div>
    </div>
    <div class="quwen">
      <h2>宠物趣闻</h2>
      <div class="zhuti">
        <div class="img"></div>
        <p class="content">这估计没多久就要成为脑震荡了！</p>
      </div>
      <div class="zhuti">
        <div class="img"></div>
        <p class="content">这估计没多久就要成为脑震荡了！</p>
      </div>
      <div class="zhuti">
        <div class="img"></div>
        <p class="content">这估计没多久就要成为脑震荡了！</p>
      </div>
      
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { reqGetNewsById } from '@/api/index'
const route = useRoute()
let rr = reactive({
  article: {
    content: '',
    state: '',
    date: '1970-07-01',
    title: '',
    img:""
  }
})
const id = route.query.id as string;
onMounted(async () => {
  try {
    if (id !== undefined) {
      const { data, status } = await reqGetNewsById(id)
      if (status == 200) {
        rr.article = data
        console.log(rr.article.img)
      }
    }
  } catch (error) {
    console.log(error)
  }

})
</script>
<style lang="less" scoped>
img{
  width: 200px;
  height: 200px;
}
.all {
  display: grid;
  grid-template-columns: 60% 35%;
  grid-gap: 30px;

  .quwen {
    margin-top: 100px;
    background-color: rgb(247, 242, 242);
    height: 400px;

    h2 {
      font-size: 20px;
      font: 700 21px/22px;
      word-wrap: break-word;
      font-style: normal;
      color: #E9A400;
      margin-bottom: 8px;
    }

    .zhuti {
      display: flex;
      flex-wrap: nowrap;
      margin-bottom: 8px;

      .img {
        width: 130px;
        height: 80px;
        background-color: #333;
        margin-right: 5px;
      }

      .content {
        font-size: 20px;
        font: 700 21px/22px;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}

.container {
  // width: 60%;
  min-height: 470px;
}

.head {
  p {
    text-align: center;
  }

  h2 {
    text-align: center;
  }

  .xg1 {
    font: 12px/1.5 Tahoma, 'Microsoft Yahei', 'Simsun';
    word-wrap: break-word;
    border-bottom: 1px solid #d5d5d5;
    padding-bottom: 7px;
    color: #999 !important;
  }
}

.content {
  white-space: pre-warp;
  padding: 10px;

  p {
    font-size: 18px;
    line-height: 30px;
  }
}
</style>