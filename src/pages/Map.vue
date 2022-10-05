<!-- vue 3 引入百度api -->
<template>
  <div class="baidumap" id="allmap"></div>
</template>
 
<script>
import { defineComponent, onMounted } from "vue";
export default defineComponent({
  setup() {
    onMounted(() => {
      loadMapScript(); // 加载百度地图资源
    });
    // 初始化地图
    const init = () => {
      let Bmap = window.BMap; // 注意要带window，不然会报错（注意官方api,会有改动，之前是Bmap,后面3.0版本改为了BMap,最好查文档或者打印一下window）
      var map = new Bmap.Map("allmap"); // allmap必须和dom上的id一直
      map.centerAndZoom(
        new Bmap.Point(104.04263635868074, 30.556100647961866),
        11
      ); // 初始化地图,设置中心点坐标和地图级别
      map.setCurrentCity("北京");
      map.enableScrollWheelZoom(true);
    };
    const loadMapScript = () => {
      // 此处在所需页面引入资源就是，不用再public/index.html中引入
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.className = "loadmap"; // 给script一个类名
      script.src =
        "https://api.map.baidu.com/getscript?v=3.0&ak=rqFsGZiGnGqzahWY4HGxAXduxmgAfpLl";
        // 此处需要注意：申请ak时，一定要应用类别一定要选浏览器端，不能选服务端，不然地图会报ak无效
      script.onload = () => {
        // 使用script.onload，待资源加载完成，再初始化地图
        init();
      };
      let loadmap = document.getElementsByClassName("loadmap");
      if (loadmap) {
        // 每次append script之前判断一下，避免重复添加script资源标签
        for (var i = 0; i < loadmap.length; i++) {
          document.body.removeChild(loadmap[i]);
        }
      }
 
      document.body.appendChild(script);
    };
  },
});
</script>
<style lang='less'>
.baidumap {
  width: 1000px;
  height: 500px;
  border: 1px solid red;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
/* 去除百度地图版权那行字 和 百度logo */
.baidumap > .BMap_cpyCtrl {
  display: none !important;
}
.BMap_noprint{
  display: block !important;
}
.anchorBL{
  display: none;
}

</style>