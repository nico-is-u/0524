<template>
	<view class="container">
		<view class="back_head" @click="too('/','bac')">
			<u--text prefixIcon="arrow-left" iconStyle="font-size: 38rpx;color:#000" color="#ebebeb" align="left"
				text=""></u--text>
			<u--text color="#000" bold align="center" text="App下载"></u--text>
			<u--text color="#d7d7d7" align="right" text=""></u--text>
		</view>
		<view class="content">
			<view class="card">
				<view style="text-align: center;">
					<image src="/static/images/my/l.png" style="width: 50px;" mode="widthFix"></image>
					<text style="color: #0182EF;font-weight: bold;margin: 0 10px;font-size: 16px;">安卓系统安装</text>
					<image src="/static/images/my/r.png" style="width: 50px;" mode="widthFix"></image>
				</view>
				<view style="text-align: center;margin: 10px 0;">
					<image :src="systemInfo.apk_download_url_qrcode" style="width: 150px;" mode="widthFix"></image>
				</view>
				<view class="footer">
					<view>链接：<text>{{systemInfo.apk_download_url}}</text></view>
					<view style="color: #0182EF;" @click="copy(systemInfo.apk_download_url)">复制</view>
				</view>
				<image src="/static/images/my/az.png" style="width: 85px;position: absolute;top: 0;right: 0;" mode="widthFix"></image>
			</view>
			<!-- 苹果系统安装 -->
			<!-- <view class="card">
				<view style="text-align: center;">
					<image src="/static/images/my/l.png" style="width: 50px;" mode="widthFix"></image>
					<text style="color: #0182EF;font-weight: bold;margin: 0 10px;font-size: 16px;">苹果系统安装</text>
					<image src="/static/images/my/r.png" style="width: 50px;" mode="widthFix"></image>
				</view>
				<view style="text-align: center;margin: 10px 0;">
					<image :src="systemInfo.ios_download_url_qrcode" style="width: 150px;" mode="widthFix"></image>
				</view>
				<view class="footer">
					<view>链接：<text>{{systemInfo.ios_download_url}}</text></view>
					<view style="color: #0182EF;" @click="copy(systemInfo.ios_download_url)">复制</view>
				</view>
				<image src="/static/images/my/pg.png" style="width: 85px;position: absolute;top: 0;right: 0;" mode="widthFix"></image>
			</view> -->
			<view class="card">
				<view style="text-align: center;">
					<image src="/static/images/my/l.png" style="width: 50px;" mode="widthFix"></image>
					<text style="color: #0182EF;font-weight: bold;margin: 0 10px;font-size: 16px;">电脑PC端安装</text>
					<image src="/static/images/my/r.png" style="width: 50px;" mode="widthFix"></image>
				</view>
				<view style="text-align: center;margin: 10px 0;">
					<image :src="systemInfo.pc_download_url_qrcode" style="width: 150px;" mode="widthFix"></image>
				</view>
				<view class="footer">
					<view>链接：<text>{{systemInfo.pc_download_url}}</text></view>
					<view style="color: #0182EF;" @click="copy(systemInfo.pc_download_url)">复制</view>
				</view>
				<image src="/static/images/my/pc.png" style="width: 85px;position: absolute;top: 0;right: 0;" mode="widthFix"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				systemInfo: {
					ios_download_url: '',
					pc_download_url: '',
					apk_download_url: '',
					pc_download_url_qrcode: '',
					ios_download_url_qrcode: '',
					apk_download_url_qrcode: '',
				}
			};
		},
		methods: {
			copy(val) {
				uni.setClipboardData({
					data: val
				})
			}
		},
		onLoad() {
			this.to.www(this.api.systemInfo)
				.then(res => {
					this.systemInfo = res.data.setting_conf;
				})
		}
	}
</script>

<style lang="scss">
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
