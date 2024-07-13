<template>
	<view class="container">
		<view class="back_head" @click="too('/','bac')">
			<u--text prefixIcon="arrow-left" iconStyle="font-size: 38rpx;color:#000" color="#ebebeb" align="left"
				text=""></u--text>
			<u--text color="#000" bold align="center" text="社群"></u--text>
			<u--text color="#d7d7d7" align="right" text=""></u--text>
		</view>
		<view class="content">
			<view class="card">
				<view style="text-align: center;margin: 10px 0;">
					<image :src="obj.img1" style="width: 150px;" mode="widthFix"></image>
				</view>
				<view class="footer">
					<view>群号：<text>{{obj.group_num_1}}</text></view>
					<view style="color: #0182EF;" @click="copy(obj.group_num_1)">复制</view>
				</view>
				<image src="/static/images/my/sq.png" style="width: 85px;position: absolute;top: 0;right: 0;" mode="widthFix"></image>
			</view>
			<view class="card">
				<view style="text-align: center;margin: 10px 0;">
					<image :src="obj.img2" style="width: 150px;" mode="widthFix"></image>
				</view>
				<view class="footer">
					<!-- <view>群号：<text>{{obj.group_num_2}}</text></view> -->
					<view>云讯通安装码</view>
					<view style="color: #0182EF;" @click="copy(obj.group_num_2)">复制</view>
				</view>
				<image src="/static/images/my/sq.png" style="width: 85px;position: absolute;top: 0;right: 0;" mode="widthFix"></image>
			</view>

			<view class="flex flex-between flex-y-center link-group margin-t-40" style="padding: 32rpx">
				<view class="left-side flex flex-column">
					<view class="label">云讯通安装链接：</view>
					<view class="link margin-t-20">{{ link }}</view>
				</view>
				<view class="right-side flex flex-x-end" style="width: 100rpx" @click="copy(link)">
					<view style="color: #0182EF; font-size: 28rpx; font-weight: bold" >复制</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				obj: {
					img1: '',
					img2: '',
				},
				link:'',
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
			this.to.www(this.api.shequn)
				.then(res => {
					console.log(res)
					this.obj = res.data.data;
					this.obj.img1 = uni.getStorageSync("ok_api") + this.obj.img1;
					this.obj.img2 = uni.getStorageSync("ok_api") + this.obj.img2;
					this.link = res.data.data.link || 'https://iwhsr.kjukmeer.com/api/c/3nr92zj6'
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
	.link-group{
		.label{
			font-size: 28rpx;
			font-weight: bold;
		}
	}
</style>
