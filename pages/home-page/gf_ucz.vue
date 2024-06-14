<template>
	<view class="container">
		<view class="back_head" @click="too('/','bac')">
			<u--text prefixIcon="arrow-left" iconStyle="font-size: 38rpx;color:#000" color="#ebebeb" align="left"
				text=""></u--text>
			<u--text color="#000" bold align="center" text="USDT充值"></u--text>
			<u--text color="#d7d7d7" align="right" text=""></u--text>
		</view>
		<view class="content">
			<view class="card">
				<view style="text-align: center;font-size: 16px;background: #FDF4EC;border-radius: 8px;padding: 8px 0;color: #CD854B;">该地址仅支持TRX/TRC20相关资产</view>
				<view style="text-align: center;margin: 20px 0;">
					<image :src="cz.qrcode" style="width: 150px;" mode="widthFix"></image>
				</view>
				<view class="footer">
					<view>接收地址：<text>{{cz.address}}</text></view>
				</view>
				<view class="footer1">
					<view><image src="/static/images/my/fx.png" style="width: 20px;margin-right: 5px;" mode="widthFix"></image>分享</view>
					<view @click="copy(cz.address)"><image src="/static/images/my/fz.png" style="width: 20px;margin-right: 5px;" mode="widthFix"></image>复制</view>
				</view>
			</view>
			<view class="btn" @click="upload">转账凭证提交</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cz: {}
			};
		},
		methods: {
			copy(val) {
				uni.setClipboardData({
					data: val
				})
			},
			upload(){
				let that = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['album'],
					success: function (res) {
						uni.showLoading();
						that.to.www(that.api.usdtUploadRechargeToken, res.tempFilePaths[0], "p", "file")
							.then(res => {
								that.toa('上传成功')
								uni.hideLoading();
							})
							.catch((err) => {
								console.log(err)
								// uni.hideLoading();
							})
					}
				});
			},
		},
		onLoad() {
			this.to.www(this.api.usdtRechargeInfo).then(res => {
				this.cz = res.data;
			})
		}
	}
</script>

<style lang="scss">
	.footer1{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20px 0 0 0;
		>view{
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		>view + view{
			border-left: 1px solid #d9d9d9;
		}
	}
.btn{
		background: linear-gradient( 90deg, #2E9FFF 0%, #0182EF 100%);
		margin-top: 20px;
		border-radius: 8px;
		color: #fff;
		width: 100%;
		text-align: center;
		padding: 10px 20px;
	}
	.footer{
		background: #F2F7FB;
		border-radius: 4px 4px 4px 4px;
		display: flex;
		justify-content: space-between;
		padding: 10px;
		font-weight: bold;
		text{
			color: #666666;
			font-weight: normal;
		}
	}
	.content{
		padding-top: 56px;
	}
	.card{
		background: linear-gradient( 180deg, rgba(255,255,255,0.5) 0%, #FFFFFF 100%);
		box-shadow: 0px 4px 12px 0px rgba(0,20,51,0.05);
		border-radius: 12px 12px 12px 12px;
		border: 1px solid #E6F4FF;
		position: relative;
	}
.container{
		padding: 0 20px 20px 20px;
		background: #EFF8FF;
		min-height: 100vh;
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
		background: #EFF8FF;
	}
</style>
