<template>
	<view>
		<view class="back_head" @click="too('/','bac')">
			<u--text prefixIcon="arrow-left" iconStyle="font-size: 38rpx;color:#ffffff" color="#ffffff" align="left"
				text=""></u--text>
			<u--text color="#ffffff" align="center" text="提现申请"></u--text>
			<u--text color="#ffffff" align="right" text=""></u--text>
		</view>
		<template>
			<view class="head">
				<view class="title">
					<view style="display: flex;justify-content: space-between;">
						<text>数字人民币总金额</text>
						<!-- <text @click="too('/pages/system-page/gf_amount_draw?type=2')">提现明细</text> -->
					</view>
					<u--text mode="price" align="left" size="28px" color="#fff" :text="team_bonus_balance"></u--text>
				</view>
			</view>
		</template>

		<view class="content">
			<view class="out">
				<text class="fh">¥</text>
				<input class="inpu" type="number" disabled v-model="team_bonus_balance" maxlength="9" placeholder-style="color:#d43229"
					placeholder="请输入提现金额" />
				<text class="all">可提金额</text>
			</view>

			<template>
				<u--text size="30rpx" text="支付密码" customStyle="margin-top:20rpx"></u--text>
				<view style="margin: 30rpx 0 90rpx;opacity: .6;">
					<xt-verify-code :isPassword="true" boxActiveColor="#333" v-model="pay_password"></xt-verify-code>
				</view>
			</template>

			<u-button color="linear-gradient(to right, #bd3124, rgb(216, 68, 68))" iconColor="#fff" class="custom-style"
				text="提现" :loading="isDone" @click="doOut" loadingText="请稍等"></u-button>
			<view class="sign_info">
				<text class="title">注明：</text>
				<text class="t1">提取数字人民币到共富流转商城进行贸易流转后提现。</text>
			</view>
		</view>
		<u-overlay :show="showAd" zIndex="999" opacity="0.3	">
			<view class="warp" @click="closePage">
				<view class="rect">
					<view style="margin-top: 30rpx;text-align: center;padding: 0 30rpx;">
						<svg t="1703902068653" class="icon" viewBox="0 0 1024 1024" version="1.1"
							xmlns="http://www.w3.org/2000/svg" p-id="23931" width="120" height="120">
							<path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#d23732"
								p-id="23932" data-spm-anchor-id="a313x.search_index.0.i1.58d83a81KN3dRt"
								class="selected"></path>
							<path
								d="M411.0464 704.2176a38.4 38.4 0 0 0 54.0288 2.7904l1.7664-1.664 264.5248-268.8a38.4 38.4 0 0 0-52.9024-55.616l-1.8304 1.7408L440.576 622.528l-104.96-115.5456a38.4 38.4 0 0 0-52.3904-4.1856l-1.8432 1.5744a38.4 38.4 0 0 0-4.1856 52.4032l1.5744 1.8432 132.2752 145.6z"
								fill="#FFFFFF" p-id="23933"></path>
						</svg>
						<view style="margin: 50rpx auto 0;width: 80%;">提现成功！</view>
					</view>
				</view>
			</view>
		</u-overlay>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showAd: false,
				pay_password: '',
				isDone: false,
				out_money: '',
				team_bonus_balance: "",
				list: [],
				bankInfo: {}
			};
		},

		onLoad(opt) {
			this.team_bonus_balance = opt.m
		},
		methods: {
			closePage() {
				this.showAd = false;
				setTimeout(() => {
					uni.navigateBack({
						delta:2
					})
				}, 600)
			},
			doOut() {
				let _ = this;
				this.to.www(this.api.scnytoshop, {
						pay_password: this.pay_password
					})
					.then(res => {
						this.showAd = true;
					})

			}
		}
	}
</script>

<style lang="scss" scoped>
	.warp {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
	}

	.custom-style {
		border-radius: 50px;
		height: 90rpx;
		line-height: 90rpx;
	}

	.rect {
		width: 450rpx;
		height: 450rpx;
		border-radius: 10rpx;
		background-color: #fff;
		padding: 20rpx;
		box-shadow: 4rpx 4rpx 30rpx 15rpx rgba(73, 72, 113, 0.3);
		text-align: center;
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
			width: 74%;
			text-align: center;
			margin: 0 auto;
			display: block;
		}
	}

	.content {
		padding: 20rpx 40rpx;
		margin-top: 20rpx;

		.out {
			display: flex;
			align-items: center;
			margin: 30rpx 0;
			padding-bottom: 15rpx;
			border-bottom: 2rpx solid #ececec;

			.fh {
				font-size: 40rpx;
				color: #999;
			}

			.inpu {
				padding: 10rpx;
				font-size: 30rpx;
				margin: 0 20rpx;
				width: 70%;
				border-radius: 8rpx;
				color: #CC4542;
			}

			.all {
				width: 20%;
				text-align: center;
				// background-color: $th;
				color: #4e4e4e;
				font-size: 32rpx;
				border-radius: 8rpx;
			}
		}
	}

	.head {
		background-image: url('../../static/images/home/headbg.png');
		background-repeat: no-repeat;
		background-size: 100%;
		padding: 20rpx 40rpx;
		color: #fff;
		z-index: 9;
		height: 360rpx;
		display: flex;
		align-items: center;
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
		color: #000;
		z-index: 999;
	}
</style>