<template>
  <div class="container">
    <div class="left">
      <div class="swiper">
        <el-carousel :interval="5000" arrow="always">
          <el-carousel-item v-for="item in 4" :key="item">
            <h3 text="2xl" justify="center">{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="mustStudy">
        <h2>养宠必学</h2>
        <ul>
          <li>世界上最大的狗品种 体型大的狗狗排行</li>
          <li>世界上最大的狗品种 体型大的狗狗排行</li>
          <li>世界上最大的狗品种 体型大的狗狗排行</li>
          <li>世界上最大的狗品种 体型大的狗狗排行</li>
          <li>世界上最大的狗品种 体型大的狗狗排行</li>
        </ul>
      </div>
    </div>
    <div class="middle">
      <div class="redian">
        <h2><span>[热点]</span>在台湾没天敌 遭弃养绿鬣蜥大量繁衍</h2>
        <ul>
          <li>
            养百斤麝香猪屡遭邻居嫌臭 女疲惫决定为猪搬走
          </li>
          <li>
            养百斤麝香猪屡遭邻居嫌臭 女疲惫决定为猪搬走
          </li>
          <li>
            养百斤麝香猪屡遭邻居嫌臭 女疲惫决定为猪搬走
          </li>
          <li>
            养百斤麝香猪屡遭邻居嫌臭 女疲惫决定为猪搬走
          </li>
        </ul>
      </div>
      <div class="jiuzhu">
        <h2><span>[救助]</span>在台湾没天敌 遭弃养绿鬣蜥大量繁衍</h2>
        <ul>
          <li>
            养百斤麝香猪屡遭邻居嫌臭 女疲惫决定为猪搬走
          </li>
          <li>
            养百斤麝香猪屡遭邻居嫌臭 女疲惫决定为猪搬走
          </li>
          <li>
            养百斤麝香猪屡遭邻居嫌臭 女疲惫决定为猪搬走
          </li>
          <li>
            养百斤麝香猪屡遭邻居嫌臭 女疲惫决定为猪搬走
          </li>
        </ul>
      </div>
    </div>
    <div class="right">
      <div class="hbutton">
        <button @click="goUserLogin">用户登录</button>
        <button @click="goUserRegister" class="zc">立即注册</button>
        <button @click="goHome" class="sy">我的首页</button>
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
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { reqGetNews } from '@/api/index'
const router = useRouter()
let nn = reactive({
  news: [{
    title: '',
    intro: '',
    date: '1970-06-01',
    content: '',
    _id: '',
    state: ''
  }]
})
onMounted(async () => {
  try {
    let {data,status} = await reqGetNews()
    if(status==200){
      nn.news = data
    }
  } catch (error) {
    console.log(error)
  }
})
const hot = computed(() => {
  return nn.news.filter(item => item.state == 'rd')
})
const mustLearn = computed(() => {
  return nn.news.filter(item => item.state == 'bx')
})
const help = computed(() => {
  return nn.news.filter(item => item.state == 'jz')
})
const handleNew = (id:string)=>{
  if(id==''||id==undefined){
    console.log('网络发生错误')
    return
  }
  router.push({name:'newhome',query:{id:id}})
}
let myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)userToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
const goHome = () => {
  if(myCookie==''){
    router.push({ name: 'userLogin' })
  }else{
    router.push({ name: 'user', query: { id: myCookie } })
  }
}
const goUserRegister = () => {
  router.push({ name: 'userRegister' })
}

const goUserLogin = () => {
  router.push({ name: 'userLogin' })
}
</script>
<style lang="less" scoped>
::-webkit-scrollbar {
  display: none;
  /* Chrome Safari */
}

li {
  font-size: 14px;
  line-height: 16px;
  padding: 2px;
  margin: 10px;
  list-style-type: disc;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
    color: red;
  }
}

.container {
  display: grid;
  grid-template-columns: 420px 1fr 300px;
  grid-template-rows: 380px;
  margin-bottom: 20px;

  .left {
    .swiper {
      max-height: 200px;

      .el-carousel {
        max-height: 200px;
      }
    }

    .mustStudy {
      overflow: hidden;

      h2 {
        word-wrap: break-word;
        color: #9BB049;
        font: 700 21px/28px;
        margin: 8px 0px 8px 0px;
      }

    }
  }

  .middle {
    background-color: rgb(247, 245, 243);
    margin-right: 12px;
    padding: 10px;
    overflow: scroll;
    .redian {
      margin-bottom: 15px;
    }

    h2 {
      font-size: 20px;

      &:hover {
        text-decoration: underline;
        color: red;
      }
    }

    span {
      color: red;
      font-size: 14px;
      margin-right: 5px;
    }

    .redian {}
  }

  .right {
    overflow: hidden;

    .hbutton {
      font: 12px/1.5 Tahoma, 'Microsoft Yahei', 'Simsun';
      color: #333;
      word-wrap: break-word;
      padding: 12px;
      padding-right: 0px;
      border-radius: 5px;
      border: 1px solid #DEEFC7;
      margin-bottom: 10px;
      height: 35px;
      overflow: hidden;
      display: flex;
      flex-wrap: nowrap;

      button {
        height: 90%;
        flex: 1;
        background-color: #9BB049;
        margin-left: 10px;
        font-weight: 800;
        color: #fff;
      }

      .zc {
        background-color: #db5b65;
      }

      .sy {
        background-color: #E9A400;
      }
    }

    .quwen {
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
}

.el-carousel__container {
  height: 200px;
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>