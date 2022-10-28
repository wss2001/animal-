<template>
  <div class="container">
    <div class="head">
      <h2>世界上最大的狗品种 体型大的狗狗排行</h2>
      <p></p>
      <p class="xg1">
        3月13日 06:00<span class="pipe">|</span>
        发布者: <span>珍宠小白</span><span class="pipe">|</span>
        查看: <em id="_viewnum">298</em><span class="pipe">|</span>
        评论: 0</p>
    </div>
    <div class="content">
      <p>大楼住户王小姐向《苹果日报》投诉，指称今年2月许姓女子带着猪搬来后，就开始出现恶臭，
        难闻的味道透过相通的抽风管线扩散到其他住户，后来才知道是她让猪在厕所排泄，并将秽物冲入马桶，气得她向环保局、动保处、
        1999市民专线检举多次检举，但碍于无法可管，只好自己想办法，把抽风口密封、排水孔堵住，还点香氛蜡烛，但依旧无法抵
        挡猪的味道。

许小姐则反驳，先是问记者你有闻到臭味吗?，并说自己已经养了麝香猪妹妹8年，
有训练过猪要去厕所排泄，而且她都会跟进去处理大便，会用报纸包起来，装入塑胶袋丢垃圾车，
小便会立刻用水冲乾净，尽量做到不要再让它有味道，还特地买了消毒水，无奈邻居依旧无法接受
，养猪养了8年，第一次被邻居抗议!，但她也疲惫不堪，决定下个月搬走。

对此，桑姓房东表示，许女搬来时就事先告知有养猪，并承诺不会制造脏乱，
可是到了7月陆续有其他住户抗议，也多次请她改善。大楼保全则说，
今年夏天开始有住户抗议许女饲养的猪发出排泄物臭味
，影响晾晒衣服跟住户生活，还有人惊讶地说养猪耶，不是养狗、养猫?太夸张。</p>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref,reactive,onMounted } from 'vue'
import {useRoute} from 'vue-router'
import {reqGetNewsById} from '@/api/index'
const route = useRoute()
let rr = reactive({
  article:{
    content:'',
    state:'',
    date:'1970-07-01'
  }
})
const id = route.query.id as string;
console.log(id)
onMounted(async ()=>{
  try {
    if(id!==undefined){
      const {data,status} = await reqGetNewsById(id)
    if(status==200){
      rr.article = data
    }
    }
  } catch (error) {
    console.log(error)
  }

})
</script>
<style lang="less" scoped>
.container {
  width: 60%;
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
.content{
  white-space: pre-warp;
  padding: 10px;
  p{
    font-size: 18px;
    line-height: 30px;
  }
}
</style>