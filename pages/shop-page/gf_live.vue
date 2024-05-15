<template>
	<view class="page">
		<view class="back_head" @click="too('/','bac')">
			<u--text prefixIcon="arrow-left" iconStyle="font-size: 38rpx;color:#d7d7d7" color="#d7d7d7" align="left"
				text="返回"></u--text>
			<u--text color="#d7d7d7" align="center" text="生活补助"></u--text>	
			<u--text color="#d7d7d7" align="right" text="生活补助"></u--text>	
		</view>
		<image src="../../static/images/home/livet.jpg" mode="widthFix"></image>
		<view class="box">
			<view class="item">
				<view class="text">—— 生活补助 ——</view>
				<view class="xxx">
					<view>
						<text>生活补助：</text>
						<text>0元</text>
					</view>
					<text>提现</text>
				</view>
			</view>
			<view class="item">
				<view class="xxx">
					<text>四月份生活补助50000元</text>
					<text>补领</text>
				</view>
				<view class="xxx">
					<text>五月份生活补助50000元</text>
					<text>补领</text>
				</view>
				<view class="xxx">
					<text>六月份生活补助50000元</text>
					<text>补领</text>
				</view>
			</view>
		</view>
		
		<view class="dgseaukb">
			<view class="btnnn">立即领取</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
			};
		},
		onLoad(option) {
		
		}
	}
</script>

<style lang="scss" scoped>
	.dgseaukb{
		display: flex;
		justify-content: center;
		align-items: center;
		height: 400rpx;
		background-position: bottom;
		background: url('../../static/images/home/liveb.jpg') no-repeat;
		background-size: 100%;
		.btnnn{
			color: #910702;
			margin-top: 120rpx;
			background: #ffdf9a;
			width: 60%;
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			border-radius: 50rpx;
		}
	}
	.box{
		width: 92%;
		margin: 20rpx auto 0;
		.item{
			background-color: #ffdf9a;
			margin-bottom: 20rpx;
			border-radius: 12rpx;
			padding: 20rpx;
			box-sizing: border-box;
			.text{
				font-weight: bold;
				font-size: 40rpx;
				color: #910702;
				text-align: center;
			}
			.xxx{
				display: flex;
				justify-content: space-between;
				align-items: center;
				color: #910702;
				font-size: 32rpx;
				margin: 20rpx 0;
			}
		}
	}
	
	page {
		height: 100vh;
		background-image: linear-gradient(to right,#a90005,#e10006,#a70106);
	}

	.back_head {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 80rpx;
		box-sizing: border-box;
		padding: 50rpx 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #ffffff;
		z-index: 999;
	}

	image {
		width: 100%;
	}
</style>