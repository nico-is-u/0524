<template>
	<view class="page_buy">
		<view class="pay_box">
			<u--text prefixIcon="coupon-fill" iconStyle="font-size: 34rpx;margin-top:6rpx;margin-right:8rpx" size="14"
				text="支付交接金"></u--text>
			<view class="pay_info">
				<text class="t2">{{Number(do_buy_data.payment_money).toFixed(2)}}</text>
				<text class="t3">元</text>
			</view>
			<view style="display: flex;justify-content: space-between;margin-top: 15rpx;align-items: center;">
				<u--text size="14" :text="'总余额：'+user_yue" color="#757575"></u--text>
				<u--text size="14" align="right" :text="user_yue<do_buy_data.payment_money?'余额不足，请充值':''"
					suffixIcon="arrow-right" color="#993939" @click="too('/pages/home-page/gf_top-up')"></u--text>
			</view>
			<view style="margin-top: 80rpx;">
				<u--text prefixIcon="coupon-fill" iconStyle="font-size: 34rpx;margin-top:6rpx;margin-right:8rpx"
					size="14" text="请输入支付密码"></u--text>
				<view style="margin: 30rpx 0 0;">
					<xt-verify-code :isPassword="true" boxActiveColor="#333" v-model="pay_password"></xt-verify-code>
				</view>
			</view>
			<view class="u-content-color">
				注明：提交缴纳<text style="font-weight: bold;color: #B80606;">{{do_buy_data.payment_money}}</text>
				元资产交接验证金，24小时后即可交接完成，验证金25天后返回数字人民币钱包，如发现虚假填写资料，核实后将冻结账号处理。
			</view>
			<u-button iconColor="#fff" class="custom-style" :loading="donePayBtn" :loadingText="loadStatus" text="支付" @click="duBuyBtn"></u-button>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				donePayBtn:false,
				loadStatus:'处理中...' ,
				user_yue: '0.0',
				pay_password: '',
				do_buy_data: {}
			}
		},
		onShow() {
			this.to.www(this.api.user_info)
				.then(res => {
					this.user_yue = Number(res.data.cash).toFixed(2);;
					uni.setStorage({
						data: res.data,
						key: 'user_info'
					});
				})
		},
		onLoad() {
			let _ = this;
			const SUBJECT_DATA = uni.getStorageSync("DOBUYZCYZ");
			this.do_buy_data = SUBJECT_DATA;
		},
		methods: {
			duBuyBtn() {
				let _ = this;
				if (this.pay_password.length !== 6) return this.toa("请输入支付密码")
				_.donePayBtn = true;
				_.to.www(_.api.zc_recover_subject, {
						..._.do_buy_data,
						pay_password: this.pay_password
					}, 'p')
					.then(res => {
						uni.removeStorageSync("SUBJECT_DATA")
						uni.showModal({
							title: '提示',
							content: '提交成功，验证金在25天后退回至账户。',
							showCancel: false,
							confirmColor: "#B80606",
							success(res) {
								_.to.www(_.api.user_info)
									.then(res => {
										uni.setStorage({
											data: res.data,
											key: 'user_info'
										});
									})
								if (res.confirm) {
									uni.switchTab({
										url: "/pages/index/my"
									})
								}
							}
						})
					})
				setTimeout(()=>{
					_.donePayBtn = false;
				},2500)
			}
		}
	}
</script>

<style lang="scss">
	.page_buy {
		padding: 40rpx 20rpx;
	}

	.pay_info {
		font-size: 40rpx;
		color: #B80606;
		margin-top: 10rpx;

		.t1 {
			font-size: 70rpx;
			font-weight: bold;
			margin-right: 10rpx;
			display: inline-block;
		}

		.t2 {
			@extend .t1;
		}
	}

	.u-content-color {
		line-height: 1.6rem;
		height: 200rpx;
		margin-top: 80rpx;
	}

	.custom-style {
		margin: 200rpx 0 0;
		border-radius: 50rpx;
		height: 80rpx;
		line-height: 80rpx;
		background-color: $th;
		color: #FFF;
	}

	.pay_box {
		padding: 0 40rpx;

		.pay_list_item {
			margin: 25rpx 0 40rpx;
			height: 75rpx;
			display: flex;
			align-items: center;
			padding: 0 20rpx;
			border-radius: 8rpx;
			line-height: 75rpx;
			background: rgba(158, 158, 171, 0.3);
		}

		.pwd_iput {
			height: 75rpx;
			padding: 0 20rpx;
			margin: 30rpx 0;
			border-radius: 8rpx;
			line-height: 75rpx;
			background: rgba(195, 195, 210, 0.1);
			border: 2rpx solid $th;
		}

		.showselet {
			background: $th;
			color: #fff;
			transition: all .2s;
		}
	}
</style>