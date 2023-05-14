<template>
  <div class="list">
    <div id="maychar"></div>
    <div id="otherchar"></div>
  </div>
</template>
<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { onMounted, ref,inject,reactive } from "vue";
import { reqGetIncome,reqGetMsgMoney} from "@/api/index";
// import * as echarts from 'echarts';
const router =useRouter()
let echarts = inject("echarts");
let result = reactive({
  income:[{}]
})
onMounted(async () => {
  const {data,status} = await reqGetIncome()
  if(status==200){
    console.log(data)
    result.income=data
    changetype()
  }

})
const changetype = () => {
  // 获取组件实例
  //@ts-ignore
  const machart = echarts.init(document.getElementById("maychar"));
  let nameArr:string[] = []
  result.income.forEach((item)=>{
    if(item.name){
      nameArr.push(item.name)
    }
  })
  console.log('nameArr',nameArr)
  let foodArr:string[] = []
  result.income.forEach((item)=>{
    if(item.food){
      nameArr.push(item.food)
    }
  })
  console.log('foodArr',foodArr)
  // 设置配置项
  const option = {
    xAxis: {
    type: 'category',
    data: nameArr
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: foodArr,
      type: 'line',
      smooth: true
    }
  ]
  };
  // 复制
  machart.setOption(option);
  // 根据页面大小自动响应图表大小
  window.addEventListener("resize", function () {
    machart.resize();
  });
};


</script>
<style lang="less" scoped>
  .list {
  display: flex;
  flex-wrap: nowrap;

  #otherchar {
    max-height: 500px;
    width: 500px;
    height: 500px;
  }

  #maychar {
    max-height: 500px;
    width: 500px;
    height: 500px;
  }
  @media only screen and (min-width:0px) and (max-width:900px){
    #otherchar {
    max-height: 300px;
    width: 300px;
    height: 300px;
  }

  #maychar {
    max-height: 300px;
    width: 300px;
    height: 300px;
  }
}
}
</style>