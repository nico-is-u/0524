<template>
	<view class="page">
		<view class="k-line-head k-line-head-2">
            <!-- 顶栏 -->
			<nNavbar title="数字魅力" :showBackBtn="true" :back="false" :backFunc="backPrev">
				<u--text @click="too('szml-3-order-list')" color="white" align="right" text="订单列表" style="padding-right: 10rpx; padding-top: 10rpx"></u--text>
			</nNavbar>

			<!-- K线图 -->
			<view class="k-line-shell">

				<!-- tab 菜单 -->
				<view class="tab-menu-type-3 flex flex-between flex-y-end">
					<view class="menu-item menu-item-1 flex flex-center" @click="too('/pages/index/szml-2','tab')">
						<view class="triangle"></view>
						<text>外汇储备</text>
					</view>
					<view class="menu-item active menu-item-2 flex flex-center" >
						<view class="triangle"></view>
						<text>短期生财</text>
					</view>
					<view class="menu-item menu-item-3 flex flex-center" @click="too('/pages/index/szml')">
						<view class="triangle"></view>
						<text>存币生息</text>
					</view>
				</view>

				<!-- 产品列表 -->
				<view class="mr-section padding-box-3 product-list" style="background-color: white">
					<view class="item flex flex-column" v-for="(item,index) in list" :key="'item-' + index">
						<view class="img-box">
							<image :src="item.cover_img" mode="widthFix"></image>
						</view>
                        <view class="title flex flex-y-center">
                            <view>{{item.name}}</view>
                            <view class="tips1">由人保承保本金</view>
                            <view class="tips2">{{item.intro}}</view>
                        </view>
                        <view class="section flex flex-between">
                            <view class="left-side flex flex-column">
								<view>
									<view class="font-red2">{{item.income_rate}}%</view>
									<view class="font-gray">七日年化收益率</view>
								</view>
								<view class="margin-t-30" v-if="item.ysb">
									<text>获赠云数币</text>
									<text class="font-red3 margin-l-10">{{ item.ysb || '0' }}</text>
								</view>
                            </view>
							
							<view class="right-side flex flex-y-center" v-if="item.sale_status == 1">
								<!-- :text="item.amount + '元起'" -->
                                <u-button class="n-button n-button-4" text="立即购买" @click="buy(item)"></u-button>
                            </view>
							<view class="right-side flex flex-y-center" v-else>
								<text v-if="item.sale_status == 2">暂未开放</text>
								<text v-if="item.sale_status == 3">已售罄</text>
							</view>
                            
                        </view>
                    </view>
				</view>
			</view>
        </view>
		<u-overlay :show="showPay" @click="showPay = false">
			<view class="warp" style="padding: 0 20px;">
				<view class="rect1" @tap.stop>

					<view class="flex price-info">
						<!-- <u--text iconStyle="font-size: 34rpx;margin-top:6rpx;margin-right:8rpx"
							size="14" text="支付金额"></u--text> -->
						<text>支付金额：</text>
						<text>{{amount}}</text>
					</view>

					<!-- <view style="margin-top: 40rpx;">
						<u--text iconStyle="font-size: 34rpx;margin-top:6rpx;margin-right:8rpx"
							size="14" text="购买数量"></u--text>
						<view style="margin: 30rpx 0 0;">
							<u-input type="number" placeholder="请输入购买数量" border="surround" v-model="buy_num" :min="1" :step="1" disabled></u-input>
						</view>
					</view> -->

					<view style="margin-top: 40rpx;">
						<u--text iconStyle="font-size: 34rpx;margin-top:6rpx;margin-right:8rpx"
							size="14" text="请输入支付密码"></u--text>
						<view style="margin: 30rpx 0 0;">
							<xt-verify-code :isPassword="true" :isFocus="true" boxActiveColor="#333" v-model="pay_password"></xt-verify-code>
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
export default {
	data() {
		return {
			list: [],
			user_info: {
			},
			showPay: false,
			isDone: false,
			regStatus: '处理中...',
			amount:'',									// 产品金额
			buy_num:1,									// 购买数量
			pay_password: '',
			id: 0
		};
	},
    methods:{
		buy(item){
			this.id = item.id;
			this.amount = item.amount
			this.showPay = true;
		},
		pay(){
			if (uni.$u.test.isEmpty(this.buy_num) || parseInt(this.buy_num) == 0) return this.toa('请输入购买数量');
			if (uni.$u.test.isEmpty(this.pay_password)) return this.toa('请输入支付密码');
			// if (!/^-?\d+$/.test(this.amount)) return this.toa('暂不支持非整数交易')

			this.isDone = true
			
			this.to.www(this.api.licaiShortPlaceOrder, {
				id: this.id, 
				buy_num: this.buy_num,
				pay_password: this.pay_password,
			}, 'p').then(res => {
				
				const {code} = res
				if(code == 200){
					this.toa('支付成功')

					this.isDone = false
					this.showPay = false
					this.buy_num = 1

					this.too('/pages/index/szml-2-order-list')
				}else{
					this.isDone = false
					this.showPay = false
				}
			}).catch(err => {
				this.isDone = false
				this.showPay = false
			})
		},
		/* 返回上一页 */
		backPrev(){
			this.too('/pages/index/szml-2','tab')
		}
	},
    onLoad() {
		// this.to.www(this.api.user_info).then(res => {
		// 	this.user_info = res.data;
		// })
		this.to.www(this.api.licaiShortList)
			.then(res => {
				this.list = res.data.data
			})
	}
}
</script>