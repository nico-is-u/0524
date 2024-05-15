<template>
	<view>
		<view class="back_head" @click="too('/','bac')">
			<u--text prefixIcon="arrow-left" iconStyle="font-size: 38rpx;color:#ebebeb" color="#ebebeb" align="left"
				text="返回"></u--text>
			<u--text color="#ebebeb" align="center" text="数字人民币"></u--text>
			<u--text color="#d7d7d7" align="right" text=""></u--text>
		</view>
		<view class="paget">

		</view>
		<view class="content">
			<image class="icon" src="../../static/icon/ecny.png" mode="widthFix"></image>
			<view class="safds">
				<u--text :suffixIcon="eye" @click="showaa" align="left" text="钱包余额"></u--text>
				<view class="xxxx">
					<text class="qqq">￥</text>
					<text class="jjj">{{money}}</text>
				</view>
				<view class="fwqgfrg">
					<!-- <text class="ll" @click="too('/pages/home-page/gf_tr-ecny')">转账</text> -->
					<text class="ll" @click="toa('未开放')">转账</text>
					<!-- <text class="rr" @click="toa('1月28日开放')">提现</text> -->
					<text class="rr" @click="too('/pages/home-page/gf_draw_ecny?m='+defMon)">提现</text>
				</view>
			</view>
			<image class="bncon" src="../../static/icon/cn.png" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				money: '*****',
				defMon: '',
				stat: false,
				eye:'eye-off',
			};
		},
		onLoad(mon) {
			this.defMon = mon.mon;
		},
		methods: {
			showaa() {
				if (!this.stat) {
					this.stat = true;
					this.money = this.defMon;
					this.eye = 'eye'
				}else{
					this.stat = false;
					this.money = '*****';
					this.eye = 'eye-off';
				}
			}
		}
	}
</script>

<style lang="scss">
	.paget {
		height: 320rpx;
		background-image: linear-gradient(to bottom, $th, #FFF);
	}

	.back_head {
		position: fixed;
		top: 0;
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
	}

	.content {
		width: 80%;
		margin: -210rpx auto 0;
		border-radius: 30rpx;
		padding-bottom: 20rpx;
		box-shadow: 4rpx 4rpx 10rpx 2rpx rgba(33, 46, 104, 0.15);

		.bncon {
			width: 180rpx;
			margin-left: 20rpx;
			margin-top: 20prx;
		}

		.safds {
			padding: 30rpx;

			.xxxx {
				margin: 20rpx 0;
				display: flex;
				align-items: center;
				font-weight: bold;

				.qqq {
					font-size: 45rpx;
				}
			}

			.fwqgfrg {
				display: flex;
				justify-content: center;

				.ll {
					color: #000;
					margin: 0 20rpx;
					padding: 10rpx 50rpx;
					border-radius: 10rpx;
					background-color: #fff;
					border: 2rpx solid #bfbfbf;
				}

				.rr {
					background-color: $th;
					color: #FFF;
					margin: 0 20rpx;
					padding: 10rpx 50rpx;
					border-radius: 10rpx;
				}
			}
		}

		.icon {
			width: 100%;
		}
	}
</style>