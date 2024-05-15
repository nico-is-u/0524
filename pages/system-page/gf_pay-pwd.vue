<template>
	<view>
		<view class="content">
			<u--text text="旧密码" v-if="showOld" color="#3b3b3b"></u--text>
			<view style="margin: 30rpx 0 30rpx;" v-if="showOld">
				<!-- <x-validatorInput v-model="old_password" :numArr="6"></x-validatorInput> -->
				<xt-verify-code boxActiveColor="#333" v-model="old_password"></xt-verify-code>
			</view>
			<u--text text="确认支付密码"></u--text>
			<view style="margin: 30rpx 0 90rpx;">
				<!-- <x-validatorInput v-model="new_password" :numArr="6"></x-validatorInput> -->
				<xt-verify-code boxActiveColor="#333" v-model="new_password"></xt-verify-code>
			</view>
			<template>
				<u-notify ref="uNotify" message=""></u-notify>
			</template>
			<u-button iconColor="#fff" class="custom-style"
				text="创建交易密码" :loading="isDone" @click="doSetPwd"></u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showOld:true,
				isDone: false,
				old_password: '',
				new_password: ''
			};
		},
		onLoad(option) {
			if(option.v==0){
				this.showOld = false
			}
		},
		methods: {
			doSetPwd() {
				let _ = this;
				if (!this.new_password) return this.toa('请输入新密码');
				_.isDone = true;
				this.to.www(this.api.user_paypwd, {
						type: 2,
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
		height: 80rpx ;
		line-height: 80rpx;
		background-color: $th;
		color: #FFF;
	}

	.content {
		padding: 40rpx;
		background-image: linear-gradient(to bottom ,#B80606 ,#fff,#fff);
	}
</style>