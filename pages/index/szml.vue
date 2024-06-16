<template>
	<view class="page">
		<view class="k-line-head k-line-head-2">
             <!-- 顶栏 -->
			<nNavbar title="数字魅力" :showBackBtn="false" >
				<u--text color="white" @click="too('szml-order-list')" align="right" text="订单列表" style="padding-right: 10rpx; padding-top: 10rpx"></u--text>
			</nNavbar>

			<!-- K线图 -->
			<view class="k-line-shell">

				<!-- tab 菜单 -->
				<view class="tab-menu-type-1 flex flex-between flex-y-end">
					<view class="menu-item active menu-item-1 flex flex-center">
						<view class="triangle"></view>
						<text>存币生息</text>
					</view>
					<view class="menu-item menu-item-2 flex flex-center" @click="too('/pages/index/szml-2')">
						<view class="triangle"></view>
						<text>理财产品</text>
					</view>
				</view>

				<!-- 折线图 -->
				<view class="flex" style="background-color: white;width: 100%;justify-content: center;">
					<canvas id="chartCanvas" ref="chartCanvas" style="width: 100%;height: 50vw;"></canvas>
				</view>

				<!-- 操作区域 -->
				<view class="mr-section padding-box-3" style="background-color: white">
					<view class="form-group margin-t-40">
						<!-- 交易密码 -->
						<view class="label">质押云数币</view>
						<view class="form-control">
							<u--input border="none" v-model="money" type="digit" placeholder="请输入质押的云数币数量"></u--input>
						</view>
						<view class="form-tips">
							<view class="left-side">可用</view>
							<view class="right-side">{{user_info.yun}}</view>
						</view>

					</view>
				</view>
			</view>
			<!-- 提交按钮 -->
            <view class="margin-t-20" style="padding: 32rpx">
                <u-button class="n-button n-button-2" text="质押" @click="buy"></u-button>
            </view>
        </view>
		<u-overlay :show="showPay" @click="showPay = false">
			<view class="warp" style="padding: 0 20px;">
				<view class="rect1">
					<view style="margin-top: 40rpx;">
						<u--text prefixIcon="coupon-fill" iconStyle="font-size: 34rpx;margin-top:6rpx;margin-right:8rpx"
							size="14" text="请输入支付密码"></u--text>
						<view style="margin: 30rpx 0 0;">
							<xt-verify-code :isPassword="true" boxActiveColor="#333" v-model="pay_password"></xt-verify-code>
						</view>
					</view>
					<u-button iconColor="#fff" class="custom-style" text="立即支付" :loading="isDone"
						:loadingText="regStatus" @click="pay()"></u-button>
				</view>
			</view>
		</u-overlay>
    </view>
</template>

<script>
import * as echarts from 'echarts';
export default {
	data() {
		return {
			chartInstance: null,
			info: {
				asset_usdt: 0
			},
			user_info: {
				yun: 0
			},
			showPay: false,
			isDone: false,
			regStatus: '处理中...',
			pay_password: '',
			id: 0,
			money: '',
		};
	},
	methods:{
		buy(id){
			if(this.money > this.info.asset_usdt){
				return this.toa('余额不足');
			}
			this.showPay = true;
		},
		pay(){
			if (uni.$u.test.isEmpty(this.pay_password)) return this.toa('请输入支付密码');
			this.to.www(this.api.pledgePlaceOrder, {number: this.money, pay_password: this.pay_password}, 'p').then(res => {
				this.toa('质押成功')
				this.init();
			}).catch(err => {
				// this.isDone = false
			})
		},
		init(){
			this.to.www(this.api.user_info).then(res => {
				this.user_info = res.data;
			})
			this.to.www(this.api.pledgeInfo)
				.then(res => {
					this.info = res.data;
					this.$nextTick(() => {
						this.initChart();
					});
				})
		},
		initChart() {
			// 获取 canvas 元素
			const chartDom = this.$refs.chartCanvas;

			// 初始化 ECharts 实例
			this.chartInstance = echarts.init(document.getElementById('chartCanvas'));
			
			let date = []
			let syl = []
			this.info.date_income.forEach(item => {
				date.push(item.date.replace('2024-',''));
				syl.push(item.pledge_income);
			})
			// 设置图表配置项
			const option = {
				xAxis: {
					type: 'category',
					boundaryGap: false,
					data: date
				},
				 yAxis: [
					{  
						type: 'value',  
						axisLabel: {  
							show: true,  
							interval: 'auto',  
							formatter: '{value} %'  
						},  
						show: true  
					}  
				],
				grid: {
					left: "5%",
					right: "5%",
					bottom: "3%",
					containLabel: true,
				},
				series: [
					{
						data: syl,
						type: 'line',
						smooth: true,
						areaStyle: {
							color: new echarts.graphic.LinearGradient( 0, 0, 0, 1,
							[
								{
									offset: 0,
									color: 'rgba(56, 139, 255, 0.40)', // 0% 处的颜色
								},
								{
									offset: 1,
									color: 'rgba(255, 255, 255, 0.1)', // 100% 处的颜色
								},
						   ],false)
						}
					}
				]
			};

			// 载入图表
			this.chartInstance.setOption(option);
		}
	},
	destroyed() {
		if (this.chartInstance) {
			this.chartInstance.dispose();
			this.chartInstance = null;
		}
	},
	onLoad() {
		this.init();
	}
}
</script>

<style lang="scss">
	.warp {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			height: 100%;
			z-index: 3;
		}
		
		.rect1 {
			border-radius: 10px;
			padding: 20px;
			width: 100%;
			box-sizing: border-box;
			background: #fff;
		
			.custom-style {
				width: 30vw;
				border-radius: 8px;
				margin-top: 30px;
				background: #1292FF;
				color: #fff;
			}
		}
page{
	height: 100%;
	background-color: #f9f9f9;
}

</style>