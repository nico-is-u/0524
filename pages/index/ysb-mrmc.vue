<template>
	<view class="page">
		<view class="k-line-head">

            <!-- 顶栏 -->
			<nNavbar :title="navbarTitle" :showBackBtn="true" :back="false" :backFunc="backPrev">
				<view class="navbar-right" @click="cTypeShow = true">
					<view class="font-white cName">{{ $store.getters['cName'] }}</view>
					<view class="arrow">▼</view>
				</view>
			</nNavbar>
            
            <!-- K线图 -->
			<view class="k-line-shell">

                <!-- tab 菜单 -->
				<view class="tab-menu-type-1 flex flex-between flex-y-end">
					<view @click="formData.type = 'buy'" :class="formData.type == 'buy' ? 'active' : ''" class="menu-item menu-item-1 flex flex-center">
						<view class="triangle"></view>
						<text>买入</text>
					</view>
					<view @click="formData.type = 'sell'" :class="formData.type == 'sell' ? 'active' : ''" class="menu-item menu-item-2 flex flex-center">
						<view class="triangle"></view>
						<text>卖出</text>
					</view>
				</view>

                <!-- K线部分 -->
				<view class="k-line-box">
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

                <!-- 买入卖出 -- 操作区域 -->
				<view class="mr-section padding-box-3" style="background-color: white">
					<view class="flex flex-between">
						<!-- tab 菜单2 -->
						<view class="tab-menu-type-2 left-side">
							<view @click="changeActiveKey('limit')" :class="activeKey == 'limit' ? 'active' : ''" class="menu-item menu-item-first">限价</view>
							<view @click="changeActiveKey('market')" :class="activeKey == 'market' ? 'active' : ''" class="menu-item">市价</view>
							<view class="menu-item">止盈止亏</view>
							<view class="menu-item">计划委托</view>
						</view>
						<view class="right-side margin-t-5">
							<u-icon size="18px" name="info-circle" color="#6D6D6D"></u-icon>
						</view>
					</view>
					<!-- 操作表单 -->
					<view class="form-group margin-t-40">
                        <!-- 最优价格 -->
						<view class="form-control">
							<input type="text" placeholder="最优价格" disabled>
						</view>
                        <!-- 交易额 -->
						<view class="form-control form-control-2">
							<view class="left-side" >
								<view style="padding-right: 24rpx">
									<text>{{businessTypeItem.label}}</text>
								</view>
								<text>▼</text>
							</view>
							<view class="right-side">
								<u--input border="none" v-model="formData.amount" type="number" :step="1">
									<u--text
										:text="$store.getters['cName']"
										slot="suffix"
                                        size="13px"
                                        color="#222"
                                        style="padding-right: 40rpx"
									></u--text>
								</u--input>
							</view>
						</view>

						<!-- 币种汇率 -->
						<view class="rate-info">
							<view class="left-side">当前所选{{ $store.getters['cName'] }}价值</view>
							<view class="right-side">{{ currentRate }}</view>
						</view>

						<!-- 交易密码 -->
						<view class="label">交易密码</view>
						<view class="form-control">
							<u--input border="none" v-model="formData.pay_password" type="password" placeholder="请输入交易密码"></u--input>
						</view>

                        <!-- 滑动部分 -->
                        <template v-if="userInfo">
                            <u-slider v-model="formData.amount" :min="0" :max="userBalance" v-if="userBalance && userBalance > 1"></u-slider>
                            <view class="form-tips">
                                <view class="left-side">可用</view>
                                <view class="right-side">{{userBalance || ''}}</view>
                            </view>
                        </template>
					</view>
				</view>

            </view>


			<!-- 切换币种 -->
			<u-picker :show="cTypeShow" :columns="[$store.state.cList]" keyName="name" @confirm="changeCType" @cancel="cTypeShow = false" @close="cTypeShow = false"></u-picker>

            <!-- 切换交易类型(暂时屏蔽) -->
            <!-- <u-picker :show="businessTypeShow" :columns="businessType" keyName="label" @confirm="changeBusinessType" @cancel="businessTypeShow = false" @close="businessTypeShow = false"></u-picker> -->

			<!-- 加载动画 -->
			<u-loading-page :loading="isLoading2"></u-loading-page>

            <!-- 提交按钮 -->
            <view class="margin-t-20" style="padding: 32rpx">
                <u-button class="n-button n-button-2" :text="navbarTitle" :loading="isLoading2" :loadingText="regStatus" iconColor="#fff" @click="checkForm"></u-button>
            </view>

        </view>
    </view>
</template>

<script>
import { init } from 'klinecharts'
import uPicker from '../../uni_modules/uview-ui/components/u-picker/u-picker.vue'
export default {
  components: { uPicker },
    data(){
        return {
            isLoading:false,                    		// 请求中
            isLoading2:false,
            regStatus:'处理中...',

            userInfo:false,                             // 用户信息
			userBalance:0,								// 用户（当前币种）余额

			usdtPrice:'',								// 当前USDT 价格
			currentPrice:'',							// 当前选中币种 价格

            kLine:false,								// K线插件
			barList:['30m','1D','1W','1M','3M'],		// k线的时区
			bar:'30m',

            businessTypeShow:false,
            businessTypeIndex:1,
            businessType: [
                [
                    {label: '交易额', value: 1}, 
                    {label: '数量', value: 2}
                ]
            ],

			cTypeShow:false,

            formData:{
				code:'',
                type:'buy',
                operation_type:'market',
                pay_password:'',                        // 支付密码
                business_type:'2',                      // 1 交易额   2 数量
                amount:'',
            },
            activeKey:'limit',                          // 高亮
        }
    },
    computed:{
        businessTypeItem(){
            return this.businessType[0][this.businessTypeIndex]
        },
		navbarTitle(){
			switch(this.formData.type){
				case 'buy':
					return '买入'
				case 'sell':
					return '卖出'
			}
		},
		/* 当前选中币种兑USDT（汇率） */
		currentRate(){
			let result = '--'
			if(this.usdtPrice && this.currentPrice && this.formData.amount){
				/* 注意，这里暂不支持浮点 */
				const amount = parseInt(this.formData.amount)
				result = parseFloat((this.currentPrice * amount)/ this.usdtPrice).toFixed(2) + 'USDT'
			}
			return result
		},
    },
    methods:{
        /* 返回上一页 */
        backPrev(){
            uni.switchTab({url: '/pages/index/ysb'})
        },
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
        /* 更改K线查询 */
		changeKLineDatas(bar){
			this.bar = bar
			this.getKLineDatas()
		},
		/* 执行K线查询 */
		getKLineDatas(){
			this.isLoading = true
			this.to.www(this.api.k_line,{
				code:this.$store.getters['cName'],
				bar:this.bar
			})
			.then(res => {
				let {code,data=[]} = res
				if(code == 200){

					if(Array.isArray(data) && data.length){
						/* 取当前币种最新价格 */
						this.currentPrice = data[0].close
						data[0].timestamp *= 1000
					}

					this.kLine.applyNewData(data.reverse())
					this.isLoading = false
				}else{
					this.isLoading = false
				}
			})
			.catch(e => {
				this.isLoading = false
			})
		},
        /* 切换高亮key */
        changeActiveKey(key){
            if(key == 'limit'){
                this.formData.operation_type = key
            }else if(key == 'market'){
                this.formData.operation_type = key
            }

            this.activeKey = key
        },
        /* 切换交易类型 */
        /* changeBusinessType(e){
        }, */

		/* 切换币种 */
		changeCType(e){
			const {indexs} = e
            const index = indexs[0]

			this.$store.commit('changeCListIndex',index)

			/* 重新渲染K线 */
			this.getKLineDatas()
			/* 重新拉取余额 */
			this.userCBalance()

			this.cTypeShow = false
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

        /* 检查表单 */
        checkForm(){
            if(!this.formData.amount){
                this.toa(`请输入${this.businessTypeItem.label}`)
			}else if(!this.formData.pay_password){
				this.toa(`请输入交易密码`)
            }else if(!/^-?\d+$/.test(this.formData.amount)){
				this.toa(`暂不支持非整数交易`)
			}else{
				/* 设置当前交易币种 */
				this.formData.code = this.$store.getters['cName']
				/* 发起请求 */
				this.goRequest()
			}
        },
		/* 发起请求 */
		async goRequest(){
			this.isLoading2 = true
			try{
				console.log(this.formData)
				const response = await this.to.www(this.api.yunPlaceOrder,this.formData)
				const {code} = response
				if(code == 200){
					this.toa('操作成功')
					this.too('/pages/home-page/my_zc')
					this.isLoading2 = false
				}else{
					this.isLoading2 = false
				}
			}catch(e){
				console.log(e)
				this.isLoading2 = false
			}
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
    },
    onShow(){
        /* 重新拉取K线 */
		this.getKLineDatas()
		/* 拉取该币种当前余额 */
		this.userCBalance()
		/* 个人信息 */
        this.getUserInfo()
    },
	onLoad(options){
		const {type = ''} = options
		this.formData.type = type
	}
}
</script>

<style lang="scss" scoped>
page{
	background-color: #f9f9f9;
}

.rate-info{
	display: flex;
	justify-content: space-between;

	.left-side{
		color: #838282;
	}
}

.navbar-right{
	display: flex;
	align-items: center;
	justify-content: center;

	gap: 12rpx;

	.cName{
		font-size: 30rpx;
		letter-spacing: 2rpx;
	}

	.arrow{
		font-size: 20rpx;
		color: white !important;
	}
}

</style>