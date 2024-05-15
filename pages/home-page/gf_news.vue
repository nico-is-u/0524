<template>
	<view>
		<view class="gf_news_conrent">
			<u-row justify="space-between" v-for="(item,index) in newsList" :key="index"
				customStyle="margin-bottom: 20rpx;box-shadow: 4rpx 4rpx 10rpx 2rpx rgba(33, 46, 104, 0.15);padding:25rpx;border-radius:10rpx"
				@click="toNewDetail(item)" align="start">
				<u-col span="11">
					<u--text prefixIcon="bell-fill" :lines="3"
						iconStyle="font-size: 42rpx;color:#EE2B2A;margin-right:10rpx" :text="item.title"></u--text>
				</u-col>
				<u-col span="1">
					<u--text suffixIcon="arrow-right" align="right" text=""></u--text>
				</u-col>
			</u-row>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				newsList: []
			};
		},
		onLoad() {
			this.to.www(this.api.system_news,{type:'11'},'p')
				.then(res => {
					this.newsList = res.data.data;
				})
		},
		methods: {
			toNewDetail(obj){
				let _ = this;
				uni.setStorage({
					data:obj,
					key:'NEWS_CACHE',
					success() {
						_.too('/pages/home-page/gf_news_detail')
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.gf_news_conrent {
		padding: 20rpx;
		margin: 20rpx auto 30rpx;
	}
</style>