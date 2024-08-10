<template>
	<view>
		<view class="ser_list">
			<view style="margin: 60rpx auto;" v-if="!list.length">
				<u-empty mode="list" icon-size="50"></u-empty>
			</view>
			<view class="box" v-for="(item,index) in list" :key="index">
				<view class="item">
					<u--text :text="type!=3?item.stext:item.type_text"></u--text>
					<u--text align="right" size="14px" :color="item.type==2?'#00aa7f' :'#e01b1b'"
						:text="type!=3?item.amount:item.change_balance"></u--text>
				</view>
				<view class="item">
					<!-- <u--text :text="'余额：'+item.after_balance" color="#273238" size="12px"></u--text> -->
					<u--text size="12px" :text="type!=3?item.bank_name:item.order_sn"></u--text>
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
				type: '', //1 充值  2 提现 3 云数中国收益
			};
		},
		onLoad(opt) {
			this.type = opt.type;
			opt.type == 1 && uni.setNavigationBarTitle({
				title: "充值明细"
			})
			opt.type == 2 && uni.setNavigationBarTitle({
				title: "提现明细"
			})
			opt.type == 3 && uni.setNavigationBarTitle({
				title: "收益明细"
			})
			this.getAmountFund()
		},
		methods: {
			getAmountFund() {
				this.to.www(this.type==3?this.api.user_balancelog_purse:this.api.czotxli, {
						type: this.type,
						log_type: 0,
						page: this.page
					})
					.then(res => {
						let data = res.data.data;
						let newData = [];
						data.forEach(item => {
							if (item.type == this.type && this.type!=3) {
								newData.push(item)
							} else {
                newData.push(item)
              }
						})
						this.list.push(...newData);
						this.last_page = res.data.last_page;
					})
			}
		},
		onReachBottom() {
			if (this.page < this.last_page) {
				this.page++;
				this.getAmountFund();
			} else {
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