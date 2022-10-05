<template>
	<div class="banxin">
		<ul class="cwBaseLi">
			<li v-for="item in cwBase.cwbase" :key="item._id">
				<div class="img" @click="goCwBase(item._id)">
					<img :src="item.img" alt="">
				</div>
				<div class="intro">
					<p>宠物救助者基地：<span>{{item.baseName}}</span></p>
					<p>剩余<el-button type="danger " size="small" round>{{item.notUse}}</el-button>只待收养</p>
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

el-button {
	opacity: 0.5;
}
</style>