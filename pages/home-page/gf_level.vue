<template>
	<view class="container">
		<view class="back_head" @click="too('/','bac')">
			<u--text prefixIcon="arrow-left" iconStyle="font-size: 38rpx;color:#ebebeb" color="#ebebeb" align="left"
				text=""></u--text>
			<u--text color="#fff" bold align="center" text="等级提升"></u--text>
			<u--text color="#d7d7d7" align="right" text=""></u--text>
		</view>
		<view class="content">
			<u-swiper :autoplay="false" previousMargin="30" bgColor="#40496F"
			        nextMargin="30"
			        circular :list="list1" @change="change" @click="click"></u-swiper>
			<view class="form">
				<view class="title1">当前等级权益</view>
				<view>大众会员V1权益</view>
				<view>
					<view>资产要求</view>
					<view>-</view>
				</view>
				<view>
					<view>购买会员等级</view>
					<view>-</view>
				</view>
				<view>
					<view>月度礼包（话费）</view>
					<view>￥20</view>
				</view>
				<view>
					<view>理财加速收益</view>
					<view>-</view>
				</view>
				<view>
					<view>周期资产解冻最高等级</view>
					<view>￥2800</view>
				</view>
				<view>
					<view>推荐会员奖励</view>
					<view>10%</view>
				</view>
			</view>
			<view class="btn active">您已购买当前等级</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list1: [
					'/static/images/my/level1.png',
					'/static/images/my/level2.png',
					'/static/images/my/level3.png',
					'/static/images/my/level4.png',
					'/static/images/my/level5.png',
				]
			};
		},
		methods: {
			change(index) {
				console.log(index);
			}
		},
	}
</script>

<style lang="scss">
	.btn{
		width: 70%;
		text-align: center;
		background: #1292FF;
		color: #fff;
		margin: 0 auto;
		margin-top: 30px;
		padding: 10px;
		font-size: 16px;
		font-weight: bold;
		border-radius: 23px;
	}
	.active{
		opacity: 0.5;
	}
	.form{
		margin: 20px;
		
		.title1{
			margin-bottom: 10px;
			color: #fff;
			font-size: 16px;
		}
		>view{
			&:nth-of-type(2){
				padding: 8px 0;
				text-align: center;
				background: rgba(255,255,255,0.1);
				color: #fff;
				border: 1px solid rgba(255,255,255,0.1);
			}
			&:nth-of-type(n + 3){
				display: flex;
				>view{
					padding: 8px 0;
					border: 1px solid rgba(255,255,255,0.1);
					color: #fff;
					text-align: center;
					&:nth-of-type(1){
						flex: 7;
					}
					&:nth-of-type(2){
						flex: 8;
					}
				}
			}
		}
	}
	.content{
		padding-top: 64px;
	}
	.back_head {
		position: fixed;
		// top: 40px;
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
.container{
		padding-bottom: 20px;
		background: #40496F;
		min-height: 100vh;
	}
</style>
