<template>
  <div class="container">
		<div class="head">
			<div class="intro">全球视野 本土智慧</div>
			<div class="wz02">
				<span>法律咨询电话：<a style="color: #FF874F;" href="tel:400-060-0148">400-060-0111</a></span>
				<br>
				<span>English Service：<a style="color: #FF874F;" href="tel:400-700-1516">400-700-1314</a></span>
			</div>
		</div>
	</div>
	<div class="mian">
		<div class="aboutUs">
			<span class="au-title">关于哈理工宠物救助</span>
		</div>
		<div>
			<p>
				<img src="http://beijing.yingkelawyer.com/images/1.jpg" />
				县级人民政府和乡级人民政府、街道办事处应当结合本地实际，做好农村地区饲养犬只的防疫管理工作。北京市盈科律师事务所简称盈科律师事务所，是一家全球化法律服务机构，总部设在中国哈尔滨，宠物救助哈尔滨总部超过1000名员工，致力于为客户提供全球商务法律服务，为客户创造价值。
				盈科在发展中坚持"以人为本"的人才战略，逐步形成了由专业律师人才、专业市场人才、专业管理人才组成的人才队伍，保障了律师事务所整体战略目标的实现。律所业务范围划分为房地产与建设工程法律事务、公司法律事务、国际与区际法律事务、行政法律事务、金融与资本市场法律事务、民商事法律事务、刑事法律事务与知识产权法律事务八个领域。此外，盈科还聘请了在国内外法学理论及实务领域享有声誉的法学专家担任专家顾问。
				为客户提供满意的法律服务是我们矢志不渝的目标，盈科坚持"以客户为导向"，专门成立"客户服务中心"和"投融资中心"，始终以客户的需求为关注焦点，以顾客满意为工作目标，充分发挥盈科全球化法律服务体系的优势，整合全球各地办公室、各专业部门和全体律师的资源，不仅为客户解决法律问题，还为客户提供商业机会、促进客户合作，为客户提供专业化、综合性的法律服务。
				"流水之为物也，不盈科不行；君子之志于道也，不成章不达"。盈科律师事务所将努力发挥自身优势，整合全球资源为客户提供优质、高效的法律服务，让客户满意。
			</p>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { ref, reactive, onMounted } from 'vue'

</script>
<style lang="less" scoped>
  .container {
		width: 100%;
		height: 400px;
		background: url('http://beijing.yingkelawyer.com/images/banner.jpg');
		background-repeat: no-repeat;
		background-position: center;
		background-position-y: top;
		padding-top: 200px;
	}

	.intro {
		font-family: "微软雅黑";
		text-align: center;
		margin: 0px;
		padding: 0;
		height: 110px;
		line-height: 110px;
		font-size: 52px;
		color: #fff;
		text-shadow: 1px 1px 3px #000;
	}

	.wz02 {
		font-family: "微软雅黑";
		text-align: center;
		padding: 0;
		margin: 0 auto;
		height: 32px;
		line-height: 32px;
		font-size: 20px;
		width: 510px;
		text-shadow: 1px 1px 3px #000;
		color: #FF874F;
	}

	.aboutUs {
		text-align: center;
	}

	.au-title {
		font-family: "微软雅黑";
		line-height: 82px;
		text-align: center;
		font-size: 42px;
		letter-spacing: 2px;
		color: #282828;
		margin: 0px;
		padding: 0;
		border-bottom: 2px solid #0A2B4A;
		display: inline-block;
	}

	p {
		color: #6a6a6a;
		margin: 0px;
		padding: 0;
		line-height: 2;
		font-size: 16px;
	}

	img {
		width: 200px;
		height: 180px;
		float: left;
		margin: 10px;
	}
</style>