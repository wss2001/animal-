<template>
  <div>
    <ul class="cwBaseLi">
      <li v-for="item in cwBase.cwArr" :key="item._id" @click="goCwInfo(item._id)">
        <p v-if="item.state" class="lingyangzhe">领养者：{{item.lovePeople}}</p>
        <div class="img">
          <img :src="item.img" alt="">
        </div>
        <div class="intro">
          <p>宠物名称：<span>{{item.name}}</span></p>
          <p>{{item.state?'已领养':'未领养'}}</p>
          <p>剩余口粮<span>{{item.alsoFoodtian}}</span>天</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import { onMounted } from "vue";
import { useRouter } from 'vue-router';
import { cwBaseStore } from "@/store/cwbase";
const router = useRouter()
const cwBase = cwBaseStore()
let id = router.currentRoute.value.query.id as string
onMounted(async () => {
  await cwBase.getCwBaseInfo(id)
  console.log(cwBase.handlecwArr())
})
const goCwInfo = (id: string) => {
  router.push({name:'cwinfo',query:{id:id}})
}
</script>
<style lang="less">
.lingyangzhe {
  font-size: 16px;
  position: absolute;
  top: 5px;
}

.cwBaseLi {
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

li {

  margin-bottom: 15px;
  position: relative;
}

.img {
  width: 250px;
  height: 250px;
}

img {
  cursor: pointer;
  width: 250px;
  height: 250px;
}

.intro {
  width: 250px;
  position: absolute;
  background-color: rgba(255, 255, 255, 0.3);
  bottom: 0;
}

.intro p {
  font-size: 18px;
  margin-top: 5px;
}

.intro p span {
  color: brown;
}
</style>