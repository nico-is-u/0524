<template>
	<view class="the_page_up">
		<!-- <u-swiper :list="list1" :circular="true" height="160"></u-swiper> -->
		<template>
			<view class="top_up_box">
				<text class="title" style="float: right;" @click="too('/pages/system-page/gf_amount_draw?type=1')">充值明细</text>
				<text class="title">输入充值金额</text>
				<input type="number" maxlength="6" class="custom-input" v-model="money" />
				<text class="title">注：选择充值金额后，请按照已选额度进行充值，随意修改不到账。</text>
				<view class="pr_box">
					<view v-for="(item,index) in money_list" :key="index" :class="['item',money==item?'active':'']"
						@click="changemoney(item)">{{item}}元</view>
				</view>
				<text class="title">选择支付渠道</text>
				<u-radio-group placement="col">
					<u-radio activeColor="#B80606" v-for="(item, index) in pay_list"
						:customStyle="{marginBottom: '28rpx'}" :key="index" :label="item.name" :name="item.id"
						@change="changePayList(item)">
					</u-radio>
				</u-radio-group>
			</view>
			<u-button color="linear-gradient(to right, #B80606, rgb(216, 68, 68))" iconColor="#fff" class="custom-style"
				text="立即支付" :loading="isDone" @click="doBuy" loadingText="请稍等"></u-button>
			<view style="height: 1rpx;"></view>
		</template>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isDone: false,
				money_list: [100, 200, 300, 500, 1000, 2000, 3000, 5000, 10000],
				pay_list: [],
				pay_list_def: [],
				card_info:null,
				money: '100',
				pay_channel: '',
				payment_config_id: '',
				payItemObj:{}
			};
		},
		onLoad() {
			this.getPayList()
		},
		methods: {
			// 获取支付通道
			getPayList() {
				this.to.www(this.api.user_pay_list)
					.then(res => {
						this.pay_list = res.data;
						this.pay_list_def = res.data;
					})
			},
			// 切换充值金额并筛选对应挡位的通道
			changemoney(i) {
				this.money = i;
			},
			// 切换支付通道
			changePayList(obj) {
				this.pay_channel = obj.channel;
				this.payment_config_id = obj.id;
				this.card_info = obj.card_info;
				this.payItemObj = obj
			},
			doBuy() {
				let parms = {
					amount: this.money,
					pay_channel: this.pay_channel,
					payment_config_id: this.payment_config_id
				}
				if (this.pay_channel === '') return this.toa('请选择支付方式')
				if (this.pay_channel === 0) {
					// single_topup_max_amount: "50000.00"
					// single_topup_min_amount: "1000.00"
					console.log(this.payItemObj);
					if(this.money>Number(this.payItemObj.single_topup_max_amount)) return this.toa('最高限额'+this.payItemObj.single_topup_max_amount);
					if(this.money<Number(this.payItemObj.single_topup_min_amount)) return this.toa('最低限额'+this.payItemObj.single_topup_min_amount);
					uni.setStorage({
						data:{
							...parms,
							...this.card_info
						},
						key:"TRBANK",
						success() {
							uni.navigateTo({
								url:'/pages/shop-page/gf_tr_bank'
							})
						}
					})
				} else {
					this.isDone = true;
					this.to.www(this.api.user_top_up, parms, 'p')
						.then(res => {
							window.open(res.data.data)
						})
					setTimeout(() => {
						this.isDone = false;
					}, 3000)
				}
			}
		}
	}
</script>

<style lang="scss">
	.title {
		display: block;
		margin: 30rpx 0;
		font-size: 30rpx;
		color: #959595;
	}

	.top_up_box {
		background-color: #fff;
		padding: 20rpx;
		box-sizing: border-box;
		margin: 20rpx 0;
		border-radius: 8rpx;
		box-shadow: 2rpx 2rpx 5rpx 2rpx rgba(33, 46, 104, 0.15);
	}

	.custom-style {
		margin: 60rpx auto 120rpx;
	}

	.pr_box {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 18rpx;
		text-align: center;

		.active {
			background-color: $th !important;
			color: #FFF !important;
			transition: all .3s;
		}

		.item {
			height: 2rem;
			line-height: 2rem;
			color: #131e69;
			border-radius: 10rpx;
			background-color: #fff;
			border: 2rpx solid #b7c1db;
		}
	}

	.custom-input {
		font-size: 40rpx;
		line-height: 70rpx;
		height: 70rpx;
		border: 1rpx solid #efefef;
		box-shadow: 4rpx 4rpx 10rpx 2rpx rgba(33, 46, 104, 0.15);
		border-radius: 10rpx;
		padding: 0 20rpx;
		color: #131e69;
	}

	.the_page_up {
		padding: 20rpx;
		height: 100vh;
		background-color: #ececec;
	}
</style>