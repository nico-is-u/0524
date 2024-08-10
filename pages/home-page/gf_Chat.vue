<template>
	<view class="the_page">
		<view class="content">
			<view class="imgs">
				<image :src="wh_url" mode="widthFix"></image>
				<text>云数中国官方群</text>
				<image :src="qq_url" mode="widthFix"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				wh_url:'',
				qq_url:''
			};
		},
		onLoad() {
			this.to.www(this.api.system_info)
				.then(res => {
					this.wh_url = res.data.setting_conf.microcore_group;
					this.qq_url = res.data.setting_conf.qq_group;
				})
		},
		methods:{
		}
	}
</script>

<style lang="scss">
.content{
	width: 100%;
	padding: 30rpx;
	height: 350rpx;
	box-sizing: border-box;
	background-image: linear-gradient(to bottom, $th,#ececec);
	.imgs{
		background-color: #fff;
		border-radius: 12rpx;
		text-align: center;
		padding: 30rpx;
		margin-top: 50rpx;
		box-sizing: border-box;
		image{
			width: 100%;
			border-radius: 6rpx;
		}
		text{
			color: $th;
			margin: 30rpx auto 60rpx;
			display: block;
		}
	}
}
.the_page{
	height: 100vh;
	background-color: #ececec;
}
</style>
