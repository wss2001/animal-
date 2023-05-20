<template >
  <div class="total">总获得救助金:{{ total }}</div>
  <div class="list">
    <div id="maychar"></div>
    <div id="otherchar"></div>
  </div>

</template>
<script setup lang="ts">
import { reactive, ref, onMounted, inject } from 'vue'
import { reqGetCwBaseInfo,reqGetMsgMoney,reqChangeTotal} from "@/api/index";

let echarts = inject("echarts");
let myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)cwBaseAdminToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
let result = reactive({
  cwArr:[{cwid:'',money:0,name:''}],
  msg:[{food:'',cwid:''}]
})
const total = ref(0)
onMounted(async () => {
  if (document.cookie.includes(myCookie))
    try {
      const form ={
        baseid:myCookie
      }
      let {data,status} = await reqGetCwBaseInfo(myCookie)
      let msg = await reqGetMsgMoney(form)
      if(status==0){
        result.cwArr = data
      }
      if(msg.status==200){
        result.msg = msg.data
        msg.data.forEach((item:any) => {
          if(parseInt(item.food)){
            total.value+=parseInt(item.food)
          }
        });
        reqChangeTotal({id:myCookie,income:total.value})
      }
      result.cwArr.forEach((item:any)=>{
        item.money=0
        for(let i=0;i<result.msg.length;i++){
          if(item._id==result.msg[i].cwid){
            item.money += parseInt(result.msg[i].food)
          }
        }
      })
      console.log(result.cwArr)
      changetype()
      otherchar()
    } catch (error) {
      console.log(error)
    }
})
const changetype = () => {
  // 获取组件实例
  
  let nameArr:string[] = []
  let moneyArr:number[] = []
  result.cwArr.forEach((item)=>{
    nameArr.push(item.name)
    moneyArr.push(item.money)
  })
  console.log(nameArr)
  //@ts-ignore
  const machart = echarts.init(document.getElementById("maychar"));
  // 设置配置项
  const option = {
    title: {
    text: '每个宠物带来的收益'
  },
    xAxis: {
      type: 'category',
      axisLabel: {
        // color: "#fff",
        fontSize: 12, //字体大小
        interval: 0, //横轴信息全部显示，必须设置
        // rotate: -30, //-30度角倾斜显示，根据页面布局实际可以自行调整
      },
      data: nameArr
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: moneyArr,
        type: 'bar'
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
const otherchar = () => {
  let arr:any = []
  result.cwArr.forEach((item)=>{
    const obj = {
      value:item.money,
      name:item.name
    }
    arr.push(obj)
  })
  // 获取组件实例
  //@ts-ignore
  const machart = echarts.init(document.getElementById("otherchar"));
  // 设置配置项
  const option = {
  backgroundColor: '#2c343c',
  title: {
    text: '每个宠物带来的收益',
    left: 'center',
    top: 20,
    textStyle: {
      color: '#ccc'
    }
  },
  tooltip: {
    trigger: 'item'
  },
  visualMap: {
    show: false,
    min: 80,
    max: 600,
    inRange: {
      colorLightness: [0, 1]
    }
  },
  series: [
    {
      name: '宠物名称',
      type: 'pie',
      radius: '55%',
      center: ['50%', '50%'],
      data: arr.sort(function (a:any, b:any) {
        return a.value - b.value;
      }),
      roseType: 'radius',
      label: {
        color: 'rgba(255, 255, 255, 0.3)'
      },
      labelLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.3)'
        },
        smooth: 0.2,
        length: 10,
        length2: 20
      },
      itemStyle: {
        color: '#c90931',
        shadowBlur: 200,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      },
      animationType: 'scale',
      animationEasing: 'elasticOut',
      animationDelay: function (idx:any) {
        return Math.random() * 200;
      }
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
  // flex-direction: column;
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