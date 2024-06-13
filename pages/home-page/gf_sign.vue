<template>
	<view style="padding-bottom: 20px;">
		<view class="back_head" @click="too('/','bac')">
			<u--text prefixIcon="arrow-left" iconStyle="font-size: 38rpx;color:#ebebeb" color="#ebebeb" align="left"
				text=""></u--text>
			<u--text color="#fff" bold align="center" text="签到送积分"></u--text>
			<u--text color="#d7d7d7" align="right" text=""></u--text>
		</view>
		<view class="head">
			<view class="box">
				<view style="display: flex;align-items: center;margin-bottom: 5px;">
					<image src="/static/images/my/coin.png" style="width: 20px;margin-right: 3px;" mode="widthFix"></image>
					我的积分
				</view>
				<view class="sc">
					{{user_info.integral}}
				</view>
			</view>
			<image style="width: 35vw;" src="/static/images/my/bg.png" mode="widthFix"></image>
		</view>
		<view class="content">
			<view class="sign_info">
				<view class="title1">签到换好礼</view>
				<view class="t1">已连续签到<text class="fb">{{sgDay}}</text>天，连签七天后领取最高<text class="fb">7</text>积分</view>
			</view>
			<youlanSignIn :sgList="sgList" type="sign" @change="signDate" />
		</view>
		
	</view>
</template>

<script>
	import youlanSignIn from '@/components/youlan-SignIn/youlan-SignIn.vue'
	export default {
		components: {
			youlanSignIn
		},
		data() {
			return {
				sgDay: 0,
				sgList: [],
				user_info: {
					integral: 0
				}
			};
		},
		onLoad() {
			this.to.www(this.api.user_info).then(res => {
				this.user_info = res.data
			})
			this.to.www(this.api.usr_sg_log)
				.then(res => {
					this.sgList = res.data.list
					this.sgDay= res.data.total_continue_days;
				})
			
		},
		methods: {
			signDate(e) {
				this.to.www(this.api.user_sign, {}, 'p')
					.then(res => {
						this.toa('已签到')
					})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.box{
		>view{
			color: #fff;
			font-size: 11px;
		}
		.sc{
			font-size: 20px;
			font-weight: bold;
		}
	}
	.title1{
		color: #222222;
		font-weight: bold;
		font-size: 16px;
	}
	
	.t1{
		color: #666666;
		font-size: 14px;
		border-bottom: 1px #EEEEEE solid;
		padding: 5px 0 17px;
	}
	.fb{
		color: #1292FF;
		margin: 0 3px;
	}
	.content{
		background: #fff;
		width: 92%;
		margin: -58px auto 0;
		box-shadow: 2rpx 2rpx 10rpx 2rpx rgba(33, 46, 104, 0.3);
		padding-bottom: 40rpx;
		border-radius: 20rpx ;
		z-index: 98;
		position: relative;
	}
	.head {
		// background-image: url("../../static/icon/rl.png");
		background: linear-gradient( 180deg, #1292FF 40%, rgba(210,227,255,0) 100%);
		// background-repeat: no-repeat;
		// background-size: 100%;
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

		.dayb {
			display: flex;
			align-items: center;
			text-align: center;
			margin-left: 20rpx;
			.num {
				color: #fff;
				font-weight: bold;
				font-size: 38rpx;
				margin-right: 10rpx;
				margin-left: 10rpx;
				border-radius: 10rpx;
				padding: 10rpx 15rpx;
				background-color: rgb(255, 170, 68)
			}
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



	.sign_info {
		padding: 20px 20px 0 20px;

		.title {
			font-weight: bold;
			display: block;
			margin-bottom: 20rpx;
		}
	}
</style>