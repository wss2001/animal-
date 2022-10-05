<template>

  <div class="rowcon banxin">
    <h2>联系我们</h2>
    <div class="contact">
      <h3>宠物救助盒子@哈尔滨理工大学信息科技有限公司</h3>
      <p><span>在线客服：</span>邹小姐</p>
      <p>
      </p>
      <p><span>微&nbsp;&nbsp;信&nbsp;号：</span>6666666gui0</p>
      <p><span>客服电话：</span>400-050-7537  （周一~周五  9:30-18:00）</p>
      <p><span>公司地址：</span>哈尔滨理工大学新主楼2322</p>

      <div class="weixinimg">
        <img src="images/cw1.jpg">
        <p>关注微信公众平台
          在线咨询更便捷~</p>
      </div>
    </div>
    <div class="map">
      <div class="baidumap" id="allmap"></div>
    </div>
  </div>
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
        new Bmap.Point(125.14263635868074, 44.556100647961866),
        11
      ); // 初始化地图,设置中心点坐标和地图级别
      map.setCurrentCity("哈尔滨");
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

<style scoped>
.baidumap {
  width: 480px;
  height: 400px;
  border: 1px solid red;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}

/* 去除百度地图版权那行字 和 百度logo */
.baidumap>.BMap_cpyCtrl {
  display: none !important;
}

.BMap_noprint {
  display: block !important;
}

.anchorBL {
  display: none;
}

.map {
  position: relative;
  float: left;
  width: 480px;
  height: 400px;
  background: pink;
  margin-left: 100px;
}

.rowcon {
  /* background-color: #e7e0d8; */
  font-family: "Microsoft YaHei";
  -webkit-text-size-adjust: none;
  padding: 0;
  /* width: 1200px; */
  margin: 0 auto;
  height: 600px;
  overflow: hidden;
}

h2 {
  line-height: 70px;
  font-size: 36px;
  color: #ff7200;
  text-align: center;
  font-weight: normal;
  margin-bottom: 40px;
}

h3 {
  line-height: 30px;
  font-size: 30px;
  color: #333;
  border-bottom: 1px solid #ddd;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.contact {
  font-family: "Microsoft YaHei";
  -webkit-text-size-adjust: none;
  margin: 0;
  padding: 10px;
  float: left;
  width: 500px;
}

p {
  list-style: none;
  line-height: 30px;
  font-size: 16px;
  color: #333;
  text-align: left;
}

span {
  line-height: 30px;
  font-size: 16px;
  color: #333;
  margin: 0;
  padding: 0;
  width: 120px;
  display: inline-block;
  text-align: left;
}

.weixinimg {
  font-family: "Microsoft YaHei";
  -webkit-text-size-adjust: none;
  margin: 0;
  padding: 20px 0 0;
}

.weixinimg img {
  width: 100px;
  height: 100px;
  border: 2px solid #fff;
  margin: 0 auto 10px;
  display: block;
}

.weixinimg p {
  list-style: none;
  line-height: 30px;
  font-size: 16px;
  color: #ff7200;
  text-align: center;
}
</style>