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
      <div class="zhuti" v-for="item in rr.suiji">
          <div class="img">
            <img :src="item.img" alt="">
          </div>
          <div class="text">
            <p class="content" @click="handleNew(item._id)">{{ item.title }}</p>
            <p class="neirong">{{ item.content }}</p>
          </div>
        </div>
      
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted,onBeforeMount } from 'vue'
import { useRoute,useRouter } from 'vue-router'
import { reqGetNewsById, reqGetNews} from '@/api/index'
import { RandomNumBoth } from '@/utils/index'

const route = useRoute()
const router = useRouter()
let rr = reactive({
  article: {
    content: '',
    state: '',
    date: '1970-07-01',
    title: '',
    img:""
  },suiji: [{
    title: '',
    intro: '',
    date: '1970-06-01',
    content: '',
    _id: '',
    state: '',
    img: ''
  }],
  news: [{
    title: '',
    intro: '',
    date: '1970-06-01',
    content: '',
    _id: '',
    state: ''
  }],
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
onBeforeMount(async () => {
  try {
    let { data, status } = await reqGetNews()
    if (status == 200) {
      rr.news = data
      let arr: any = []
      for (let i = 0; i < 3; i++) {
        arr.push(rr.news[RandomNumBoth(0, rr.news.length - 1)])
      }
      rr.suiji = arr
    }
  } catch (error) {
    console.log(error)
  }
})
const handleNew = (id: string) => {
  if (id == '' || id == undefined) {
    console.log('网络发生错误')
    return
  }
  router.push({ name: 'newhome', query: { id: id } })
}
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
        .text{
          flex: 1;
        }

        .img {
          width: 130px;
          height: 80px;
          // background-color: #333;
          margin-right: 5px;

          img {
            width: 130px;
            height: 80px;
          }
        }

        .content {
          font-size: 20px;
          font: 700 21px/22px;

          &:hover {
            text-decoration: underline;
            cursor: pointer;
          }
        }
        .neirong {
          width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
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