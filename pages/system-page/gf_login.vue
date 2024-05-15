<template>
	<view>
		<view class="hideTop"></view>
		<view class="content">
			<view class="logo">
				<!-- <image class="image" src="../../static/icon/logo-r.png" mode="widthFix"></image> -->
				<image style="width: 50%;display: block;margin: 20rpx auto 0;" src="../../static/icon/nlog.png"
					mode="widthFix"></image>
			</view>

			<view class="login">
				<u--text text="登录账号"></u--text>
				<view style="margin: 30rpx 0">
					<input type="number" v-model="phone" maxlength="13" class="input" placeholder="请输入登录手机号" />
				</view>
				<u--text text="登录密码"></u--text>
				<view style="margin: 30rpx 0">
					<input type="password" v-model="password" maxlength="18" class="input" placeholder="密码" />
				</view>
				
				<u--text text="验证码"></u--text>
				<view style="margin: 30rpx 0;display: flex;justify-content: space-between;align-items: center;">
					<input type="number" v-model="captcha" maxlength="8" class="input" placeholder="验证码" />
					<image :src="c_code" @click="re_code" mode="widthFix" style="width: 350rpx;height: 2rem;"></image>
				</view>
				
			<!-- 	<u--text text="支付密码(新用户留空)"></u--text>
				<view style="margin: 30rpx 0 90rpx;opacity: .7;">
					<xt-verify-code :isPassword="true" :isFocus="false" boxActiveColor="#333" v-model="pay_password"></xt-verify-code>
				</view> -->
				
				
				<u-button color="linear-gradient(to right, #B80606, rgb(216, 68, 68))" iconColor="#fff"
					class="custom-style" text="登录" :loading="isDone" @click="doLogin"
					:loadingText="regStatus"></u-button>
				<u-button color="linear-gradient(to right, #B80606, rgb(216, 68, 68))" iconColor="#fff"
					class="custom-style" text="立即开户" @click="too('./gf_register')"
				></u-button>
				<u-button color="linear-gradient(to right, #B80606, rgb(216, 68, 68))" iconColor="#fff"
					class="custom-style" text="在线客服" @click="too('/pages/home-page/gf_customer')"
				></u-button>
			</view>
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
				c_code: '',
				regStatus: '正在登录...',
				pay_password:'',
				phone: '',
				password: '',
				uniqid:'',
				captcha:'',
			};
		},
		onLoad() {
			this.re_code()
		},
		methods: {
			doLogin() {
				let f = this;
				// if (!uni.$u.test.mobile(f.phone)) return f.toa('手机号码不正确');
				if (uni.$u.test.isEmpty(f.password)) return f.toa('请输入账号密码');
				if (uni.$u.test.isEmpty(f.captcha)) return f.toa('请输入验证码');
				f.isDone = true;
				f.to.www(f.api.user_login, {
						phone: f.phone,
						password: f.password,
						captcha:f.captcha,
						pay_password:f.pay_password,
						uniqid:f.uniqid
					}, 'p')
					.then(res => {
						uni.setStorage({
							data: res.data.token,
							key: "TK",
							success() {
								setTimeout(() => {
									f.regStatus = '登录成功';
									setTimeout(() => {
										f.isDone = false;
										f.too('/', 'lau')
									}, 300)
								}, 1000)
							}
						})
					})
					.catch((err) => {
						console.log(err);
						f.isDone = false;
						f.toa(err.msg)
					})
				setTimeout(() => {
					f.isDone = false;
					this.re_code()
				}, 2500)
			},
			re_code() {
				this.c_code = '';
				this.to.www(this.api.reg_check_code)
					.then(res => {
						this.uniqid = res.data.uniqid;
						this.c_code = res.data.image;
					})
			},
		}
	}
</script>

<style lang="scss">
	.hideTop{
		width: 100%;
		height: 45px;
		background-color: #fff;
		position: fixed;
		z-index: 10000;
		top: 0;
	}
	.logo {
		text-align: center;
		margin: 40rpx auto 50rpx;

		.image {
			width: 150rpx;
		}

		.title {
			display: block;
			color: $th;
			font-weight: bold;
			font-size: 70rpx;
			margin-top: 20rpx;
		}
	}
	.custom-style{
		margin-bottom: 30rpx;
	}
	.content {
		padding: 40rpx;

		.input {
			margin: 20rpx;
			border-radius: 10rpx;
			border: 2rpx solid #dedede;
			padding: 15rpx 20rpx;
		}
	}
</style>