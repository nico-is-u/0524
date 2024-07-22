<template>
	<view class="page">
		<view class="k-line-head k-line-head-2">
            <!-- 顶栏 -->
			<nNavbar title="数字魅力" :showBackBtn="true" :back="false" :backFunc="backPrev">
				<u--text color="white" @click="too('szml-order-list')" align="right" text="订单列表" style="padding-right: 10rpx; padding-top: 10rpx"></u--text>
			</nNavbar>

			<!-- K线图 -->
			<view class="k-line-shell">

				<!-- tab 菜单 -->
				<view class="tab-menu-type-1 flex flex-between flex-y-end">
					<view class="menu-item menu-item-1 flex flex-center" @click="too('/pages/index/szml-2','tab')">
						<view class="triangle"></view>
						<text>外汇储备</text>
					</view>
					<view class="menu-item active menu-item-2 flex flex-center">
						<view class="triangle"></view>
						<text>存币生息</text>
					</view>
				</view>

				<!-- 折线图 -->
				<view class="flex" style="background-color: white;width: 100%;justify-content: center;">
					<canvas id="chartCanvas" ref="chartCanvas" style="width: 100%;height: 50vw;"></canvas>
				</view>

				<!-- 操作区域 -->
				<view class="mr-section padding-box-3" style="background-color: white">
					<view class="form-group margin-t-40" style="gap: 0;">

						<!-- 切换币种 -->
						<view class="change-coin-type flex flex-between" style="margin: 32rpx 0;">
							<view class="left-side">质押</view>
							<view class="right-side">
								<view style="padding-right: 24rpx" @click="cTypeShow = true">
									<text>{{$store.getters['cName']}}</text>
								</view>
								<text>▼</text>
							</view>
						</view>

						<view class="form-control" style="margin: 16rpx 0 0;">
							<u--input border="none" v-model="money" type="digit" placeholder="请输入质押的云数币数量"></u--input>
						</view>

						<view class="form-tips2" v-if="$store.getters['cName'] == 'YSC'">
							{{yscTips}}
						</view>
						
						<view class="form-tips" style="margin: 48rpx 0;">
							<view class="left-side">可用</view>
							<view class="right-side">{{userBalance}}</view>
						</view>

					</view>
				</view>
			</view>
			<!-- 质押 & 赎回 -->
            <view class="margin-t-20" style="padding: 32rpx">
                <u-button class="n-button n-button-2" text="质押" @click="buy"></u-button>
            </view>
			<!-- <view style="padding: 0 32rpx">
                <u-button class="n-button n-button-2" text="赎回" ></u-button>
            </view> -->
        </view>

		<u-picker :show="cTypeShow" :columns="[$store.state.cList]" keyName="name" @confirm="changeCType" @cancel="cTypeShow = false" @close="cTypeShow = false"></u-picker>

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
import * as echarts from 'echarts'
export default {
	data() {
		return {
			chartInstance: null,
			info: {
				asset_usdt: 0
			},
			
			userInfo:false,                             // 用户信息
			userBalance:0,								// 用户（当前币种）余额

			showPay: false,
			isDone: false,
			regStatus: '处理中...',
			yscTips:'云数币最低500枚，每100枚为增加基数',
			pay_password: '',
			id: 0,
			money: '',

			cTypeShow:false,

		};
	},
	methods:{
		/* 用户信息 */
		getUserInfo() {
			this.to.www(this.api.user_info).then(res => {

				this.userInfo = res.data
				this.usdtPrice = parseInt(res.data.cnyRate).toFixed(1)

				uni.setStorage({
					data: this.userInfo,
					key: 'user_info'
				})
			})
		},
		/* 返回上一页 */
		backPrev(){
			this.too('/pages/index/szml-2','tab')
		},
		/* 拉取该币种的用户余额 */
		async userCBalance(){
			try{
				const response = await this.to.www(this.api.user_balance,{
					code:this.$store.getters['cName']
				})

				const {code,data} = response
				if(code == 200){
					const userBalance = parseFloat(data).toFixed(2)
					console.log(`当前币种${this.$store.getters['cName']},余额：${userBalance}`)

					this.userBalance = userBalance
				}

			}catch(e){
			}
		},

		buy(id){
			// if(this.money > this.info.asset_usdt){
			// 	return this.toa('余额不足');
			// }

			/* 云数币判断 */
			if(this.$store.getters['cName'] == 'YSC'){
				const money = parseInt(this.money)
				if(money < 500){
					this.money = 500
					this.toa(this.yscTips)
				}else if(money % 100 != 0){
					this.money = Math.ceil(money / 100) * 100
					this.toa(this.yscTips)
				}else{
					this.showPay = true
				}
			}else{
				this.showPay = true
			}

		},
		pay(){
			if (uni.$u.test.isEmpty(this.pay_password)) return this.toa('请输入支付密码');
			this.to.www(this.api.pledgePlaceOrder, {
				code: this.$store.getters['cName'],
				number: this.money, 
				pay_password: this.pay_password
			}, 'p').then(res => {
				this.toa('质押成功')
				this.init();
			}).catch(err => {
				// this.isDone = false
			})
		},
		init(){
			/* 折线图 */
			this.to.www(this.api.pledgeInfo)
			.then(res => {
				this.info = res.data;
				this.$nextTick(() => {
					this.initChart();
				});
			})

		},

		/* 折线图 */
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
		},

		/* 拉取币种数据 */
		getCDatas(){
			this.$store.dispatch('getCList')
		},

		/* 切换币种 */
		changeCType(e){
			const {indexs} = e
            const index = indexs[0]

			this.$store.commit('changeCListIndex',index)

			/* 重新拉取余额 */
			this.userCBalance()
			this.cTypeShow = false
		},
	},
	destroyed() {
		if (this.chartInstance) {
			this.chartInstance.dispose();
			this.chartInstance = null;
		}
	},
	onLoad() {
		this.init()
	},
	onShow(){
		/* 拉取币种信息 */
		this.getCDatas()
		/* 个人信息 */
        this.getUserInfo()
		/* 拉取该币种当前余额 */
		this.userCBalance()
	},
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

.change-coin-type{
	display: flex;
	align-items: center;
	
	.left-side{
		padding-left: 30rpx;
	}

	.right-side{
		display: flex;
		align-items: center;

		min-height: 72rpx;
		background-color: #F9F9F9;
		padding: 0 36rpx;
	}
}

page{
	height: 100%;
	background-color: #f9f9f9;
}

</style>