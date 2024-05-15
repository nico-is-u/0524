<template>
	<view>
		<view class="back_head" @click="too('/','bac')">
			<u--text prefixIcon="arrow-left" iconStyle="font-size: 38rpx;color:#ebebeb" color="#ebebeb" align="left"
				text=""></u--text>
			<u--text color="#ebebeb" align="center" text="每日签到"></u--text>
			<u--text color="#d7d7d7" align="right" text=""></u--text>
		</view>
		<view class="head">
			<view class="box">
				<view class="ti">已签到</view>
				<view class="dayb">
					<text class="num">{{sgDay}}</text>
					<text class="day">天</text>
				</view>
			</view>
		</view>
		<view class="content">
			<youlanSignIn type="sign" @change="signDate" />
		</view>
		<view class="sign_info">
			<text class="title">签到规则</text>
			<text class="t1">1、登录用户每天可以签到一次，签到成功可以领取200元数字人民币；</text>
			<text class="t2">2、如果用户存在违规行为，立即终止其签到；</text>
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
				sgDay: "00"
			};
		},
		onLoad() {
			this.to.www(this.api.usr_sg_log)
				.then(res => {
					this.sgDay= res.data.total_signin_num;
				})
			
		},
		methods: {
			signDate(e) {
				this.to.www(this.api.user_sign, '', 'p')
					.then(res => {
						this.toa('已签到')
					})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		width: 92%;
		margin: -90rpx auto 0;
		box-shadow: 2rpx 2rpx 10rpx 2rpx rgba(33, 46, 104, 0.3);
		padding-bottom: 40rpx;
		border-radius: 20rpx ;
	}
	.head {
		background-image: url("../../static/icon/rl.png");
		background-repeat: no-repeat;
		background-size: 100%;
		height: 450rpx;
		display: flex;
		justify-self: start;
		align-items: center;
		padding-left: 100rpx;
		color: #fff;

		.ti {
			margin-bottom: 10rpx;
		}

		.dayb {
			display: flex;
			align-items: center;
			text-align: center;

			.num {
				color: #ac2023;
				font-weight: bold;
				font-size: 38rpx;
				margin-right: 10rpx;
				border-radius: 10rpx;
				padding: 10rpx 15rpx;
				background-color: rgba(233, 183, 182, .6)
			}
		}
	}

	.back_head {
		position: fixed;
		top: 35px;
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



	.sign_info {
		padding: 30rpx;

		.title {
			font-weight: bold;
			display: block;
			margin-bottom: 20rpx;
		}

		.t1,
		.t2 {
			display: block;
			margin-bottom: 20rpx;
		}
	}
</style>