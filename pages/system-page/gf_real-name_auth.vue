<template>
	<view class="content">
		<u--text text="实名认证"></u--text>
		<view style="margin: 30rpx 0 50rpx;">
			<input type="text" v-model="realname" maxlength="8" class="input" placeholder="请输入真实姓名" />
			<input type="text" v-model="ic_number" maxlength="20" class="input" placeholder="请输入身份证号码" />
		</view>
		<u-button color="linear-gradient(to right, #B80606, rgb(216, 68, 68))" iconColor="#fff" class="custom-style"
			text="验证" :loading="isDone" @click="doRealName" :loadingText="regStatus"></u-button>
		<view class="sign_info">
			<text class="title">实名认证</text>
			<text class="t1">1、响应国家政策规定，互联网应用支付、转账、提现等，需要完成实名认证；</text>
			<text class="t2">2、实名认证需要与收款人、注册人信息一致，否则将不能提现；</text>
		</view>
		<template>
			<u-notify ref="uNotify" message=""></u-notify>
		</template>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isDone: false,
				regStatus: '正在验证...',
				realname: '',
				ic_number: '',
				isSet_pay_pwd: false,
			};
		},
		onLoad(option) {
			if (option.v != 0) {
				this.isSet_pay_pwd = true;
			}
		},
		methods: {
			doRealName() {
				if (!this.realname) return this.toa('请输入姓名');
				// if (!uni.$u.test.idCard(this.ic_number)) return this.toa('身份证号码格式不正确');
				this.isDone = true;
				this.to.www(this.api.user_real, {
						realname: this.realname,
						ic_number: this.ic_number
					}, "p")
					.then(res => {
						this.regStatus = '完成';
						let _ = this;
						uni.showModal({
							title: '提示',
							content: "为了您的资金安全，请设置支付密码。",
							showCancel: false,
							confirmColor: "#B80606",
							success(res) {
								if (res.confirm) {
									uni.reLaunch({
										url: '/pages/system-page/gf_pay-pwd?v=0'
									})
								}
							}
						})
					})
					setTimeout(()=>{
						this.isDone = false;
					},1500)
			}
		}
	}
</script>

<style lang="scss">
	.custom-style {
		margin: 120rpx auto 40rpx;
	}

	.content {
		padding: 60rpx;

		.input {
			border-radius: 10rpx;
			padding: 20rpx 30rpx;
			font-size: 30rpx;
			margin-bottom: 40rpx;
			border-bottom: 2rpx solid #d0d4d6;
		}
	}

	.sign_info {
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