<template>
	<CwNews></CwNews>
	<div class="banxin">
		<div class="page-head">
			<h2>我要领养</h2>
			<p @click="router.push({name:'newhome',query:{id:'635cd985d087d025c767749b'}})">领养须知</p>
		</div>
		
		<el-divider>
      <span class="ly">宠物领养</span>
    </el-divider>
		<ul class="cwBaseLi">
			<li v-for="item in cwBase.cwbase" :key="item._id">
				<div class="img" @click="goCwBase(item._id)">
					<img :src="item.img" alt="">
				</div>
				<div class="intro">
					<p>宠物救助者基地：<span>{{item.baseName}}</span></p>
					<p>剩余<el-button type="danger" size="small" round>{{item.notUse}}</el-button>只待收养</p>
				</div>
			</li>
		</ul>
	</div>
	<div>
		<!-- <span @click="map">地图</span>
		<span @click="shipin">视频通话</span>
		<span @click="tofalse">403</span> -->
	</div>
	<Foots></Foots>
	<Foot></Foot>
	
</template>
<script setup lang="ts">
import { reqGetCwBase } from "@/api/index";
import { useRouter } from 'vue-router';
import { ref, reactive, onMounted } from 'vue'
import { cwBaseStore } from "@/store/cwbase";
import Foot from '@/components/Foot.vue';
import Foots from '@/components/Foots.vue';
import CwNews from '@/components/CwNews.vue'
const router = useRouter()
onMounted(async () => {
	cwBase.getCwBase()
})
const map = () =>{
	router.push({name:'map'})
}
const shipin = () =>{
	router.push({name:'shipin'})
}
const cwBase = cwBaseStore()
const goCwBase = (id: string) => {
	router.push({name:'cwBaseInfo',query:{id:id}})
}
</script>
<style lang="less" scoped>
	span{
		padding: 10px;
	}
	.page-head{
		display: flex;
		justify-content: space-between;
		h2{
			font-size: 20px;
			font: 700 21px/22px ;
    word-wrap: break-word;
    font-style: normal;
    color: #E9A400;
		}
		p{
			color: brown;
			font-size: 16px;
			&:hover{
				text-decoration: underline;
				cursor: pointer;
			}
		}
	}
	.ly{
		color: brown;
		font-size: 16px;
	}
.cwBaseLi {
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
	border: 4px solid transparent;
	border-radius: 20px;
	&:hover{
		border: 4px solid rgb(240, 93, 93);
	}
}

img {
	cursor: pointer;
	width: 250px;
	height: 250px;
	border-radius: 20px;
}

.intro {
	width: 250px;
	position: absolute;
	background-color: rgba(255, 255, 255, 0.3);
	bottom: 3px;
	// left: 8px;
}

.intro p {
	font-size: 18px;
	margin-top: 5px;
	text-indent: 8px;
}

.intro p span {
	color: brown;
}

.el-button {
	opacity: 0.5;
	&:hover{
		opacity: 1;
	}
}
</style>