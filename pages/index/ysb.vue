<template>
	<view class="page">
		<view class="head">
			<!-- 顶栏 -->
			<nNavbar :title="navbarTitle" :back="!navbarShowBackBtn" :showBackBtn="navbarShowBackBtn" :backFunc="() => scene = 'index'"></nNavbar>
			<!-- K线图 -->
			<view class="k-line-shell">

				<!-- tab 菜单 -->
				<view class="tab-menu-type-1 flex flex-between flex-y-end" v-if="scene == 'mr' || scene == 'mc'">
					<view :class="scene == 'mr' ? 'active' : ''" @click="scene = 'mr'" class="menu-item menu-item-1 flex flex-center">
						<view class="triangle"></view>
						<text>买入</text>
					</view>
					<view :class="scene == 'mc' ? 'active' : ''" @click="scene = 'mc'" class="menu-item menu-item-2 flex flex-center">
						<view class="triangle"></view>
						<text>卖出</text>
					</view>
				</view>

				<!-- K线部分 -->
				<view class="k-line-box" :class="scene != 'index' ? 'with-tab-menu' : ''">
					<!-- 小菜单2 -->
					<view class="menu-list-2" style="justify-content: flex-start; gap:30rpx">
						<view class="menu-item" @click="bar = '30m'" :class="bar == '30m' ? 'active' : ''">30分</view>
						<view class="menu-item" @click="bar = '1D'" :class="bar == '1D' ? 'active' : ''">日K</view>
						<view class="menu-item" @click="bar = '1W'" :class="bar == '1W' ? 'active' : ''">周K</view>
						<view class="menu-item" @click="bar = '1M'" :class="bar == '1M' ? 'active' : ''">月K</view>
						<view class="menu-item" @click="bar = '3M'" :class="bar == '3M' ? 'active' : ''">季K</view>
						<!-- <view class="menu-item more">
							<text>更多</text>
							<image src="/static/images/10.png" mode="widthFix"></image>
						</view> -->
					</view>

					<!-- K线插件 -->
					<view class="chart-shell">
						<view id="chart"></view>
					</view>

				</view>

				<!-- 买入 -- 操作区域 -->
				<view class="mr-section padding-box-3" v-if="scene == 'mr' || scene == 'mc'">
					<view class="flex flex-between">
						<!-- tab 菜单2 -->
						<view class="tab-menu-type-2 left-side">
							<view class="menu-item active menu-item-first">限价</view>
							<view class="menu-item">市价</view>
							<view class="menu-item">止盈止亏</view>
							<view class="menu-item">计划委托</view>
						</view>
						<view class="right-side">
							<u-icon size="18px" name="info-circle" color="#6D6D6D"></u-icon>
						</view>
					</view>
					<!-- 操作表单 -->
					<view class="form-group margin-t-40">
						<view class="form-control">
							<input type="text" placeholder="最优价格">
						</view>
						<view class="form-control form-control-2">
							<view class="left-side">
								<view style="padding-right: 24rpx">
									<text>交易额</text>
								</view>
								<text>▼</text>
							</view>
							<view class="right-side">
								<u--input>
									<u--text
										text="USDT"
										slot="prefix"
		
										type="tips"
									></u--text>
								</u--input>
							</view>
						</view>
					</view>
				</view>

			</view>
		</view>

		<!-- 首页 - 菜单 -->
		<view class="padding-box" v-if="scene == 'index'">
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
				<view class="menu-item" style="background-image: url(/static/images/13.png)" @click="scene = 'mr'">
					<view class="item-content">
						<view class="title">买入</view>
						<view class="desc">购入升值产品</view>
					</view>
				</view>
				<view class="menu-item" style="background-image: url(/static/images/14.png)" @click="scene = 'mc'">
					<view class="item-content">
						<view class="title">卖出</view>
						<view class="desc">售出获取收益</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 首页 - 币种列表 -->
		<view class="padding-box bizhong-list" v-if="scene == 'index'">
			<view class="title-2">
				币种/24H
			</view>

			<view class="card margin-t-30 c-list">

				<scroll-view :scroll-y="true"></scroll-view>
				<view class="row" v-for="(item,index) in cList2" :key="'cList-item-' + index">
					<view class="flex flex-y-center left-side">
						<image mode="widthFix" :src="item.icon"></image>
						<view class="flex flex-column">
							<view class="font-333" style="font-size: 32rpx;">{{ item.name || ''}}</view>
						</view>
					</view>
					<view class="right-side">
						<view class="n-fee" :class="item.isPos ? 'n-fee-pos' : 'n-fee-pos2'">
							<view>{{ item.isPos ? '+' : '-'}}</view>
							<view>{{ item.change3 }}%</view>
						</view>
					</view>
				</view>
				
			</view>
		</view>



	</view>
</template>

<script>
import { init } from 'klinecharts'
export default {
	data(){
		return {
			scene:'index',								// 页面场景	index：首页	mr：买入  mc：卖出
			kLine:false,								// K线插件
			cType:'BTC',								// 币种
			barList:['30m','1D','1W','1M','3M'],		// k线的时区
			bar:'30m',
			cList:[],									// 币种列表
		}
	},
	computed:{
		/* 导航栏文字 */
		navbarTitle(){
			switch(this.scene){
				case 'index':
					return '云数币'
				case 'mr':
					return '买入'
				case 'mc':
					return '卖出'
			}
		},
		/* 导航栏显示返回按钮 */
		navbarShowBackBtn(){
			switch(this.scene){
				case 'index':
					return false
				case 'mr':
					return true
				case 'mc':
					return true
			}
		},
		/* 币种列表 */
		cList2(){
			let result = []
			if(Array.isArray(this.cList) && this.cList.length){
				for(let len = 0; len < this.cList.length; len ++){
					let item = this.cList[len]
					item.change2 = parseFloat(item.change)
					item.isPos = item.change2 > 0 ? true : false
					if(item.isPos){
						item.change3 = item.change
					}else{
						item.change3 = item.change.slice(1)
					}
					result.push(item)
				}
			}
			return result
		},
	},
	methods:{
		getKLineDatas(){
			this.to.www(this.api.k_line,{
				code:this.cType,
				bar:this.bar
			})
			.then(res => {
				const {code,data=[]} = res
				if(code == 200){
					this.kLine.applyNewData(data)
				}
			})
		},
		/* 拉取币种数据 */
		getCDatas(){
			this.to.www(this.api.c_list)
			.then(res => {
				const {code,data=[]} = res
				if(code == 200){
					this.cList = data
				}
			})
		},
	},
	mounted(){
		const chart = init('chart')
		
		/* 样式配置 */
		chart.setStyles({
			candle:{
				type:'area',
				tooltip:{
					// showRule:'none'
					custom:function(){
						return [
							{ title: '交易结束：', value: '{time} 北京时间' },
							{ title: '今 开: ', value:'{open}'},
							{ title: '最 高: ', value:{text:'{high}',color:'red'}},
						]
					}
				}
			}
		})

		/* 缓存插件实例 */
		this.kLine = chart

		/* 变更事件 */
		// chart.subscribeAction('onCrosshairChange',event => {
		// 	console.log(event)
		// })

		// chart.subscribeAction('onCandleBarClick',event => {
		// 	console.log('onCandleBarClick')
		// })

		// chart.applyNewData([
		// 	{ close: 4976.16, high: 4977.99, low: 4970.12, open: 4972.89, timestamp: 1587660000000, volume: 204 },
		// 	{ close: 4977.33, high: 4979.94, low: 4971.34, open: 4973.20, timestamp: 1587660060000, volume: 194 },
		// 	{ close: 4977.93, high: 4977.93, low: 4974.20, open: 4976.53, timestamp: 1587660120000, volume: 197 },
		// 	{ close: 4966.77, high: 4968.53, low: 4962.20, open: 4963.88, timestamp: 1587660180000, volume: 28 },
		// 	{ close: 4961.56, high: 4972.61, low: 4961.28, open: 4961.28, timestamp: 1587660240000, volume: 184 },
		// 	{ close: 4964.19, high: 4964.74, low: 4961.42, open: 4961.64, timestamp: 1587660300000, volume: 191 },
		// 	{ close: 4968.93, high: 4972.70, low: 4964.55, open: 4966.96, timestamp: 1587660360000, volume: 105 },
		// 	{ close: 4979.31, high: 4979.61, low: 4973.99, open: 4977.06, timestamp: 1587660420000, volume: 35 },
		// 	{ close: 4977.02, high: 4981.66, low: 4975.14, open: 4981.66, timestamp: 1587660480000, volume: 135 },
		// 	{ close: 4985.09, high: 4988.62, low: 4980.30, open: 4986.72, timestamp: 1587660540000, volume: 76 }
		// ])

		/* 样式配置 */
		// dispose('chart')
	},
	onShow(){
		/* 重新拉取K线 */
		this.getKLineDatas()
		if(this.scene == 'index'){
			this.getCDatas()
		}
	},
}
</script>

<style lang="scss" scoped>
page{
	background-color: #f9f9f9;
}

.head {
	height: 636rpx;
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

			/* 顶部需要渲染tab菜单 */
			&.with-tab-menu{
				border-top-left-radius: 0;
				border-top-right-radius: 0;
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

	.c-list{
		.row{
			border-bottom: 4rpx solid #eee;
		}
		.left-side{
			image{
				width: 88rpx;
				height: 88rpx;
			}
		}
	}
}

/* 买入和卖出 */
.mr-section,.mc-section{
	background-color: white;
}

</style>