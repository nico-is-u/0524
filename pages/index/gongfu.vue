<template>
	<view class="page">
		<view class="head">
			<!-- 顶栏 -->
			<nNavbar title="云数币" :showBackBtn="false"></nNavbar>
			<!-- K线图 -->
			<view class="k-line-shell">
				<view class="k-line-box">

					<!-- 顶部信息 -->
					<!-- <view class="title-info">
						<text>交易结束</text>
						<text style="margin-left: 16rpx">05-18  05:00  北京时间</text>
					</view> -->
					<!-- 小菜单 -->
					<!-- <view class="menu-list">
						<view class="item">
							<view class="label">
								<text>今</text>
								<text>开</text>
							</view>
							<view class="text">483931.0000</view>
						</view>
						<view class="item">
							<view class="label">
								<text>最</text>
								<text>高</text>
							</view>
							<view class="text font-red">483931.0000</view>
						</view>
						<view class="item">
							<view class="label">
								<text>买</text>
								<text>入</text>
								<text>价</text>
							</view>
							<view class="text font-red">483931.0000</view>
						</view>
						<view class="item">
							<view class="label">
								<text>昨</text>
								<text>收</text>
							</view>
							<view class="text">483931.0000</view>
						</view>
						<view class="item">
							<view class="label">
								<text>最</text>
								<text>低</text>
							</view>
							<view class="text font-green">483931.0000</view>
						</view>
						<view class="item">
							<view class="label">
								<text>卖</text>
								<text>出</text>
								<text>价</text>
							</view>
							<view class="text font-red">483931.0000</view>
						</view>
					</view> -->

					<!-- 小菜单2 -->
					<view class="menu-list-2">
						<view class="menu-item active">分时</view>
						<view class="menu-item">日K</view>
						<view class="menu-item">周K</view>
						<view class="menu-item">月K</view>
						<view class="menu-item">季K</view>
						<view class="menu-item more">
							<text>更多</text>
							<image src="/static/images/10.png" mode="widthFix"></image>
						</view>
					</view>

					<!-- K线插件 -->
					<view class="chart-shell">
						<view id="chart"></view>
					</view>

				</view>
			</view>
		</view>

		<!-- 菜单2 -->
		<view class="padding-box">
			<view class="menu-2">
				<view class="menu-item" style="background-image: url(/static/images/11.png)">
					<view class="item-content">
						<view class="title">我的资产</view>
						<view class="desc">个人资产详情</view>
					</view>
				</view>
				<view class="menu-item" style="background-image: url(/static/images/12.png)">
					<view class="item-content">
						<view class="title">我的持仓</view>
						<view class="desc">详细持仓查询</view>
					</view>
				</view>
				<view class="menu-item" style="background-image: url(/static/images/13.png)">
					<view class="item-content">
						<view class="title">买入</view>
						<view class="desc">购入升值产品</view>
					</view>
				</view>
				<view class="menu-item" style="background-image: url(/static/images/14.png)">
					<view class="item-content">
						<view class="title">卖出</view>
						<view class="desc">售出获取收益</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 币种列表 -->
		<view class="padding-box bizhong-list">
			<view class="title-2">
				币种/24H
			</view>
		</view>

	</view>
</template>

<script>
import { init, dispose } from 'klinecharts'
export default {
	data(){
		return {
			
		}
	},
	mounted(){
		const chart = init('chart')
		
		/* 样式配置 */
		chart.setStyles({
			candle:{
				type:'area',
				tooltip:{
					// showRule:'none'
					custom:[
						{ title: '交易结束：', value: '{time} 北京时间' },
						{ title: '今 开: ', value:'{open}'},
						{ title: '最 高: ', value:{
							text:'{high}',
							color:'red'
						}},
					]
				}
			}
		})

		/* 变更事件 */
		// chart.subscribeAction('onCrosshairChange',event => {
		// 	console.log(event)
		// })

		// chart.subscribeAction('onCandleBarClick',event => {
		// 	console.log('onCandleBarClick')
		// })

		chart.applyNewData([
			{ close: 4976.16, high: 4977.99, low: 4970.12, open: 4972.89, timestamp: 1587660000000, volume: 204 },
			{ close: 4977.33, high: 4979.94, low: 4971.34, open: 4973.20, timestamp: 1587660060000, volume: 194 },
			{ close: 4977.93, high: 4977.93, low: 4974.20, open: 4976.53, timestamp: 1587660120000, volume: 197 },
			{ close: 4966.77, high: 4968.53, low: 4962.20, open: 4963.88, timestamp: 1587660180000, volume: 28 },
			{ close: 4961.56, high: 4972.61, low: 4961.28, open: 4961.28, timestamp: 1587660240000, volume: 184 },
			{ close: 4964.19, high: 4964.74, low: 4961.42, open: 4961.64, timestamp: 1587660300000, volume: 191 },
			{ close: 4968.93, high: 4972.70, low: 4964.55, open: 4966.96, timestamp: 1587660360000, volume: 105 },
			{ close: 4979.31, high: 4979.61, low: 4973.99, open: 4977.06, timestamp: 1587660420000, volume: 35 },
			{ close: 4977.02, high: 4981.66, low: 4975.14, open: 4981.66, timestamp: 1587660480000, volume: 135 },
			{ close: 4985.09, high: 4988.62, low: 4980.30, open: 4986.72, timestamp: 1587660540000, volume: 76 }
		])
		/* 样式配置 */
		
		// dispose('chart')
	}
}
</script>

<style lang="scss" scoped>
.head {
	height: 672rpx;
	background-image: url('/static/images/9.png');
	background-repeat: no-repeat;
	background-size: cover;

	padding-top: 10rpx;
	color: #fff;

	.k-line-shell{
		margin-top: 18rpx;
		padding: 0 32rpx;
		.k-line-box{
			height: 484rpx;
			border-radius: 24rpx;
			background-color: white;
			padding: 12rpx 0 24rpx 20rpx;
			color: #999;

			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.title-info{
				color: #999;
				font-size: 20rpx;
			}

			.menu-list{
				display: flex;
				flex-wrap: wrap;

				margin-top: 16rpx;

				.item{
					display: flex;

					width: 33.33%;
					font-size: 20rpx;

					margin-bottom: 6rpx;

					.label{
						width: 50rpx;
						color: #999;

						display: flex;
						justify-content: space-between;
					}

					.text{
						margin-left: 18rpx;
					}
				}
			}

			.menu-list-2{
				margin-top: 16rpx;
				font-size: 24rpx;

				display: flex;
				justify-content: space-between;

				padding: 0 24rpx 0 0;
				.menu-item{
					width: 92rpx;
					height: 44rpx;

					color: #7A7079;
					background-color: #F4F4F4;

					display: flex;
					justify-content: center;
					align-items: center;

					&.more{
						image{
							width: 20rpx;
						}
					}

					&.active{
						color: black;
					}

				}
			}

			/* K线插件 */
			.chart-shell{
				padding-right: 24rpx;
				#chart{
					height: 380rpx;
					margin-top: 16rpx;
				}
			}

		}
	}

}

/* 菜单2 */
.menu-2{
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	gap: 22rpx;

	.menu-item{
		width: calc(50% - 12rpx);
		height: 176rpx;
		background-size: 100% 100%;

		.item-content{
			padding: 10% 7.5%;
			.title{
				font-size: 28rpx;
				color: white;
			}
			.desc{
				margin-top: 2.5rpx;
				font-size: 22rpx;
				color: rgba(255,255,255,.5);
			}
		}
	}


}

/* 币种列表 */
.bizhong-list{
	margin-top: 64rpx;
	.title-2{
		color: #222;
		font-size: 36rpx;
		font-weight: 800;
	}
}
</style>