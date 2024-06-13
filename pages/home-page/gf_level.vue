<template>
	<view class="container">
		<view class="back_head" @click="too('/','bac')">
			<u--text prefixIcon="arrow-left" iconStyle="font-size: 38rpx;color:#ebebeb" color="#ebebeb" align="left"
				text=""></u--text>
			<u--text color="#fff" bold align="center" text="等级提升"></u--text>
			<u--text color="#d7d7d7" align="right" text=""></u--text>
		</view>
		<u-swiper previousMargin="30" bgColor="#40496F"
                nextMargin="30"
                circular :list="list1" @change="change" @click="click"></u-swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list1: [
					'https://cdn.uviewui.com/uview/swiper/swiper1.png',
					'https://cdn.uviewui.com/uview/swiper/swiper2.png',
					'https://cdn.uviewui.com/uview/swiper/swiper3.png',
				]
			};
		}
	}
</script>

<style lang="scss">
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
	}
.container{
		padding-bottom: 20px;
		background: #40496F;
		min-height: 100vh;
	}
</style>
