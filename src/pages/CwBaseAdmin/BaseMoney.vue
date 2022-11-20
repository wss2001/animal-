<template >
  <div class="list">
    <div id="maychar"></div>
    <div id="otherchar"></div>
  </div>

</template>
<script setup lang="ts">
import { reactive, ref, onMounted, inject } from 'vue'
import { reqGetCwBaseInfo,reqGetMsgMoney} from "@/api/index";

let echarts = inject("echarts");
let myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)cwBaseAdminToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
let result = reactive({
  cwArr:[{cwid:'',money:0,name:''}],
  msg:[{food:'',cwid:''}]
})
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
  //@ts-ignore
  const machart = echarts.init(document.getElementById("maychar"));
  let nameArr:string[] = []
  result.cwArr.forEach((item)=>{
    nameArr.push(item.name)
  })
  // 设置配置项
  const option = {
    title: {
    text: '每个宠物带来的收益'
  },
    xAxis: {
      type: 'category',
      data: nameArr
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [
          120,
          {
            value: 200,
            itemStyle: {
              color: '#a90000'
            }
          },
          150,
          80,
          70,
          110,
          130
        ],
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
        color: '#c23531',
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