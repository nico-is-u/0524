<template>
	<view>
		<view class="top_tab_nav">
			<view class="page_title_tab">
				<text :class="['title',ProCurIndex==1?'cur':'']" @click="ProCurIndex=1">激活账单</text>
				<text :class="['title',ProCurIndex==2?'cur':'']" @click="ProCurIndex=2">激活记录</text>
			</view>
		</view>
		<!-- 激活钱包的页面 包含激活钱包和激活记录 -->
		<template v-if="ProCurIndex==1">
			<view class="project_box">
				<view style="margin: 60rpx auto;" v-if="!project_list.length">
					<u-empty mode="list" icon-size="50"></u-empty>
				</view>
				<view class="project_item" v-for="(item,index) in project_list" :key="index"
				@click="topay(item)">
					<view class="p_title">
						<text>{{item.name}}</text>
						<u-button class="bybtn" type="error" customStyle="backgrund-color:#B80606" size="small" text="立即激活"></u-button>
					</view>
					<view class="p_box">
						<view class="bg_box">
							<view class="p_p">
								<text>{{item.single_amount}}元</text>
							</view>
							<view class="t1">提交<text>{{item.single_amount}}</text>元激活金</view>
							<view class="t1">
								获得终身免费使用数字人民币钱包资格，马上可以使用数字人民币钱包提现功能，激活后<text>{{item.single_amount}}</text>元自动退回数字人民币钱包
							</view>
							<view>{{item.intro}}</view>
							<!-- <view class="t1">总名额<text>200000</text>名</view> -->
							<!-- <view class="t1">剩余名额<text>34688</text>名</view> -->
						</view>
					<!-- 	<u--text text="当前申请进度" customStyle="margin:10px 0"></u--text>
						<u-line-progress :percentage="item.virtually_progress" height="18"
							activeColor="#B80606"></u-line-progress> -->
					</view>
				</view>
			</view>
		</template>
		<template v-else>
			<view class="project_box">
				<view style="margin: 60rpx auto;" v-if="!projectlog.length">
					<u-empty mode="list" icon-size="50"></u-empty>
				</view>
				<view class="ser_list">
					<view class="box" v-for="(item,index) in projectlog" :key="index">
						<view class="item">
							<u--text :text="item.project_name"></u--text>
							<u--text align="right" size="14px" color="#991313"
								:text="item.single_amount"></u--text>
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
				type: 3, //共富工程  2 激活数字人民币钱包  3激活数字人民币账单
				page: 1,
				ProCurIndex: 1,
				isReload: true,
				project_list: [],
				projectlog: [],
			};
		},
		onShow() {
			this.getList()
		},
		methods: {
			topay(obj){
				uni.setStorage({
					data:obj,
					key:"WHITE_DO_BUY",
					success() {
						uni.navigateTo({
							url:'/pages/shop-page/gf_buy_project'
						})
					}
				})
			},
			getList(w) {
				this.to.www(this.api.project_list, {
						project_group_id: this.type,
						page: this.page,
					}, 'p')
					.then(res => {
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
						project_group_id: this.type,
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
	.top_tab_nav {
		position: sticky;
		top: 0;
		z-index: 1000;
	}

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
		padding: 20rpx 0;
		font-size: 40rpx;

		.project_item {
			margin-bottom: 40rpx;
			border-radius: 8rpx;
			padding: 20rpx;
			box-shadow: 4rpx 4rpx 10rpx 2rpx rgba(33, 46, 104, 0.2);

			.p_title {
				display: flex;
				justify-content: space-between;
				align-items: center;

				text {
					width: calc(100% - 6rem);
				}

				.bybtn {
					width: 6rem;
				}
			}

			.p_box {
				padding: 15rpx;
				border-radius: 6rpx;
				box-sizing: border-box;

				.bg_box {
					padding-bottom: 30rpx;
					background-color: #F1EDEC;
					line-height: 55rpx;

					.p_p {
						display: flex;
						justify-content: center;
						border-radius: 10rpx 10rpx 0 0;
						height: 85rpx;
						align-items: center;
						background-color: $th;
						color: #fff;
						text-align: center;
					}

					.t1 {
						padding: 10rpx 20rpx;
						box-sizing: border-box;
						line-height: 75rpx;
						letter-spacing: 3rpx;

						text {
							font-weight: bold;
							color: $th;
						}
					}
				}

			}
		}

	}

	.page_title_tab {
		background-color: #B80606;
		height: 120rpx;
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
</style>