<template>
	<view class="container page3">

		<!-- 顶栏 -->
		<view class="page-navbar">
			<nNavbar title="人民币充值" :showBackBtn="true" :back="true"></nNavbar>
		</view>

		<view class="form">
			<view>请输入金额</view>
			<view>
				<text style="font-weight: bold;font-size: 26px;margin-right: 10px;">¥</text>
				<u--input type="number" v-model="money" border="none"></u--input>
			</view>
			<view>线上充值使用网页版关闭WIFI进行充值</view>
		</view>
		<view class="pay-content">
			<view class="pay-title">请选择充值方式</view>
			<u-radio-group v-model="currentpay" placement="column" @change="groupChange">
				<view class="select-item" v-for="(item,index) in channelList" :class="{active: currentpay == index}" @click="groupChange(index)">
					<view class="tb-header">
					 	<view style="display: flex;align-items: center;width: 50vw;">
							<image :src="domain+item.img" style="width: 20px;margin-right: 8px;" mode="widthFix"></image>
							{{item.name + "（" + item.single_topup_min_amount + "-" + item.single_topup_max_amount + "）"}}
						</view>
					 </view>
					<u-radio :name="index"></u-radio>
				</view>
			  </u-radio-group>
		</view>
		<view class="btn" @click="buy">充值</view>

		<!-- 加载动画 -->
		<u-loading-page :loading="isLoading" :loading-text="regStatus"></u-loading-page>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				domain: "",
				money: '',
				channelList: [],
				currentpay: 0,

				isLoading:false,
				regStatus:'处理中',

			};
		},
		methods: {
			groupChange(e){
				this.currentpay = e;
			},
			buy(){
				this.payItemObj = this.channelList[this.currentpay];
				let parms = {
					amount: this.money,
					pay_channel: this.payItemObj.channel,
					payment_config_id: this.payItemObj.id,
					is_usdt: 0
				}
				if(this.money>Number(this.payItemObj.single_topup_max_amount)) return this.toa('最高限额'+this.payItemObj.single_topup_max_amount);
				if(this.money<Number(this.payItemObj.single_topup_min_amount)) return this.toa('最低限额'+this.payItemObj.single_topup_min_amount);
				console.log(parms)

				/* 打开等待 */
				this.isLoading = true
				this.to.www(this.api.topup, parms, 'p')
					.then(res => {
						this.isLoading = false
						const result = res.data.data || ''

						if(result){
							this.webOpen(result)
						}else{
							this.toa('网络错误,请稍后重试')
						}

					})
				// setTimeout(() => {
				// 	this.isDone = false;
				// }, 3000)
			}
		},
		onLoad() {
			this.domain = uni.getStorageSync("ok_api");
			this.to.www(this.api.payChannelList).then(res => {
				this.channelList = res.data;
			})
		}
	}
</script>

<style lang="scss">
	.btn{
		margin-top: 20px;
		background: #0182EF;
		border-radius: 6px 6px 6px 6px;
		padding: 15px 0;
		text-align: center;
		font-size: 15px;
		color: #fff;
	}
	.pay-content{
		background: #fff;
		padding: 20px;
		position: relative;
		padding-bottom: 40px;
		border-radius: 20px;
		margin-top: 20px;
		.pay-title{
			font-size: 16px;
		}
	}
	.select-item{
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-radius: 4px;
		border: 1px solid #FFFFFF;
		padding: 15px 0;
		.tb-header{
			display: flex;
			font-size: 13px;
			flex: 6;
			>view{
				&:nth-child(1){
					width: 120px;
					text-align: left;
				}
				&:nth-child(2){
					width: 60px;
				}
			}
		}
	}
	.select-item + .select-item{
		border-top: 1px solid #d9d9d9;
	}
	.form{
		background: #fff;
		padding: 10px 20px;
		border-radius: 20px;
		>view{
			&:nth-child(1){
				color: #ABABAB;
				padding-bottom: 10px;
			}
			&:nth-child(2){
				border-bottom: 1px solid #d9d9d9;
				display: flex;
				padding-bottom: 5px;
			}
			&:nth-child(3){
				color: #FD2842;
				padding-top: 10px;
				font-size: 14px;
			}
		}
	}
	.container{
		padding: 20px;
		background: #F9F9F9;
		min-height: calc(100vh - 44px);
	}
</style>
