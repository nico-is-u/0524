<template>
	<view>
		<view class="content">
			<u--text size="30rpx" text="选择转账种类"></u--text>
		<!-- 	<view class="item" :class="[type==1?'cur':'']" @click="type = 1">
				<u-row justify="between">
					<u-col span="4">
						<u--text prefixIcon="coupon" iconStyle="font-size: 16px;margin-right:8rpx"
							text="数字人民币"></u--text>
					</u-col>
					<u-col span="6">
						<u--text color="#aa0000" align="left" :text="'余额：'+user_info.digital_yuan_amount"></u--text>
					</u-col>
					<u-col span="2" offset="1">
						<view class="icon"></view>
					</u-col>
				</u-row>
			</view> -->
			<view class="item" :class="[type==2?'cur':'']" @click="type = 2">
				<u-row justify="between">
					<u-col span="5">
						<u--text prefixIcon="coupon" iconStyle="font-size: 16px;margin-right:8rpx" text="可用余额"></u--text>
					</u-col>
					<u-col span="5">
						<u--text color="#aa0000" align="left" :text="'余额：'+user_info.topup_balance"></u--text>
					</u-col>
					<u-col span="2" offset="1">
						<view class="icon"></view>
					</u-col>
				</u-row>
			</view>
			<view class="item" :class="[type==3?'cur':'']" @click="type = 3" style="margin-bottom: 40rpx;">
				<u-row justify="between">
					<u-col span="5">
						<u--text prefixIcon="coupon" iconStyle="font-size: 16px;margin-right:8rpx"
							text="可提余额"></u--text>
					</u-col>
					<u-col span="5">
						<u--text color="#aa0000" align="left" :text="'余额：'+user_info.team_bonus_balance"></u--text>
					</u-col>
					<u-col span="2" offset="1">
						<view class="icon"></view>
					</u-col>
				</u-row>
			</view>
			<view class="item" :class="[type==4?'cur':'']" @click="type = 4" style="margin-bottom: 40rpx;">
				<u-row justify="between">
					<u-col span="5">
						<u--text prefixIcon="coupon" iconStyle="font-size: 16px;margin-right:8rpx"
							text="共富工程钱包"></u--text>
					</u-col>
					<u-col span="5">
						<u--text color="#aa0000" align="left" :text="'余额：'+user_info.gf_purse"></u--text>
					</u-col>
					<u-col span="2" offset="1">
						<view class="icon"></view>
					</u-col>
				</u-row>
			</view>
			<input type="number" v-model="parm.money" placeholder="请输入转账金额" class="input" />
			<input type="number" v-model="parm.account" :placeholder="type==1?'请输入钱包地址':'请输入收款人手机号码'" class="input" />
			<input type="text" v-model="parm.realname" :placeholder="type==1?'无需填写':'请输入收款人姓名'" class="input" />
			<input type="password" v-model="parm.pay_password" placeholder="交易密码" class="input" />


			<u-button color="linear-gradient(to right, #B80606, rgb(216, 68, 68))" iconColor="#fff" class="custom-style"
				text="确认转账" :loading="isDone" @click="subject" loadingText="请稍等"></u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: 2,
				isDone: false,
				user_info:{
					digital_yuan_amount:''
				},
				parm: {
					money: '',
					account: '',
					realname: '',
					pay_password: '',
				},
			};
		},
		onLoad() {
			
			if (uni.getStorageSync("user_info")) {
				this.user_info = uni.getStorageSync("user_info");
			} else {
				this.to.www(this.api.user_info)
					.then(res => {
						this.user_info = res.data;
						uni.setStorage({
							data: this.user_info,
							key: 'user_info'
						});
						uni.setStorage({
							data: 'first-launch',
							key: "use-page-type"
						})
					})
			}
		},
		methods: {
			subject() {
				if (!this.parm.money) return this.toa('请输入转账金额');
				if (!this.parm.account) return this.toa('请输入收款账号');
				if (this.type != 1) {
					if (!this.parm.realname) return this.toa('请输入收款人姓名');
				}
				if (!this.parm.pay_password) return this.toa('请输入交易密码');
				let formData = {
					type: this.type,
					account: this.parm.account,
					money: this.parm.money,
					realname: this.parm.realname,
					pay_password: this.parm.pay_password,
				}
				this.to.www(this.api.sys_transAccount, formData, 'p')
					.then(res => {
						this.toa('转账成功')
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
		margin-top: 120rpx;
	}

	.content {
		padding: 40rpx;

		.input {
			height: 60rpx;
			line-height: 60rpx;
			padding: 10rpx 25rpx;
			border-bottom: 2rpx solid #e8e8e8;
			margin-bottom: 50rpx;
		}

		.item {
			margin: 30rpx 0;
			box-shadow: 4rpx 4rpx 10rpx 2rpx rgba(33, 46, 104, 0.3);
			border-radius: 12rpx;
			padding: 30rpx 20rpx;
			transition: all .6s;

			.icon {
				width: 30rpx;
				height: 30rpx;
				color: #FFF;
				border-radius: 50%;
				border: 2rpx solid #c0b0b0;
			}
		}

		.item.cur {
			background-image: linear-gradient(45deg, #f1faee, #ebf9fa);

			.icon {
				background-color: $th;
			}
		}

	}
</style>