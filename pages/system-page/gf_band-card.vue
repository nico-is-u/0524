<template>
	<view class="cont4e">
		<view class="box">
			<u--text text="真实姓名"></u--text>
			<input type="text" v-model="parm.name" disabled class="input" placeholder="请输入真实姓名" />
			<u--text text="银行卡卡号"></u--text>
			<input type="number" v-model="parm.account" maxlength="30" class="input"
				:placeholder="'输入卡号/支付宝账号'" />
			<u--text text="开户银行"></u--text>
			<input type="text" v-model="parm.bank_name" class="input" placeholder="请输入开户行/支付宝" />
			<!-- <u--text text="银行开户支行"></u--text> -->
			<!-- <input type="text" v-model="parm.bank_branch" class="input" placeholder="如: 康熙路西称支行" /> -->
			<u--text text="注：请必须绑定实名认证人的银行卡账户" color="red"></u--text>
			<u--text text="查看我的银行卡" iconStyle="margin-left:10rpx" @click="too('/pages/system-page/gf_bank_list')"
				suffixIcon="arrow-right" align="left" style="margin-top: 50rpx;" color="#9291a1"></u--text>
		</view>
		<u-button color="linear-gradient(to right, #B80606, rgb(216, 68, 68))" iconColor="#fff" class="custom-style"
			text="添加" :loading="isDone" @click="doBand" loadingText="正在处理"></u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isDone: false,
				parm: {
					pay_type: 3,
					name: '',
					account: '',
					bank_name: '',
					bank_branch: ''
				},
			};
		},
		onLoad() {
				let usrin = uni.getStorageSync('user_info')
				this.parm.name = usrin.realname
		},
		methods: {
			doBand() {
				if (!this.parm.name) return;
				if (!this.parm.account) return;
				if (!this.parm.bank_name) return;
				// if (!this.parm.bank_branch) return;
				this.isDone = true;
				this.to.www(this.api.gf_band_card, this.parm, 'p')
					.then(res => {
						this.toa('已添加银行卡')
						setTimeout(() => {
							this.too('', 'bac')
						}, 1500)
					})
			}
		}
	}
</script>

<style lang="scss">
	.custom-style {
		margin: 130rpx auto 0;
		border-radius: 59rpx;
		width: 400rpx;
	}

	.cont4e {
		padding: 40rpx;

		.box {
			background-color: #fff;
			border-radius: 10rpx;
			padding: 20rpx;
			box-sizing: border-box;

			.input {
				margin: 30rpx 20rpx;
				border-radius: 10rpx;
				height: 70rpx;
				line-height: 70rpx;
				border: 2rpx solid #c8c8c8;
				padding: 10rpx 20rpx;
			}
		}
	}
</style>