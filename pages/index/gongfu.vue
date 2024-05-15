<template>
	<view>
		<view class="top_tab_nav">
			<view class="page_title_tab">
				<text :class="['title',ProCurIndex==1?'cur':'']" @click="ProCurIndex=1">共富工程</text>
				<text :class="['title',ProCurIndex==2?'cur':'']" @click="ProCurIndex=2">领取记录</text>
			</view>
		</view>
		<!-- 共富工程的页面 包含共富工程和领取记录 -->
		<template>
			<!-- 共富工程 -->
			<view v-if="ProCurIndex==1">
				<view style="margin: 160rpx;" v-if="!project_list.length">
					<u-empty mode="list"></u-empty>
				</view>
				<view class="project_box">
					<view class="project_item" v-for="(item,index) in project_list" @click="topay(item)" :key="index">
						<view class="p_red">
							<view class="p_title">
								<text>{{item.name}}</text>
								<text class="p_dobuy">立即领取</text>
							</view>
							<view class="p_price">
								<text class="num">{{item.sum_amount}}</text>
							</view>
						</view>
						<view class="p_info">
              <view class="flex">
                <view>认购金额：</view>
                <text>{{item.single_amount}}</text>
              </view>
              <view class="flex">
                <view>开放周期：</view>
                <text>{{item.period}}</text>
                <view>天</view>
              </view>
              <view class="flex">
                <view>项目份额：</view>
                <text>{{item.total_quota}}</text>
                <view>份</view>
              </view>
              <view class="flex">
                <view>持有每日收益：</view>
                <text>{{item.daily_bonus_ratio}}</text>
                <view>元</view>
              </view>
              <view class="flex">
                <view>持有到期收益：</view>
                <text>{{item.sum_amount}}</text>
              </view>
							<!-- <view v-if="item.underline_price=='0.00'">提交<text>{{item.single_amount}}</text>元审核金</view> -->
							<!-- <view v-else>提交<text style="text-decoration: line-through;">{{item.underline_price}}</text>元审核金。 <text>现价：{{item.single_amount}}</text> </view> -->
							<!-- <view>审核期<text>{{item.review_period}}</text>小时</view> -->
							<!-- <view>{{item.intro}}</view> -->
							<!-- <view>审核金将于<text>{{item.period}}</text>天后返回数字人民币</view> -->
							<!-- <view>审核金将于<text>{{item.review_period}}</text>小时后返回数字人民币</view> -->
						</view>
						<view class="p_line">
							<text class="text">幸福生活进度</text>
							<view style="display: flex;justify-content: space-between;width: 100%;">
								<u-line-progress :percentage="Number(item.virtually_progress).toFixed(0)" height="18"
									activeColor="#F2C118"></u-line-progress>
							<text style="color: #d3d3d3;font-size: 24rpx;padding-left: 10rpx;">{{item.virtually_progress}}%</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 领取记录 -->
			<view v-else>
				<view class="ser_list">
					<view style="margin: 60rpx auto;" v-if="!projectlog.length">
						<u-empty mode="list" icon-size="50"></u-empty>
					</view>
					<view class="box" v-for="(item,index) in projectlog" :key="index">
						<view class="item">
							<u--text :text="item.project_name"></u--text>
							<u--text align="right" size="14px" color="#991313" :text="item.single_amount"></u--text>
						</view>
						<view class="item">
							<u--text :text="item.order_sn" size="12px"></u--text>
							<u--text align="right" size="12px" :text="item.pay_date"></u--text>
						</view>
					</view>
				</view>
			</view>
		</template>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: 1, //共富工程  2 激活数字人民币钱包  3激活数字人民币账单 4商城
				page: 1,
				ProCurIndex: 1,
				isReload: true,
				project_list: [],
				projectlog: [],
			};
		},
		onLoad() {
			this.getList()
		},
		watch: {
			ProCurIndex() {
				if (this.ProCurIndex == 2) {
					this.getOrderLog()
				}
			}
		},
		methods: {
			topay(obj) {
				if (obj.virtually_progress < 100) {
					uni.setStorage({
						data: obj,
						key: "WHITE_DO_BUY",
						success() {
							uni.navigateTo({
								url: '/pages/shop-page/gf_buy_project'
							})
						}
					})
				} else {
					this.toa("分配已满")
				}
			},
			getList(w) {
				this.to.www(this.api.project_list, {
						// project_group_id: this.type,
						project_group_id: 5,
						page: this.page,
					}, 'p')
					.then(res => {
            console.log(res);
						this.project_list = res.data.data;
						if (w) {
							this.toa("已刷新")
							uni.stopPullDownRefresh();
						}
						this.getOrderLog()
					})
			},
			getOrderLog(w) {
				this.to.www(this.api.order_log, {
						// project_group_id: this.type,
						project_group_id: 5,
					}, 'p')
					.then(res => {
						this.projectlog = res.data.data;
						if (w) {
							this.toa("已刷新")
							uni.stopPullDownRefresh();
						}
					})
			}
		},
		onPullDownRefresh() {
			if (this.isReload) {
				this.isReload = false;
				setInterval(() => {
					this.isReload = true;
				}, 15000)
				this.getList('reload')
			} else {
				this.toa("操作频繁");
				uni.stopPullDownRefresh();
			}
		}

	}
</script>

<style lang="scss">
	// .top_tab_nav {
	// 	position: sticky;
	// 	top: 0;
	// 	z-index: 1000;
	// }

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

	.project_box {
		padding: 20rpx 50rpx;

		.project_item {
			box-shadow: 2rpx 2rpx 10rpx 5rpx rgba(33, 46, 104, 0.3);
			margin-bottom: 30rpx;
			border-radius: 6rpx;
			overflow: hidden;

			.p_red {
				background-color: #d20d19;
				color: #FFF;
				border-radius: 0 0 60% 60%;
				overflow: hidden;
				box-shadow: 2rpx 2rpx 15rpx 5rpx rgba(33, 46, 104, 0.4);

				.p_title {
					display: flex;
					font-size: 30rpx;
					justify-content: space-between;
					align-items: center;
					padding: 15rpx;

					.p_dobuy {
						display: block;
						width: 150rpx;
						text-align: center;
						border-radius: 8rpx;
						height: 60rpx;
						line-height: 60rpx;
						background-color: #fc5f5f;
					}
				}

				.p_price {
					background-color: #FCE2A7;
					color: $th;
					width: 80%;
					height: 160rpx;
					margin: 30rpx auto 0;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 70rpx;
					font-weight: bold;
					border-radius: 15rpx 15rpx 0 0;
				}
			}

			.p_info {
				padding: 20rpx 40rpx;
				line-height: 60rpx;

				text {
					color: $th;
					font-weight: bold;
				}
			}

			.p_line {
				text-align: center;
				padding: 20rpx 30rpx;
				height: 180rpx;
				margin-top: -80rpx;
				background-image: linear-gradient(to bottom, #fff, #CF1824);

				.text {
					margin-top: 60rpx;
					font-weight: bold;
					// font-style:oblique;
					letter-spacing: 6rpx;
					text-shadow:
						1px 0 3px #fffde4,
						0 1px 3px #ececf7,
						-1px 0 3px #e6e0d3,
						0 -1px 3px #f6ff9c;
					font-size: 40rpx;
					display: block;
					margin-bottom: 15rpx;
					color: $th;
				}
			}
		}

	}

	.page_title_tab {
		background-color: #B80606;
		height: 80rpx;
		color: #fff;
		display: flex;
		justify-content: space-around;
		align-items: center;

		.title {
			opacity: .7;
			font-size: 30rpx;
			transition: all .3s;
			position: relative;
			display: block;
			width: 50%;
			text-align: center;
		}

		.title::before {
			content: '';
			position: absolute;
			left: 25%;
			bottom: -15rpx;
			width: 0;
			transition: all .3s;
			height: 4rpx;
			background-color: #fff;
		}

		.cur {
			opacity: 1;
			font-size: 40rpx;
		}

		.title.cur::before {
			width: 50%;
		}
	}
  .flex {
    display: flex;
  }
</style>