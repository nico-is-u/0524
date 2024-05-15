<template>
	<view class="e-page">
		<view class="head" @click="toa('未开放')">
			<view class="">
				<image class="icon" src="/static/icon/1.17.1.png" mode="widthFix"></image>
				<text>扫一扫</text>
			</view>
			<view class="">
				<image class="icon" src="/static/icon/1.17.2.png" mode="widthFix"></image>
				<text>转账</text>
			</view>
			<view class="">
				<image class="icon" src="/static/icon/1.17.3.1.png" mode="widthFix"></image>
				<text>收付款</text>
			</view>
		</view>

		<view class="m-box">
			<text class="tlx">钱包名称：中国人民银行数字钱包</text>
			<view class="tlx" style="display: flex;justify-content: space-between;">
				<view>
					<text>钱包ID：{{datas.id.slice(0,4)+" **** **** " +datas.id.slice(14,datas.id.length)}}</text>
					<text></text>
				</view>
				<view class="cp" @click="copy">复制ID</view>
			</view>
			<view class="card">
				<view class="info">
					<u--text customStyle="font-size:24rpx;" iconStyle="margin-left:10rpx"
						:suffixIcon="eye?'eye':'eye-off'" @click="eye=!eye" align="left" text="余额"></u--text>
					<text style="margin-top: 20rpx;display: block;font-size: 40rpx;">{{eye?datas.ecny:'****'}}</text>
				</view>
			</view>
			<view class="btns">
				<!-- <view class="btn1" @click="toa('未开放')">充钱包</view> -->
				<view class="btn1" @click="too('/pages/shop-page/gf_goods_home')">充钱包</view>
				<!-- <view class="btn2" @click="too('/pages/home-page/gf_draw_tobank')">存银行</view> -->
				<view class="btn2" @click="cunyinh">存银行</view>
				<view class="btn3" @click="too('/pages/system-page/gf_amount_ecny-fund')">
					<u-icon name="file-text" label="提现记录" label-pos="bottom" label-size="12" label-color="#CE514F"
						color="#CE514F"></u-icon>
				</view>
			</view>
		</view>

		<view class="nashuijine">
			<text>已纳税金额</text>
			<text>￥{{datas.assamo}}</text>
		</view>
		<view class="nashuijine">
			<text>已公证资产</text>
			<text>￥{{datas.notarization_amount}}</text>
		</view>
		<view class="gfzsk">
			<image @click="toa('待发货')" :src="cardList" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				eye: true,
				cardList: "",
				datas: {
					id: '',
					ecny: '0.0',
					assamo: '0.00',
					notarization_amount:'0'
				}
			};
		},
		onLoad(opt) {
			var usr_info = uni.getStorageSync("user_info");
			this.datas.assamo = usr_info.assessment_amount;
			this.datas.id = usr_info.wallet_id;
			this.datas.ecny = usr_info.digit_balance;
			this.datas.notarization_amount = usr_info.notarization_amount;
			this.to.www(this.api.getylqgfbzk)
				.then(res => {
					this.cardList = res.data.cover_img;
				})
				.catch(err => {})
		},
		methods: {
			cunyinh() {
				this.too('/pages/index/gf_card')
				// return this.toa('未开放')
		/* 		if (this.datas.ecny == '0.00'){
					return this.toa("额度不足")
				}else
					this.too('/pages/index/gf_card') */
			},

			copy() {
				// return this.toa("未开放")
				uni.setClipboardData({
					data: this.datas.id,
				})
			}
		}

	}
</script>

<style lang="scss">
	.nashuijine {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 65rpx;
		background-color: #FFF;
		color: $th;
		width: 95%;
		margin: 30rpx auto;
		padding: 0 20rpx;
		box-sizing: border-box;
	}

	.gfzsk {
		margin: 20rpx auto;
		text-align: center;
		width: 95%;
		padding-bottom: 80rpx;

		image {
			width: 100%;
			border-radius: 10rpx;
		}
	}

	.e-page {
		background-color: #CE514F;
		min-height: 100vh;

		.btns {
			display: flex;
			text-align: center;
			justify-content: space-between;
			align-items: center;
			margin: 30rpx 0;

			.btn1 {
				width: 7rem;
				background-color: $th;
				color: #FFF;
				height: 70rpx;
				line-height: 70rpx;
				border-radius: 20rpx;
			}

			.btn2 {
				width: 7rem;
				border: 4rpx solid $th;
				color: $th;
				height: 66rpx;
				line-height: 66rpx;
				border-radius: 20rpx;
			}

			.btn3 {
				width: 5rem;

			}
		}

		.m-box {
			background-color: #F8F8F8;
			padding: 15rpx 25rpx;
			border-radius: 4rpx;
			width: 95%;
			box-sizing: border-box;
			margin: 20rpx auto 0;

			.card {
				height: 300rpx;
				width: 100%;
				background: url('../../static/icon/ecny-bg.png') no-repeat;
				background-size: 100%;
				margin: 20rpx 0;

				.info {
					padding-top: 45px;
					padding-left: 30px;
					color: $th;
					font-weight: bold;
				}
			}

			.tlx {
				color: $th;
				line-height: 1.6rem;
				font-size: 28rpx;

				.cp {
					border: 1rpx solid $th;
					border-radius: 50rpx;
					padding: 0 20rpx;
					font-size: 26rpx;
				}
			}
		}

		.head {
			display: flex;
			justify-content: space-around;
			align-items: center;
			color: #fff;
			padding: 30rpx 0;
			text-align: center;

			text {
				display: block;
			}

			.icon {
				width: 2rem;
				height: 1rem;
				margin: 20rpx auto 10rpx;
			}
		}
	}
</style>