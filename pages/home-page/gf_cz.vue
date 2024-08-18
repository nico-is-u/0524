<template>
	<view class="container page3">
		<!-- 顶栏 -->
		<view class="page-navbar">
			<nNavbar title="在线充值" :showBackBtn="true" :back="true"></nNavbar>
		</view>

		<view class="usdt" @click="too('gf_ucz')">
			<image src="/static/images/my/usdt.png" style="width: 22px;" mode="widthFix"></image>
			USDT充值通道
		</view>

		<view class="cny" @click="too('gf_rgm')">
			<image src="/static/images/my/cny.png" style="width: 22px;" mode="widthFix"></image>
			CNY充值通道
		</view>

		<view class="usdt margin-t-40" @click="too('gf_cny3')">
			<image src="/static/images/my/usdt.png" style="width: 22px;" mode="widthFix"></image>
			USDT兑汇人民币
		</view>

		<view class="cny2 margin-t-40" @click="too('gf_cny4')">
			<image src="/static/images/my/cny.png" style="width: 22px;" mode="widthFix"></image>
			人民币汇兑USDT
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
	.usdt{
		display: flex;
		align-items: center;
		justify-content: center;
		image{
			margin-right: 5px;
		}
		width: 100%;
		aspect-ratio: 3.43/1;
		background: url(/static/images/my/ubg.png);
		background-size: 100% 100%;
		background-repeat: no-repeat;
		font-size: 16px;
		font-weight: bold;
		margin-bottom: 20px;
	}
	.cny,.cny2{
		display: flex;
		align-items: center;
		justify-content: center;
		image{
			margin-right: 5px;
		}
		width: 100%;
		aspect-ratio: 3.43/1;
		background: url(/static/images/63.png);
		background-size: 100% 100%;
		background-repeat: no-repeat;
		font-size: 16px;
		font-weight: bold;
	}
.container{
		padding: 10px 20px;
		background: #fff;
		min-height: calc(100vh - 44px);
	}
</style>
