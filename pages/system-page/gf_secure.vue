<template>
	<view>
		<view class="ser_list">
			<view class="item" @click="too('/pages/system-page/gf_login-pwd')">
				<u--text prefixIcon="/static/icon/s.png" iconStyle="width:55rpx;height:55rpx;margin-right:18rpx"
					text="登陆密码"></u--text>
				<u--text suffixIcon="arrow-right" align="right" iconStyle="font-size: 16px;color:#999"
					text=""></u--text>
			</view>
			<view class="item" @click="too('/pages/system-page/gf_pay-pwd?v='+is_set_pay)">
				<u--text prefixIcon="/static/icon/s1.png" iconStyle="width:55rpx;height:55rpx;margin-right:18rpx"
					text="支付密码"></u--text>
				<u--text suffixIcon="arrow-right" align="right" iconStyle="font-size: 16px;color:#999"
					text=""></u--text>
			</view>
			<!-- 		<view class="item" @click="logOut">
				<u--text prefixIcon="close-circle" iconStyle="font-size:32rpx;margin-right:10rpx"  text="安全退出"></u--text>
				<u--text suffixIcon="arrow-right" align="right" iconStyle="font-size: 16px;color:#999" text=""></u--text>
			</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				is_set_pay: ''
			};
		},
		onLoad(option) {
			this.is_set_pay = option.v
		},
		methods: {
			logOut() {
				let _ = this;
				uni.showModal({
					title: "提示",
					content: "安全退出此账号 ? ",
					success: (res) => {
						if (res.confirm) {
							uni.clearStorage();
							/*  */
							_.too('/', 'tab')
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.ser_list {
		background-color: #fff;
		border-radius: 10rpx;
		padding: 20rpx 40rpx;

		.item {
			display: flex;
			background-color: #fafafa;
			justify-content: space-between;
			align-items: center;
			padding: 30rpx;
			margin-bottom: 20rpx;
			border-radius: 10rpx;
			border-bottom: 3rpx solid #dce4e7;
		}
	}
</style>