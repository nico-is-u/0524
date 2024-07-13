<template>
	<view class="page">
		<view class="k-line-head k-line-head-2">
            <!-- 顶栏 -->
			<nNavbar title="外汇储备认购" :showBackBtn="true" :back="true" :backFunc="backPrev">
				<u--text @click="too('szml-2-order-list')" color="white" align="right" text="订单列表" style="padding-right: 10rpx; padding-top: 10rpx"></u--text>
			</nNavbar>

			<!-- K线图 -->
			<view class="k-line-shell">

				<!-- tab 菜单 -->
				<view class="tab-menu-type-1 flex flex-between flex-y-end">
					<view class="menu-item active menu-item-1 flex flex-center">
						<view class="triangle"></view>
						<text>外汇储备</text>
					</view>
					<view class="menu-item  menu-item-2 flex flex-center" @click="too('/pages/index/szml')">
						<view class="triangle"></view>
						<text>存币生息</text>
					</view>
				</view>

				<!-- 产品列表 -->
				<view class="mr-section padding-box-3 product-list" style="background-color: white">
					<view class="item flex flex-column" v-for="(item,index) in list" :key="'item-' + index">
						<view class="img-box">
							<image :src="item.cover_img" mode="aspectFill"></image>
						</view>
                        <view class="title flex flex-y-center">
                            <view>{{item.name}}</view>
                            <view class="tips1">由人保承保本金</view>
                            <view class="tips2">{{item.intro}}</view>
                        </view>
                        <view class="section flex flex-between">
                            <view class="left-side flex flex-column">
                                <view class="font-red2">{{item.income_rate}}%</view>
                                <view class="font-gray">近1年收益率</view>
                            </view>
                            <view class="right-side flex flex-y-center">
                                <u-button class="n-button n-button-4" :text="item.amount + '元起'" @click="buy(item.id)"></u-button>
                            </view>
                        </view>
                    </view>
				</view>
			</view>
        </view>
		<u-overlay :show="showPay" @click="showPay = false">
			<view class="warp" style="padding: 0 20px;">
				<view class="rect1" @tap.stop>

					<view style="margin-top: 40rpx;">
						<u--text iconStyle="font-size: 34rpx;margin-top:6rpx;margin-right:8rpx"
							size="14" text="购买金额"></u--text>
						<view style="margin: 30rpx 0 0;">
							<u-input type="number" placeholder="请输入购买金额" border="surround" v-model="amount"></u-input>
						</view>
					</view>

					<view style="margin-top: 40rpx;">
						<u--text iconStyle="font-size: 34rpx;margin-top:6rpx;margin-right:8rpx"
							size="14" text="请输入支付密码"></u--text>
						<view style="margin: 30rpx 0 0;">
							<xt-verify-code :isPassword="true" :isFocus="false" boxActiveColor="#333" v-model="pay_password"></xt-verify-code>
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
			amount:0,									// 购买金额
			pay_password: '',
			id: 0
		};
	},
	methods:{
		buy(id){
			this.id = id;
			this.showPay = true;
		},
		pay(){
			if (uni.$u.test.isEmpty(this.pay_password)) return this.toa('请输入支付密码');
			if (uni.$u.test.isEmpty(this.amount)) return this.toa('请输入购买金额');
			// if (!/^-?\d+$/.test(this.amount)) return this.toa('暂不支持非整数交易')
			this.to.www(this.api.licaPlaceOrder, {
				id: this.id, 
				amount: this.amount,
				pay_password: this.pay_password
			}, 'p').then(res => {
				const {code} = res
				if(code == 200){
					this.toa('支付成功')
					this.showPay = false
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
			this.too('/pages/index/szml','tab')
		}
	},
	onLoad() {
		// this.to.www(this.api.user_info).then(res => {
		// 	this.user_info = res.data;
		// })
		this.to.www(this.api.licaiList)
			.then(res => {
				console.log(res.data.data)
				this.list = res.data.data
			})
	}
}
</script>

<style lang="scss" scoped>
page{
	height: 100%;
	background-color: #f9f9f9;
}
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
.product-list{
    display: flex;
    flex-direction: column;
    gap: 32rpx;

    padding: 40rpx 32rpx;
    .item{
        border-bottom: 3rpx solid #E9E9E9;
        padding-bottom: 32rpx;

		.img-box{
			padding-bottom: 20rpx;
			image{
				height: 260rpx;
			}
		}

        .title{
            font-size: 29rpx;
            color: #222;
            gap: 20rpx;
            .label{
                font-weight: bold;
            }
        }

        .section{
            margin-top: 24rpx;

            .font-red2{
                font-size: 34rpx;
            }

        }
    }

    .tips1{
        font-size: 20rpx;
        padding: 8rpx;
        color: #0182EF;
        background: rgba(1, 130, 239, 0.2);
        border-radius: 4rpx;
    }

    .tips2{
        font-size: 20rpx;
        padding: 8rpx;
        color: #FF8420;
        background-color: rgba(255, 132, 32, .2);
        border-radius: 4rpx;
    }
}

</style>