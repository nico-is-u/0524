<template>
	<view class="cus_page">
		<view class="back_head" @click="too('/','bac')">
			<u--text prefixIcon="arrow-left" iconStyle="font-size: 38rpx;color:#ffffff" color="#ffffff" align="left"
				text=""></u--text>
			<u--text color="#ffffff" align="center" text="客服中心"></u--text>	
			<u--text color="#ffffff" align="right" text=""></u--text>	
		</view>
		<view class="btcc" @click="tokefu_url">
			在线客服
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				urlxxx:''
			};
		},
		onLoad() {
			this.to.www(this.api.system_info)
				.then(res => {
					this.urlxxx = res.data.setting_conf.kefu_url;
				})
		},
		methods:{
			tokefu_url(){
				window.open(this.urlxxx)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cus_page{
		margin-top: 60rpx;
		height: 100vh;
		overflow: hidden;
		background: url('../../static/images/home/custom.jpg') no-repeat;
		background-size: 100%;
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
		background-color: #B80606;
		z-index: 999;
	}
	.btcc{
		background-color: #cf0f0a;
		color: #FFF;
		position: fixed;
		top: 980rpx;
		left: 50%;
		width: 90%;
		margin: 10rpx auto;
		text-align: center;
		padding: 20rpx 0;
		font-size: 38rpx;
		border-radius: 20rpx;
		transform: translateX(-50%);
	}
</style>