<template>
	<view class="page">
		<view class="empty-list">
			<image src="/static//images/15.png" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	export default {
	}
</script>

<style lang="scss">
page{
	height: 100%;
}
.page{
	height: 100%;
	background-color: white;

	.empty-list{
		display: flex;
		justify-content: center;
		padding-top: 16vh;
		image{
			width: 360rpx;
		}
	}
}
</style>