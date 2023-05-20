<template>
  <div class="total">累计获得收益为{{ total }}元</div>
  <div class="list">
    <div id="maychar"></div>
    <div id="otherchar"></div>
  </div>
</template>
<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { onMounted, ref, inject, reactive } from "vue";
import { reqGetIncome, reqGetMsgMoney, reqGetCwBase } from "@/api/index";
// import * as echarts from 'echarts';
const router = useRouter()
let echarts = inject("echarts");
let rr = reactive({
  cwBaseArr: [{
    baseName: "",
    baseCw: [],
    phoneNumber: '',
    address: '',
    _id: "",
    income: 0
  }]
})
const total = ref(0)
onMounted(async () => {
  let { data, status } = await reqGetCwBase()
  if (status == 0) {
    rr.cwBaseArr = data
    changetype()
    otherchar()
  }
})
const otherchar = () => {
  //@ts-ignore
  const machart = echarts.init(document.getElementById("otherchar"));
  var option = {
    series: [{
      type: 'liquidFill',
      data: [total.value/200]
    }]
  };
  machart.setOption(option);
  // 根据页面大小自动响应图表大小
  window.addEventListener("resize", function () {
    machart.resize();
  });
}
const changetype = () => {
  // 获取组件实例
  //@ts-ignore
  const machart = echarts.init(document.getElementById("maychar"));
  let baseNameArr: string[] = []
  let foodArr:any[] = []
  rr.cwBaseArr.forEach((item:any) => {
    if (item.baseName) {
      baseNameArr.push(item.baseName)
    }
    if (item.income) {
      foodArr.push(item.income)
      total.value+=parseInt(item.income)
    }else{
      foodArr.push(0)
    }
  })
  console.log('foodArr', baseNameArr,foodArr)
  // 设置配置项
  const option = {
    xAxis: {
      type: 'category',
      axisLabel: {
        // color: "#fff",
        fontSize: 12, //字体大小
        interval: 0, //横轴信息全部显示，必须设置
        // rotate: -30, //-30度角倾斜显示，根据页面布局实际可以自行调整
      },
      data: baseNameArr
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: foodArr,
        type: 'bar',
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

.total{
  font-size: 16px;
  font-weight: 700;
  color: #E9A400;
}
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

  @media only screen and (min-width:0px) and (max-width:900px) {
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