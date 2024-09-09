<template>
	<view class="page">
		<view class="k-line-head" style="height: 530rpx">
			
			<!-- 顶栏 -->
			<nNavbar title="云数币" :showBackBtn="false">
			</nNavbar>
			<!-- <u--text @click="too('/pages/home-page/my_zc')" color="white" align="right" text="我的资产" style="padding-right: 10rpx; padding-top: 10rpx"></u--text> -->

			<!-- K线图 -->
			<view class="k-line-shell">

				<!-- K线部分 -->
				<view class="k-line-box" style="border-radius: 16rpx">
					<!-- 小菜单2 -->
					<!-- <view class="menu-list-2" style="justify-content: flex-start; gap:30rpx">
						<view class="menu-item" @click="changeKLineDatas('30m')" :class="bar == '30m' ? 'active' : ''">30分</view>
						<view class="menu-item" @click="changeKLineDatas('1D')" :class="bar == '1D' ? 'active' : ''">日K</view>
						<view class="menu-item" @click="changeKLineDatas('1W')" :class="bar == '1W' ? 'active' : ''">周K</view>
						<view class="menu-item" @click="changeKLineDatas('1M')" :class="bar == '1M' ? 'active' : ''">月K</view>
						<view class="menu-item" @click="changeKLineDatas('3M')" :class="bar == '3M' ? 'active' : ''">季K</view>
						<view class="menu-item more">
							<text>更多</text>
							<image src="/static/images/10.png" mode="widthFix"></image>
						</view>
					</view> -->

					<!-- K线插件 -->
					<view class="chart-shell">
						<view id="chart"></view>
						<view id="chart-loading" class="flex flex-center" v-if="isLoading">
							加载中
						</view>
					</view>
				</view>
				
				<!-- 装饰用图片 -->
				<!-- <image src="/static/images/64.jpg" style="width: 100%; border-radius: 12rpx" mode="widthFix"></image> -->

			</view>
		</view>

		<!-- 兑换通道 -->
		<view style="padding: 32rpx; padding-top: 0" class="margin-t-20">
			<u-button class="n-button n-button-5" text="兑换通道" @click="duihuanShow = true"></u-button>
		</view>

		<!-- 确认兑换通道 -->
		<u-overlay :show="duihuanShow" @click="duihuanShow = false">
			<view class="warp" style="padding: 0 20px;">
				<view class="rect1" @tap.stop>

					<view class="flex price-info">
						<text>云数币持仓：</text>
						<text class="price-info-amount">{{ parseFloat(duihuanInfo.balance).toFixed(2) }}</text>
					</view>

					<view class="flex price-info">
						<text>当前等级可兑换：</text>
						<text class="price-info-amount">{{ duihuanInfo.amount }}</text>
					</view>

					<view class="flex price-info">
						<text>价格：</text>
						<text class="price-info-amount">{{ duihuanInfo.price }}</text>
					</view>

					<view class="flex price-info">
						<text>兑换金额：</text>
						<text class="price-info-amount">{{ duihuanInfo.cny }}</text>
					</view>

					<view style="margin-top: 60rpx;">
						<u--text iconStyle="font-size: 34rpx;margin-top:6rpx;margin-right:8rpx"
							size="14" text="请输入支付密码"></u--text>
						<view style="margin: 30rpx 0 0;">
							<xt-verify-code :isPassword="true" :isFocus="true" boxActiveColor="#333" v-model="payPassword"></xt-verify-code>
						</view>
					</view>

					<u-button iconColor="#fff" class="custom-style" text="立即支付" :loading="isLoading2"
						:loadingText="loadingTxt2" @click="pay"></u-button>

				</view>
			</view>
		</u-overlay>

		<!-- 首页 - 菜单 -->
		<view class="padding-box">
			<view class="menu-2">
				<!-- <view class="menu-item" style="background-image: url(/static/images/11.png)" @click="too('/pages/home-page/my_zc')">
					<view class="item-content">
						<view class="title">我的资产</view>
						<view class="desc">个人资产详情</view>
					</view>
				</view>
				<view class="menu-item" style="background-image: url(/static/images/12.png)" @click="too('/pages/index/ysb-cc')">
					<view class="item-content">
						<view class="title">我的持仓</view>
						<view class="desc">详细持仓查询</view>
					</view>
				</view> -->
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

					<view style="color: #666666;font-size: 14px;">
						<text v-if="item.name == 'YSC'">￥</text>
						<text v-else>$</text>

						<text>{{ item.price }}</text>
					</view>

					<view class="right-side">
						<view class="n-fee" :class="item.isPos ? 'n-fee-pos' : 'n-fee-pos2'">
							<view>{{ item.isPos ? '+' : ''}}</view>
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

			duihuanShow:false,							//	兑换窗口
			duihuanInfo:false,							//	兑换信息
			payPassword:'',								//  支付密码
			isLoading2:false,							//	请求中2
			loadingTxt2:'处理中...',					//	请求中 文字

			kLine:false,								// K线插件
			barList:['30m','1D','1W','1M','3M'],		// k线的时区
			bar:'1D',

			intervalId:null,
			intervalId2:null,
			domain: ''
		}
	},
	computed:{
		/* 币种列表 */
		cList2(){
			let result = []
			if(Array.isArray(this.$store.state.cList) && this.$store.state.cList.length){
				for(let len = 0; len < this.$store.state.cList.length; len ++){
					let item = this.$store.state.cList[len]
					item.change3 = parseFloat(item.change).toFixed(2)
					item.isPos = item.change3 > 0 ? true : false
					// if(item.isPos){
					// 	item.change3 = item.change
					// }else{
					// 	item.change3 = item.change.slice(1)
					// }
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
				code:'YSC',
				bar:this.bar
			})
			.then(res => {
				const {code,data=[]} = res
				if(code == 200){
					
					/* 强转类型（timestamp) */
					for(let i = 0; i < data.length; i++){
						const item = data[i]
						item.timestamp = parseInt(item.timestamp)
						data[i] = item
					}

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
			return this.$store.dispatch('getCList')
		},
		/* 发起兑换 */
		pay(){

			if (uni.$u.test.isEmpty(this.payPassword)) return this.toa('请输入支付密码');

			uni.showLoading()
			this.isLoading2 = true

			this.to.www(this.api.ysbExchange,{
				pay_password:this.payPassword
			},'p')
			.then(res => {
				const {code,data=[]} = res
				if(code == 200){
					// 操作成功
					this.tos('提交成功')
					this.payPassword = ''

					this.duihuanShow = false
					this.isLoading2 = false
					uni.hideLoading()

					this.too('/pages/home-page/my_zc')
				}else{

					this.duihuanShow = false
					this.isLoading2 = false
					uni.hideLoading()
				}
			})
			.catch(e => {

				this.duihuanShow = false
				this.isLoading2 = false
				uni.hideLoading()
			})

		},

	},
	mounted(){
		this.domain = uni.getStorageSync("ok_api");
		const chart = init('chart')
		
		/* 样式配置 */
		chart.setStyles({
			candle:{
				//type:'area',
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


		/* 轮询币种数据 */
		this.getCDatas().then(() => {
			this.intervalId = setInterval(this.getCDatas, 10000)
		}).catch(e => null)


		/* 拉取K线 */
		this.getKLineDatas()
		this.intervalId2 = setInterval(this.getKLineDatas, 10000)

		
	},
	onLoad(){
		/* 拉取兑换信息 */
		this.to.www(this.api.ysbInfo).then(res => {
			this.duihuanInfo = res.data
		})
	},
	onHide(){
		// if (this.intervalId) {
		// 	clearInterval(this.intervalId)
		// 	this.intervalId = null
		// }
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

/* 兑换弹出窗口 */
.warp {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	height: 100%;
	z-index: 3;

	.rect1 {
		border-radius: 10px;
		padding: 20px;
		width: 100%;
		box-sizing: border-box;
		background: #fff;
	
		.price-info{
			font-size: 28rpx;
			margin-top: 40rpx;
			padding:6rpx 0 0 0rpx;

			.price-info-amount{
				font-size: 34rpx;
				color: #FF2732;
			}
		}

		.custom-style {
			width: 30vw;
			border-radius: 8px;
			margin-top: 30px;
			background: #1292FF;
			color: #fff;
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