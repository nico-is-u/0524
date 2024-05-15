<template>
	<view class="t_page">
		<view class="back_head">
			<u--text @click="too('/','bac')" prefixIcon="arrow-left" iconStyle="font-size: 38rpx;color:#ffffff" color="#ffffff" align="left"
				text=""></u--text>
			<u--text color="#ffffff" align="center" text="共富商城"></u--text>	
			<u--text color="#ffffff" @click="too('/pages/shop-page/gf_shop_fund')" align="right" text="流转记录"></u--text>	
		</view>
		<view class="head">
			<view class="x">
				<view>可流转资产</view>
				<view>￥{{user_info.flow_amount}}</view>
			</view>
			<text class="s"></text>
			<view class="x" @click="too('/pages/system-page/gf_ecny_money')">
				<view style="width: 4rem;line-height: 1.3rem;margin: 0 auto;">数字钱包E-CNY</view>
				<view>￥{{user_info.digit_balance}}</view>
			</view>
		</view>
		<view class="box">
			<view class="item" v-for="(item,index) in project_list" :key="index" @click="toDetail(item)">
				<image class="img" :src="item.cover_img" mode="aspectFill"></image>
				<text class="title">{{item.name}}</text>
				<text class="rect" v-if="item.max_flow_amount!='20亿'">流转金额：{{item.min_flow_amount}}~{{item.max_flow_amount}}</text>
				<text class="rect" v-else>流转金额：1亿元以上</text>
				<text class="btn">立即流转提现</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				project_list:[],
				user_info:{
					flow_amount:'0',//可流转
					digit_balance:'0.00',//数字钱包
					already_flow_amount:'0.00',//已流转
				}
			};
		},
		onLoad() {
			this.to.www(this.api.user_info)
				.then(res => {
					this.user_info = res.data;
					uni.setStorage({
						data: this.user_info,
						key: 'user_info'
					});
				})
			this.to.www(this.api.project_list, {
					project_group_id: 4,
				}, 'p')
				.then(res => {
					this.project_list = res.data.data;
				})
		},
		methods:{
			toDetail(obj){
				uni.setStorage({
					data:obj,
					key:"SHOPDET",
					success: () => {
						this.too('/pages/shop-page/gf_goods_detail?k='+this.user_info.flow_amount+'&y='+this.user_info.already_flow_amount)
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.back_head {
		position: fixed;
		top: 35px;
		left: 0;
		width: 100%;
		height: 80rpx;
		box-sizing: border-box;
		padding: 50rpx 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #000;
		background-color: #B80606;
		z-index: 999;
	}
.t_page{
	padding: 30rpx 50rpx;
	.box{
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 60rpx;
		margin-top: 40rpx;
		.item{
			width: 100%;
			.img{
				width: 100%;
				height: 300rpx;
				border-radius: 10rpx;
				border: 2rpx solid #eee;
			}
			text{
				display: block;
				text-align: center;
			}
			.title{
				font-weight: bold;
				margin-top: 20rpx;
			}
			.rect{
				margin: 15rpx 0;
				font-size: 24rpx;
				opacity: .8;
			}
			.btn{
				background-color: $th;
				color: #FFF;
				width: 7em;
				text-align: center;
				border-radius: 50rpx;
				margin: 10rpx auto 0;
				padding: 5rpx 0;
				font-size: 28rpx;
			}
		}
	}
	.head{
		color: #fff;
		background-color: #B52725;
		border-radius: 10rpx;
		display: flex;
		justify-content: space-around;
		padding: 30rpx;
		height: 160rpx;
		text-align: center;
		line-height: 80rpx;
		.x{
			width: 50%;
		}
		.s{
			display: inline-block;
			width: 3rpx;
			border-radius: 4rpx;
			background-image: linear-gradient(to bottom, rgba(255,255,255,.5),#fff,#fff,rgba(255,255,255,.5));
		}
	}
}
</style>
