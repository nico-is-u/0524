<template>
	<view>
		<view class="top_tab_nav">
			<view class="page_title_tab">
				<text :class="['title',type==1?'cur':'']" @click="type=1">共富工程</text>
				<text :class="['title',type==2?'cur':'']" @click="type=2">激活钱包</text>
			</view>
			<u-subsection v-if="type==1" :list="ProTabList" :current="ProCurIndex" @change="ProsectionChange"
				activeColor="#B80606"></u-subsection>
			<u-subsection v-else :list="AccTabList" :current="AccCurIndex" @change="AccSectionChange"
				activeColor="#B80606"></u-subsection>
		</view>
		
		<!-- 共富工程的页面 包含共富工程和领取记录 -->
		<template v-if="type==1" >
			<!-- 共富工程 -->
			<view v-if="ProCurIndex==0">
				<view style="margin: 160rpx;" v-if="!project_list.length">
					<u-empty mode="list"></u-empty>
				</view>
				<view class="project_box">
					<view class="project_item" v-for="(item,index) in project_list" :key="index">
						<view class="p_red">
							<view class="p_title">
								<text>{{item.name}}</text>
								<text class="p_dobuy">立即领取</text>
							</view>
							<view class="p_price">
								<text class="num">{{item.sum_amount}}元</text>
							</view>
						</view>
						<view class="p_info">
							<view>提交<text>{{item.single_amount}}</text>元审核金</view>
							<!-- <view>审核期<text>20</text>天</view> -->
							<view>{{item.intro}}</view>
							<!-- <view>审核金将在到期后退回数字人民币钱包</view> -->
						</view>
						<view class="p_line">
							<text>今日领取进度</text>
							<template>
								<u-line-progress :percentage="item.virtually_progress" height="18"
									activeColor="#F2C118"></u-line-progress>
							</template>
						</view>
					</view>
				</view>
			</view>
			<!-- 领取记录 -->
			<view v-else>
				<view class="ser_list">
					<view style="margin: 60rpx auto;" v-if="!projectlog.length">
						<u-empty mode="list" icon-size="50" ></u-empty>
					</view>
					<view class="box" v-for="(item,index) in projectlog" :key="index">
						<view class="item">
							<u--text text="实名赠送数字人民币"></u--text>
							<u--text align="right" size="14px" :color="50000<0?'#991313':'#00aa7f'"
								text="-50000"></u--text>
						</view>
						<view class="item">
							<u--text text="GF429374932789" size="12px"></u--text>
							<u--text align="right" size="12px" text="2023年12月27日08:02:08"></u--text>
						</view>
					</view>
				</view>
		
			</view>
		</template>
		
		<!-- 激活钱包的页面 包含激活钱包和激活记录 -->
		<template v-else>
			<!-- 激活钱包 -->
			<view v-if="AccCurIndex==0">
				<view style="margin: 160rpx;" v-if="!active_list.length">
					<u-empty mode="list"></u-empty>
				</view>
				<view class="project_box">
					<view class="project_item" v-for="(item,index) in active_list" :key="index">
						<view class="p_red">
							<view class="p_title">
								<text>{{item.name}}</text>
								<text class="p_dobuy">立即申请</text>
							</view>
							<view class="p_price">
								<text class="num">{{item.sum_amount}}元</text>
							</view>
						</view>
						<view class="p_info">
							<view>提交<text>{{item.single_amount}}</text>元激活金</view>
							<!-- <view>获得数字人民币钱包日提现额度<text>10</text>万元</view> -->
							<view>{{item.intro}}</view>
							<!-- <view>赠送<text>10000</text>元数字人民币红包</view> -->
						</view>
						<view class="p_line">
							<text>今日领取进度</text>
							<template>
								<u-line-progress :percentage="item.virtually_progress" height="18"
									activeColor="#F2C118"></u-line-progress>
							</template>
						</view>
					</view>
				</view>
			</view>
			<!-- 激活记录 -->
			<view v-else>
				<view class="ser_list">
					<view style="margin: 60rpx auto;" v-if="!active_log.length">
						<u-empty mode="list" icon-size="50" ></u-empty>
					</view>
					<view class="box" v-for="(item,index) in active_log" :key="index">
						<view class="item">
							<u--text text="实名赠送数字人民币"></u--text>
							<u--text align="right" size="14px" color="#991313" text="+50000"></u--text>
						</view>
						<view class="item">
							<u--text text="GF429374932789" size="12px"></u--text>
							<u--text align="right" size="12px" text="2023年12月27日08:02:08"></u--text>
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
				type: 1,
				ProCurIndex: 0,
				AccCurIndex: 0,
				ProTabList: ['共富工程', '领取记录'],
				AccTabList: ['激活钱包', '激活记录'],

				page: 1,
				isReload: true,
				project_list: [],
				active_list: [],

				projectlog: [],
				active_log: []

			};
		},
		onLoad() {
			this.getList()
		},
		watch: {
			type() {
				if (!this.project_list.length || !this.active_list.length) {
					this.getList()
				};
				if (!this.projectlog.length || !this.active_log.length) {
					this.getOrderLog()
				}
			}
		},
		methods: {
			getList(w) {
				this.to.www(this.api.project_list, {
						project_group_id: this.type,
						page: this.page,

					}, 'p')
					.then(res => {
						if (this.type == 1) {
							this.project_list = res.data.data;
						} else {
							this.active_list = res.data.data;
						};
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
						if (this.type == 1) {
							this.projectlog = res.data.data;
						} else {
							this.active_log = res.data.data;
						};
						if (w) {
							this.toa("已刷新")
							uni.stopPullDownRefresh();
						}
					})
			},
			//激活钱包和记录切换
			AccSectionChange(index) {
				this.AccCurIndex = index;
			},
			// 共富工程和记录切换
			ProsectionChange(index) {
				this.ProCurIndex = index;
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

				text {
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
		background-color: $th;
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