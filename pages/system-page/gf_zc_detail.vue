<template>
	<view>
		<view class="back_head" @click="too('/','bac')">
			<u--text prefixIcon="arrow-left" iconStyle="font-size: 38rpx;color:#ffffff" color="#ffffff" align="left"
				text=""></u--text>
			<u--text color="#ffffff" align="center" text="交接明细"></u--text>
			<u--text color="#ffffff" align="right" text=""></u--text>
		</view>
		<image src="../../static/images/home/headbg.png" style="width: 100%;" mode="widthFix"></image>
		<view class="coawdss">
			<view class="item">
				<text>交接资产：</text>
				<text v-if="obj.forget_amount==1">忘记资产</text>
				<text>{{obj.digital_yuan_amount}}</text>
			</view>
			<view class="item">
				<text>共富等级：</text>
				<text>共富{{lev[obj.level]}}级</text>
			</view>
			<view class="item">
				<text>共富保障：</text>
				<view style="font-size: 26rpx;width:250rpx;text-align: right;">
					<text v-for="(item,index) in obj.ensure.split(',')" :key="index">
						{{item==1?'住房保障,':''}}{{item==2?'出行保障,':''}}{{item==3?'养老保障,':''}}{{item==4?'通讯保障':''}}</text>
				</view>
			</view>
			<view class="item">
				<text>先富/后富：</text>
				<text>{{obj.rich==1?'先富':'后富'}}</text>
			</view>

		<!-- 	<u-button color="linear-gradient(to right, #B80606, rgb(216, 68, 68))" iconColor="#fff" class="custom-style"
				text="二次资产交接" @click="torevoTwo"></u-button> -->

		</view>
		<view class="sign_info">
			<text class="title">注意事项：</text>
			<text class="t1">二次资产交接将覆盖原有数据，请谨慎填写。</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				obj: {
					digital_yuan_amount: '',
					level: 1,
					ensure: '',
					rich: ''
				},
				lev: ['0', '一', '二', '三', '四', '五'],
				usr_info: {}
			};
		},
		onLoad() {
			var usr_info = uni.getStorageSync("user_info");
			if (usr_info) {
				this.user_info = usr_info;
			}
			this.to.www(this.api.odzc_det)
				.then(res => {
					if (res.data) {
						this.obj = res.data;
					}
				})
				.catch(err=>{
					setTimeout(() => {
						uni.navigateBack()
					}, 1500)
				})


		},
		methods: {
			torevoTwo() {
				let _ = this;

				// return _.toa("已关闭")
				if (this.user_info.can_asset == 0) {
					return this.toa("已交接过资产")
				}


				if (this.user_info.second_asset == 0) {
					uni.showModal({
						title: "提示",
						content: "您未申请过资产交接，请选择第一次申请交接",
						confirmColor: "#B80606",
						success(res) {
							if (res.confirm) {
								_.too('/pages/home-page/zc_recover?g=0b101010010101010101010')
							}
						}
					})
				}
				if (this.user_info.second_asset == 1) {
					this.too('/pages/home-page/zc_recover?g=0b101010010101010101011')
				}
				if (this.user_info.second_asset == 2) {
					uni.showModal({
						title: "提示",
						content: "您已提交过二次资产交接，敬请期待交接完成！",
						showCancel: false,
						confirmColor: "#B80606"
					})
				}
				if (this.user_info.second_asset == 3) {
					uni.showModal({
						title: "提示",
						content: "第二次资产已交接已完成！",
						showCancel: false,
						confirmColor: "#B80606"
					})
				}
			},
		}
	}
</script>

<style lang="scss">
	.sign_info {
		padding: 40rpx;
		transform: translateY(-170rpx);

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

	.custom-style {
		margin-top: 100rpx;
		border-radius: 50rpx;
	}

	.coawdss {
		background-color: #fff;
		border-radius: 10rpx;
		padding: 30rpx;
		box-sizing: border-box;
		width: 90%;
		margin: 0 auto;
		transform: translateY(-200rpx);
		box-shadow: 2rpx 3rpx 10rpx 5rpx rgba(129, 129, 129, 0.3);

		.item {
			background-color: #f1f1f1;
			margin: 30rpx 0;
			padding: 15rpx 20rpx;
			color: #707070;
			border-radius: 8rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
	}

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
		z-index: 999;
	}
</style>