<template>
  <div class="body">
    <!-- 联系我们-->
		<div>
			<img src="http://www.mengzands.com/images/ban3.jpeg">
		</div>
    <div class="main" role="main">
      <div id="content" class="content full">
        <!-- start container -->
        <div class="container padding-tb60">
          <div class="spacer-50">
            <img src="http://www.mengzands.com/images/zhua.png">
            <h2 style="font-weight: 400;"><span>——</span>宠物救助<span>——</span></h2>
          </div>
          <div class="warp clearfix">
            <div class="kinds clearfix">
              <div class="left-img">
                <img src="http://simg.liecdn.cn/pic/b8/3e/88/b83e8852c3ac33fd20aa2b983e553155.jpg" >
              </div>
              <div class="right-words">
                <h3>小花<span>女孩</span>
                  <p>上海市 杨浦区</p>
                  <hr>
                  <p>
                    救助故事：小熊的妈妈是一只常年生活在修理仓库里的狗狗，身上都沾满了机油。救助人潘阿姨每天都隔着仓库的大铁门喂给狗妈妈吃。后来狗妈妈生下6个宝宝，不幸的是其中一只在出生第二天就被车子压死了。剩下5只小奶狗们逐渐长大，会走路了，潘阿姨不忍心他们被马路杀手夺冠去生命，就把小奶狗带回家找领养。
                  </p>
                </h3>
              </div>
            </div>
            <div class="kinds clearfix">
              <div class="left-img right">
                <img src="http://simg.liecdn.cn/pic/b8/3e/88/b83e8852c3ac33fd20aa2b983e553155.jpg" >
              </div>
              <div class="right-words left">
                <h3>小玉<span>男孩</span>
                  <p>上海市 浦东新区</p>
                  <hr>
                  <p>救助故事：三花猫。小区流3代，姥姥、妈妈脾气都是超级好，身体健康，粘人粘人粘人，现寻找领养的粑粑麻麻，希望它能再次有幸福的家，健康成长，并把欢乐带给领养家庭。
                    宠物描述：小玉，母猫，3个半月。身体健壮，活泼又亲人。 宠物名字：小玉 性别：母 年龄：3个半月 是否打过疫苗：否 是否 </p>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {onMounted,ref,reactive} from 'vue'
</script>
<style lang="less" scoped>
  html, a{
	width:100%;
	font-size: 100%;
	-webkit-text-size-adjust: 100%;
	-ms-text-size-adjust: 100%;
}
a{
	color:#555;
	text-decoration: none;
	cursor: pointer;
	-webkit-transition:all 0.3s ease 0.2s;
	-moz-transition:all 0.3s ease 0.2s;
	-ms-transition:all 0.3s ease 0.2s;
	-o-transition:all 0.3s ease 0.2s;
	transition:all 0.3s ease 0.1s;
}
a:hover,
a:active,
a:focus{
	text-decoration:none;
	outline: 0;
	color:#5e5e5e;
}
a img {
	border: none;
}
a > img {
	vertical-align: middle;
}

.gray-bg{
	background:#f6f5f2;
}
.gray-text{
	color:#CDCBCB;
}
.lgray-bg{
	background:#fff6e9;
}
.dgray-bg, .notice-bar{
	background:#f1ad48;
}
.dgray-bg h1, .dgray-bg h2, .dgray-bg h3, .dgray-bg h4, .dgray-bg h5, .dgray-bg h6, .dgray-bg p{
	color:#fff;
}
img {
	max-width: 100%;
}
img, object, embed, audio, video {
	max-width: 100%;
}
img {
	height: auto;
}
strong, .strong {
  	font-weight: 700;
}
p {
	margin: 0 0 20px;
}
i, em, .italic{
	font-style:italic;
}
.uppercase{
	text-transform:uppercase;
}
.align-left{
	float:left;
	margin:5px 25px 20px 0px!important;
}
.align-right{
	float:right;
	margin:5px 0 20px 25px!important;
}
.text-align-left {
	text-align: left;
}
.text-align-center {
	text-align: center;
}
.text-align-right {
	text-align: right;
}
.color-text {
    color: #ffffff;
}
.through{
	text-decoration:line-through;
}
.border-radius{
	-webkit-border-radius:100%;
	-moz-border-radius:100%;
	border-radius:100%;
}
::-webkit-input-placeholder,
:-moz-placeholder,
::-moz-placeholder,
:-ms-input-placeholder {
   color: #999;
}

h1,
h2,
h3,
h4,
h5,
h6{
	margin:0 0 15px 0;
	color:#333;
	font-weight:300;
	line-height:1.4em;
	font-family: '微软雅黑', serif;
}
h1{
	font-size:42px;
}
h2{
	font-weight:800;
	font-size:30px;
}
h2 small{
	display:block;
	letter-spacing:.1em;
	text-transform:uppercase;
	font-size:45%
}
h3{
	color:rgb(255, 192, 1);
	font-size:22px;
}
h4{
	font-size:18px;
}
h5{
	font-size:13px;
}
h6{
	font-size:13px;
}
h1.huge{
	font-weight:700;
	font-size:60px;
}
h1.short, h2.short, h3.short, h4.short, h5.short, h6.short, p.short{
	margin-bottom:0;
}
h1.long, h2.long, h3.long, h4.long, h5.long, h6.long, p.long{
	margin-bottom:35px;
}
h1.spaced, h2.spaced, h3.spaced, h4.spaced, h5.spaced, h6.spaced {
    margin-top: 22px;
}
h1 a, h2 a, h3 a, h4 a, h5 a, h6 a{
	text-decoration:none;
}
h1 .label, h2 .label, h3 .label, h4 .label, h5 .label, h6 .label{
	font-size:11px;
	position:relative;
	top:-6px;
}
.huge{
	font-size:10em;
}
blockquote {
    background:#f6f5f2;
    border-left:4px solid #7c4c4c;
    margin-bottom:30px;
    padding:30px;
}
blockquote:before {
	display:none;
}
blockquote.aligncenter{
	text-align:center;
}
blockquote cite{
	font-weight:700;
	margin-top:20px;
	display:block;
}
blockquote cite:before{
	content:"- ";
}
p.lead{
	font-size:21px;
	line-height:32px;
}
p.md{
	font-size:16px;
}
p.lg{
	font-size:30px;
}
.lighter p{
	color:#ccc;
}
p.small{
	font-size:10px;
	line-height:13px;
}
.big{
	font-size:200%;
	line-height:1.5em;
}
.spacer-50{
	margin-top:70px;
	text-align: center;
}

/*kinds*/
/*kinds*/
.kinds div{float:left;
width: 50%;}
.kinds div.y{float:right;
width: 50%;}
.right-words span{
	color: rgb(169, 169, 169);
	font-size: 14px;
	padding-left: 10px;
}
.kinds img{width:100%;}
.kinds .right-words.r{padding-left: 50px;
padding-top: 2%;}
.kinds .right-words.l{padding-right: 50px;
padding-top: 2%;}
.warp{margin-top: 50px;}
.kinds p{font-size: 15px;}

/*contact*/
.contact{margin: 50px 0;}
.contact form{
	float: right;
	width: 42%;
}
.contact .map{
	float: left;
	width: 55%;
}
.contact div {
    padding: 5px 0;
}
.contact span label {
    display: block;
    font-size: 1em;
    color: #686868;
    padding-bottom: 5px;
    font-weight: 400;
}
.contact input[type="text"], .contact textarea{
    padding: 10px;
    display: block;
    width: 100%;
    background:#ffffff;
    border: none;
    outline: none;
    color: #464646;
    font-size: 1em;
    -webkit-appearance: none;
    font-weight: 300;
}

.dd-menu{
	margin:0;
	list-style-type:none;
	display:block;
}
#menu-toggle {
    line-height:90px;
    margin-left:25px;
	display:none;
    float:right;
    color:#333;
    font-size:24px;
}
.dd-menu > li {
    display:inline-block;
    margin-left:35px;
    float:left;
    font-size:13px;
    font-weight:400;
    position:relative;
}
.dd-menu > li > a {
    line-height:90px;
    color:#555;
    display:block;
    letter-spacing:1px;
    text-transform:uppercase;
    transition:all 0.3s ease 0.1s;
	position:relative;
}
.dd-menu > li > a > i {
    font-size: 10px;
}
.dd-menu > li > ul > li a:hover{
	color:#fff!important;
}
.dd-menu li span {
	font-size:20px;
	position:relative;
}
.dd-menu li span:after {
	content:"";
	width:0;
	height:2px;
	margin:auto;
	display:block;
	position:absolute;
	bottom:-4px;
	left:0;
	right:0;
	color:transparent;
	-webkit-transition:all 0.3s ease 0.2s;
	-moz-transition:all 0.3s ease 0.2s;
	-ms-transition:all 0.3s ease 0.2s;
	-o-transition:all 0.3s ease 0.2s;
	transition:all 0.3s ease 0.1s;
}
.dd-menu li:hover span:after,
.dd-menu li.active span:after {
	width:100%;
}
.dd-menu > li:hover > a > span:before, .dd-menu > li.current-menu-item > a > span:before, .dd-menu > li.current-menu-parent > a > span:before {
    opacity: 0.8;
    transform: translateZ(0px) scaleX(1);
}
.dd-menu > li ul {
    background:#222;
    display:none;
    height:auto;
    left:-20px;
    list-style-type:none;
    margin:0;
    min-width:210px;
    position:absolute;
    top:100%;
    z-index:999;
}
.dd-menu > li ul:before {
	-moz-border-bottom-colors:none;
    -moz-border-left-colors:none;
    -moz-border-right-colors:none;
    -moz-border-top-colors:none;
    border-color:transparent transparent #222;
    border-image:none;
	border-style:solid;
    border-width:8px;
    content:" ";
    height:0;
    left:35px;
    margin:-15px 0 0;
    pointer-events:none;
    position:absolute;
    top:auto;
    width:0;
}
.dd-menu > li > ul li {
    line-height:normal;
    font-size:14px;
    position:relative;
}
.dd-menu > li > ul > li > a,
.dd-menu > li > ul > li > ul > li > a,
.dd-menu > li > ul > li > ul > ul > li > a {
    border-bottom:1px solid rgba(0, 0, 0, 0.08);
    display:block;
    padding:10px 20px;
    color:#f6f5f2;
    text-decoration:none;
}
.dd-menu > li > ul li ul {
    border:0 none;
    left:100% !important;
    list-style-type:none;
    margin:0 0 0 10px;
    min-width:150px;
    position:absolute;
    top:0 !important;
}
.dd-menu > li ul li ul:before {
    -moz-border-bottom-colors:none;
    -moz-border-left-colors:none;
    -moz-border-right-colors:none;
    -moz-border-top-colors:none;
    border-color:transparent #7c4c4c transparent transparent;
    border-image:none;
    border-style:solid;
    border-width:8px;
    content:" ";
    height:0;
    left:0;
    margin:13px 0 0 -15px;
    pointer-events:none;
    position:absolute;
    top:auto;
    width:0;
}
.ban img{width: 100%;}
/*contact*/


.main {
	width:100%;
}
.white-text {
	color:#fff;
}
.bg-white {
	background:#fff;
}
.text-underline {
	text-decoration:underline;
}
.btn-all {
	background:#fafafa;
	border:1px solid #fff;
	-moz-border-radius:5px;
	-webkit-border-radius:5px;
	border-radius:5px;
	padding:10px 20px;
	display:block;
	color:#666;
	font-size:14px;
	text-align:center;
}
.btn-all:hover {
	background:#f0f0f0;
	border-color:#f0f0f0;
	color:#5e5e5e;
}
.btn-all i {
	margin-left:0.5em;
}
.row.no-gutters {
   margin-right:0;
   margin-left:0;
}
.row.no-gutters > [class^="col-"],
.row.no-gutters > [class*=" col-"] {
   padding-right:0;
   padding-left:0;
}
.obituary-grid-item {
    position:relative;
}
.obituary-grid-item .grid-item-inner::before,
.obituary-carousel-item::before {
    background:rgba(0, 0, 0, 0) linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 100%) repeat scroll 0 0;
    width:100%;
    height:50%;
    bottom:0;
    content:"";
    left:0;
    position:absolute;
    z-index:2;
}
.media-block {
	position:relative;
	display:block;
}
.media-block:before {
	content:"";
	background-color:rgba(0, 0, 0, 0.4);
	width:100%;
	height:100%;
	top:0;
	left:0;
	position:absolute;
	opacity:0;
	display:block;
	z-index:99;
	-webkit-transition:all 0.3s ease 0.2s;
	-moz-transition:all 0.3s ease 0.2s;
	-ms-transition:all 0.3s ease 0.2s;
	-o-transition:all 0.3s ease 0.2s;
	transition:all 0.3s ease 0.1s;
}
.media-block:hover:before {
	opacity:1;
	transition: opacity 0.3s ease 0.2s;
}
.media-block:after {
	content:"\f14c";
	font-family:'FontAwesome';
	width:44px;
	height:44px;
	line-height:44px;
	margin:-22px 0 0 -22px;
	text-align:center;
	top:50%;
	left:50%;
	position:absolute;
	font-size:1.5em;
	color:#fff;
	z-index:999;
	opacity:0;
}
.media-block:hover:after {
	opacity:1;
	transition: opacity 0.3s ease 0.2s;
}
.obituary-grid-item .grid-item-content {
    width:100%;
	height:auto !important;
    padding:20px;
    color:#fff;
    text-align:center;
    position:absolute;
    bottom:0;
    left:0;
    z-index:2;
}
.obituary-grid-item h3 {
    color:#fff;
    margin-bottom:0;
    text-transform:uppercase;
}
.obituary-grid-item hr.sm {
    margin-bottom:6px;
}
.obituary-grid-item .meta-data {
    color:#dbe2e8;
    font-size:12px;
}
.carousel-area {
	padding:22px 30px 30px 30px;
}
.carousel-area h2 {
	padding-top:8px;
	margin-bottom:20px;
}
.carousel-area .owl-carousel .owl-wrapper-outer {
	padding-top:0;
}
.carousel-wrapper img {
	width:100%;
}
.carousel-wrapper-outer {
	overflow:hidden;
}
.carousel-area .carousel-wrapper {
	padding-top:0;
	overflow:visible;
}
.carousel-area .owl-theme .owl-buttons div {
	background:#f6f5f2;
	width:39px;
	height:45px;
	line-height:45px;
	padding:0;
	margin:0;
	font-size:12px;
	color:#666;
	display:block;
	top:-68px;
}
.carousel-area .owl-theme .owl-buttons div:hover {
	background:#f0efed;
	color:#666;
}
.carousel-area .owl-theme .owl-buttons div.owl-prev {
	right:40px;
	left:auto;
}
.carousel-area .owl-theme .owl-buttons div.owl-next {
	right:0px;
}
/* 2.4.1 Banner */
.banner {
	min-height:200px;
	position:relative;
}
.banner:before {
	content:"";
	background-color:rgba(249, 239, 207, 0.28);
	width:100%;
	height:100%;
	left:0;
	top:0;
	position:absolute;
}
.banner-caption {
	width:100%;
	left:0;
	top:50%;
	-moz-transform:translateY(-50%);
	-webkit-transform:translateY(-50%);
	transform:translateY(-50%);
	position:absolute;
}
.banner-caption h2 {
	margin-bottom:0;
	color:#fff;
}
.service-grid-item .grid-item-content {
    background:#fff;
    border:1px solid #eee;
	height:auto !important;
    padding:20px;
}
.read-more {
	font-size:13px;
	font-weight:400;
	text-transform:uppercase;
}
.read-more::after {
    -moz-osx-font-smoothing:grayscale;
    content:"\f0da";
    display:inline-block;
    font-family:FontAwesome;
    font-size:inherit;
    margin-left:5px;
    position:relative;
    text-rendering:auto;
}

.border-heading {
	border-top:1px solid #ebebeb;
	font-size:36px;
	text-align:center;
}
.border-heading span {
	background:#fff;
	padding:20px 30px;
	display:inline-block;
	top:-45px;
	margin-bottom:-45px;
	position:relative;
}
.gray-bg .border-heading span{
	background:#f6f5f2;
}
.testimonial-grid-item {
    padding:50px 0 20px 0;
}
.testimonial-grid-item .meta-data {
	color:#999;
}
.testimonial-outer {
    background:#fff;
    border-radius:3px;
    box-shadow:0 0 15px rgba(0, 0, 0, 0.05);
    position:relative;
}
.testimonial-image {
    width:100%;
    margin-bottom:-60px;
    text-align:center;
    top:-40px;
    position:relative;
}
.testimonial-image img {
	-moz-border-radius:100%;
	-webkit-border-radius:100%;
	border-radius:100%;
    box-shadow:0 0 15px rgba(0, 0, 0, 0.12);
    height:80px;
    width:80px;
}
.testimonial-inner {
    padding:50px 30px 30px;
    text-align:center;
}
.testimonial-outer h4 {
    margin-bottom:0;
}
.testimonial-outer .meta-data {
    font-size:11px;
}
.owl-theme .owl-page span {
	background:#eceae4;
	border:none !important;
}
.post-grid-item .grid-item-content {
    background:#fff;
    border:1px solid #eee;
    padding:20px;
	margin-bottom:1px;
	overflow:hidden;
	position:relative;
}
.grid-post-date {
    background:#f6f5f2;
    width:60px;
    height:100%;
    color:#999;
    left:0;
    padding-top:25px;
    position:absolute;
    text-align:center;
    top:0;
}
.grid-post-date .post-date {
    line-height:21px;
    font-size:28px;
    font-weight:700;
}
.grid-post-date .post-month {
    line-height:12px;
    display:block;
    font-size:12px;
    text-transform:uppercase;
}
.grid-item-content-in {
    padding-left:60px;
}
.grid-item-content-in h3{
	display:block;
	height:60px;
}
.post-grid-item h3 {
    margin-bottom:10px;
}
p.meta-data {
    font-size: 16px;
    line-height: 1.7em;
}
.grid-holder {
    list-style-type:none;
    margin:0;
	width:101%;
	margin-left:-.5%
}
.isotope .grid-item {
    margin-bottom:40px;
}
.team-grid-item .grid-item-content {
    background:#fff;
    border:1px solid #eee;
    padding:20px 25px 25px;
}
.team-grid-item h3, .team-list-item h3 {
    margin-bottom:4px;
}

@media (min-width: 992px) and (max-width: 1199px) {
	.fact-ico {
		margin:0 20px 10px 0;
	}
	.post-content-banner-in {
		height:inherit;
		padding-bottom:50px;
	}
}
@media only screen and (max-width: 992px) {
	.site-header {
		position:relative;
	}
	.contact .map{width:100%;}
	.contact form{width:100%;}
	.site-header .col-md-12 {
		position:static;
	}
	.main-navigation{
		border-top:1px solid #e6e6e6;
		display:none;
		position:absolute;
		width:100%;
		float:none;
		background:#fff;
		top:100%;
		left:0;
		margin-top:0;
	}
	.main-navigation .container{
		width:100%;
	}
	.dd-menu > li{
		width:100%;
		float:none;
		display:block;
		margin-left:0;
	}
	#menu-toggle{
		display:inline-block;
		float:right;
	}
	.dd-menu > li > a {
		border-bottom:1px solid #e6e6e6;
		border-right:0 none;
		color:#333;
		font-size:15px;
		line-height:50px !important;
		padding-left:25px;
	}
	.dd-menu > li > a > span:after {
		display:none;
	}
	.dd-menu > li > a:hover{
		color:#7c4c4c;
	}
	.dd-menu > li ul, .dd-menu > li > ul li ul{
		position:static;
	}
}

@media (max-width:992px) {
	.cont{display: none;}
	.kinds div{
	width: 100%;}
	.kinds div.y{
	width: 100%;}
.kinds .right-words.r{padding-left: 0;}	
.kinds .right-words.l{padding-right: 0px;
}
}
</style>
<style scoped>
  .kinds{
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-text-size-adjust: 100%;
    color: rgb(82, 92, 101);
    box-sizing: border-box;
    outline: none;
    margin: 0;
    padding: 0;
    border: 0;
    font: inherit;
    font-size: 100%;
    height: 500px;
  }
	.kinds{
		display: flex;
		flex-wrap: nowrap;
	}
	.left-img{
		flex: 1;
		order: 1;
		margin: 0 5px;
	}
	.right-words{
		flex:1;
		order: 2;
	}
	.right{
		order: 2;
	}
	.left{
		order: 1;
	}
</style>