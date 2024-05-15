<template>
	<view>
		<view class="content">
			<view class="logo">
				<image class="image" src="../../static/icon/nlog2.png" mode="widthFix"></image>
			</view>
			<view class="login">
				<view class="item">
					<u--text customStyle="width:5rem" text="手机号"></u--text>
					<input type="number" maxlength="13" v-model="parms.phone" class="input" placeholder="请输入手机号" />
					<u-icon name="eye" color="#fff"></u-icon>
					<view style="width: 380rpx;position: relative;" @click="showStIon=!showStIon">
						<u--text suffixIcon="arrow-down" size="32rpx" iconStyle="font-size: 42rpx;margin-left:8rpx"
							:text="regionListText[SelectionRegion]"></u--text>
						<view class="select_ion" :class="showStIon?'show':''">
							<text v-for="(item,index) in regionListText" :key="index"
								@click="SelectionRegion = index">{{item}}</text>
						</view>
					</view>
				</view>
				<view class="item">
					<u--text customStyle="width:5rem" text="验证码"></u--text>
					<input type="number" maxlength="11" v-model="parms.captcha" class="input" placeholder="请输入验证码" />
					<image :src="c_code" @click="re_code" mode="widthFix" style="width: 350rpx;height: 2rem;"></image>
				</view>
				<view class="item">
					<u--text customStyle="width:5rem" text="账号密码"></u--text>
					<input :type="pwd" v-model="parms.password" maxlength="18" class="input" placeholder="请输入密码" />
					<u-icon @click="pwd=='password'?pwd='text':pwd='password'" name="eye-fill"></u-icon>
				</view>
				<view class="item">
					<u--text customStyle="width:5rem" text="确认密码"></u--text>
					<input :type="re_pwd" v-model="parms.re_password" maxlength="18" class="input"
						placeholder="请输入确认密码" />
					<u-icon @click="re_pwd=='password'?re_pwd='text':re_pwd='password'" name="eye-fill"></u-icon>
				</view>
				<view class="item">
					<u--text customStyle="width:5rem" text="邀请码"></u--text>
					<input type="text" :disabled="disableInput" v-model="parms.invite_code" maxlength="10" class="input"
						placeholder="您推荐人的邀请码" />
					<u-icon name="eye" color="#fff"></u-icon>
				</view>
				<view class="item">
					<u--text customStyle="width:5rem" text="联系QQ"></u--text>
					<input type="number" v-model="parms.qq" class="input" maxlength="10" placeholder="QQ号 (选填)" />
					<u-icon name="eye" color="#fff"></u-icon>
				</view>
				<!-- 				<u--text text="共富等级"></u--text>
				<view class="item" class="input">
					<picker @change="bindPickerChange" :value="index" :range="array">
						<view class="uni-input">{{array[index]}}</view>
					</picker>
				</view>
				<u--text text="账户总资产"></u--text>
				<view class="item">
					<input type="number" v-model="parms.account" class="input" maxlength="8" placeholder="请如实填写(选填)" />
				</view> -->


				<u-button color="linear-gradient(to right, #B80606, rgb(216, 68, 68))" iconColor="#fff"
					class="custom-style" text="立即注册" :loading="isDone" @click="doRegister"
					:loadingText="regStatus"></u-button>
				<u-button color="linear-gradient(to right, #B80606, rgb(216, 68, 68))" iconColor="#fff"
					class="custom-style" text="在线客服" @click="too('/pages/home-page/gf_customer')"
				></u-button>
				<u--text @click="too('./gf_login','lau')" customStyle="margin-top:30rpx" align="right" color="#535969"
					text="我已有账号，去登录"></u--text>
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
				pwd: 'password',
				re_pwd: 'password',
				c_code: '',
				isDone: false,
				showStIon: false,
				disableInput: false,
				regStatus: '正在注册...',
				index: 0,
				array: ['共富一级', '共富二级', '共富三级', '共富四级', '共富五级'],
				SelectionRegion: 0,
				regionList: ['mainland', 'hongkong', 'macau', 'taiwan'],
				regionListText: ['中国大陆', '香港', '澳门', '台湾'],
				parms: {
					phone: '',
					password: '',
					re_password: '',
					invite_code: '',
					captcha: '',
					uniqid: '',
					qq: '',
				}
			};
		},
		onLoad(option) {
			if (option.invite_code) {
				this.disableInput = true;
				this.parms.invite_code = option.invite_code;
			}
			this.re_code()
		},
		methods: {
			re_code() {
				this.c_code = '';
				this.to.www(this.api.reg_check_code)
					.then(res => {
						this.parms.uniqid = res.data.uniqid;
						this.c_code = res.data.image;
					})
			},
			doRegister() {
				let f = this;
				// if (!uni.$u.test.mobile(f.parms.phone)) return f.toa('手机号码不正确');
				if (uni.$u.test.isEmpty(f.parms.password)) return f.toa('请输入账号密码');
				if (f.parms.password != f.parms.re_password) return f.toa('两次密码不一致');
				if (uni.$u.test.isEmpty(f.parms.invite_code)) return f.toa('请输入邀请码');
				if (uni.$u.test.isEmpty(f.parms.captcha)) return f.toa('请输入验证码');
				f.isDone = true;
				f.to.www(f.api.user_register, {
						...f.parms,
						region: f.regionList[f.SelectionRegion]
					}, 'p')
					.then(res => {
						f.regStatus = '注册完成';
						setTimeout(() => {
							f.regStatus = '正在登录...';
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
						}, 600)
					})
					.catch((err) => {
						f.isDone = false;
						f.$refs.uNotify.error('太火爆了 请稍后再试');
					})
				setTimeout(() => {
					this.re_code()
					f.isDone = false;
				}, 2000)
			},
			bindPickerChange: function(e) {
				this.index = e.detail.value
			},
		}
	}
</script>

<style lang="scss">
	.custom-style {
		margin-top: 20rpx;
	}

	.select_ion {
		position: absolute;
		top: 50rpx;
		color: #FFF;
		width: 300rpx;
		height: 0;
		transition: all .3s;
		left: -100rpx;
		z-index: 999;
		line-height: 70rpx;
		border-radius: 15rpx;
		text-align: center;
		background: rgba(55, 55, 55, .9);
		font-size: 38rpx;
		overflow: hidden;

		&.show {
			height: unset !important;
			transition: all .3s;
		}

		text {
			display: block;
			height: 2.5rem;
			line-height: 2.5rem;
		}
	}

	.login {
		.item {
			display: flex;
			align-items: center;
			margin-bottom: 20rpx;
			border-bottom: 2rpx solid #e7e7e7;

			.input {
				width: 62%;
				border: none;
			}
		}
	}

	.logo {
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 10rpx auto 30rpx;

		.image {
			width: 70%;
		}

		.title {
			color: $th;
			font-weight: bold;
			font-size: 50rpx;
			margin-left: 30rpx;
		}
	}

	.content {
		padding: 80rpx 50rpx;

		.input {
			margin: 20rpx;
			border-radius: 10rpx;
			padding: 10rpx 20rpx;
			font-size: 28rpx
		}
	}
</style>