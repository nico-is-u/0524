<template>
	<view>
		<view class="ser_list">
			<view style="margin: 60rpx auto;" v-if="!list.length">
				<u-empty mode="list" icon-size="50" ></u-empty>
			</view>
			<view class="box" v-for="(item,index) in list" :key="index"
			 @click="toodet(item)">
				<view class="item">
					<u--text bold :text="'提现金额：'+ Math.abs(item.amount)+'元'"></u--text>
					<u--text bold align="right" size="14px"
						:text="item.stext"></u--text>
				</view>
				<view class="item">
					<!-- <u--text :text="'余额：'+item.after_balance" color="#273238" size="12px"></u--text> -->
					<u--text size="12px" :text="'提现时间：'+item.created_at.slice(0,10)"></u--text>
					<!-- <u--text align="right" size="12px" :text="item.created_at"></u--text> -->
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
			toodet(obj){
				this.too('/pages/system-page/gf_amount_ecny-fund-det?id='+obj.id+'&m='+obj.amount)
			},
			getAmountFund() {
				this.to.www(this.api.czotxli, {
						log_type: 7,
						type:2,
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