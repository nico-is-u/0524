<template>
	<view class="page">
		<view class="k-line-head k-line-head-2">
             <!-- 顶栏 -->
			<nNavbar title="理财产品" :showBackBtn="false" >
				<u--text color="white" align="right" text="订单列表" style="padding-right: 10rpx; padding-top: 10rpx"></u--text>
			</nNavbar>

			<!-- K线图 -->
			<view class="k-line-shell">

				<!-- tab 菜单 -->
				<view class="tab-menu-type-1 flex flex-between flex-y-end">
					<view class="menu-item  menu-item-1 flex flex-center" @click="too('/pages/index/szml','tab')">
						<view class="triangle"></view>
						<text>存币生息</text>
					</view>
					<view class="menu-item active menu-item-2 flex flex-center">
						<view class="triangle"></view>
						<text>理财产品</text>
					</view>
				</view>

				<!-- 产品列表 -->
				<view class="mr-section padding-box-3 product-list" style="background-color: white">
					<view class="item flex flex-column" v-for="(item,index) in 5" :key="'item-' + index">
                        <view class="title flex flex-y-center">
                            <view>申万宏源快利短期债券</view>
                            <view class="tips1">960026</view>
                            <view class="tips2">非代销基金</view>
                        </view>

                        <view class="section flex flex-between">
                            <view class="left-side flex flex-column">
                                <view class="font-red2">2.60%</view>
                                <view class="font-gray">近1年收益率</view>
                            </view>
                            <view class="right-side flex flex-y-center">
                                <u-button class="n-button n-button-4" text="立即购买"></u-button>
                            </view>
                        </view>
                    </view>
				</view>
				
			</view>


        </view>
    </view>
</template>

<script>
export default {
	methods:{

	}
}
</script>

<style lang="scss" scoped>
page{
	height: 100%;
	background-color: #f9f9f9;
}

.product-list{
    display: flex;
    flex-direction: column;
    gap: 32rpx;

    padding: 40rpx 32rpx;
    .item{
        border-bottom: 3rpx solid #E9E9E9;
        padding-bottom: 32rpx;
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