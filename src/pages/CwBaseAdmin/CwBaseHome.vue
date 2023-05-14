<template>
  <div class="content_box clearfix">

    <div class="left_box clearfix">
      <!-- 联系我们 -->
      <div class="left_contact left_item">
        <div class="left_item_title"><span>店铺信息</span></div>
        <div class="left_item_content clearfix">
          <div class="left_item_content_title">店铺名称</div>&nbsp;:
          <div class="left_item_content_text">{{result.base.baseName}}</div>
        </div>
        <div class="left_item_content clearfix">
          <div class="left_item_content_title">店铺地址</div>&nbsp;:
          <div class="left_item_content_text">{{result.base.address}}&nbsp;&nbsp;&nbsp;&nbsp;
            <span id="showMap" class="left_location" @click="openMap">地图</span>
          </div>
        </div>
      </div>
      <!-- 电话客服 -->
      <div class="main_item_bgc">
        <div class="main_item_bgc_up"></div>
      </div>
      <div class="service_phone left_item">
        <div class="left_item_title"><span>联系电话</span></div>
        <div class="left_item_content clearfix" style="height:24px;">
          <div class="service_phone_item_title">救助热线</div>&nbsp;:
          <div class="left_item_content_text">
            <div><span class="aboutus_content_item">{{result.base.phoneNumber}}</span><span class="aboutus_content_item_name"
                data-num="13032157959" style="margin-right: 0;"><a href="tel:+123456789">查看</a></span></div>
          </div>
        </div>
        <div class="left_item_content clearfix" style="height:24px;">
          <div class="service_phone_item_title">领养热线</div>&nbsp;:
          <div class="left_item_content_text">
            <div><span class="aboutus_content_item">021-6629</span><span class="aboutus_content_item_name"
                data-num="021-66296522" style="margin-right: 0;"><a href="tel:+123456789">查看</a></span></div>
          </div>
        </div>
        <div class="left_item_content clearfix" style="height:24px;">
          <el-button type="warning" @click="handleConnect">视频连线</el-button>
        </div>
      </div>
      <!-- 分类信息 -->
      <div class="main_item_bgc">
        <div class="main_item_bgc_up"></div>
      </div>
      <div class="cateinfo left_item clearfix">
        <div class="clearfix">
          <div class="left_item_title"><span>分类信息</span></div>
        </div>
        <div class="cateinfo_item clearfix" v-for="item in result.news">
          <a class="cateinfo_name hover_color"
            :href="`http://127.0.0.1:5173/#/newhome?id=${item._id}`" target="blank">{{item.title}}</a>
          <div class="cateinfo_text">{{item.content}}</div>
        </div>
        <a href="http://127.0.0.1:5173/" target="blank" class="left_item_more">查看更多</a>
      </div>
    </div> 
    <!-- 内容区 -->
    <div class="main_content clearfix">

      <div class="main_item">
        <div class="product_info_title">{{result.base.baseName}}</div>
        <div class="product_info_time">发布时间：<span style="color: #333;">2023-04-18</span></div>
        <div class="product_info_price">价格：<span style="color: #c40000;font-weight: bold;">1.00元</span></div>
        <div>
          <div class="format">
            <p>
              上海宠物救助领养基地帮助流浪动物找家，成立了近二十年，帮助了几万条流浪动物找到了家园，希望有能力的朋友可以领养只狗狗猫猫帮助狗狗猫猫找到新的家园。本中心几百条狗狗猫猫免费赠送，如果你喜欢狗狗猫猫，不要在宠物店去买，会上当受骗的，病猫狗，星期猫狗等，太多了，买了可能要花几千甚至上万去给宠物看病，后来还可能救不活，大家可以来我们这里领养狗狗猫猫，市中心有专门的领养点，天天开放的。
            </p><br>
            <p>
              上海宠物救助领养中心成立于2000年，上海真实直接收养救助流浪狗猫的地方！我们无偿接受您的领养，被领养的宠物一个月内如果生病，我们免费给予治，再还给领养人，不要一分钱。同时我们需要广大爱心人士捐助、帮助我们，感谢大家！
            </p><br>
            <p>【收养的狗猫主要有两类】</p><br>
            <p>一类，真实的流浪狗猫。</p><br>
            <p>
              流浪在街头、小区等各地的狗猫很多都是生病的，没有打过疫苗驱虫，甚至好多都是一岁之内的狗猫。坦白讲，它们真的很难养！捡到流浪狗猫的人们有的自己会养，如果狗猫生病了，到医院里看病要花很多费用，甚至也可能养不活，他们只有送到我们这里来求我们救活可怜生病狗猫，那些可怜的流浪狗猫的最终结局可想而知。我们收养的流浪狗猫，都会给予悉心照顾，给它们看病的费用都是我们自己出。说实话，我们也有很多后来是有些没能养活的。
            </p><br>
            <p>二类，家养的狗猫中无法续养的。</p><br>
            <p>
              众所周知，上海是座人口流动性很大的城市，生活压力大。近期很多人实在无力饲养家中狗猫，有的是因为地域流动，有的是因为经济原因，有的是因为狗猫产崽等，他们送来给我们帮助饲养。我们和那些送养人的期望是一致的，再给它们找个新主人，让它们继续健康快乐的生活下去。这些狗猫一般是几个月或几岁的家养狗猫，疫苗驱虫每年都做，养起来不大生病，比较好养。
            </p><br>
            <p>
              宠物救助领养中心可供免费提供领养小动物狗品种有：京巴犬、西施犬、蝴蝶犬、泰迪熊犬、比熊犬、博美犬、马尔济斯犬、贵宾犬、吉娃娃犬、约克夏犬、雪纳瑞犬、银狐犬、柯基犬、喜乐蒂犬、苏格兰牧羊犬、边境牧羊犬、英国古代牧羊犬、德国牧羊犬、松狮、萨摩耶犬、哈士奇犬、阿拉斯加雪撬犬、秋田犬、柴犬、金毛犬、拉布拉多水猎犬、混血串串土狗等犬种，猫咪有蓝猫、布偶猫、加菲猫、美短、暹罗猫、金吉拉等，各种混血串种猫土猫等等，年龄有几月到几岁不等。
            </p><br>
            <p>上海宠物救助领养中心市区办事处：</p><br>
            <p>黄浦区宠物救助领养点</p><br>
            <p>闵行区宠物救助领养点</p><br>
            <p>虹口区宠物救助领养点</p><br>
            <p>嘉定区宠物救助领养点</p><br>
            <p>徐汇区宠物救助领养点</p><br>
            <p>静安区宠物救助领养点</p><br>
            <p>普陀区宠物救助领养点</p><br>
            <p>浦东新区宠物救助领养点</p><br>
            <p>长宁区宠物救助领养点</p><br>
            <p>青浦区宠物救助领养点</p><br>
            <p>松江区宠物救助领养点</p><br>
            <p>崇明区宠物救助领养点</p><br>
            <p>杨浦区宠物救助领养点</p><br>
            <p>请想领养狗狗的亲来前和值班电话预约时间，也发短信预约好，再来。具体地址手机短息发给您。因为我们这里不是宠物店，不能保证一直有人，义工们都有自己的工作，望见谅。</p><br>
            <p>义工值班时间：上午八点到晚上八点。</p><br>
            <p>上海宠物救助领养中心，我们是上海市正规的宠物领养机构！请大家认准正规机构，正规领养中心进行领养。</p>
          </div>
        </div>
        <ul class="product_img_list">
          <li class="product_img_item">
            <img src="http://simg.liecdn.cn/pic/01/f2/10/01f210dc8d0ca1d9f78c382184d17166.jpg" alt="静安区流浪狗流浪猫宠物救助站">
          </li>
          <li class="product_img_item">
            <img src="http://simg.liecdn.cn/pic/d9/29/bd/d929bdedcf1e5af04a9f62a9fe902ac5.jpg" alt="静安区流浪狗流浪猫宠物救助站">
          </li>
          <li class="product_img_item">
            <img src="http://simg.liecdn.cn/pic/b8/3e/88/b83e8852c3ac33fd20aa2b983e553155.jpg" alt="静安区流浪狗流浪猫宠物救助站">
          </li>
          <li class="product_img_item">
            <img src="http://simg.liecdn.cn/pic/3d/e1/dd/3de1ddec9ff68f8bec30f6cf74ddafad.jpg" alt="静安区流浪狗流浪猫宠物救助站">
          </li>
          <li class="product_img_item">
            <img src="http://simg.liecdn.cn/pic/d5/e6/a4/d5e6a4a9c793a0f1c0fc170186dd0db0.jpg" alt="静安区流浪狗流浪猫宠物救助站">
          </li>
        </ul>
      </div>
      <div class="main_item_bgc">
        <div class="main_item_bgc_up"></div>
      </div>
      <div class="main_item">
        <div class="main_item_title">
          <div class="main_item_title_lt">精品推荐</div>
        </div>
        <div class="main_item_content">
          <ul class="product_list clearfix">
            <a href="http://chongwulingyang.shop.liebiao.com/product57892561">
              <li class="product_item">
                <img src="http://simg.liecdn.cn/pic/01/f2/10/01f210dc8d0ca1d9f78c382184d17166.jpg" alt="静安区流浪狗流浪猫宠物救助站">
                <div>
                  <div class="product_title">静安区流浪狗流浪猫宠物救助站</div>
                  <div>价格：<span class="product_price">1.00元</span></div>
                </div>
              </li>
            </a>
          </ul>
        </div>
      </div>
    </div>

  </div>
  <el-dialog v-model="dialogVisible" title="地图" width="60%">
    <div class="map">
      <div class="baidumap" id="allmap"></div>
    </div>
  </el-dialog>
  <el-dialog title="提示" v-model="dialogTz" width="30%">
    <span>您还未登录,请跳转到登录页面</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogTz = false">取 消</el-button>
        <el-button type="primary" @click="TzLogin">跳转到登录页面</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router'
import { onMounted, reactive, ref,getCurrentInstance,onBeforeUnmount } from 'vue'
import { reqGetCwBaseInfo,reqGetCwBaseById,reqGetNews } from '@/api/index'
import emitter from '../../utils/mitt';
const route = useRoute()
const router = useRouter()
const id = route.query.id as string
const dialogVisible = ref(false);
let dialogTz = ref(false)
const TzLogin = () => {
  dialogTz.value = false
  router.push({ name: 'userLogin' })
}
onBeforeUnmount(()=>{
  console.log('onBeforeUnmount')
})
let myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)userToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
let url = 'http://127.0.0.1:3003/'
let socket = io.connect(url, {
  path: '/rtckeet'
})
const handleConnect = ()=>{
  if (!myCookie) {
    dialogTz.value = true
    return
  }
  // 在这里传值
  let room = '111'
  socket.emit('usersend','123',{a:room})
  router.push({name:'shipin',query:{room:room,userType:'user',name:'wss'}})
}
const openMap = () => {
  dialogVisible.value = true;
  loadMapScript(); // 加载百度地图资源
}
const init = () => {
  let Bmap = window.BMap; // 注意要带window，不然会报错（注意官方api,会有改动，之前是Bmap,后面3.0版本改为了BMap,最好查文档或者打印一下window）
  var map = new Bmap.Map("allmap"); // allmap必须和dom上的id一直
  // map.centerAndZoom(
  //   new Bmap.Point(105.04263635868074, 30.556100647961866),
  // ); // 初始化地图,设置中心点坐标和地图级别
  var point = new BMap.Point(116.404, 39.925);
	map.centerAndZoom(point, 15);
  map.setCurrentCity("北京");
  map.enableScrollWheelZoom(true);
  var marker = new BMap.Marker(point);  // 创建标注
	map.addOverlay(marker);              // 将标注添加到地图中
	var opts = {
	    width : 200,     // 信息窗口宽度
	    height: 100,     // 信息窗口高度
	    title : "故宫博物院" , // 信息窗口标题
	    message:"这里是故宫"
	}
	var infoWindow = new BMap.InfoWindow("地址：北京市东城区王府井大街88号乐天银泰百货八层", opts);  // 创建信息窗口对象 
	marker.addEventListener("click", function(){          
		map.openInfoWindow(infoWindow, point); //开启信息窗口
	});
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
const result = reactive({
  cwArr: [{}],
  base: {},
  news:[]
})
onMounted(async () => {
  try {
    const { data, status } = await reqGetCwBaseInfo(id)
    const cwBase = await reqGetCwBaseById(id)
    const news = await reqGetNews()
    
    if (status == 0) {
      result.cwArr = data
    }
    result.base = cwBase.data
    let arr = news.data
    result.news = arr.slice(0,7)
    console.log('cwBase',result.news)
  } catch (error) {
    console.log(error)
  }

})
</script>
<style lang='less'>
.map{
  position: relative;
  width: 100%;
  height: 400px;
}
.baidumap {
  width: 100%;
  height: 100%;
  border: 1px solid red;
}

</style>
<style lang="less" scoped>
body {
  min-height: calc(100vh + 5px);
  font-size: 0;
  ;
  background-color: #fff;
  width: 100%;
  min-width: 1200px;
}

/* 公共颜色 */
:root {
  --templateCommenColor: #C40000;
  --footer-bg-color: #C40000;
  --footer-color: #fff;
}

/* main公共样式 */
.shenglve {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.shenglve2 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.content_box {
  width: 1200px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  margin-bottom: 20px;
}

.main_content {
  width: 900px;
  float: right;
  border-radius: 5px;
  font-size: 12px;
  border: 1px solid #e4e4e4;
}

h1 {
  font-weight: normal;
  font-size: 14px;
  color: #333;
}

.main_item_bgc {
  width: 100%;
  height: 10px;
  background-size: cover;
  background-image: linear-gradient(#0000000d, #fff);
}

.main_item_bgc_up {
  width: 100%;
  height: 100%;
  background-image: linear-gradient(90deg, #fff 0%, #00000003 20%, #00000003 80%, #fff 100%);
}

/* 面包屑 */
.navigation_nav {
  padding: 20px 0;
  margin: 0 auto;
  width: 1200px;
}

.navigation_nav_item {
  float: left;
  font-size: 14px;
  color: #333;
  margin-right: 5px;
}

/* main中每个单元的公共样式 */
.main_item {
  background: #fff;
  color: #333;
  position: relative;
  padding: 20px;
}

.main_item_title {
  position: relative;
  width: 858px;
  height: 40px;
  line-height: 40px;
  margin-bottom: 10px;
  box-sizing: content-box;
  text-align: center;
}

.main_item_title_lt {
  font-size: 28px;
  color: #c40000;
  font-weight: bold;
}

.main_item_title_rt {
  display: block;
  margin: 0 auto;
  cursor: pointer;
  font-size: 14px;
  color: #c40000;
  text-align: center;
  width: 200px;
  height: 37px;
  line-height: 37px;
  border-radius: 5px;
  border: 1px solid #c40000;
}

.main_item_title_rt:hover {
  cursor: pointer;
  color: red;
  text-decoration: underline;
}

.main_item_product .main_item_title_rt {
  margin-top: 30px;
}

/* 分页器 */
.pagination {
  text-align: center;
  color: #333;
  padding: 50px 0 30px;
  margin-top: 20px;
  border-top: 1px dashed #ccc;
}

.pagination li {
  display: inline-block;
  background-color: #cccccc;
  height: 36px;
  line-height: 36px;
  width: 36px;
  text-align: center;
  margin-left: 8px;
  font-size: 14px;
}

.pagination .prev,
.pagination .next {
  width: 72px;
}

.pagination li.active {
  background-color: #c40000;
  color: #fff;
}

.pagination a {
  color: #fff;
  display: inline-block;
  width: 100%;
  height: 100%;
}

.pagination li:hover a {
  color: #fff;
}

.pagination li:hover {
  background-color: #c40000;
}

.pagination .disabled {
  color: #999;
  background-color: #ebebeb !important;
}

/* 缺省页 */
.no_item {
  text-align: center;
  font-size: 14px;
  color: #333;
  margin-bottom: 40px;
}

/* 右边悬浮导航 */

/* 鼠标交互颜色 */
.hover_color:hover {
  color: red !important;
}

/* 把我们所有标签的内外边距清零 */
* {
  margin: 0;
  padding: 0;
  /* css3盒子模型 */
  box-sizing: border-box;
  font-family: Microsoft YaHei, Heiti SC, tahoma, arial, Hiragino Sans GB, "\5B8B\4F53", sans-serif;
}

/* html5新增 的布局元素 */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}

/* em 和 i 斜体的文字不倾斜 */
em,
i {
  font-style: normal
}

/* 去掉li 的小圆点 */
ul,
ol,
li {
  list-style: none
}

/* blockquote与q标签都是用来表示内容引用,去掉引号 */
blockquote,
q {
  quotes: none;
}

blockquote:before,
blockquote:after,
q:before,
q:after {
  content: '';
  content: none;
}


textarea {
  overflow: auto;
}

small {
  font-size: 85%;
}

strong,
th {
  font-weight: bold;
}

hr {
  border-bottom: 1px solid #FFFFFF;
  border-top: 1px solid #E4E4E4;
  border-width: 1px 0;
  clear: both;
  height: 2px;
  margin: 5px 0;
  overflow: hidden;
}

/* border-collapse:collapse; 表示边框合并在一起。 
    border-spacing 属性设置相邻单元格的边框间的距离（仅用于“边框分离”模式）。
    */
table {
  border-collapse: collapse;
  border-spacing: 0;
}

img {
  /* border 0 照顾低版本浏览器 如果 图片外面包含了链接会有边框的问题 */
  border: 0;
  /* 取消图片底侧有空白缝隙的问题 */
  vertical-align: middle;
  display: inline-block;
}

button {
  /* 当我们鼠标经过button 按钮的时候，鼠标变成小手 */
  cursor: pointer
}

a {
  color: #333;
  text-decoration: none;
  vertical-align: baseline;
  background: transparent;
}

a:hover {
  color: #c81623
}

button,
input {
  /* "\5B8B\4F53" 就是宋体的意思 这样浏览器兼容性比较好 */
  font-family: Microsoft YaHei, Heiti SC, tahoma, arial, Hiragino Sans GB, "\5B8B\4F53", sans-serif;
  /* 默认有灰色边框我们需要手动去掉 */
  border: 0;
  outline: none;
}

/*文字就会和INPUT框对齐。 */
input,
select {
  vertical-align: middle;
}

body {
  /* CSS3 抗锯齿形 让文字显示的更加清晰 */
  -webkit-font-smoothing: antialiased;
  background-color: #fff;
  font: 12px/1.5 Microsoft YaHei, Heiti SC, tahoma, arial, Hiragino Sans GB, "\5B8B\4F53", sans-serif;
  color: #666
}


.hide,
.none {
  display: none
}


/* 清除浮动 */
.clearfix:after {
  visibility: hidden;
  clear: both;
  display: block;
  content: ".";
  height: 0
}

.clearfix {
  *zoom: 1
}

/* 服务项目详情 */
.product_info_title {
  width: 432px;
  text-align: center;
  margin: 0 auto;
  font-size: 18px;
  color: #333;
  margin-bottom: 20px;
  padding-top: 5px;
  font-weight: bold;
}

.product_info_time {
  margin: 0 auto;
}

.product_info_time,
.product_info_price {
  width: 200px;
  text-align: center;
  margin: 0 auto;
  margin-bottom: 20px;
  font-size: 14px;
  color: #999;
}

.product_img_item {
  width: 100%;
  text-align: center;
  margin: 20px 0;
}

.product_img_item img {
  max-width: 100%;
}

.format {
  display: inline-block;
  line-height: 28px;
  text-indent: 2em;
  font-size: 14px;
  color: #333;
}


/* 精品推荐 */
.main_item_title_lt {
  font-size: 18px;
}

.product_list {
  margin-bottom: -20px;
  font-size: 0;
}

.product_item {
  width: 200px;
  height: 230px;
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid #ccc;
  display: inline-block;
  margin-bottom: 20px;
  overflow: hidden;
}

.product_list>a {
  display: inline-block;
  margin-right: 19px;
}

.product_list>a:hover .product_item {
  box-shadow: 3px 3px 5px #66666659;
  color: #333;
}

.product_list>a:nth-of-type(4n) {
  margin-right: 0;
}

.product_item img {
  width: 100%;
  height: 133px;
  border-bottom: 1px solid #eee;
}

.product_item>div {
  padding: 15px;
  font-size: 14px;
}

.product_title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  color: #333;
  margin-bottom: 16px;
}

.product_price {
  color: #c40000;
  font-weight: bold;
  font-size: 14px;
}

/* 左侧栏公共样式 */
.left_box {
  float: left;
  border: 1px solid #e4e4e4;
  border-radius: 5px;
}

.left_item {
  width: 280px;
  overflow: hidden;
  padding: 20px;
}

.left_item:last-of-type {
  margin-bottom: 0px;
}

.left_item_title {
  font-size: 18px;
  color: #C40000;
  font-weight: bold;
  position: relative;
  left: 0px;
  height: 40px;
  line-height: 40px;
  margin-bottom: 15px;
  box-sizing: content-box;
  text-align: center;
}

.left_item_title span {
  display: inline-block;
  width: 75px;
  padding-bottom: 15px;
}

.left_item_content {
  font-size: 14px;
  margin-bottom: 10px;
  color: #333;
}

.left_item_content:last-of-type {
  margin-bottom: 0;
}

.left_item_content_title::after {
  content: '';
  display: inline-block;
  padding-left: 100%;
  position: absolute;
}

.left_item_content_title {
  float: left;
  width: 58px;
}

.left_item_content_title {
  text-align-last: justify;
  text-align: justify;
}

.left_item_content_text {
  float: right;
  width: 166px;
}

.left_item_content_text a {
  color: #1155CC;
}

.left_item_content_text a:hover {
  color: #FF0000;
  text-decoration: underline;
}

.left_item_content a {
  color: #4fa4e5;
}

/* 联系我们 */
.left_location {
  color: #4fa4e5;
  font-size: 12px;
  display: inline-block;
  cursor: pointer;
}

.left_location:hover {
  color: #FF0000;
}

.left_location::before {
  content: "";
  display: inline-block;
  width: 16px;
  height: 16px;
  background: url(/image/shop/template/116/left_location_blue_new.png) no-repeat;
  margin-right: 2px;
  background-size: cover;
  vertical-align: sub;
}

.left_location:hover::before {
  background: url(/image/shop/template/116/left_location_red.png) no-repeat;
  margin-right: 2px;
  background-size: cover;
}

.left_contact {
  padding-bottom: 26px;
}

/* 电话客服 */
.service_phone {
  padding-bottom: 25px;
}

.service_phone .left_item_content_text {
  float: none;
  display: inline-block;
  width: auto;
}

.service_phone .left_item_content_title {
  display: inline-block;
}

.service_phone_item_title {
  display: inline-block;
}

/* QQ客服 */
.service_QQ {
  padding-bottom: 5px;
}

.QQ_item {
  display: block;
  height: 50px;
  margin-bottom: 15px;
  font-size: 14px;
  color: #333;
}

.QQ_item:hover {
  cursor: pointer;
}

.QQ_item:hover div {
  color: red;
  text-decoration: underline;
}

.QQ_item:last-of-type {
  margin-bottom: 0;
}

.QQ_item>div {
  height: 100%;
  padding-left: 55px;
}

.QQ_item i {
  display: inline-block;
  width: 36px;
  height: 36px;
  background: url(/image/shop/template/116/left_QQ.png) no-repeat;
  background-size: cover;
  float: left;
  transform: translateY(8px);
}

.QQ_name {
  padding: 3px 0;
}

/* 分类信息 */
.cateinfo .left_item_title {
  float: left;
  margin-bottom: 5px;
  width: 240px;
}

.cateinfo>div {
  margin-bottom: 10px;
  position: relative;
}

.left_item_more {
  display: block;
  width: 240px;
  height: 37px;
  line-height: 37px;
  text-align: center;
  margin: 0 auto;
  background-color: #e4e4e4;
  border-radius: 5px;
  font-size: 12px;
  color: #666;
  margin: 20px 0;
}

.left_item_more:hover {
  cursor: pointer;
  color: red;
  text-decoration: underline;
}

.cateinfo_item img {
  width: 80px;
  height: 60px;
  float: left;
  border-radius: 5px;
  overflow: hidden;
  border: 1px solid #eee;
}

.cateinfo .cateinfo_item {
  display: block;
  margin-bottom: 10px;
  font-size: 14px;
  color: #333;
}

.cateinfo_item:last-of-type {
  margin-bottom: 0;
}

.cateinfo_name,
.cateinfo_text {
  display: block;
  line-height: 28px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cateinfo_text {
  color: #999;
  font-size: 12px;
}

.cateinfo_name {
  padding: 2px 0;
  color: #0168BE;
  position: relative;
}

.cateinfo_name:hover {
  color: #F8610B;
  text-decoration: underline;
}

/* 联系电话 */
.aboutus_content_div {
  position: relative;
  float: left;
}

span.aboutus_content_item {
  font-weight: normal;
  color: #333333 !important;
}

// span.aboutus_content_item:after {
//   content: "****";
//   font-weight: normal;
//   font-size: 14px;
//   display: inline-block;
//   vertical-align: middle;
//   text-align: center;
// }

span.aboutus_content_item_xing:after {
  content: '';
  font-weight: normal;
  font-size: 14px;
  display: inline-block;
  vertical-align: middle;
  text-align: center;
}

span.aboutus_content_item_name {
  margin-left: 10px;
  margin-right: 40px;
  color: #4fa4e5;
  cursor: pointer;
  font-weight: normal;
}

.aboutus_content_item_name:hover {
  color: #FF0000;
}</style>