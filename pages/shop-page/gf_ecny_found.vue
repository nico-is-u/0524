<template>
	<view>
		<view class="ser_list">
			<view style="margin: 60rpx auto;" v-if="!list.length">
				<u-empty mode="list" icon-size="50" ></u-empty>
			</view>
			<view class="box" v-for="(item,index) in list" :key="index">
				<view class="item">
					<text style="width: 10rpx ;height: 10rpx ;border-radius: 50%;background: #e01b1b;margin-right: 8rpx;"></text>
					<u--text :text="item.type_text"></u--text>
					<u--text align="right" size="14px" :color="item.change_balance<0?'#00aa7f' :'#e01b1b'"
						:text="item.change_balance"></u--text>
				</view>
				<view class="item">
					<!-- <u--text :text="'余额：'+item.after_balance" color="#273238" size="12px"></u--text> -->
					<u--text size="12px" :text="item.order_sn"></u--text>
					<u--text align="right" size="12px" :text="item.created_at"></u--text>
				</view>
			</view>
		</view>
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
				this.to.www(this.api.balance_log, {
						log_type: 1,
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
	.ser_list {
		background-color: #fff;
		border-radius: 10rpx;
		padding: 20rpx 40rpx;

		.box {
			box-shadow: 2rpx 2rpx 5rpx 2rpx rgba(33, 46, 104, 0.15);
			margin-bottom: 20rpx;
			padding: 20rpx;
			border-radius: 10rpx;
			box-sizing: border-box;
		}

		.item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 8rpx 0;
		}
	}
</style>