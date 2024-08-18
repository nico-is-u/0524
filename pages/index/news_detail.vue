<template>
	<view class="news_page page3">
		<!-- 顶栏 -->
		<view class="page-navbar">
			<nNavbar title="详情" :showBackBtn="true" :back="true"></nNavbar>
		</view>

		<view style="height: 30rpx;"></view>
		<u-parse :content="obj.content" :tagStyle="style"></u-parse>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				obj:{},
				style: {
					img:'width:100%;margin:10px 0'
				}
			};
		},
		onLoad() {
			let data = uni.getStorageSync('NEWS_CACHE');
			this.obj = data;
		}
	}
</script>

<style lang="scss">
	.news_page {
		padding: 35rpx;
	}
</style>