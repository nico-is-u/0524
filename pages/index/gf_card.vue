<template>
	<view>
		<view class="top_tab_nav">
			<view class="page_title_tab">
				<text :class="['title',ProCurIndex==1?'cur':'']" @click="changeTab(1)">税务抵用券</text>
				<text :class="['title',ProCurIndex==2?'cur':'']" @click="changeTab(2)">共富专属卡</text>
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
					<view class="project_item" style="background-color: #fff;" v-for="(item,index) in project_list"
						@click="topay(item)" :key="index">
						<view class="abfhjgcsg">
							<view class="p_red">
								<image :src="item.cover_img" style="width: 100%;height: 5rem;" mode="widthFix"></image>
							</view>
							<view class="p_line p_lineasd">
								<view>{{item.name}}</view>
								<view style="display: flex;justify-content: space-between;width: 100%;height: 50rpx;">
									<text class="text" style="text-decoration: line-through;"
										v-if="item.underline_price!='0.00'">{{item.underline_price}}元</text>
									<text class="text">{{item.single_amount}}元</text>
									<view
										style="height: 50rpx;line-height: 50rpx; font-size: 28rpx;width:150rpx;text-align:center;background-color: #B80606;color: #fff;font-size: 30rpx;border-radius: 20rpx;">
										立即领取</view>
								</view>
								<text
									style="display: block;text-align: center;padding-bottom: 10rpx;font-size: 24rpx;">税务抵用{{item.limit_asset}}{{item.limit_direction=='down'?'以下':'以上'}}</text>
							</view>
						</view>
						<view style="padding: 0 20rpx ;">
						<!-- 	<view style="font-size: 29rpx;margin: 5rpx 0;">领取进度</view>
							<view style="display: flex;justify-content: space-between;width: 100%;">
								<u-line-progress :percentage="Number(item.virtually_progress).toFixed(2)" height="14"
									activeColor="#B80606"></u-line-progress>
								<text v-if="Number(item.virtually_progress)<30"
									style="color: #B80606;font-size: 24rpx;padding-left: 10rpx;">{{item.virtually_progress}}%</text>
							</view> -->
						</view>
					</view>
				</view>
			</view>
			<view v-else>
				<view class="ser_list">
					<view style="margin: 60rpx auto;" v-if="!projectlog.length">
						<u-empty mode="list" icon-size="50"></u-empty>
					</view>
					<view class="project_box">
						<view class="project_item" v-for="(item,index) in projectlog" @click="topay2(item)"
							:key="index">
							<view class="abfhjgcsg">
								<view class="p_red ">
									<image :src="item.cover_img" style="width: 100%;height: 3rem;" mode="widthFix">
									</image>
								</view>
								<view class="p_line" style="padding: 0 30rpx 0 30rpx;box-sizing: border-box;">
									<view
										style="display: flex;justify-content: space-between;width: 100%; text-align: center;align-items: center;">
										<view style="display: flex;">
											<view
												style="color: #B80606;padding: 0 10rpx;border-radius: 6rpx;margin-right: 15rpx;">
												<view>存储额度</view>
												<view>{{item.limit_direction=='up'?'无限额':item.limit_tax}}</view>
											</view>
											<view style="color: #B80606;padding: 0 10rpx;border-radius: 6rpx;">
												<view>开户金额</view>
												<view> <text v-if="item.underline_price!='0.00'"
														style="text-decoration: line-through;padding-right: 15rpx">{{item.underline_price}}</text>
													{{item.single_amount}}元
												</view>
											</view>
										</view>
										<view
											style="height: 50rpx;line-height: 50rpx;width:150rpx;text-align:center;background-color: #B80606;color: #fff;font-size: 30rpx;border-radius: 20rpx;">
											立即开户</view>
									</view>
								</view>
							</view>
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
				user_info: {}
			};
		},
		onShow() {
			this.getList();
			this.urinfo();
		},
		watch: {
			ProCurIndex() {
				if (this.ProCurIndex == 2) {
					this.getOrderLog()
				}
			}
		},
		methods: {
			changeTab(w) {
				if (w == 1) {
					this.ProCurIndex = 1
				} else {
					if (this.user_info.open_card == 0) {
						this.toa("未领取税务抵用券")
					} else {
						this.ProCurIndex = 2
					}
				}
			},
			topay(obj) {

				var p_num;
				if (obj.limit_asset.slice(-1) == '万') {
					p_num = obj.limit_asset.slice(0, -1) * 10000
				}
				if (obj.limit_asset.slice(-1) == '亿') {
					p_num = obj.limit_asset.slice(0, -1) * 100000000
				}

				if (obj.virtually_progress < 100) {
					if (obj.limit_direction == 'down') {
						if (Number(this.user_info.digit_balance) <= p_num) {
							uni.setStorage({
								data: obj,
								key: "WHITE_DO_BUY_CARD",
								success() {
									uni.navigateTo({
										url: '/pages/index/gf_buy_card'
									})
								}
							})
						} else {
							this.toa("你的资产已超过当前额度")
						}
					} else {
						if (Number(this.user_info.digit_balance) > p_num) {
							uni.setStorage({
								data: obj,
								key: "WHITE_DO_BUY_CARD",
								success() {
									uni.navigateTo({
										url: '/pages/index/gf_buy_card'
									})
								}
							})
						} else {
							this.toa("你的资产未达到当前额度")
						}
					}
				} else {
					this.toa("分配已满")
				}
			},
			topay2(obj) {

				this.to.www(this.api.ckisopencard, {
						id: obj.id
					})
					.then(res => {
						uni.setStorage({
							data: obj,
							key: "WHITE_DO_BUY_CARD2",
							success() {
								uni.navigateTo({
									url: '/pages/index/gf_buy_card2'
								})
							}
						})
					})
			},

			urinfo() {
				this.to.www(this.api.user_info)
					.then(res => {
						this.user_info = res.data;
						uni.setStorage({
							data: this.user_info,
							key: 'user_info'
						});
					})
			},
			getList(w) {
				this.to.www(this.api.shuiwuwiyls)
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
				this.to.www(this.api.gongfuzhuansk)
					.then(res => {
						this.projectlog = [];
						for (let item in res.data) {
							this.projectlog.push(res.data[item])
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
		padding: 20rpx 35rpx;

		.project_item {
			margin-bottom: 50rpx;
			box-shadow: 2rpx 2rpx 15rpx 5rpx rgba(18, 25, 57, 0.12);
			border-radius: 10rpx;
			background-color: #d0d0d0;
			padding: 0 0 10rpx;

			.abfhjgcsg {
				position: relative;
			}

			.p_red {
				color: #FFF;
				overflow: hidden;

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
				padding: 0 40rpx;
				line-height: 60rpx;

				text {
					color: $th;
					font-weight: bold;
				}
			}

			.p_lineasd {
				padding: 0 40rpx 20rpx;
				box-sizing: border-box;
				position: absolute;
				bottom: 0;
			}

			.p_line {
				padding: 0 40rpx 20rpx;
				box-sizing: border-box;
				width: 100%;

				.text {
					font-weight: bold;
					// font-style:oblique;
					text-shadow:
						1px 0 3px #fffde4,
						0 1px 3px #ececf7,
						-1px 0 3px #e6e0d3,
						0 -1px 3px #f6ff9c;
					font-size: 32rpx;
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
			font-size: 34rpx;
		}

		.title.cur::before {
			width: 50%;
		}
	}
</style>