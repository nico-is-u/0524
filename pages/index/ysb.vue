<template>
	<view class="page">
		<view class="k-line-head">
			<!-- 顶栏 -->
			<nNavbar title="云数币" :showBackBtn="false"></nNavbar>

			<!-- K线图 -->
			<view class="k-line-shell">

				<!-- K线部分 -->
				<view class="k-line-box" style="border-radius: 16rpx">
					<!-- 小菜单2 -->
					<view class="menu-list-2" style="justify-content: flex-start; gap:30rpx">
						<view class="menu-item" @click="changeKLineDatas('30m')" :class="bar == '30m' ? 'active' : ''">30分</view>
						<view class="menu-item" @click="changeKLineDatas('1D')" :class="bar == '1D' ? 'active' : ''">日K</view>
						<view class="menu-item" @click="changeKLineDatas('1W')" :class="bar == '1W' ? 'active' : ''">周K</view>
						<view class="menu-item" @click="changeKLineDatas('1M')" :class="bar == '1M' ? 'active' : ''">月K</view>
						<view class="menu-item" @click="changeKLineDatas('3M')" :class="bar == '3M' ? 'active' : ''">季K</view>
						<!-- <view class="menu-item more">
							<text>更多</text>
							<image src="/static/images/10.png" mode="widthFix"></image>
						</view> -->
					</view>

					<!-- K线插件 -->
					<view class="chart-shell">
						<view id="chart"></view>
						<view id="chart-loading" class="flex flex-center" v-if="isLoading">
							加载中
						</view>
					</view>

				</view>

			</view>
		</view>

		<!-- 首页 - 菜单 -->
		<view class="padding-box">
			<view class="menu-2">
				<view class="menu-item" style="background-image: url(/static/images/11.png)" @click="too('/pages/home-page/my_zc')">
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
				<view class="menu-item" style="background-image: url(/static/images/13.png)" @click="too('/pages/index/ysb-mrmc?type=buy')">
					<view class="item-content">
						<view class="title">买入</view>
						<view class="desc">购入升值产品</view>
					</view>
				</view>
				<view class="menu-item" style="background-image: url(/static/images/14.png)" @click="too('/pages/index/ysb-mrmc?type=sell')">
					<view class="item-content">
						<view class="title">卖出</view>
						<view class="desc">售出获取收益</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 首页 - 币种列表 -->
		<view class="padding-box bizhong-list" v-if="cList2.length > 0">
			<view class="title-2">
				币种/24H
			</view>

			<view class="card margin-t-30 c-list" style="padding: 8px 18px;">

				<scroll-view :scroll-y="true"></scroll-view>
				<view class="row" v-for="(item,index) in cList2" :key="'cList-item-' + index">
					<view class="flex flex-y-center left-side">
						<image mode="widthFix" :src="domain + item.icon"></image>
						<view class="flex flex-column">
							<view class="font-333" style="font-size: 32rpx;">{{ item.name || ''}}</view>
							<!-- <view class="font-333" style="font-size: 28rpx;">{{ '$' + item.price}}</view> -->
						</view>
					</view>
					<view style="color: #666666;font-size: 14px;">{{ '$' + item.price}}</view>
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
			isLoading:false,                    		// 请求中

			kLine:false,								// K线插件
			cType:'BTC',								// 币种
			barList:['30m','1D','1W','1M','3M'],		// k线的时区
			bar:'30m',
			cList:[],									// 币种列表

			intervalId:null,
			intervalId2:null,
			domain: ''
		}
	},
	computed:{
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
		/* 更改K线查询 */
		changeKLineDatas(bar){
			this.bar = bar
			this.getKLineDatas()
		},
		/* 执行K线查询 */
		getKLineDatas(){
			this.isLoading = true
			this.to.www(this.api.k_line,{
				code:this.cType,
				bar:this.bar
			})
			.then(res => {
				const {code,data=[]} = res
				if(code == 200){
					this.kLine.applyNewData(data)
					this.isLoading = false
				}else{
					this.isLoading = false
				}
			})
			.catch(e => {
				this.isLoading = false
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
		/* 切换场景 */
		changeScene(scene){
			this.scene = scene
			/* 再次渲染K线插件 */
			this.intervalId2 = setTimeout(() => {
				this.getKLineDatas()
			},500)
		}
	},
	mounted(){
		this.domain = uni.getStorageSync("ok_api");
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
							{ title: '最 低: ', value:'{low}'},
							{ title: '昨 收: ', value:{text:'{close}',color:'green'}},
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
		
		/* 样式配置 */
		// dispose('chart')
	},
	onShow(){
		/* 重新拉取K线 */
		this.getKLineDatas()
		// if(this.scene == 'index'){
			/* 轮询币种数据 */
			this.getCDatas()
			this.intervalId = setInterval(this.getCDatas, 5000)
		// }
	},
	onHide(){
		if (this.intervalId) {
			clearInterval(this.intervalId)
			this.intervalId = null
		}
	}
}
</script>

<style lang="scss" scoped>
page{
	background-color: #f9f9f9;
	padding-bottom: 20px;
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
		.row + .row{
			border-top: 4rpx solid #eee;
		}
		.left-side{
			image{
				width: 88rpx;
				height: 88rpx;
				margin-right: 10px;
			}
		}
	}
}

/* 买入和卖出 */
.mr-section,.mc-section{
	background-color: white;
}

</style>