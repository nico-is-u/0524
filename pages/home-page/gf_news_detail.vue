<template>
	<view class="news_page">
		<!-- 顶栏 -->
		<nNavbar title="详情"></nNavbar>

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