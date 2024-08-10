<template>
	<view>
		<view class="content-czgz">
			<view class="contents">
				<view class="item">
					<text>申请人姓名：</text>
					<text class="line">{{uri.realname}}</text>
				</view>
				<view class="item">
					<text>公民身份证号码：</text>
					<text class="line">{{uri.ic_number}}</text>
				</view>
				<view class="item">
					<text>公证事项：</text>
					<text class="line">财产证明</text>
				</view>
				<view class="list">
					<view class="item">
						<text>1、云数中国专属卡：</text>
						<text class="line">{{uri.wallet_id}}</text>
					</view>
					<view class="item">
						<text>2、E-CNY资产：</text>
						<text class="line">{{uri.assessment_amount}}</text>
						<text style="margin-left: 10rpx;font-weight: normal;">(税费已缴纳)</text>
					</view>
					<view class="item">
						<text>3、华为手机：</text>
						<text class="">{{data.tongxun_text}}</text>
					</view>
					<view class="item">
						<text>4、养老保障金：</text>
						<text class="">{{data.yanglao_text}}</text>
					</view>
					<view class="item">
						<text>5、出行保障车：</text>
						<text class="">{{data.chuxing_text}}</text>
					</view>
					<view class="item">
						<text>6、住房津贴：</text>
						<text class="">{{data.jintie_text}}</text>
					</view>
					<view class="item">
						<text>7、保障性住房：</text>
						<text class="">{{data.zhufang_text}}</text>
					</view>
				</view>
				<view class="info">
					<view class="mmm">
						<text>公证费：</text>
						<text class="ppp">{{data.notarization_amount}}</text>
						<text>元</text>
					</view>
					<view class="bbb" @click="dododo">
						立即公证
					</view>
				</view>
			</view>
		</view>

		<u-overlay :show="showUrNots" @click="showUrNots=false" zIndex="999" opacity="0.8">
			<view class="warp">
				<view class="rect" @tap.stop>
					<view>提示</view>
					<view style="margin: 30rpx 0 0;">
						<u--text prefixIcon="coupon-fill" iconStyle="font-size: 34rpx;margin-top:6rpx;margin-right:8rpx"
							size="14" :text="'请输入支付密码，余额：'+Number(uri.cash).toFixed(2)"></u--text>
						<view style="margin: 30rpx 0 0;">
							<!-- <x-validatorInput v-model="pwd" :numArr="6"></x-validatorInput> -->
							<xt-verify-code :isPassword="true" boxActiveColor="#333" v-model="pwd"></xt-verify-code>
						</view>
					</view>
					<u-button iconColor="#fff" class="custom-style" text="提交" :loading="isDone"
						@click="duBuyBtn"></u-button>
				</view>
			</view>
		</u-overlay>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				showUrNots: false,
				isDone: false,
				pwd: '',
				data: {
					"tongxun_text": "0部", //华为手机
					"yanglao_text": "0万", //养老保障金
					"chuxing_text": "2台", //出行保障车
					"zhufang_text": "无", //保障性住房
					"jintie_text": '0份', //住房津贴
					"notarization_amount": "0" //公证费
				},
				uri: {}
			};
		},
		onLoad() {

			this.uri = uni.getStorageSync("user_info")

			this.to.www(this.api.gongzhengxiixijielk)
				.then(res => {
					// console.log(res);
					this.data = res.data
				})
				.catch(err => {
					console.log(err);
				})
		},
		methods: {
			duBuyBtn() {
				if (this.pwd.length < 6) {
					return this.toa("请输入支付密码")
				}
				this.to.www(this.api.xaidanxiadanxiadan, {
						pay_password: this.pwd,
					})
					.then(res => {
						uni.showToast({
							title: '已公证',
							success() {
								setTimeout(()=>{
									uni.navigateBack()
								},1500)
							}
						})
					})
					.catch(err => {
						this.pwd = ''
					})
			},
			dododo() {
				this.showUrNots = true
			}
		}
	}
</script>

<style lang="scss">
	.warp {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
	}

	.custom-style {
		margin: 40rpx auto;
		border-radius: 8rpx;
		width: 300rpx;
		height: 80rpx;
		line-height: 80rpx;
		background-color: $th;
		color: #FFF;
	}

	.rect {
		width: 76%;
		border-radius: 10rpx;
		background-color: #fff;
		padding: 32rpx 15rpx;
		text-align: center;

		.content {
			background-color: #FFF;
			padding: 20rpx;
			border-radius: 10rpx;
			height: calc(100% - 105rpx);
			border: 4rpx solid #bdbdbd;
			box-sizing: border-box;
			min-height: 50%;
			overflow-y: scroll;
		}
	}

	.content-czgz {
		width: 96%;
		margin: 30rpx auto;
		// height: 0vh;
		background-size: 100%;
		background-image: url('../../static/images/home/gz1.jpg');
		background-repeat: no-repeat;
		padding: 57% 80rpx 0;
		box-sizing: border-box;

		.contents {
			padding-bottom: 150rpx;

			.item {
				font-size: 12px;
				margin-bottom: 2rpx;
				color: #000000;
			}

			.list {
				margin-top: 25rpx;
			}

			.info {
				margin-top: 15rpx;
				text-align: center;

				.mmm {
					font-weight: bold;
					font-size: 13px;

					.ppp {
						color: $th;
						font-size: 16px;
					}
				}

				.bbb {
					color: #fff;
					background-color: $th;
					border-radius: 10rpx;
					width: 260rpx;
					height: 60rpx;
					line-height: 60rpx;
					margin: 10rpx auto 0;
					box-shadow: -2rpx 2rpx 5rpx 2rpx #676767;
				}
			}
		}
	}

	.line {
		border-bottom: 2rpx solid #333;
		padding: 0 10rpx;
		font-weight: normal;
	}
</style>