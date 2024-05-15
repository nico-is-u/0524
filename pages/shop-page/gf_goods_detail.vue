<template>
	<view>
		<view class="tophead">
			<text>可流转资产 ￥{{zca.flow_amount}}</text>
			<text style="float: right;transform: translate(-40rpx,-120rpx);"
				@click="too('/pages/shop-page/gf_shop_fund')">流转记录</text>
			<!-- <text>已流转资产 ￥{{zca.already_flow_amount}}</text> -->
		</view>

		<view class="detail">
			<image class="hover" :src="obj.details_img" mode="widthFix"></image>
			<view style="padding: 15rpx;">

				<text class="intr">{{obj.intro}}</text>
				<view class="box">
					<view class="item">
						<text>流转目的：</text>
						<text>转换E-CNY并提现</text>
					</view>
					<view class="item">
						<text>流转方式：</text>
						<text>{{obj.name}}</text>
					</view>
					<view class="item">
						<text>流转周期：</text>
						<text>{{obj.period}}天</text>
					</view>
					<view class="item">
						<text>利润分配：</text>
						<text>{{obj.shop_profit}}元</text>
					</view>
					<view class="item">
						<text>流转金额：</text>
						<text class="rect"
							v-if="obj.max_flow_amount!='20亿'">{{obj.min_flow_amount}}以上~{{obj.max_flow_amount}}</text>
						<text class="rect" v-else>1亿元以上</text>
					</view>
					<!-- <view class="item">
						<text>流转名额：</text>
						<text>{{obj.allowed}}名</text>
					</view> -->
				</view>

				<!-- <view style="display: flex;justify-content: space-between;margin-bottom: 80rpx;">
					<u-line-progress :percentage="Number(obj.virtually_progress).toFixed(2)" height="18"
						activeColor="#b82f2f"></u-line-progress>
					<text v-if="Number(obj.virtually_progress)<30" style="color: #999999;font-size: 24rpx;">{{obj.virtually_progress}}%</text>
				</view> -->
			

				<view class="btns1" style="font-size: 30rpx;" v-if="obj.underline_price!='0.00'">流转金：<text style="text-decoration: line-through;">{{obj.underline_price}}元</text> </view>
				<view class="btns1" style="margin-top: 2rpx;">{{obj.underline_price=='0.00'?'流转金':'现价'}}：{{obj.single_amount}}元</view>
				<view class="btns" @click="topay">申请流转</view>
				<view class="sign_info">
					<text class="title">注明：</text>
					<text class="t2">请按照可流转资产选择相对应的的流转商铺进行流转。</text>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				obj: {},
				zca: {
					flow_amount: '0.00',
					already_flow_amount: '0.00'
				}
			};
		},
		onLoad(opt) {
			this.obj = uni.getStorageSync("SHOPDET")
			this.zca = {
				flow_amount: opt.k,
				already_flow_amount: opt.y,
			}
			uni.setNavigationBarTitle({
				title: this.obj.name
			})
		},
		methods: {
			topay() {
				if(this.obj.virtually_progress>=100){
					return this.toa("名额已满")
				}
				var min_val = '',
					max_val = '';
				if (this.obj.min_flow_amount.indexOf('万') != -1) {
					min_val = Number(this.obj.min_flow_amount.replace('万', '')) * 10000;
				} else {
					min_val = Number(this.obj.min_flow_amount.replace('亿', '')) * 100000000;
				}
				if (this.obj.max_flow_amount.indexOf('万') != -1) {
					max_val = Number(this.obj.max_flow_amount.replace('万', '')) * 10000;
				} else {
					max_val = Number(this.obj.max_flow_amount.replace('亿', '')) * 100000000;
				}


				if (Number(this.zca.flow_amount) < Number(min_val) || Number(this.zca.flow_amount) > Number(max_val)) {
					return this.toa("金额不在范围内")
				}
				// console.log(min_val, max_val);
				uni.setStorage({
					data: this.obj,
					key: "WHITE_DO_BUY_SHOP",
					success() {
						uni.navigateTo({
							url: '/pages/shop-page/gf_buy_project_shop'
						})
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.sign_info {
		padding: 30rpx;

		.title {
			font-weight: bold;
			display: block;
			margin-bottom: 20rpx;
		}

		.t1,
		.t2 {
			display: block;
			margin-bottom: 20rpx;
		}
	}

	.detail {
		padding: 30rpx 40rpx;
		background-color: #F8F8F8;

		.btns1 {
			text-align: center;
			font-size: 36rpx;
			color: #B80606;
		}

		.btns {
			width: 55%;
			height: 65rpx;
			line-height: 65rpx;
			background-color: #B80606;
			color: #FFF;
			border-radius: 50rpx;
			text-align: center;
			margin: 20rpx auto;
		}

		.box {
			border: 2rpx solid $th;
			padding: 15rpx;
			font-size: 30rpx;
			border-radius: 10rpx;
			margin-bottom: 20rpx;

			.item {
				line-height: 60rpx;
			}
		}

		.hover {
			width: 100%;
		}

		.intr {
			font-size: 30rpx;
			color: #666;
			display: block;
			margin: 30rpx 0;
		}
	}

	.tophead {
		background-color: #B80606;
		height: 120rpx;
		text-align: center;
		padding-top: 60rpx;
		// padding-left: 150rpx;
		display: block;
		border-radius: 0 0 100% 100%;

		text {
			display: block;
			color: #FFF;
			line-height: 50rpx;
		}
	}
</style>