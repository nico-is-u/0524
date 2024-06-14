<template>
	<view class="container">
		<view class="back_head" @click="too('/','bac')">
			<u--text prefixIcon="arrow-left" iconStyle="font-size: 38rpx;color:#000" color="#ebebeb" align="left"
				text=""></u--text>
			<u--text color="#000" bold align="center" text="邀请好友"></u--text>
			<u--text color="#d7d7d7" align="right" text=""></u--text>
		</view>
		<view class="content">
			<view class="card">
				<view style="text-align: center;font-size: 16px;font-weight: bold;">我的邀请码</view>
				<view class="code">
					<view>{{user_info.invite_code[0]}}</view>
					<view>{{user_info.invite_code[1]}}</view>
					<view>{{user_info.invite_code[2]}}</view>
					<view>{{user_info.invite_code[3]}}</view>
					<view>{{user_info.invite_code[4]}}</view>
					<view>{{user_info.invite_code[5]}}</view>
					<view>{{user_info.invite_code[6]}}</view>
				</view>
				<view class="footer">
					<view style="flex: 8;">链接：
					<text>{{code.url}}</text></view>
					<view style="color: #0182EF;flex: 1;" @click="copy(code.url)">复制</view>
				</view>
			</view>
			<view class="card">
				<view style="text-align: center;font-size: 16px;font-weight: bold;">邀请邀请码</view>
				<view style="text-align: center;margin: 10px 0;">
					<image :src="code.img" style="width: 150px;" mode="widthFix"></image>
				</view>
				<view class="btn" @click="copy(user_info.invite_code)">保存二维码</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user_info: {
					invite_code: '.......'
				},
				code: {
					url: '',
					img:''
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
			this.to.www(this.api.sys_share)
				.then(res => {
					this.code = res.data
				})
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
</script>

<style lang="scss">
	.btn{
		background: linear-gradient( 90deg, #2E9FFF 0%, #0182EF 100%);
		border-radius: 36px 36px 36px 36px;
		color: #fff;
		width: 80%;
		text-align: center;
		margin: 0 auto;
		padding: 5px 20px;
	}
	.code{
		display: grid;
		grid-template-columns: repeat(7,1fr);
		text-align: center;
		grid-gap: 10px;
		margin: 15px 0;
		>view{
			background: #F9F9F9;
			width: 100%;
			aspect-ratio: 1/1;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 24px;
			color: #0182EF;
			border-radius: 8px;
		}
	}
	.footer{
		background: #F2F7FB;
		border-radius: 4px 4px 4px 4px;
		display: flex;
		justify-content: space-between;
		align-items: center;
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
