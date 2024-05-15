<template>
	<view>
		<view class="gf_news_conrent">
			<view style="margin: 60rpx auto;" v-if="!newsList.length">
				<u-empty mode="list" icon-size="50"></u-empty>
			</view>
			<u-row justify="space-between" v-for="(item,index) in newsList" :key="index"
				customStyle="margin-bottom: 20rpx;box-shadow: 4rpx 4rpx 10rpx 2rpx rgba(33, 46, 104, 0.15);padding:25rpx;border-radius:10rpx"
				@click="toNewDetail(item)" align="start">
				<u-col span="12">
					<u--text prefixIcon="bell-fill" :lines="3"
						iconStyle="font-size: 42rpx;color:#EE2B2A;margin-right:10rpx;" :text="item.title"></u--text>
					<!-- <u-parse content="的话哇塞u哦分很高的撒娇风格的梵蒂冈撒尽快恢复供电数据库阿凡达公司附近好卡法国撒旦计划"></u-parse> -->
				</u-col>
				<u-col span="0">
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

			this.to.www(this.api.xiaoxilists)
				.then(res => {
					this.newsList = res.data.data;
				})
			// this.to.www(this.api.system_news,{type:'1'},'p')
			// 	.then(res => {
			// 		if(res.data.data){
			// 			this.newsList = res.data.data;
			// 		}else{
			// 			this.newsList = res.data;
			// 		}
			// 	})
		},
		methods: {
			toNewDetail(obj) {
				let _ = this;
				this.to.www(this.api.yiduzhannxx,{id:obj.id})
					.then(res => {
					})
					.catch(err => {
						console.log(err);
					})
				uni.setStorage({
					data: obj,
					key: 'NEWS_CACHE',
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