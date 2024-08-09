<template>
	<view class="container">
		<view class="czfs" @click="showPayList = true" v-if="channelList.length > 0">
			<view>充值方式</view>
			<view>
				<image :src="domain + channelList[currentpay].img" style="width: 20px;margin-right: 5px;" mode="widthFix"></image>
				<u-icon name="arrow-right"></u-icon>
			</view>
		</view>
		<view class="list">
			<view :class="{active: money == 250}" @click="money = 250">￥250</view>
			<view :class="{active: money == 300}" @click="money = 300">￥300</view>
			<view :class="{active: money == 400}" @click="money = 400">￥400</view>
			<view :class="{active: money == 500}" @click="money = 500">￥500</view>
			<view :class="{active: money == 600}" @click="money = 600">￥600</view>
			<view :class="{active: money == 700}" @click="money = 700">￥700</view>
			<view :class="{active: money == 800}" @click="money = 800">￥800</view>
			<view :class="{active: money == 900}" @click="money = 900">￥900</view>
			<view :class="{active: money == 1000}" @click="money = 1000">￥1000</view>
		</view>
		<view class="btn" @click="buy">确认购买{{money}}CNY</view>
		<view class="note">
			<view>
				<view style="color: #222222;font-size: 16px;padding: 10px 0;font-weight: bold;">可兑换≈ {{(money/user_info.cnyRate).toFixed(6)}} USDT-TRC20</view>
				<view style="color: #333333;font-size: 16px;padding-bottom: 10px;border-bottom: 1px solid #d9d9d9;">支付宝：100CNY~{{(100/user_info.cnyRate).toFixed(6)}} USDT-TRC20</view>
			</view>
			<view style="padding: 15px 0;font-weight: bold;font-size: 16px;">
				常见问题
			</view>
			<view class="note1">
				<view style="color: #F23430;">1、订单金额与实际支付金额可能会有少许误差，请以实际支付为准。</view>
				<view>2、一笔订单对应一次付款，请勿重复支付，多付无法退款。</view>
				<view>3、支付成功后一般10分钟内到账，超过30分钟未到账请联系客服。</view>
				<view> 4、订单异常的用户，请在72小时内联系客服处理，超出时 间后果自负! </view>
				<view style="display: flex;flex-wrap: wrap;">5、更多问题，请点击查看
					<text style="color: #0182EF;padding: 0 3px;font-weight: bold;">充值帮助</text>或
					<view style="background: #0182EF;margin-left: 3px;border-radius: 5px;color: #fff;padding: 3px 8px;display: flex;align-items: center;" @click="openKefu">
						<image src="/static/images/my/kf.png" style="width: 15px;margin-right: 5px;" mode="widthFix"></image>
						咨询客服
					</view>
				</view>
			</view>
		</view>
		<u-popup :show="showPayList">
			<view class="pay-content">
				<u-icon @click="showPayList = false" style="position: absolute;left: 20px;top: 20px;" color="#0182EF" name="close" size="20px"></u-icon>
				<view class="pay-title">充值方式</view>
				<u-radio-group v-model="currentpay" placement="column" @change="groupChange">
					<view class="select-item" v-for="(item,index) in channelList" :class="{active: currentpay == index}" @click="groupChange(index)">
						<view class="tb-header">
						 	<view style="display: flex;align-items: center;">
								<image :src="domain+item.img" style="width: 20px;margin-right: 8px;" mode="widthFix"></image>
								{{item.name}}
							</view>
						 </view>
						<u-radio :name="index"></u-radio>
					</view>
				  </u-radio-group>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentpay: 0,
				showPayList: false,
				channelList: [],
				payItemObj:{},
				domain: "",
				money: '250',
				user_info: {
					cnyRate: 1
				},
				kefu_url:'',
			};
		},
		methods: {
			groupChange(e){
				this.currentpay = e;
				this.showPayList = false;
			},
			buy(){
				this.payItemObj = this.channelList[this.currentpay];
				let parms = {
					amount: this.money,
					pay_channel: this.payItemObj.channel,
					payment_config_id: this.payItemObj.id,
					is_usdt: 1
				}
				if(this.money>Number(this.payItemObj.single_topup_max_amount)) return this.toa('最高限额'+this.payItemObj.single_topup_max_amount);
				if(this.money<Number(this.payItemObj.single_topup_min_amount)) return this.toa('最低限额'+this.payItemObj.single_topup_min_amount);
				console.log(parms);
				this.to.www(this.api.topup, parms, 'p')
					.then(res => {
						window.open(res.data.data)
					})
				setTimeout(() => {
					this.isDone = false;
				}, 3000)
			},
			openKefu(){
				//#ifdef WEB
				window.open(this.kefu_url)
				//#endif

				//#ifdef APP-PLUS
				plus.runtime.openURL(this.kefu_url)
				//#endif
			}
		},
		onLoad() {
			const kefu_url = uni.getStorageSync('kefu_url')
    		if(kefu_url)  this.kefu_url = kefu_url

			this.domain = uni.getStorageSync("ok_api");
			this.to.www(this.api.user_info).then(res => {
				this.user_info = res.data;
			})
			this.to.www(this.api.payChannelList).then(res => {
				this.channelList = res.data;
			})
		}
	}
</script>

<style lang="scss">
	.note1{
		background: #F2F3F8;
		border-radius: 6px 6px 6px 6px;
		padding: 10px;
		>view + view{
			padding-top: 5px;
		}
	}
	.note{
		margin-top: 20px;
		background: #fff;
		padding: 10px 20px;
	}
	.btn{
		margin-top: 20px;
		background: #0182EF;
		border-radius: 6px 6px 6px 6px;
		padding: 15px 0;
		text-align: center;
		font-size: 15px;
		color: #fff;
	}
	.list{
		display: grid;
		grid-template-columns: repeat(3,1fr);
		grid-gap: 20px;
		margin-top: 20px;
		>view{
			background: #FFFFFF;
			border-radius: 6px 6px 6px 6px;
			padding: 15px 0;
			text-align: center;
			font-size: 16px;
		}
		.active{
			color: #fff;
			background: #0182EF;
		}
	}
	.select-item{
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-radius: 4px;
		background: #FFFFFF;
		border: 1px solid #FFFFFF;
		padding: 15px 20px;
		.tb-header{
			display: flex;
			font-size: 13px;
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
	.pay-content{
		background: #F9F9F9;
		padding: 20px;
		position: relative;
		padding-bottom: 40px;
		.pay-title{
			font-weight: bold;
			text-align: center;
			font-size: 16px;
			margin-bottom: 20px;
		}
	}
	.czfs{
		padding: 15px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: #fff;
		border-radius: 8px;
		>view{
			&:nth-of-type(1){
			}
			&:nth-of-type(2){
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
		}
	}
	.container{
		padding: 20px;
		background: #F9F9F9;
		min-height: calc(100vh - 44px);
	}
</style>
