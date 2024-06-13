<template>
	<view class="container">
		<view class="back_head" @click="too('/','bac')">
			<u--text prefixIcon="arrow-left" iconStyle="font-size: 38rpx;color:#ebebeb" color="#ebebeb" align="left"
				text=""></u--text>
			<u--text color="#fff" bold align="center" text="签到送积分"></u--text>
			<u--text color="#d7d7d7" align="right" text=""></u--text>
		</view>
		<view class="head">
			<view class="box">
				<view style="display: flex;align-items: center;">
					<image src="/static/images/my/coin.png" style="width: 20px;margin-right: 2px;" mode="widthFix"></image>
					我的积分
				</view>
				<view class="sc">
					{{user_info.integral}}
				</view>
			</view>
		</view>
		<view class="content">
			<view class="list">
				<view class="list-item">
					<image src="/static/images/my/score.png" style="width: 100%;" mode="widthFix"></image>
					<view>
						<view>100元加油卡</view>
						<view>兑换要求：兑换要求兑换要求兑换要求</view>
						<view>
							<view class="ad">
								<image src="/static/images/my/coin.png" style="width: 20px;margin-right: 2px;" mode="widthFix"></image>
								666
							</view>
							<view>
								<view class="btn">兑换</view>
							</view>
						</view>
					</view>
				</view>
				<view class="list-item">
					<image src="/static/images/my/score.png" style="width: 100%;" mode="widthFix"></image>
					<view>
						<view>100元加油卡</view>
						<view>兑换要求：兑换要求兑换要求兑换要求</view>
						<view>
							<view class="ad">
								<image src="/static/images/my/coin.png" style="width: 20px;margin-right: 2px;" mode="widthFix"></image>
								666
							</view>
							<view>
								<view class="btn">兑换</view>
							</view>
						</view>
					</view>
				</view>
				<view class="list-item">
					<image src="/static/images/my/score.png" style="width: 100%;" mode="widthFix"></image>
					<view>
						<view>100元加油卡</view>
						<view>兑换要求：兑换要求兑换要求兑换要求</view>
						<view>
							<view class="ad">
								<image src="/static/images/my/coin.png" style="width: 20px;margin-right: 2px;" mode="widthFix"></image>
								666
							</view>
							<view>
								<view class="btn">兑换</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user_info: {
					integral: 0
				}
			};
		}
	}
</script>

<style lang="scss" scoped>
	.list{
		display: grid;
		grid-template-columns: repeat(2,1fr);
		grid-gap: 20px;
		.list-item{
			background: #fff;
			border-radius: 8px;
			>view{
				padding: 5px 10px;
				>view{
					&:nth-of-type(1){
						font-size: 14px;
						color: #222222;
						font-weight: bold;
					}
					&:nth-of-type(2){
						color: #999999;
						padding-bottom: 10px;
						font-size: 10px;
						margin-top: 5px;
						border-bottom: 1px solid #d9d9d9;
					}
					&:nth-of-type(3){
						padding-top: 10px;
						display: flex;
						align-items: center;
						justify-content: space-between;
						>view{
							font-size: 14px;
							color: #F99B46;
						}
					}
					
				}
			}
		}
		.ad{
			display: flex;
			align-items: center;
		}
		.btn{
			background: linear-gradient( 90deg, #2E9FFF 0%, #0182EF 100%);
			border-radius: 36px 36px 36px 36px;
			color: #fff;
			
			padding: 5px 20px;
		}
	}
	.container{
		padding-bottom: 20px;
		background: #f7f7f7;
		min-height: 100vh;
	}
	.content{
		padding: 0 20px;
		transform: translateY(-80px);
	}
	.box{
		display: flex;
		align-items: center;
		
		>view{
			color: #fff;
			font-size: 11px;
		}
		.sc{
			margin-left: 5px;
			font-size: 18px;
			font-weight: bold;
		}
	}
	.head {
		background: linear-gradient( 180deg, #1292FF 40%, rgba(210,227,255,0) 100%);
		height: 50vw;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 20px;
		color: #fff;
		.ti {
			margin-bottom: 10rpx;
			font-size: 38rpx;
			font-weight: bold;
		}
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
		background: #1292FF;
	}
</style>
