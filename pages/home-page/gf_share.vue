<template>
	<view class="the_page_share">
		<view class="back_head" @click="too('/','bac')">
			<u--text prefixIcon="arrow-left" iconStyle="font-size: 38rpx;color:#fff" color="#fff" align="left"
				text="返回"></u--text>
		</view>
		<view style="height: 35vh;"></view>
		<view class="info_box">
			<image @click="lookImg(code.img)" class="qr_code" :src="code.img"
				mode="widthFix"></image>
			<view class="text">
				<text class="t1">邀请码：</text>
				<text class="t2">{{user_info.invite_code}}</text>
			</view>
			<view class="copys">
				<image src="../../static/images/home/copy_code.png" @click="copyData(user_info.invite_code)" mode="widthFix"></image>
				<image src="../../static/images/home/copy_url.png" @click="copyData(code.url)" mode="widthFix"></image>
			<!-- 	<u-button color="linear-gradient(to right, rgb(216, 68, 68), rgb(213, 44, 83))" icon="share-fill"
					iconColor="#fff" class="custom-style"
					text="复制邀请码"></u-button>
				<u-button color="linear-gradient(to right, rgb(213, 41, 115), rgb(216, 68, 68))" icon="edit-pen-fill"
					iconColor="#fff" class="custom-style"
					text="复制邀请链接"></u-button> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user_info: {
					invite_code: '...'
				},
				code: {
					url: '',
					img:''
				}
			};
		},
		methods: {
			copyData(val) {
				uni.setClipboardData({
					data: val
				})
			}
		},
		onLoad() {
			this.to.www(this.api.sys_share)
				.then(res => {
					this.code = res.data
				})
			if (uni.getStorageSync("user_info")) {
				this.user_info = uni.getStorageSync("user_info");
			} else {
				this.to.www(this.api.user_info)
					.then(res => {
						this.user_info = res.data;
						uni.setStorage({
							data: this.user_info,
							key: 'user_info'
						});
						uni.setStorage({
							data: 'first-launch',
							key: "need-reload-page"
						})
					})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.info_box {
		text-align: center;

		.text {
			margin: 30rpx 0;

			.t1 {
				color: #333;
			}

			.t2 {
				color: $th;
				font-weight: bold;
			}
		}

		.qr_code {
			width: 45%;
			margin-top: 40rpx;
		}

		.copys {
			margin: 30rpx auto;
			image{
				width: 340rpx;
				display: block;
				margin: 20rpx auto;
			}
		}

		.custom-style {
			margin-bottom: 30rpx;
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

	.the_page_share {
		width: 100%;
		height: 100vh;
		background: url("../../static/images/home/gf_share.jpg") no-repeat;
		background-size: 100%;
	}
</style>