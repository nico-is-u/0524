<template>
	<view>
		<view class="logo">
			<image class="img" src="../../static/icon/logo-r.png" mode="widthFix"></image>
			<view>云数中国</view>
		</view>
		<view class="content">
			中国梦云数中国民族振兴局(简称“云数中国”)是2022年“二十大”党和国家领导人为加快“中国梦”进程而专门设立的扶贫部门，云数中国由国务院批准成立，中华人民共和国财政部及中国人民银行共同拨款，其他各部门积极配合。
		</view>
		<view class="content">
			云数中国作为国务院直属扶贫机构是政府面向社会的窗口，是公众与政府互动的渠道。肩负着实现中华民族伟大复兴的历史使命，在党和国家领导人的领导下带领人民走向共同富裕。
		</view>
		<view class="content">
			云数中国APP于2022年12月25日试运营，2023年1月6日正式上线。欢迎广大人民群众对本APP的建设积极献计献策，提出宝贵意见和建议。
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	.logo {
		width: 50%;
		margin: 60rpx auto 40rpx;
		text-align: center;
		font-size: 70rpx;
		color: $th;

		.img {
			width: 160rpx;
		}
	}
	.content{
		line-height: 45rpx;
		text-indent: 2rem;
		width: 90%;
		margin: 0 auto 50rpx;
	}
</style>