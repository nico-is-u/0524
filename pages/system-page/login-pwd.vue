<template>
	<view>
		<view class="content">
			<u--text text="登录密码/旧密码"></u--text>
			<view style="margin: 30rpx 0 90rpx;">
				<input type="password" v-model="old_password" class="input" placeholder="设置密码或输入旧密码" />
			</view>
			<u--text text="确认登录密码/新密码"></u--text>
			<view style="margin: 30rpx 0 90rpx;">
				<input type="password" v-model="new_password" class="input" placeholder="再次确认密码或输入新密码" />
			</view>
			<template>
				<u-notify ref="uNotify" message=""></u-notify>
			</template>
			<u-button  iconColor="#fff" class="custom-style"
				text="确认提交" :loading="isDone" @click="doLoginPwd" loadingText="请稍等"></u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isDone: false,
				old_password: '',
				new_password: ''
			};
		},
		methods: {
			doLoginPwd() {
				let _ = this;
				if (!this.new_password) return this.toa('请输入新密码');
				_.isDone = true;
				this.to.www(this.api.user_paypwd, {
						type: 1,
						old_password: this.old_password,
						new_password: this.new_password
					}, 'p')
					.then(res => {
						this.toa('已设置新的支付密码')
						uni.setStorage({
							data: 'need-reload-page',
							key: "use-page-type",
							success() {
								setTimeout(() => {
									_.too('/pages/index/my', 'tab')
								}, 1500)
							}
						})
					})
				setTimeout(() => {
					_.isDone = false
				}, 2000)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.custom-style {
		margin-top: 200rpx;
		border-radius: 50rpx;
		height: 80rpx;
		line-height: 80rpx;
		background-color: $th;
		color: #FFF;
	}

	.content {
		padding: 40rpx;
		background-image: linear-gradient(to bottom ,#B80606 ,#fff,#fff,#fff);
		.input {
			margin: 30rpx 20rpx;
			border-radius: 10rpx;
			border: 2rpx solid #e0e0e0;
			padding: 15rpx 20rpx;
		}
	}
</style>