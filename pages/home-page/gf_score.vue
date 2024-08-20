<template>
	<view class="container">
	
		<!-- 顶栏 -->
		<nNavbar title="积分兑换" :showBackBtn="true" :back="false" :backFunc="backPrev" :isFixed="true">
			<u--text @click="too('gf_score_order_list')" color="white" align="right" text="兑换订单" style="padding-right: 10rpx; padding-top: 10rpx"></u--text>
		</nNavbar>

		<view class="head">
			<view class="box">
				<view style="display: flex;align-items: center;">
					<image src="/static/images/my/coin.png" style="width: 20px;margin-right: 2px;" mode="widthFix"></image>
					我的积分
				</view>
				<view class="sc">
					{{user_info.integral}}
				</view>
			</view>
		</view>
		<view class="content">
			<view class="list">
				<view class="list-item" v-for="(item,index) in list" :key="index">
					<image :src="item.cover_img" style="width: 100%; height: 360rpx;" mode="aspectFill"></image>
					<view>
						<view>{{item.name}}</view>
						<view>兑换要求：{{item.description}}</view>
						<view>
							<view class="ad">
								<image src="/static/images/my/coin.png" style="width: 20px;margin-right: 2px;" mode="widthFix"></image>
								{{item.single_amount}}
							</view>
							<view>
								<view class="btn" @click="buy(item.id)">兑换</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<u-overlay :show="showPay" @click="showPay = false">
			<view class="warp" style="padding: 0 20px;">
				<view class="rect1">
					<view style="margin-top: 40rpx;">
						<u--text prefixIcon="coupon-fill" iconStyle="font-size: 34rpx;margin-top:6rpx;margin-right:8rpx"
							size="14" text="请输入支付密码"></u--text>
						<view style="margin: 30rpx 0 0;">
							<xt-verify-code :isPassword="true" boxActiveColor="#333" v-model="pay_password"></xt-verify-code>
						</view>
					</view>
					<u-button iconColor="#fff" class="custom-style" text="立即支付" :loading="isDone"
						:loadingText="regStatus" @click="pay()"></u-button>
				</view>
			</view>
		</u-overlay>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user_info: {
					integral: 0
				},
				list: [],
				showPay: false,
				isDone: false,
				regStatus: '处理中...',
				pay_password: '',
				id: 0
			};
		},
		methods: {
			buy(id){
				this.id = id;
				this.showPay = true;
			},
			pay(){
				if (uni.$u.test.isEmpty(this.pay_password)) return this.toa('请输入支付密码');
				this.to.www(this.api.integralPlaceOrder, {id: this.id, pay_password: this.pay_password}, 'p').then(res => {
					this.toa('兑换成功')
					setTimeout(() => {
						uni.navigateBack()
					}, 1500)
				}).catch(err => {
					this.isDone = false
				})
			},
			backPrev(){
				this.too('/pages/index/my','tab')
			}
		},
		onLoad() {
			this.to.www(this.api.user_info).then(res => {
				this.user_info = res.data;
			})
			this.to.www(this.api.integralList)
				.then(res => {
					this.list = res.data.data;
				})
		}
	}
</script>

<style lang="scss" scoped>
	.warp {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		height: 100%;
		z-index: 3;
	}
	
	.rect1 {
		border-radius: 10px;
		padding: 20px;
		width: 100%;
		box-sizing: border-box;
		background: #fff;
	
		.custom-style {
			width: 30vw;
			border-radius: 8px;
			margin-top: 30px;
			background: #1292FF;
			color: #fff;
		}
	}
	.list{
		display: grid;
		grid-template-columns: repeat(2,1fr);
		grid-gap: 20px;
		.list-item{
			background: #fff;
			border-radius: 8px;
			>view{
				padding: 5px 10px;
				>view{
					&:nth-of-type(1){
						font-size: 14px;
						color: #222222;
						font-weight: bold;
					}
					&:nth-of-type(2){
						color: #999999;
						padding-bottom: 10px;
						font-size: 10px;
						margin-top: 5px;
						border-bottom: 1px solid #d9d9d9;
					}
					&:nth-of-type(3){
						padding-top: 10px;
						display: flex;
						align-items: center;
						justify-content: space-between;
						>view{
							font-size: 14px;
							color: #F99B46;
						}
					}
					
				}
			}
		}
		.ad{
			display: flex;
			align-items: center;
		}
		.btn{
			background: linear-gradient( 90deg, #2E9FFF 0%, #0182EF 100%);
			border-radius: 36px 36px 36px 36px;
			color: #fff;
			
			padding: 5px 20px;
		}
	}
	.container{
		padding-bottom: 20px;
		background: #f7f7f7;
		min-height: 100vh;
	}
	.content{
		padding: 0 20px;
		transform: translateY(-80px);
	}
	.box{
		display: flex;
		align-items: center;
		
		>view{
			color: #fff;
			font-size: 11px;
		}
		.sc{
			margin-left: 5px;
			font-size: 18px;
			font-weight: bold;
		}
	}
	.head {
		background: linear-gradient( 180deg, #1292FF 40%, rgba(210,227,255,0) 100%);
		height: 50vw;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 20px;
		color: #fff;
		.ti {
			margin-bottom: 10rpx;
			font-size: 38rpx;
			font-weight: bold;
		}
	}
	.back_head {
		position: fixed;
		// top: 40px;
		left: 0;
		width: 100%;
		height: 80rpx;
		box-sizing: border-box;
		padding: 50rpx 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #ffffff;
		z-index: 999;
		background: #1292FF;
	}
</style>
