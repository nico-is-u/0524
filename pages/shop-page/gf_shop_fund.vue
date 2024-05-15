<template>
	<view>
		<view class="item" v-for="(item,index) in list" :key="index">
			<view class="title">{{item.project_name}}</view>
			<view class="info">到期时间：{{item.end_time}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				page: 1, //页码
				last_page: '',
			};
		},
		onLoad() {
			this.getAmountFund()
		},
		methods: {
			getAmountFund() {
				this.to.www(this.api.liuzhuanls, {
						page:this.page
					})
					.then(res => {
						this.list.push(...res.data.data);
						this.last_page = res.data.last_page;
					})
			}
		},
		onReachBottom() {
			if(this.page<this.last_page){
				this.page++;
				this.getAmountFund();
			}else{
				this.toa('没有更多了')
			}
		}
	}
</script>

<style lang="scss">
.item{
	width: 95%;
	margin: 35rpx auto;
	border-radius: 10rpx;
	box-shadow: 0 2rpx 8rpx 5rpx rgba(80, 80, 80, .2);
	background-color: #ededed;
	padding: 20rpx 30rpx ;
	box-sizing: border-box;
	.title{
		font-size: 30rpx;
		font-weight: bold;
		margin-bottom: 8rpx;
	}
	.info{
		font-size: 28rpx;
	}
}
</style>
